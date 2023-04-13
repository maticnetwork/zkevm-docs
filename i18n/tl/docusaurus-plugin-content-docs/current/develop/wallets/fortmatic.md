---
id: fortmatic
title: Fortmatic
description: Gamitin ang Formatic SDK para isama ang iyong dApp sa Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Pinapayagan ka ng Fortmatic SDK na madaling isama ang iyong dApp sa Ethereum blockchain, mayroon ka nang dApp na isinama sa Web3 o nagsisimula sa simula. Nagbibigay ang Fortmatic ng isang makinis at kagiliw-giliw na karanasan para sa parehong ikaw at sa iyong desentralisadong mga gumagamit ng application.

## Pag-install {#installation}

Gamitin ang sumusunod na command para i-install ang wallet ng Fortmatic pinakabagong bersyon:

```bash
$ npm i --save fortmatic@latest
```

## Halimbawa {#example}
Narito ang isang halimbawa ng application gamit ang Fortmatic:

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
