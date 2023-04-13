---
id: installation
title: インストール
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Matic.jsおよびEthereumライブラリをインストールします。
---

maticjsには2つのパートがあります -

1. メインライブラリ
2. Ethereumライブラリ

### メインライブラリ {#main-library}

メインライブラリはコアロジックを持ち、異なるAPIを提供します。ユーザーは、ほとんどこのライブラリとやり取りします。

```
npm i @maticnetwork/maticjs
```

### Ethereumライブラリ {#ethereum-library}

Ethereumライブラリでは、好きなetherライブラリを使用することができます。プラグインを使用してmaticjsに挿入します。

matic.jsは2つの人気のあるライブラリをサポートします -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ether](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### Ether {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
