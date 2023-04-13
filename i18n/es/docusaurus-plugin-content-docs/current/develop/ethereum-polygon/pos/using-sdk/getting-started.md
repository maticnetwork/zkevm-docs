---
id: getting-started
title: Cómo comenzar con Matic.js
sidebar_label: Instantiating Matic.js
description: "Usa Matic.js para interactuar con la cadena de PoS de Polygon."
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

Para empezar, consulta la última [documentación de Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started).

## Resumen {#quick-summary}

El kit de desarrollo de software (SDK) de Matic.js toma todo el poder de procesamiento de Polygon y lo pone en tus manos. Con funciones personalizadas que permiten hacer aprobaciones, depósitos y retiros, todo sin demasiada estrategia. Diseñamos esto para asegurarnos de que recibas valor de nuestra plataforma de forma instantánea.

## Instalación {#installation}
El primer paso para usar el increíble poder de Polygon a través de nuestro SDK es instalarlo mediante npm. Más información [aquí](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Uso {#usage}
Para acceder al SDK, impórtalo en tu aplicación usando
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Los proveedores pueden ser las URL de RPC o proveedores basados en web3 como el proveedor de MetaMask , HDWalletProvider, etc.

Para más información, consulta la [documentación de Matic.js sobre las pruebas de participación (PoS)](https://maticnetwork.github.io/matic.js/docs/pos/).

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
