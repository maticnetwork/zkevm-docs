---
id: web3
title: 'Configuración de Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Instala y configura web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) es una colección de bibliotecas que permiten interactuar con un nodo local o remoto de Ethereum utilizando HTTP, IPC o WebSocket.

## Configuración de web3.js {#setup-web3-js}

El soporte de web3.js está disponible mediante un paquete separado como complemento para matic.js.

### Instalación {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### configuración {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Veamos un ejemplo de creación de `POSClient` usando web3 -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## Ejemplos {#examples}

Los ejemplos para diferentes casos están disponibles en [el repositorio del complemento web3](https://github.com/maticnetwork/maticjs-web3)
