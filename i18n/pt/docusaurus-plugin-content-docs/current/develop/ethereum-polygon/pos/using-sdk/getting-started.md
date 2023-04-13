---
id: getting-started
title: Introdução ao Matic.js
sidebar_label: Instantiating Matic.js
description: "Usar Matic.js para interagir com a chain Polygon PoS."
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

Para começar, consulte a [documentação Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started) mais recente.

## Resumo Rápido {#quick-summary}

O SDK matic.js junta todo o poder da Polygon e coloca-o na ponta dos seus dedos. Com funções personalizadas que permitem fazer aprovações, depósitos e retirada, sem ter de se mexer muito. O motivo deste nosso desenvolvimento foi garantir que tira proveito imediato da nossa plataforma.

## Instalação {#installation}
A primeira etapa para usar o poder incrível da Polygon através do SDK é fazer a sua instalação NPM [aqui](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Utilização {#usage}
Para aceder ao SDK, faça a sua importação na aplicação usando
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Os provedores podem ser URLs de RPC ou provedores baseados na web, como provedor MetaMask, HDWalletProvider etc. com base na exigência.

Para mais informações, consulte a [documentação Matic.js sobre o PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

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
