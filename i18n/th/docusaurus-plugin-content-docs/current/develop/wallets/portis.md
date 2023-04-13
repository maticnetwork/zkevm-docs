---
id: portis
title: Portis
description: วอลเล็ตบนเว็บที่สร้างขึ้นโดยคำนึงถึงการเริ่มต้นใช้งานของผู้ใช้ที่ง่ายดาย
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis เป็นวอลเล็ตบนเว็บที่สร้างขึ้นโดยคำนึงการใช้งานง่ายสำหรับผู้ใช้โดยมาพร้อมกับ Javascript SDK ที่รวมเข้ากับ DApp และสร้างประสบการณ์การใช้วอลเล็ตน้อยลงสำหรับผู้ใช้นอกจากนี้ ก็จะจัดการการตั้งค่ากระเป๋าสตางค์ ธุรกรรม และค่าธรรมเนียมของแก๊ส

มีความเหมือนกับ Metamask ตรงที่ไม่เก็บรักษาคีย์ส่วนตัว ผู้ใช้ควบคุมคีย์ของตนเอง Portis เพียงแค่จัดเก็บข้อมูลให้ปลอดภัยเท่านั้นแต่แตกต่างจาก Metamask ตรงที่รวมเข้ากับแอปพลิเคชันไม่ใช่ในเบราว์เซอร์ผู้ใช้มีคีย์ที่เกี่ยวข้องกับ ID ล็อกอินและรหัสผ่าน

**ประเภท**: ไม่เก็บรักษาคีย์ส่วนตัว/HD <br/>
**ที่เก็บคีย์ส่วนตัว**: เข้ารหัสและจัดเก็บบนเซิร์ฟเวอร์ Portis<br/>**การสื่อสารกับ Ethereum Ledger**: ที่กำหนดโดยผู้พัฒนา<br/>**การเข้ารหัสคีย์ส่วนตัว**: Mnemonic<br/>

## ตั้งเว็บ3 {#set-up-web3}

ติดตั้งพอร์ตไอต์ใน dApp:

```js
npm install --save @portis/web3
```

ตอนนี้ ลงทะเบียน dApp ของคุณกับ Portis เพื่อรับ dApp ID โดยใช้[แดชบอร์ด](https://dashboard.portis.io/) Portis

นำเข้า`portis`และ`web3`วัตถุ

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

ตัวสร้างของ Portis ใช้อาร์กิวเมนต์แรกเป็น dApp ID และอาร์กิวเมนต์ที่สองเป็นเครือข่ายที่คุณต้องการเชื่อมต่ออาจเป็นสตริงหรืออ็อบเจ็กต์ก็ได้

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## ตั้งค่าบัญชีผู้ใช้ {#set-up-account}

หากการติดตั้งและการสร้างอินสแตนซ์ของ web3 สำเร็จ โค้ดต่อไปนี้ควรส่งคืนบัญชีที่เชื่อมต่อสำเร็จ:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## สัญญาต่อต้านการดำเนินการ {#instantiating-contracts}

นี่คือวิธีที่เราควรติดตั้งสัญญา:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## ฟังก์ชันการเรียก {#calling-functions}

### `call()`ฟังก์ชั่นการเรียกComment {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### `send()`ฟังก์ชั่นการเรียกComment {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
