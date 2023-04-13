---
id: erc20
title: Panduan Penyetoran dan Penarikan ERC20
sidebar_label: ERC20
description:  "Penyetoran dan penarikan token ERC20 pada jaringan Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Lihat [dokumentasi Matic.js terbaru tentang Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) untuk memulai dan melihat metode terbaru.

### Aliran Tingkat Tinggi {#high-level-flow}

#### **Penyetoran ERC20 (proses 2 langkah)**

1. Token ini harus mendapat persetujuan lebih dahulu dari kontrak rootchain Polygon pada Rantai Induk (Ethereum/Goerli).
2. Setelah mendapat persetujuan, fungsi **deposit** akan diaktifkan ketika token disetorkan ke kontrak Polygon, serta tersedia dan bisa digunakan di Polygon.

#### **Transfer ERC20**

Setelah memiliki dana di Polygon, Anda dapat menggunakan dana itu untuk dikirimkan ke akun lain saat itu juga.

#### **Penarikan ERC20 (proses 3 langkah)**

1. Penarikan dana dimulai dari Polygon. Interval titik pemeriksaan 30 menit (untuk testnet tunggu selama sekitar 10 menit) telah diatur, di mana semua blok pada lapisan blok Polygon telah divalidasi sejak titik pemeriksaan terakhir.
2. Setelah titik pemeriksaan diserahkan ke kontrak ERC20, sebuah tanda NFT Exit (ERC721) dibuat dari nilai yang setara.
3. Dana yang ditarik dapat diklaim kembali ke acccount ERC20 dari kontrak rantai utama menggunakan prosedur keluar.

## Perincian Pengaturan {#setup-details}

### Mengonfigurasi Edge Polygon {#configuring-polygon-edge}

Instal SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Memulai klien Maticjs

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Membuat file baru dalam direktori root yang diberi `process.env`nama dengan isi berikut:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**Menampilkan**: Ini adalah persetujuan ERC20 yang normal, sehingga `depositManagerContract`dapat memanggil `transferFrom()`fungsi. Klien Polygon Plasma mengekspos `erc20Token.approve()`metode untuk membuat panggilan ini.

**deposit**: Penyetoran dapat dilakukan dengan memanggil **_depositERC20ForUser_** pada kontrak depositManagerContract.

Perhatikan bahwa token harus dipetakan dan disetujui terlebih dahulu untuk transfer.

Metode **_erc20Token.deposit_** akan melakukan panggilan ini.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

Deposit dari Ethereum ke Polygon terjadi dengan menggunakan mekanisme sinkronisasi keadaan dan memakan waktu sekitar 5-7 menit. Setelah menunggu selama interval waktu ini, sebaiknya periksa saldo menggunakan pustaka web3.js/matic.js atau Metamask. Penjelajah akan menampilkan saldo hanya bila ada paling tidak satu transfer aset pada rantai anak. [Tautan](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) ini menjelaskan cara melacak peristiwa setor.

:::

## transfer {#transfer}

```js

const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
    const receipt = await result.getReceipt()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Penarikan {#withdraw}

### 1. Bakar {#1-burn}

Pengguna dapat memanggil `withdraw()`fungsi kontrak token `getERC20TokenContract`anak. Fungsi ini akan membakar token. Klien Polygon Plasma mengekspos `withdrawStart()`metode untuk membuat panggilan ini.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Pengguna dapat memanggil fungsi **_startExitWithBurntTokens_** dari kontrak **_erc20Predicate_**. Klien Polygon Plasma mengekspos metode **_withdrawConfirm_** untuk melakukan panggilan ini. Fungsi ini dapat digunakan hanya setelah titik periksa disertakan dalam rantai utama. Penyertaan titik periksa ini dapat dilacak dengan mengikuti [panduan](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events) ini.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Keluar dari Proses {#3-process-exit}

Pengguna harus memanggil fungsi **_processExits_** dari kontrak **_withdrawManager_** dan mengirimkan bukti bakar. Setelah mengajukan bukti yang valid, token ditransfer ke pengguna. Klien Polygon Plasma mengekspos metode **_withdrawExit_** untuk melakukan panggilan ini.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Sebuah checkpoint yang merupakan representasi dari semua transaksi yang terjadi di Jaringan Polygon ke rantai ERC20 setiap ~30 menit, secara teratur diserahkan ke kontrak ERC20.

:::