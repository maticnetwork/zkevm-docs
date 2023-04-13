---
id: api-architecture
title: สถาปัตยกรรม API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: Read API และ Write API รวมทั้งการตั้งค่าธุรกรรม
---

ไลบรารีเป็นไปตามสถาปัตยกรรม API ทั่วไปทั้งหมด และแบ่ง API ออกได้เป็นสองประเภท ได้แก่

1. Read API
2. Write API

## Read API {#read-api}

Read API ไม่ได้เผยแพร่สิ่งใดๆ บนบล็อกเชน ดังนั้นจึงไม่ใช้ค่าแก๊สเลยตัวอย่าง Read API ได้แก่ `getBalance`, `isWithdrawExited` ฯลฯ

เราจะมาดูตัวอย่างของ Read API -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

Read API นั้นเรียบง่ายมาก และคืนค่าผลลัพธ์โดยตรง

## Write API {#write-api}

Write API เผยแพร่ข้อมูลบางอย่างบนบล็อกเชน ดังนั้นจึงใช้ค่าแก๊สตัวอย่าง Write API ได้แก่ `approve`, `deposit` ฯลฯ

เมื่อคุณเรียก Write API คุณต้องใช้ข้อมูลสองรายการจากผลลัพธ์

1. TransactionHash
2. TransactionReceipt

เราจะมาดูตัวอย่าง Write API และรับ transactionhash และ receipt -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

## ตัวเลือกธุรกรรม {#transaction-option}

มีตัวเลือกที่กำหนดค่าได้บางตัวที่ใช้ได้สำหรับ API ทั้งหมดโดยสามารถส่งการกำหนดค่าเหล่านี้ได้ในพารามิเตอร์

การกำหนดค่าที่ใช้ได้ ได้แก่

- from?: string | number - ที่อยู่ที่ควรทำธุรกรรมจากที่อยู่นี้
- to?: string - ที่อยู่ที่ควรทำธุรกรรมถึงที่อยู่นี้
- value?: number | string | BN - มูลค่าที่โอนสำหรับธุรกรรมในหน่วย wei
- gasLimit?: number | string - ค่าแก๊สสูงสุดที่จัดให้สำหรับธุรกรรม (ค่าแก๊สสูงสุด)
- gasPrice?: number | string | BN - ราคาแก๊สในหน่วย wei เพื่อใช้สำหรับธุรกรรม
- data?: string - โค้ดไบต์ของสัญญา
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - เมื่อตั้งค่าเป็น true จะส่งคืนอ็อบเจ็กต์ธุรกรรม ซึ่งสามารถใช้เพื่อส่งธุรกรรมด้วยตนเอง

เราจะมาดูตัวอย่างด้วยการกำหนดค่า gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
