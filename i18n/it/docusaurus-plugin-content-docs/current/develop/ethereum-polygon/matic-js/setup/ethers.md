---
id: ethers
title: 'Configurazione di ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Installare e configurare ethers.js'
---

# Ether.js {#ether-js}

La libreria [ethers.js](https://docs.ethers.io/) intende essere una libreria completa e compatta per interagire con la blockchain di Ethereum e il suo ecosistema.

## Configurare ether.js {#setup-ether-js}

Il supporto per ether.js è disponibile tramite un pacchetto separato come plug-in per matic.js.

### Installazione {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### Configurazione {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Di seguito è riportato un esempio di creazione di `POSClient` utilizzando ethers:

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

## Esempi {#examples}

Gli esempi per i diversi casi sono disponibili nel [repository del plug-in ethers](https://github.com/maticnetwork/maticjs-ethers).
