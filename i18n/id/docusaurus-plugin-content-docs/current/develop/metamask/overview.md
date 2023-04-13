---
id: overview
title: Ikhtisar tentang MetaMask
sidebar_label: Overview
description: Cara memulai MetaMask di Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) adalah sebuah dompet kripto yang dapat digunakan di browser web dan perangkat seluler untuk berinteraksi dengan blockchain Ethereum. Metamask akan memungkinkan Anda menjalankan Ethereum DApp (Aplikasi Terdesentralisasi) langsung di browser Anda tanpa menjalankan node Ethereum penuh.

**Tipe**: Non-custodial/HD<br/>
**Penyimpanan Kunci Privat**: Penyimpanan browser lokal pengguna<br/>
**Komunikasi ke Ledger Ethereum**: Infura<br/>
**Encoding kunci privat**: Mnemonik <br/>

:::warning
Tolong backup **Phra Pemulihan Rahasia.** Jika divais rusak, hilang, dicuri, atau memiliki kerusakan data, tidak ada cara lain untuk memperbaikinya. Secret Recovery Phrase adalah satu-satunya cara untuk memulihkan akun MetaMask. Periksa **[<ins>Tips Keselamatan dan Keamanan untuk MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Panduan untuk mengatur MetaMask untuk Polygon {#guide-to-set-up-metamask-for-polygon}

* [Unduh & Instal MetaMask](/develop/metamask/tutorial-metamask.md)
* [Mengonfigurasi Polygon di MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Mengonfigurasi Token Kustom](/develop/metamask/custom-tokens.md)
* [Membuat & Mengimpor Akun](/develop/metamask/multiple-accounts.md)

### 1. Menyiapkan Web3 {#1-set-up-web3}

#### Langkah 1 {#step-1}

Instal berikut ini pada DApp:

  ```javascript
  npm install --save web3
  ```

Buat file baru, beri nama `web3.js` dan masukkan kode berikut di dalamnya:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

File di atas mengekspor fungsi yang disebut `getWeb3()` - untuk meminta akses akun metamask dengan cara mendeteksi objek global (`ethereum` atau `web3`) yang dimasukkan oleh Metamask.

Menurut [dokumentasi API Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask menyuntikkan API global ke situs web yang dikunjungi oleh penggunanya di window.ethereum. API ini memungkinkan situs untuk meminta akun Ethereum pengguna, membaca data dari blockchain yang terhubung ke pengguna, dan menyarankan bahwa pesan tanda dan transaksi. Kehadiran objek penyedia menunjukkan pengguna Ethereum.

Secara sederhana, pada dasarnya berarti bahwa memiliki ekstensi/add-on yang dipasang di peramban Anda, Anda akan memiliki variabel global yang ditentukan `ethereum``web3`(untuk versi yang lebih tua), dan menggunakan variabel ini yang kami instansi objek web3 kami.

#### Langkah 2 {#step-2}

Sekarang, dalam kode klienmu, impor file di atas:

```js
  import getWeb3 from '/path/to/web3';
```

dan panggil fungsi:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Menyiapkan akun {#2-set-up-account}

Sekarang untuk mengirim transaksi (khususnya yang mengubah keadaan blockchain) kita perlu akun untuk menandatangani transaksi tersebut. Kami melakukan instansi kontrak dari objek web3 yang kami buat diatas:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

Fungsi `getAccounts()` menghasilkan array dari semua akun pada metamask pengguna dan `accounts[0]` adalah yang dipilih oleh pengguna.

### 3. Melakukan instansiasi terhadap kontrak {#3-instantiate-your-contracts}

Setelah kita memiliki `web3`objek di tempat ini, kami akan melakukan instansi berikutnya kontrak kami, dengan asumsi Anda memiliki kontrak ABI dan alamat yang sudah dimaksud:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Memanggil fungsi {#4-call-functions}

Sekarang untuk fungsi apapun yang ingin Anda menelepon dari kontrak, kami secara langsung berinteraksi dengan objek kontrak instansi (yang `myContractInstance`dinyatakan dalam Langkah 2).

:::tip Sebuah ulasan cepat

Fungsi yang mengubah keadaan kontrak disebut `send()`fungsi. Fungsi yang tidak mengubah keadaan kontrak disebut `call()`fungsi.

:::

#### Memanggil Fungsi `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Memanggil Fungsi `send()` {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
