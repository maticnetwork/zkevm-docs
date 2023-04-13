---
id: getting-started
title: เริ่มต้นกับ Matic.js
sidebar_label: Instantiating Matic.js
description: "ใช้ Matic.js เพื่อโต้ตอบกับเชน Polygon PoS"
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ในการเริ่มต้น ให้ตรวจดู[เอกสาร Matic.js ล่าสุด](/docs/develop/ethereum-polygon/matic-js/get-started)

## สรุปสั้นๆ {#quick-summary}

matic.js SDK ใช้พลังการประมวลผลทั้งหมดของ Polygon และวางไว้ที่ปลายนิ้วของคุณด้วยฟังก์ชันแบบกำหนดเองที่ช่วยให้ทำได้ทุกอย่าง ตั้งแต่การอนุมัติ ฝาก และถอน โดยไม่ต้องทำด้วยตัวเองมากนักเหตุผลที่เราสร้างสิ่งนี้ขึ้นมาคือเพื่อให้แน่ใจว่าคุณจะได้รับค่าทันทีจากแพลตฟอร์มของเรา

## การติดตั้ง {#installation}
ขั้นตอนแรกในการใช้พลังอันยอดเยี่ยมของ Polygon ผ่าน SDK ของเรา คือการติดตั้ง NPM ค้นหาได้[ที่นี่](https://www.npmjs.com/package/@maticnetwork/maticjs)

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## การใช้งาน {#usage}
ในการเข้าถึง SDK ให้นำเข้าในแอปพลิเคชันของคุณโดยใช้
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

ผู้ให้บริการสามารถเป็น URL ของ RPC หรือผู้ให้บริการบนเว็บ 3 เช่น ผู้ให้บริการ MetaMask ผู้ให้บริการ HDWalletWeletให้บริการ ฯลฯ ตามต้องการ

ดูข้อมูลเพิ่มเติมได้ที่[เอกสาร Matic.js บน PoS](https://maticnetwork.github.io/matic.js/docs/pos/)

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});
```
