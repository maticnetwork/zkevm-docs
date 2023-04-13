---
id: getting-started
title: Erste Schritte mit Matic.js
sidebar_label: Instantiating Matic.js
description: "Verwende Matic.js, um mit der Polygon PoS-Chain zu interagieren."
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

Um loszulegen, lies die aktuelle [Matic.js-Dokumentation](/docs/develop/ethereum-polygon/matic-js/get-started).

## Zusammenfassung {#quick-summary}

Das matic.js SDK bringt dir die gesamte Rechenleistung von Polygon. Mit benutzerdefinierten Funktionen, die Genehmigungen, Einzahlungen und Auszahlungen ohne großen Aufwand ermöglichen. Wir haben es entwickelt, damit du den größtmöglichen Nutzen aus unserer Plattform ziehen kannst.

## Installation {#installation}
Der erste Schritt, um Polygon über unser SDK bestmöglich zu nutzen, ist eine NPM-Installation. Diese findest du [hier](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Verwendung {#usage}
Um auf das SDK zuzugreifen, importiere es in deine App mit
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Die Anbieter können RPC oder web3-basierte Anbieter wie MetaMask Provider, HDWalletProvider etc. sein, basierend auf Anforderung.

Weitere Informationen findest du in der [Matic.js-Dokumentation über PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

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
