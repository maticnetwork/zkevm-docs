---
id: web3
title: 'Pengaturan Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Menginstal dan mengatur web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) adalah kumpulan pustaka yang memungkinkan Anda untuk berinteraksi dengan node ethereum lokal atau jarak jauh menggunakan HTTP, IPC, atau Websocket.

## Mengatur web3.js {#setup-web3-js}

Dukungan web3.js tersedia melalui paket terpisah sebagai plugin untuk matic.js.

### Instalasi {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### setup {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Mari kita lihat contoh pembuatan `POSClient` menggunakan web3 -

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

## Contoh {#examples}

Contoh kasus berbeda tersedia di [repo plugin web3](https://github.com/maticnetwork/maticjs-web3)
