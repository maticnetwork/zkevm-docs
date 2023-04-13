---
id: installation
title: Kurulum
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Matic.js ve Ethereum kütüphanelerini kurun.
---

maticjs iki bölüme sahiptir -

1. Ana kütüphane
2. Ethereum kütüphanesi

### Ana kütüphane {#main-library}

Ana kütüphane temel mantığa sahiptir ve farklı API'ler sağlar. Kullanıcı çoğunlukla bu kütüphane ile etkileşim kurar.

```
npm i @maticnetwork/maticjs
```

### Ethereum kütüphanesi {#ethereum-library}

Ethereum kütüphanesi, istediğimiz ether kütüphanesini kullanmamıza imkân sağlar. Eklentiler kullanılarak maticjs'ye eklenir.

Matic.js iki popüler kütüphaneyi destekler -

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
