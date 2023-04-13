---
id: walletconnect
title: WalletConnect
description: Protokol terbuka yang menciptakan komunikasi DApp-Dompet.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** adalah protokol terbuka - bukan dompet - dibangun untuk membuat hubungan komunikasi antara dApps dan dompet. Sebuah wallet dan aplikasi yang mendukung protokol ini akan memungkinkan sebuah tautan aman melalui kunci bersama antara dua peer. Koneksi dimulai oleh DApp yang menampilkan kode QR dengan URI WalletConnect standar dan koneksi dibuat ketika aplikasi dompet menyetujui permintaan koneksi. Permintaan lebih lanjut terkait transfer dana dikonfirmasi pada aplikasi dompet itu sendiri.

## Menampilkan Web3 {#set-up-web3}

Untuk mengatur dApp Anda untuk terhubung dengan Polygon Wallet, Anda dapat menggunakan penyedia WalletConnect untuk terhubung langsung ke Polygon. Instal berikut ini pada DApp:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Instal `matic.js`untuk integrasi Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

Dan tambahkan kode berikut dalam dApp:

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Selanjutnya, siapkan penyedia Polygon dan Ropsten melalui objek WalletConnect:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

Kita telah membuat dua objek penyedia di atas untuk membuat instans objek Web3 dengan:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Menginstan Kontrak {#instantiating-contracts}

Setelah kita memiliki **objek web3** kami, instantiasi kontrak melibatkan langkah yang sama seperti untuk Metamask. Pastikan Anda memiliki **ABI kontrak** dan **alamat** yang sudah ditempatkan.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Memanggil Fungsi {#calling-functions}

:::info

Kunci pribadi akan tetap berada di dompet pengguna dan **aplikasi tidak mengaksesnya**.

:::

Kami memiliki dua jenis fungsi dalam Ethereum, tergantung pada interaksi dengan blockchain. Kita `call()` ketika membaca data dan `send()` ketika menulis data.

### Memanggil Fungsi `call()` {#functions}

Membaca data tidak memerlukan tanda tangan, sehingga kode harus seperti ini:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Memanggil Fungsi `send()` {#functions-1}

Karena menulis ke blockchain membutuhkan tanda tangan, kami meminta pengguna pada dompet mereka (yang mendukung WalletConnect) untuk menandatangani transaksi.

Ini melibatkan tiga langkah:
1. Membuat transaksi
2. Mendapatkan tanda tangan pada transaksi
3. Mengirim transaksi yang ditandatangani

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Kode di atas menciptakan objek transaksi yang dikirim ke dompet pengguna untuk mendapatkan tanda tangan:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`fungsi menampilkan pengguna untuk tanda tangan dan `sendSignedTransaction()`mengirimkan transaksi yang ditandatangani (memberikan tanda tangan pada kesuksesan).
