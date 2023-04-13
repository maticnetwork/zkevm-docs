---
id: ethers
title: 'Pag-setup ng ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'I-install at i-set up ang ethers.js'
---

# Ether.js {#ether-js}

Nilalayon ng [ethers.js](https://docs.ethers.io/) library na maging isang kumpleto at siksik na library para sa pakikipag-interaksyon sa Ethereum Blockchain at sa ecosystem nito.

## I-setup ang ether.js {#setup-ether-js}

Magagamit ang suporta ng ether.js sa pamamagitan ng hiwalay na package bilang plugin para sa matic.js.

### Pag-install {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### Pag-setup {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Tingnan natin ang isang halimbawa ng paggawa ng `POSClient` gamit ang ethers -

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

## Mga halimbawa {#examples}

Ang mga halimbawa para sa iba't ibang kaso ay available sa [ethers plugin repo](https://github.com/maticnetwork/maticjs-ethers)
