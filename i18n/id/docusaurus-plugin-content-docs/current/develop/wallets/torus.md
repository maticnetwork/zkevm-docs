---
id: torus
title: Torus
description: Torus adalah sistem manajemen kunci non-custodial untuk dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus adalah sistem manajemen kunci yang ramah pengguna dan secure, untuk aplikasi yang terdesentralisasi. Kami berfokus pada penyediaan gerbang pengguna arus utama ke ekosistem terdesentralisasi.

**Type**: Non-custodial / HD <br/>**Private Key Storage**: penyimpanan browser lokal User’s / Enkripsi dan disimpan dan disimpan di server<br/> **Komunikasi ke Ledger Ethereum**: Infura<br/>
**encoding: kunci privat**: Mnemonic / Social-Auth-login<br/>

Tergantung pada kebutuhan aplikasi Anda, Torus dapat diintegrasikan melalui Torus Wallet, atau dengan berinteraksi langsung dengan Jaringan Torus melalui CustomAuth. Untuk informasi lebih lanjut, kunjungi [dokumentasi Torus](https://docs.tor.us/).

## Integrasi Dompet Torus {#torus-wallet-integration}

Jika aplikasi Anda sudah kompatibel dengan MetaMask atau provider Web3 lainnya, mengintegrasikan Dompet Torus akan memberikan Anda provider untuk membungkus antarmuka Web3 yang sama. Anda dapat menginstal melalui paket npm. Untuk informasi lebih lanjut dan dalam, silakan kunjungi dokumentasi Torus resmi tentang [integrasi dompet](https://docs.tor.us/wallet/get-started).

### Instalasi {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Contoh {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## Integrasi CustomAuth {#customauth-integration}

Jika Anda ingin mengendalikan UX Anda sendiri, dari login ke setiap interaksi, maka Anda dapat menggunakan CustomAuth. Anda dapat mengintegrasikan melalui salah satu SDKs mereka tergantung pada platform yang sedang Anda bangun. Untuk informasi lebih lanjut, silakan kunjungi [integrasi Torus CustomAuth](https://docs.tor.us/customauth/get-started)
