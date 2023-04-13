---
id: fortmatic
title: Fortmatic
description: Utilisez le SDK Formatic pour intégrer votre dApp avec Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK vous permet d'intégrer facilement votre dApp avec la blockchain Ethereum, que vous ayez déjà un dApp intégré à Web3 ou que vous démarriez à partir de zéro. Fortmatic fournit une expérience douce et délicieuse à la fois pour vous et vos utilisateurs d'applications décentralisés.

## Installation {#installation}

Utilisez la commande suivante pour installer la dernière version du portefeuille Fortmatic:

```bash
$ npm i --save fortmatic@latest
```

## Exemple {#example}
Voici un exemple d'application utilisant Fortmatic:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
