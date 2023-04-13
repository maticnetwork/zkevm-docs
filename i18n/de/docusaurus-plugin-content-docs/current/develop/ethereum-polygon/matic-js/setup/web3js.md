---
id: web3
title: 'Web3js Setup'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Installieren und einrichten von web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) ist eine Sammlung von Bibliotheken, die es dir ermöglicht, mit einem lokalen oder entfernten Ethereum-Knoten mit Hilfe von HTTP, IPC oder WebSocket zu kommunizieren.

## web3.js einrichten {#setup-web3-js}

Die Unterstützung von web3.js ist über ein separates Paket als Plugin für matic.js verfügbar.

### Installation {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### Setup {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Hier ist ein Beispiel für die Erstellung von `POSClient` mit web3 -

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

## Beispiele {#examples}

Die Beispiele für verschiedene Fälle sind in [web3 Plugin Repo](https://github.com/maticnetwork/maticjs-web3) verfügbar
