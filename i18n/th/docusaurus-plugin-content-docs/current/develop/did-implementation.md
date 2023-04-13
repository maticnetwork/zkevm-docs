---
id: did-implementation
title: การนำ Polygon DID ไปใช้งาน
sidebar_label: Identity
description: เรียนรู้เกี่ยวกับการนำ DID ไปใช้งานบน Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

นี่คือคู่มือการเริ่มทำงานสำหรับผู้ใช้ที่ต้องการใช้แพ็คเกจการนำไปใช้งานที่เผยแพร่โดยทีมงาน Polygon เพื่อสร้างและเผยแพร่ Polygon DID บน Polygon Ledger

การนำเมธอดของ Polygon DID ไปใช้งานประกอบด้วย 3 แพ็คเกจ ได้แก่ polygon-did-registrar, polygon-did-resolver และ polygon-did-registry-contractผู้ใช้ที่ต้องการรวมการทำงานเพื่อลงทะเบียนหรืออ่าน DID บนหรือจากเครือข่าย Polygon สามารถใช้คู่มือต่อไปนี้ได้

DID คือตัวระบุไม่ซ้ำกันที่สร้างขึ้นโดยไม่มีตัวกลางใช้ DID ในบริบทของข้อมูลประจำตัวที่ยืนยันตัวตนได้เพื่อการลงนามเอกสาร จึงช่วยอำนวยความสะดวกให้แก่ผู้ใช้ในการพิสูจน์ความเป็นเจ้าของเอกสาร เมื่อมีความจำเป็น

## เมธอดของ Polygon DID {#polygon-did-method}

การกำหนดเมธอดของ Polygon DID เป็นไปตามข้อมูลจำเพาะและมาตรฐานของ DID-CoreDID URI ประกอบด้วยส่วนประกอบสามส่วนที่คั่นด้วยเครื่องหมายทวิภาค ได้แก่ แบบแผน ตามด้วยชื่อเมธอด และปิดท้ายด้วยตัวระบุเฉพาะเมธอดสำหรับ Polygon ดูเหมือนว่า

```
did:polygon:<Ethereum address>
```

นี่คือโครงการ`did`คือ ชื่อวิธีการคือ`polygon`และตัวระบุแบบเจาะจงคือที่อยู่ ethereum

## การนำ Polygon DID ไปใช้งาน {#polygon-did-implementation}

การนำ Polygon DID มาใช้งานสามารถทำได้โดยใช้สองแพ็คเกจ โดยผู้ใช้สามารถนำเข้าไลบรารี npm ที่เกี่ยวข้องและใช้เพื่อรวมระเบียบวิธีของ Polygon DID เข้ามาในแอปพลิเคชันที่เกี่ยวข้องได้รายละเอียดสำหรับการนำไปใช้งานแสดงอยู่ในหัวข้อถัดไป

ต้องเริ่มต้นด้วยการสร้าง DID ก่อนการสร้างในกรณีของ Polygon DID คือการรวมสองขั้นตอนเข้าด้วยกัน ขั้นตอนแรก ผู้ใช้จะต้องสร้าง DID URI สำหรับตัวเอง และขั้นตอนถัดไป ลงทะเบียนบน Polygon Ledger

### สร้าง DID {#create-did}

ในโครงการของคุณเพื่อสร้าง Polygon ได้ URI สิ่งแรกที่ต้องติดตั้ง:

```
npm i @ayanworks/polygon-did-registrar --save
```

เมื่อการติดตั้งเสร็จสิ้นแล้ว ผู้ใช้สามารถใช้ได้ตามนี้:

```
import { createDID } from "polygon-did-registrar";
```

`createdDID`ฟังก์ชั่นช่วยให้ผู้ใช้สร้าง URI ได้ในขณะที่สร้าง DID สามารถมีได้สองสถานการณ์

  1. ผู้ใช้มีวอลเล็ตอยู่แล้วและต้องการสร้าง DID โดยสอดคล้องกับวอลเล็ตเดียวกัน

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. หากผู้ใช้ไม่มีกระเป๋าสตางค์ที่มีอยู่และต้องการสร้างหนึ่งผู้ใช้สามารถใช้งานได้:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

พารามิเตอร์เครือข่ายในทั้งสองกรณีหมายถึงว่าผู้ใช้ต้องการสร้างตัวประมวลผลบน Polygon Tesnet หรือ Polygon Manet

อินพุตตัวอย่าง

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

หลังจากสร้างขึ้นมา คุณจะมี UI ที่สร้างขึ้น

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### ตัวลงทะเบียนทำ {#register-did}

เพื่อลงทะเบียนยูริ ที่ทำ และเอกสารที่เกี่ยวกับไลต์บนเลเยอร์ ผู้ใช้จำเป็นต้องใช้`polygon-did-registrar`ตามต่อไปนี้:

```js
import { registerDID } from "polygon-did-registrar";
```

เพื่อเป็นการดำเนินการเบื้องต้นในการลงทะเบียน ผู้ใช้ต้องตรวจสอบให้แน่ใจว่าคอร์โรนสำหรับการจ่ายผ่านกระเป๋าสตางค์ ไปยัง DENS มียอดคงเหลือของโทเค็นที่จำเป็นพร้อมใช้งานเมื่อผู้ใช้มีความสมดุลของโทเค็นในกระเป๋าสตางค์ จึงสามารถสร้างสายไปยังฟังก์ชันการใช้งานแบบลงทะเบียนตามที่แสดงด้านล่างนี้:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

พารามิเตอร์`did`และ`privateKey`เป็นตัวบังคับ ในขณะที่ตัวกำหนดเพื่อป้อนและ`url`ข้อความ`contractAddress`หากผู้ใช้ไม่ได้ระบุสองพารามิเตอร์หลัง ไลบรารีจะเลือกการกำหนดค่าเริ่มต้นของเครือข่ายจาก DID URI

หากพารามิเตอร์ทั้งหมดตรงกับข้อกำหนดและทุกอย่างถูกกำหนดไว้ตามคำสั่งที่ถูกต้อง ฟังก์ชัน จึงจะส่ง`registerDID`ค่า hash ของผิดพลาด ที่เกี่ยวข้องจะส่งคืนความผิดพลาดอีกอย่าง

และด้วยสิ่งนี้ คุณได้เสร็จสิ้นงานในการลงทะเบียนบนเครือข่าย Polygon แล้ว

## แยกวิเคราะห์ DID {#resolve-did}

เพื่อเริ่ม, ติดตั้งไลบรารีต่อไปนี้:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

เพื่ออ่านเอกสาร DID ที่ลงทะเบียนบน Ledger ก่อนอื่น ผู้ใช้ใดๆ ที่มี DID Polygon URI สามารถนำเข้าในโปรเจกต์ของตนได้

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

หลังจากนำเข้าแพกเกจแล้ว ก็จะเรียกเก็บเอกสารที่ทำได้โดยใช้:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

ซึ่ง`didResolutionResult`ออบเจ็กต์มีดังนี้:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

ควรสังเกตว่าค่าแก๊สจะไม่ถูกส่งต่อโดยผู้ใช้ ในขณะที่พยายามแยกวิเคราะห์ DID

## อัปเดตเอกสาร DID {#update-did-document}

เพื่อเตรียมโครงการด้วยความสามารถในการอัปเดตเอกสาร ที่ทำมา ผู้ใช้จำเป็นต้องใช้`polygon-did-registrar`ตามต่อไปนี้:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

ต่อไปเรียกฟังก์ชั่น:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

ควรตั้งไว้เพื่ออัปเดตเอกสาร ที่ทำมา มีเพียงเจ้าของที่สามารถส่งคำขอได้คีย์ส่วนตัวในที่นี้ควรมีโทเค็น Matic ที่สอดคล้องกันด้วย

หากผู้ใช้ไม่ได้ให้การกำหนดค่าที่มี `url` และ `contractAddress` ไลบรารีก็จะเลือกการกำหนดค่าเริ่มต้นของเครือข่ายจาก DID URI

## ลบเอกสาร DID {#delete-did-document}

ด้วย Polygon ได้ดำเนินการโดยผู้ใช้ จึงสามารถเพิกถอนเอกสารที่ทำจากบัญชีได้ผู้ใช้จำเป็นต้องใช้ก่อนที่จะใช้`polygon-did-registrar`ตามต่อไปนี้:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

จากนั้นใช้

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

สำหรับพารามิเตอร์ต่างๆ ขอให้สังเกตว่า `url` และ `contractAddress` เป็นพารามิเตอร์ที่จะระบุหรือไม่ก็ได้ ซึ่งหากผู้ใช้ไม่ได้ระบุ ฟังก์ชันก็จะเลือกการกำหนดค่าเริ่มต้นตาม DID URI

คีย์ส่วนตัวจะต้องมีโทเค็น Matic ที่จำเป็นตามการกำหนดค่าของ DID มิฉะนั้น ธุรกรรมจะล้มเหลว

## การมีส่วนสนับสนุนต่อพื้นที่เก็บข้อมูล {#contributing-to-the-repository}

ใช้ขั้นตอนการร้องขอ fork, branch และ pull แบบมาตรฐานเพื่อเสนอการเปลี่ยนแปลงต่อพื้นที่เก็บข้อมูลโปรดสร้างชื่อสาขาที่ให้ข้อมูลโดยรวมถึงปัญหาหรือหมายเลขบั๊ก

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
