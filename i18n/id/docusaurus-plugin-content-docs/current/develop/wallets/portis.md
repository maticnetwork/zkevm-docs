---
id: portis
title: Portis
description: Dompet berbasis web yang dibuat dengan mempertimbangkan kemudahan pengguna untuk bergabung.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis adalah dompet berbasis web yang dibuat dengan mempertimbangkan kemudahan pengguna untuk bergabung. Portis hadir dengan SDK javascript yang terintegrasi ke DApp dan menciptakan pengalaman nir-dompet lokal untuk pengguna. Selanjutnya, ia menangani mengatur dompet, transaksi, dan biaya gas.

Seperti Metamask, dompet ini nonkustodial, pengguna mengendalikan kunci mereka dan Portis hanya menyimpannya dengan aman. Namun, tidak seperti Metamask, dompet web ini diintegrasikan ke dalam aplikasi dan bukan ke browser. Pengguna mengaitkan kunci mereka dengan id masuk dan kata sandi mereka.

**Tipe**: Non-custodial/HD<br/>
**Private Key Storage**: Enkripsi dan disimpan di server Portis<br/> **Komunikasi ke Ethereum Ledger**: Didefinisikan oleh pengembang<br/> **Encoding kunci privat**: Mnemonik<br/>

## Atur Web3 {#set-up-web3}

Install Port dalam dApp:

```js
npm install --save @portis/web3
```

Sekarang, mendaftarkan dApp Anda dengan Portis untuk mendapatkan ID dApp menggunakan [Porsis](https://dashboard.portis.io/).

Impor `portis`dan `web3`objek:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Konstruktor Poris mengambil argumen pertama sebagai dApp ID dan argumen kedua karena jaringan yang ingin Anda hubungi. Ini dapat berupa string atau objek.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Menampilkan Akun {#set-up-account}

Jika instalasi dan instansiasi web3 berhasil, berikut ini akan menghasilkan akun yang terhubung:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Menginstan Kontrak {#instantiating-contracts}

Ini adalah cara kita harus melakukan instansi kontrak:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Memanggil Fungsi {#calling-functions}

### Memanggil `call()`Fungsi {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### Memanggil `send()`Fungsi {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
