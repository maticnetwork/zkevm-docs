---
id: set-proof-api
title: ตั้งค่า ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: กำหนดค่า API หลักฐาน
---

ฟังก์ชั่นบางฟังก์ชันใน Matic.js จะจ่ายด้วยศัพท์ที่เร็วกว่าตามชื่อแนะนำ พวกเขาจะสร้างผลได้เร็วกว่าเมื่อเทียบกับคู่ต่อที่ไม่ใช่แบบเร็วกว่านี้พวกเขาทำเช่นนั้นโดยใช้ Proof Genation API เป็นแบ็คเอนต์ซึ่งสามารถเป็นเจ้าภาพได้โดยทุกคนได้

[เครือข่าย https://apis /matic.network](https://apis/matic.network) คือ API Generation ที่มีอยู่ต่อสาธารณะเป็นเจ้าภาพโดย Polygon

`setProofApi`วิธีนี้สามารถช่วยในการตั้งค่า URL ของ Proof Generation ให้ยกตัวอย่างของ Matic.js

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

การใช้บริการ Proof Generation จะนำเสนอประสิทธิภาพที่ดีขึ้นเมื่อเทียบกับบริการ Proof Generation ที่ได้รับการรับรองจากสาธารณะแล้ว

โปรดทำตามคำแนะนำการติดตั้งที่ให้ไว้ในไฟล์ README.md ของ https://github.com/maticnetwork/proover-generation เพื่อจัดการกับบริการด้วยตนเอง

เช่น หากคุณปรับใช้ API หลักฐานและ URL หลักคือ `https://abc.com/` คุณจะต้องตั้งค่า URL หลักใน `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
เราแนะนำให้ใช้ API เร็วกว่านี้เพราะ API บางอย่าง โดยเฉพาะอย่างยิ่งที่มีการสร้างหลักฐานให้ทำการเรียก RPC จำนวนมากและอาจช้ามากกับ Public RPC
:::
