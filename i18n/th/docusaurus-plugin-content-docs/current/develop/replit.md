---
id: replit
title: ส่งสัญญาอัจฉริยะโดยใช้รีไฟต์
sidebar_label: Using Replit
description: เดอัพโหลดสัญญาแบบ Smart โดยใช้รีปิต IDE บน Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## ภาพรวม {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) เป็นแพลตฟอร์มการเขียนโค้ดที่ให้คุณเขียนโค้ดและโฮสต์แอปReplit รองรับ[ภาษาการเขียนโปรแกรม Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1) ดังนั้นจึงมีคุณสมบัติและฟังก์ชันการทำงานทั้งหมดสำหรับนักพัฒนา Web3 เพื่อสร้างและปรับใช้สัญญาอัจฉริยะ

บทความนี้นำคุณในการสร้างและปรับใช้สัญญาอัจฉริยะแบบแข็งกันบน Polygon โดยใช้[แม่แบบการ](https://replit.com/@replit/Solidity-starter-beta?v=1)พัฒนา[แบบ Repllit IDE](https://replit.com/signup) และ Repllit Sellit Beta (Starter Startter Startforlet)

## สิ่งที่คุณจะทำ {#what-you-will-do}

- สร้างบัญชี Replit
- สร้างสภาพแวดล้อม Repl
- กำลังอัพโหลดโครงการตัวอย่างที่บนเครือข่าย Maumbi ของ Polygon
- ตรวจสอบสัญญา
- เผยแพร่โปรเจกต์ของคุณไปยังโปรไฟล์ Replit ส่วนบุคคล

:::tip

ตัวอย่างเพิ่มเติมเกี่ยวกับ Solidity กับ Replit คุณสามารถอ่านบทความได้ <ins>**[เริ่มต้นด้วย](https://blog.replit.com/solidity)**</ins>เอกสารรีไฟต์หรือตรวจสอบการทำงาน <ins>**[Replate และติวเตอร์สัญญา Escrow](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>
:::

## ข้อกำหนดเบื้องต้น {#prerequisites}

คุณไม่จำเป็นต้องตั้งค่าสภาพแวดล้อมในท้องถิ่นเพื่อปรับใช้สัญญาอัจฉริยะแบบบูรณาการของคุณบน Polygon โดยใช้รีพิต

คุณต้องมีวอลเล็ต web3 บนเบราว์เซอร์เพื่อโต้ตอบกับ Polygon Mumbai Testnet และสัญญาที่ปรับใช้หากคุณใช้ MetaMask อยู่แล้ว ขอแนะนำให้สร้างบัญชีใหม่เพื่อทดสอบกับ Replitคุณสามารถทำได้จากเมนูบัญชี ซึ่งจะปรากฏขึ้น เมื่อคุณคลิกที่รูปประจำตัวบัญชีที่มุมขวาบนของอินเทอร์เฟซ MetaMask

คุณต้องตั้งค่าข้อกำหนดเบื้องต้นทั้งหมดต่อไปนี้เพื่อให้สามารถปรับใช้สัญญาอัจฉริยะ Solidity ของคุณบน Polgon:

1. [สร้างบัญชี Replit](https://replit.com/signup)
2. [ดาวน์โหลดวอลเล็ต Metamask](/docs/develop/metamask/hello)
3. [กำหนดค่า Polygon บน MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [รับโทเค็น Testnet](https://faucet.polygon.technology)

## การทำงานกับ Repl {#working-with-a-repl}

ทุก Repl ที่คุณสร้างคือสภาพแวดล้อมการพัฒนาและการทำงานจริงที่ใช้งานได้อย่างสมบูรณ์ทำตามขั้นตอนเพื่อสร้าง Solidity Starter Replit:

1. [เข้าสู่ระบบ](https://replit.com/login)หรือ[สร้างบัญชี](https://replit.com/signup)หลังจากสร้าง[บัญชี Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) ของคุณ แล้ว ก็จะรวมแดชบอร์ดที่คุณสามารถดูได้ สร้างโครงการและจัดการบัญชีของคุณ

![img](/img/replit/dashboard.png)

2. เมื่อล็อกอินแล้ว สร้างรีพับเตอร์ตัวเริ่ม Solidity Select **+ สร้าง**รีพียูจากแผงข้างซ้าย หรือ **+** ที่มุมขวาบนของหน้าจอ

![img](/img/replit/solidity.png)

3. เลือกต้นแบบ[**ของ Solidity (เบต้า)**](https://replit.com/@replit/Solidity-starter-beta?v=1) และให้ชื่อโครงการของคุณ

4. คลิกบน **+ สร้างรีพโท** เพื่อสร้างโครงการของคุณ

:::note

รีเตอร์ Solidity มาพร้อมกับอินเตอร์เฟซที่เป็นมิตรสำหรับเบราว์เซอร์ สร้างขึ้นโดยใช้<ins>**[เอพีไอ ของ Web3 Ethereum JavaScript](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> ซึ่งคุณสามารถใช้เพื่อปรับใช้และโต้ตอบกับสัญญาของเราเราจะปรับใช้ไปยังเน็ตของ Replits ซึ่งเป็นรุ่นกำหนดเองของบล็อกเชน Ethereum ที่จัดการโดย Replit และปรับปรุงเพื่อทดสอบให้ดีขึ้นด้วย

:::

## ปรับใช้บน Polygon {#deploy-on-polygon}

ตรวจสอบให้แน่ใจว่าคุณได้ติดตามรายชื่อ**รายการ Prestieses** อยู่เบื้องต้นเพื่อให้คุณพร้อมที่จะปรับใช้และโต้ตอบกับสัญญาอัจฉริยะของคุณ

1. คลิกบน**Run** (ที่ Top) เพื่อติดตั้งแพ็คเกจที่เกี่ยวข้องทั้งหมดและเริ่มต้นการใช้งานแบบส่งสัญญา

2. เชื่อมต่อกระเป๋าสตางค์ MetaMask ของคุณไปยังอินเทอร์เฟซเว็บ และสลับไปยัง [Testnet](docs/develop/metamask/config-polygon-on-metamask)

![img](/img/replit/connect.png)

3. คลิ้กบน**กระเป๋าสตางค์** เลือกบัญชีของคุณแล้วเลือก **Connect**

![img](/img/replit/deploy-list.png)

4. จากรายการ Dropdown เลือกสัญญาที่คุณต้องการจะนำไปใช้.คลิกบน **Dewoy**

5. คุณจะได้รับหน้าต่าง Make Popup เพื่อขอการยืนยันของคุณApprove ธุรกรรมจากกระเป๋าสตางค์ของคุณเพื่อปรับใช้สัญญาของคุณ

## การตรวจสอบและทดสอบสัญญา {#verifying-and-testing-your-contract}

เมื่อมีการปรับใช้สัญญา [ไปที่ Polyganscan](https://mumbai.polygonscan.com/) เพื่อค้นหาบัญชีของคุณ ดูสัญญาที่ปรับใช้แล้ว และคัดลอกที่อยู่บัญชีของคุณ

เมื่อมีการส่งสัญญาของคุณแล้ว ก็จะปรากฏขึ้นว่าเป็นกล่องขยายได้ด้านล่างกล่อง Dropdownขยายและดูฟังก์ชันต่างๆ ทั้งหมดที่มีขณะนี้ คุณสามารถโต้ตอบกับสัญญาของคุณได้โดยใช้อินเทอร์เฟซผู้ใช้ที่ให้มาหรือจาก URL ที่แชร์ได้ซึ่งแสดงบนอินเทอร์เฟซ

## เผยแพร่ไปยัง Replit {#publish-to-replit}

Replit ช่วยให้คุณสามารถเผยแพร่โปรเจกต์ของคุณไปยังโปรไฟล์ส่วนตัวหลังจากเผยแพร่แล้ว โปรเจกต์จะปรากฏบนหน้าสปอตไลท์ของคุณเพื่อให้ผู้อื่นได้สำรวจ โต้ตอบด้วย โคลน และทำงานร่วมกัน

ติดตามขั้นตอนด้านล่างนี้เพื่อเผยแพร่โครงการของคุณไปยัง Replit:

1. เลือกชื่อโปรเจกต์ที่ด้านบนของหน้าจอ
2. กรอกชื่อโครงการและคำอธิบายและคลิก**สำนักพิมพ์**
