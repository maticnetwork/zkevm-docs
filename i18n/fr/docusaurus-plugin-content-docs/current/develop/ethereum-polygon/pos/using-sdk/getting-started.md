---
id: getting-started
title: Démarrer avec Matic.js
sidebar_label: Instantiating Matic.js
description: "Utilisez Matic.js pour interagir avec la chaîne PoS du Polygone."
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

Pour commencer, consultez la dernière [documentation de Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started)

## Bref Résumé {#quick-summary}

Le SDK matic.js prend toute la puissance informatique de Polygone et la place au bout de vos doigts. Avec des fonctions personnalisées qui permettent l'approbation, le dépôt et les retraits, le tout sans trop d'efforts. Nous l'avons fait pour que vous puissiez profiter immédiatement des valeurs de notre plateforme.

## Installation {#installation}
La première étape pour utiliser la puissance impressionnante de Polygone via notre SDK consiste à effectuer une installation NPM de celui-ci. Trouvez [ici](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Utilisation {#usage}
Pour accéder au SDK, importez-le dans votre application en utilisant
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Les fournisseurs peuvent être des URL RPC ou des fournisseurs basés sur le web3 comme le fournisseur MetaMask, HDWalletProvider etc. basés sur les besoins.

Pour plus d'informations, veuillez consulter la [documentation de Matic.js sur les PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

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
