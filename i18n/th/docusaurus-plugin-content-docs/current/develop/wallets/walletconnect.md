---
id: walletconnect
title: WalletConnect
description: โปรโตคอลแบบเปิดที่สร้างการสื่อสาร DApp-Wallet
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** คือโพรโทคอลเปิด - ไม่ใช่กระเป๋าสตางค์ - สร้างเพื่อสร้างลิงค์การสื่อสารระหว่าง dApps และวอลเลต์กระเป๋าสตางค์และโปรแกรมที่รองรับโพรโทคอลนี้จะเปิดใช้งานการเชื่อมต่อที่ปลอดภัยผ่านคีย์แบบแชร์ระหว่างผู้ใช้ทั้งสองเริ่มต้นการเชื่อมต่อเริ่มต้นโดย DApp ที่แสดงรหัส QR โดยใช้ WalletConnect URI มาตรฐาน และสร้างการเชื่อมต่อเมื่อแอปพลิเคชันวอลเล็ตอนุมัติคำขอเชื่อมต่อคำขอเพิ่มเติมเกี่ยวกับการโอนเงินจะได้รับการยืนยันในตัวแอปพลิเคชันวอลเล็ตเอง

## ตั้งเว็บ3 {#set-up-web3}

เพื่อตั้งค่า dApp ของคุณเพื่อเชื่อมต่อกับวอลเลต์ Polygon ของผู้ใช้ คุณสามารถใช้ผู้ให้บริการของ WalletConnect เพื่อเชื่อมต่อโดยตรงกับ Polygonติดตั้งสิ่งต่อไปนี้ใน DApp:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

ติดตั้ง`matic.js`สำหรับการรวมแบบ Polygon :

```bash
$ npm install @maticnetwork/maticjs
```

เพิ่มโค้ดต่อไปนี้ใน dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

ต่อไปตั้งค่าผู้ให้บริการ Polygon และ Ropsten ผ่านทางวัตถุ ของ WalletConnect :

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

เราสร้างอ็อบเจ็กต์ผู้ให้บริการสองรายการด้านบนเพื่อสร้างอินสแตนซ์อ็อบเจ็กต์ Web3 ของเราด้วย:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## สัญญาต่อต้านการดำเนินการ {#instantiating-contracts}

เมื่อเรามี**วัตถุ web3** ของเรา การเริ่มต้นการเริ่มต้นของสัญญาจะเกี่ยวกับขั้นตอนเดียวกันกับ MeamMaskตรวจสอบให้แน่ใจว่าคุณมีสัญญาและ**ที่อยู่****ของ ABI** อยู่แล้วด้วย

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## ฟังก์ชันการเรียก {#calling-functions}

:::info

คีย์ส่วนตัวจะยังคงอยู่ในกระเป๋าสตางค์ของผู้ใช้และ**แอพไม่สามารถเข้าถึงได้ไม่ว่าด้วยวิธีใดก็ตาม**

:::

เรามีฟังก์ชั่นสองประเภทใน Ethereum ขึ้นอยู่กับปฏิสัมพันธ์กับบล็อกเชนเราใช้ `call()` เมื่อเราอ่านข้อมูลและใช้ `send()` เมื่อเราเขียนข้อมูล

### การเรียกฟังก์ชัน `call()` {#functions}

ข้อมูลการอ่านไม่จำเป็นต้องใช้ลายเซ็นดังนั้นโค้ดจึงควรจะเป็นเช่นนี้:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### การเรียกฟังก์ชัน `send()` {#functions-1}

เนื่องจากการเขียนไปยังบล็อกเชนต้องใช้ลายเซ็นเราจึงส่งผู้ใช้บนกระเป๋าสตางค์ (ที่รองรับ WalletConnect ) เพื่อลงนามธุรกรรม

ซึ่งเกี่ยวกับสามขั้นตอน:
1. การสร้างธุรกรรม
2. การรับลายเซ็นในธุรกรรม
3. การส่งธุรกรรมที่ลงนามแล้ว

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

โค้ดด้านบนจะสร้างอ็อบเจ็กต์ของธุรกรรมซึ่งจะได้รับการส่งไปยังวอลเล็ตของผู้ใช้เพื่อลงนาม:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`ฟังก์ชั่นส่งข้อความไปยังผู้ใช้สำหรับลายเซ็น`sendSignedTransaction()`และส่งธุรกรรมที่ลงนาม(ส่งใบเสร็จรับเงินธุรกรรมสำหรับความสำเร็จ)
