---
id: getting-started
title: Pagsisimula sa Matic.js
sidebar_label: Instantiating Matic.js
description: "Gamitin ang Matic.js upang makipag-interaksyon sa Polygon PoS chain."
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

Upang makapagsimula, tingnan ang pinakabagong [dokumentasyon ng Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started).

## Mabilis na Buod {#quick-summary}

Kinukuha ng matic.js SDK ang lahat ng computing power ng Polygon at nang magamit mo. Sa mga custom-made na function na nagbibigay-daan para sa pag-apruba, pagdeposito at pag-withdraw, lahat nang hindi gumagawa ng labis na footwork. Binuo namin ito para matiyak na makakakuha ka ng agarang value mula sa aming platform.

## Pag-install {#installation}
Ang unang hakbang para mapakinabangan ang galing ng Polygon gamit ang SDK ay sa pamamagitan ng pag-install ng NPM nito. Hanapin [rito](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Paggamit {#usage}
Upang ma-access ang sdk i-import ito sa application mo gamit
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Maaaring maging mga RPC URL ng mga provider o web3-based provider tulad ng MetaMask provider, HDWalletProvider at iba pa batay sa kinakailangan.

Para pos impormasyon, mangyaring magkaroon ng tingnan ang d[okumentasyon ng Matic.js sa PoS.](https://maticnetwork.github.io/matic.js/docs/pos/)

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
