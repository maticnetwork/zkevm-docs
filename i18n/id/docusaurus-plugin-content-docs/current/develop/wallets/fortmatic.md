---
id: fortmatic
title: Fortmatic
description: Gunakan SDK Formatic untuk mengintegrasikan dApp Anda dengan Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK memungkinkan Anda untuk dengan mudah mengintegrasikan dApp dengan blok Ethereum, apakah Anda sudah memiliki dApp yang diintegrasikan dengan Web3 atau mulai dari awal. Fortmatic menyediakan pengalaman yang halus dan menyenangkan untuk Anda dan pengguna aplikasi yang desentralisasi Anda.

## Instalasi {#installation}

Gunakan perintah berikut untuk memasang versi dompet Fortmatic:

```bash
$ npm i --save fortmatic@latest
```

## Contoh {#example}
Berikut ini contoh aplikasi menggunakan Fortmatic:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
