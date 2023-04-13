---
id: web3
title: 'Web3js kurulumu'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Web3.js''yi yükleyip kurun.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) HTTP, IPC veya WebSocket kullanarak yerel veya uzak bir ethereum düğümü ile etkileşim kurmanıza izin veren bir kütüphane koleksiyonudur.

## Web3.js'yi kurun {#setup-web3-js}

web3.js desteği ayrı bir pakette matic.js için bir eklenti olarak mevcuttur.

### Kurulum {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### ayarlar {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Web3 kullanarak bir `POSClient` oluşturma örneğine bakalım -

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

## Örnekler {#examples}

Farklı durumlar için örnekler [web3 eklenti havuzunda](https://github.com/maticnetwork/maticjs-web3) bulunabilir
