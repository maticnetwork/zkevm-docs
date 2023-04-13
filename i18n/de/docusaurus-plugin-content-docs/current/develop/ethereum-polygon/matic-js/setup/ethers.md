---
id: ethers
title: 'Ethers Einrichtung'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Installieren und Einrichten von ethers.js'
---

# Ether.js {#ether-js}

Die Bibliothek [ethers.js](https://docs.ethers.io/) zielt darauf ab, eine vollständige Bibliothek für die Kommunikation mit der Ethereum-Blockchain und ihrem Ökosystem zu sein.

## Einrichtung ether.js {#setup-ether-js}

Die Unterstützung von ether.js ist über ein seperates Paket als Plugin für matic.js verfügbar.

### Installation {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### Setup {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Hier ist ein Beispiel für die Erstellung von `POSClient` mit Hilfe von ethers -

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

## Beispiele {#examples}

Die Beispiele für verschiedene Fälle sind auf dem [ethers Plugin Repo](https://github.com/maticnetwork/maticjs-ethers) verfügbar.
