---
id: installation
title: Instalasi
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Menginstal pustaka Matic.js dan Ethereum.
---

maticjs memiliki dua bagian -

1. Pustaka utama
2. Pustaka Ethereum

### Pustaka utama {#main-library}

Pustaka utama memiliki logika inti dan menyediakan API yang berbeda. Pengguna berinteraksi kebanyakan dengan pustaka ini.

```
npm i @maticnetwork/maticjs
```

### Pustaka Ethereum {#ethereum-library}

Pustaka Ethereum memungkinkan kita menggunakan pustaka ether favorit apa pun. Ini disuntikkan ke maticjs menggunakan plugin.

matic.js mendukung dua pustaka populer -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### Ethers {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
