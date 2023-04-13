---
id: ethers
title: 'Configuración de Ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Instala y configura ethers.js'
---

# Ether.js {#ether-js}

La biblioteca [ethers.js](https://docs.ethers.io/) busca ser una biblioteca completa y compacta para interactuar con la cadena de bloques de Ethereum y su ecosistema.

## Configuración de ether.js {#setup-ether-js}

El soporte de ether.js está disponible por medio de un paquete separado como complemento para matic.js.

### Instalación {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### Configuración {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Veamos un ejemplo de creación de `POSClient` utilizando ethers:

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## Ejemplos {#examples}

Los ejemplos para diferentes casos están disponibles en el [repositorio de complementos de ethers](https://github.com/maticnetwork/maticjs-ethers).
