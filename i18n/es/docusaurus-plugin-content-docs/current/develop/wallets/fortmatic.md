---
id: fortmatic
title: Fortmatic
description: Utiliza el SDK de Formatic para integrar tu dApp con Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK te permite integrar fácilmente tu dApp con la cadena de bloques de Ethereum, ya sea que ya tengas una dApp integrada con Web3 o estás empezando desde cero. Fortmatic ofrece una experiencia suave y encantadora tanto para usted como para los usuarios de la aplicación descentralizados.

## Instalación {#installation}

Utiliza el siguiente comando para instalar la última versión de la billetera de Fortmatic:

```bash
$ npm i --save fortmatic@latest
```

## Ejemplo {#example}
Aquí hay un ejemplo de aplicación que utiliza Fortmatic:

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
