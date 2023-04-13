---
id: web3
title: 'Configuration de Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Installez et configurez web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) est une collection de bibliothèques qui vous permet d'interagir avec un nœud ethereum local ou contrôlé à distance en utilisant HTTP, IPC websocket.

## Configuration de web3.js {#setup-web3-js}

la prise en charge de web3.js est disponible via un paquet séparé en tant que plugin pour matic.js.

### Installation {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### configuration {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Voyons un exemple de création de `POSClient` à l'aide de web3 -

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

## Exemples {#examples}

Les exemples pour différents cas sont disponibles dans le [répertoire de plugins web3](https://github.com/maticnetwork/maticjs-web3)
