---
id: ethers
title: 'Ethers ayarları'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Ethers.js kurma ve ayarlarını yapma'
---

# Ether.js {#ether-js}

[Ethers.js](https://docs.ethers.io/) kütüphanesi Ethereum Blok Zinciri ve ekosistemi ile etkileşim kurmak için eksiksiz ve kompakt bir kütüphane olmayı amaçlar.

## Ether.js ayarları {#setup-ether-js}

Matic.js için eklenti olarak ayrı paket üzerinden ether.js desteğine ulaşılabilir.

### Kurulum {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### ayarlar {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Ethers kullanarak bir `POSClient` oluşturma örneğine bakalım -

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

## Örnekler {#examples}

Farklı durumlar için örnekler [ethers eklenti havuzunda](https://github.com/maticnetwork/maticjs-ethers) bulunabilir.
