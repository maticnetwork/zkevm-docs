---
id: get-started
title: การเริ่มต้นทำงาน
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: เริ่มต้นทำงานกับ Matic.js
---

`@matic.js` เป็นไลบรารี javascript ซึ่งช่วยในการโต้ตอบกับส่วนประกอบต่างๆ ของเครือข่าย Matic

ในบทช่วยสอนการเริ่มต้นทำงานนี้ เราจะศึกษาวิธีการตั้งค่าและโต้ตอบกับบริดจ์ POS

## การติดตั้ง {#installation}

**ติดตั้งแพ็คเกจ maticjs ผ่านทาง npm:**

```bash
npm install @maticnetwork/maticjs
```

**ติดตั้งปลั๊กอิน web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## การตั้งค่า {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

ในโค้ดข้างต้น เราเริ่มต้น maticjs ด้วย `web3js` แต่คุณสามารถเริ่มต้นคล้ายๆ กันด้วย  [Ether](/docs/develop/ethereum-polygon/matic-js/setup/ethers) ได้เช่นกัน

## ไคลเอ็นต์ POS {#pos-client}

`POSClient` ช่วยเราในการโต้ตอบกับบริดจ์ POS

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

หลังจากที่เริ่มต้น `POSClient` แล้ว เราจะต้องเริ่มต้นโทเค็นประเภทที่จำเป็น เช่น `erc20`, `erc721` ฯลฯ

เราจะมาเริ่มต้น `erc20` -

### ERC20 {#erc20}

**สร้างโทเค็นย่อย ERC20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**สร้างโทเค็นหลัก ERC20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

เมื่อเริ่มต้น ERC20 แล้ว คุณสามารถเรียกเมธอดต่างๆ ที่มีอยู่ได้ เช่น `getBalance`, `approve`, `deposit` , `withdraw` ฯลฯ

เราจะมาดูตัวอย่าง API บางส่วน -

#### get balance {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approve {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


อย่างที่คุณเห็น maticjs ทำให้โต้ตอบกับบริดจ์ maticjs ได้ง่ายมากด้วย API ธรรมดา**เราจะมาเริ่มต้นด้วยการสร้างสิ่งที่น่าสนใจ**

### ลิงก์ที่มีประโยชน์ {#useful-links}

- [ตัวอย่าง](https://github.com/maticnetwork/matic.js/tree/master/examples)
