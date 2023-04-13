---
id: ethers
title: 'Pengaturan Ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Menginstal dan mengatur ethers.js'
---

# Ether.js {#ether-js}

Pustaka [ethers.js](https://docs.ethers.io/) bertujuan menjadi pustaka yang ringkas dan lengkap untuk berinteraksi dengan Blockchain Ethereum dan ekosistemnya.

## Mengatur ether.js {#setup-ether-js}

Dukungan ether.js tersedia melalui paket terpisah sebagai plugin untuk matic.js.

### Instalasi {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### setup {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Mari kita lihat satu contoh pembuatan `POSClient` menggunakan ethers -

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

## Contoh {#examples}

Contoh untuk kasus berbeda tersedia di [repo plugin ethers](https://github.com/maticnetwork/maticjs-ethers).
