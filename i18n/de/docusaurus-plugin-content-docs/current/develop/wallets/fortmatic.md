---
id: fortmatic
title: Fortmatic
description: Benutze Formatic SDK, um deine dApp mit Polygon zu integrieren.
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK ermöglicht es dir, deine dApp einfach in die Ethereum Blockchain zu integrieren, egal ob du bereits eine dApp in Web3 integriert hast oder von Grund auf ausgeht. Fortmatic bietet eine reibungslose und reizvolle Erfahrung für dich und deine dezentralen application

## Installation {#installation}

Mit dem folgenden Befehl kannst du die neueste Version von Fortmatic installieren:

```bash
$ npm i --save fortmatic@latest
```

## Beispiel {#example}
Hier ist ein Beispiel für die Anwendung mit Fortmatic:

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
