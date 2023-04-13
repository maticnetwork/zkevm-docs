---
id: web3
title: 'Pag-setup ng Web3.js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'I-install at i-set up ang web3.js.'
---

# Web3.js {#web3-js}

Ang [web3.js](https://web3js.readthedocs.io/) ay isang koleksyon ng mga library na nagbibigay-daan sa iyong makipag-interaksyon sa isang lokal o remote na ethereum node gamit ang HTTP, IPC o WebSocket.

## I-setup ang web3.js {#setup-web3-js}

Magagamit ang suporta ng web3.js sa pamamagitan ng hiwalay na package bilang plugin para sa matic.js.

### Pag-install {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### Pag-setup {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Tingnan natin ang isang halimbawa ng paggawa ng `POSClient` gamit ang web3 -

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

## Mga halimbawa {#examples}

Ang mga halimbawa para sa iba't ibang kaso ay available sa [web3 plugin repo](https://github.com/maticnetwork/maticjs-web3)
