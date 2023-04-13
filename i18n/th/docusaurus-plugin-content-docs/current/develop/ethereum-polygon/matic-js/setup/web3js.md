---
id: web3
title: 'การตั้งค่า Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'ติดตั้งและตั้งค่า web3.js'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) คือชุดไลบรารีที่ทำให้คุณสามารถโต้ตอบกับโหนด Ethereum ภายในหรือระยะไกลได้ โดยใช้ HTTP, IPC หรือ WebSocket

## ตั้งค่า web3.js {#setup-web3-js}

มีการสนับสนุน web3.js ผ่านทางแพ็คเกจต่างหากโดยเป็นปลั๊กอินสำหรับ matic.js

### การติดตั้ง {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### การตั้งค่า {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

เราจะมาดูตัวอย่างการสร้าง `POSClient` โดยใช้ web3 -

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

## ตัวอย่าง {#examples}

ตัวอย่างสำหรับกรณีที่แตกต่างกันมีอยู่ใน[พื้นที่จัดเก็บปลั๊กอินของ web3](https://github.com/maticnetwork/maticjs-web3)
