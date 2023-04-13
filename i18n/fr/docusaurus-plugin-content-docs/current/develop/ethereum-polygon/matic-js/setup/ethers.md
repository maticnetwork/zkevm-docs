---
id: ethers
title: 'Configuration des Ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Installez et configurez ethers.js'
---

# Ether.js {#ether-js}

La bibliothèque [ethers.js](https://docs.ethers.io/) vise à être une bibliothèque complète et compacte pour interagir avec la Blockchain Ethereum et son écosystème.

## Configuration d'ether.js {#setup-ether-js}

la prise en charge d'ether.js est disponible via un paquet séparé en tant que plugin pour matic.js.

### Installation {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### configuration {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Voyons un exemple de création de `POSClient` en utilisant des éthers -

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

## Exemples {#examples}

Les exemples de différents cas sont disponibles dans le [répertoire de plugins ethers](https://github.com/maticnetwork/maticjs-ethers).
