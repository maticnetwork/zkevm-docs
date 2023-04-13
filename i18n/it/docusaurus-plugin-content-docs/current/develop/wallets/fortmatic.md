---
id: fortmatic
title: Fortmatic
description: Usa Formatic SDK per integrare la tua dApp con Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK ti permette di integrare facilmente la tua dApp con la blockchain di Ethereum, sia che tu abbia già una dApp integrata con Web3 o che stia partendo da zero. Fortmatic offre un'esperienza piacevole sia per te che per i tuoi utenti decentralizzati delle applicazioni.

## Installazione {#installation}

Usa il seguente comando per installare il wallet Fortmatic:

```bash
$ npm i --save fortmatic@latest
```

## Esempio {#example}
Ecco un esempio di applicazione che utilizza Fortmatic:

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
