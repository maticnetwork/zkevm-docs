---
id: getting-started
title: Memulai dengan Matic.js
sidebar_label: Instantiating Matic.js
description: "Gunakan Matic.js untuk berinteraksi dengan rantai Polygon PoS."
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Untuk memulai, lihat [dokumentasi Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started) terbaru.

## Ringkasan Singkat {#quick-summary}

SDK matic.js memadukan semua keunggulan komputasi Polygon dan menempatkannya langsung dalam genggaman Anda. Dengan fungsi yang dapat dibuat khusus, Anda dapat melakukan proses persetujuan, penyetoran, dan penarikan, semuanya tanpa melakukan terlalu banyak pekerjaan. Alasan kami merancangnya seperti ini untuk memastikan Anda mendapatkan nilai instan dari platform kami.

## Instalasi {#installation}
Langkah pertama untuk menggunakan kekuatan mengagumkan Polygon melalui SDK kami adalah dengan menginstal NPM. Temukan [di sini](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Penggunaan {#usage}
Untuk mengakses SDK, impor di aplikasi Anda menggunakan
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Penyedia dapat berupa URL RPC atau penyedia berbasis web 3, seperti penyedia MetaMask, HDWalletProvider dll.

Untuk informasi lebih lanjut, lihat [dokumentasi Matic.js tentang PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});
```
