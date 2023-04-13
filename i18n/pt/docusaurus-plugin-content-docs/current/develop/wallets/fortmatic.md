---
id: fortmatic
title: Fortmatic
description: Use o SDK Formático para integrar o dApp com o Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

O SDK do Fortmatic permite integrar facilmente o dApp com o blockchain do Ethereum, se já tem um dApp integrado ao Web3 ou está a partir do zero. O Fortmatic oferece uma experiência suave e deliciosa para você e para seus usuários de aplicativos descentralizados.

## Instalação {#installation}

Use o seguinte comando para instalar a versão mais recente da carteira do Fortmatic:

```bash
$ npm i --save fortmatic@latest
```

## Exemplo {#example}
Aqui está um exemplo de aplicação usando o Fortmatic:

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
