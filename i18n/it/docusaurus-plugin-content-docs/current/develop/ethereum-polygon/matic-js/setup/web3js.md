---
id: web3
title: 'Configurazione di Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Installare e configurare web3js. '
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/)è una raccolta di librerie che consentono di interagire con un nodo ethereum locale o remoto utilizzando HTTP, IPC o WebSocket.

## Configurazione di web3.js {#setup-web3-js}

Il supporto a web3.js è disponibile tramite un pacchetto separato come plug-in per matic.js.

### Installazione {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### Configurazione {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Di seguito è riportato un esempio di creazione di `POSClient` usando web3:

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

## Esempi {#examples}

Gli esempi per i diversi casi sono disponibili nel [repository del plug-in web3](https://github.com/maticnetwork/maticjs-web3)
