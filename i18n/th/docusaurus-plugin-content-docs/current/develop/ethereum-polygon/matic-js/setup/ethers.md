---
id: ethers
title: 'การตั้งค่า Ether'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'ติดตั้งและตั้งค่า ethers.js'
---

# Ether.js {#ether-js}

ไลบรารี [ethers.js](https://docs.ethers.io/) มีจุดมุ่งหมายเพื่อเป็นไลบรารีที่สมบูรณ์ในขนาดเล็กสำหรับการโต้ตอบกับบล็อกเชน Ethereum และในระบบนิเวศ

## ตั้งค่า ether.js {#setup-ether-js}

มีการสนับสนุน ether.js ผ่านทางแพ็คเกจต่างหากโดยเป็นปลั๊กอินสำหรับ matic.js

### การติดตั้ง {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### การตั้งค่า {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

เราจะมาดูตัวอย่างการสร้าง `POSClient` โดยใช้ Ether -

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

## ตัวอย่าง {#examples}

ตัวอย่างกรณีต่างๆ มีอยู่บน[พื้นที่เก็บปลั๊กอิน Ether](https://github.com/maticnetwork/maticjs-ethers)
