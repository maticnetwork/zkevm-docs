---
id: getting-started
title: Muovere i primi passi con Matic.js
sidebar_label: Instantiating Matic.js
description: "Utilizza Matic.js per interagire con la catena Polygon PoS."
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

Per iniziare, consulta la più recente [documentazione Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started).

## Riepilogo rapido {#quick-summary}

L'SDK matic.js sfrutta tutta la potenza di calcolo di Polygon e la mette a portata di mano. Con funzioni personalizzate che consentono l'approvazione, il deposito e il prelievo, il tutto senza fare troppa fatica. Il motivo per cui abbiamo progettato questa soluzione è garantirti di ottenere un valore immediato dalla nostra piattaforma.

## Installazione {#installation}
Il primo passo per sfruttare l'impressionante potenza di Polygon attraverso il nostro SDK consiste nell'effettuare un'installazione NPM. La puoi trovare [qui](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Utilizzo {#usage}
Per accedere all'SDK, importalo nella tua applicazione usando
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

I provider possono essere URL RPC o provider web3 come MetaMask provider, HDWalletProvider ecc. in base alle requisiti.

Per ulteriori informazioni, consulta la [documentazione di Matic.js su PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

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
