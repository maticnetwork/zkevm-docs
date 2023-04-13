---
id: eth
title: Panduan Penyetiran dan Penarikan ETH
sidebar_label: ETH
description: "Penyetoran dan penarikan token ETH pada jaringan Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Aliran Tingkat Tinggi {#high-level-flow}

#### **Penyetoran ETH (proses 1 langkah)**

Fungsi **deposit** ini akan digunakan ketika token disetor ke kontrak Polygon, serta tersedia dan bisa digunakan di jaringan Polygon.

#### **Transfer ETH**

Setelah memiliki dana di Polygon, Anda dapat menggunakan dana itu untuk dikirimkan ke akun lain saat itu juga.

#### **Penarikan ETH (proses 3 langkah)**

1. Penarikan dana dimulai dari Polygon. Interval titik pemeriksaan 30 menit (untuk testnet, tunggu sekitar 10 menit) telah diatur, di mana semua blok di lapisan blok Polygon telah divalidasi sejak titik pemeriksaan terakhir.
2. Setelah titik pemeriksaan diserahkan ke kontrak ERC20, sebuah tanda NFT Exit (ERC721) dibuat dari nilai yang setara.
3. Dana yang ditarik dapat diklaim kembali ke acccount ERC20 dari kontrak rantai utama menggunakan prosedur keluar.

## Perincian Pengaturan {#setup-details}

### Mengonfigurasi Matic SDK {#configuring-matic-sdk}

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

**deposit**: Deposit dapat dilakukan dengan memanggil `depositEther()``depositManagerContract`kontrak.

Perlu diperhatikan bahwa tanda harus dipetakan dan disetujui untuk transfer sebelumnya.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

Deposit dari Ethereum ke Polygon terjadi dengan menggunakan mekanisme sinkronisasi keadaan dan memakan waktu sekitar 22-30 menit. Setelah menunggu selama interval waktu ini, sebaiknya periksa saldo menggunakan pustaka web3.js/matic.js atau Metamask. Penjelajah akan menampilkan saldo hanya bila ada paling tidak satu transfer aset pada rantai anak. [Tautan](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) ini menjelaskan cara melacak peristiwa setor.

:::

## transfer {#transfer}

ETH di jaringan Polygon adalah sebuah WETH (Token ERC20).

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

Pengguna dapat memanggil `withdraw`fungsi kontrak token `getERC20TokenContract`anak. Fungsi ini akan membakar token. Klien Polygon Plasma mengekspos `withdrawStart`metode untuk membuat panggilan ini.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Pengguna dapat memanggil `startExitWithBurntTokens()`fungsi `erc20Predicate`kontrak. Klien Polygon Plasma mengekspos `withdrawConfirm()`metode untuk membuat panggilan ini. Fungsi ini dapat digunakan hanya setelah titik periksa disertakan dalam rantai utama. Penyertaan titik periksa ini dapat dilacak dengan mengikuti [panduan](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events) ini.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Keluar dari Proses {#3-process-exit}

Seorang pengguna harus memanggil `processExits()`fungsi `withdrawManager`kontrak dan mengajukan bukti pembakaran. Setelah mengajukan bukti yang valid, token ditransfer ke pengguna. Klien Polygon Plasma mengekspos `withdrawExit()`metode untuk membuat panggilan ini.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Sebuah pos pemeriksaan, yang merupakan representasi dari semua transaksi yang terjadi di Polygon ke rantai Ethereum setiap ~ 5 menit, secara teratur diserahkan ke kontrak rantai utama Ethereum.

:::