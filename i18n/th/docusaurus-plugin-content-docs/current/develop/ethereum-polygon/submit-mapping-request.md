---
id: submit-mapping-request
title: โทเค็นสำหรับ Making
description:  คู่มือเกี่ยวกับวิธีแผนที่โทเค็นระหว่างเชน Ethereum และ Polygon โดยใช้สะพาน PoS
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Maing จำเป็นในการย้ายสินทรัพย์ของคุณไปยังและจาก Ethereum และ Polygon PoSเรามีสองบริดจ์ให้ทำเช่นเดียวกันรายละเอียดเพิ่มเติมบนสะพานสามารถเข้าใจ[ได้ที่นี่](/develop/ethereum-polygon/getting-started.md)

:::tip

มีสะพาน Polygon PoS สำหรับเมนnet ทั้ง Polygon และ Maintnet ทั้ง ${ Longi

:::

## ขั้นตอนส่งคำขอการแมป {#steps-to-submit-a-mapping-request}

เพื่อสร้างโทเค็นระหว่าง[โพส](https://mapper.polygon.technology/) Ethereum และ Polygon คุณสามารถใช้ Polygon Maper ได้เปิดลิงก์และคลิกบนปุ่ม **Map New Token** บนมุมขวาบนเพื่อเริ่มต้นคำขอการแมปใหม่

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**→ขั้นที่ 1** เลือกเครือข่ายที่คุณต้องการจะวางบนโทเค็นของคุณคุณสามารถเลือก**โกเมอร์ลี-มุมไบ**สำหรับเทสเน็ต และ **Ethereum-Polygon PoS** สำหรับ Mainnet

**→ขั้นที่ 2** เลือกชนิดของโทเค็นที่คุณกำลังแผนที่ - **ERC20**, **ER721** หรือ **ERC1155**

**→ ขั้นตอนที่ 3** เติมที่อยู่โทเค็น **Ethereum/Goerli** ของคุณในฟิลด์**ที่อยู่ของเซเดือยโท**เค็น Ethereumตรวจสอบให้แน่ใจว่าโค้ดสัญญาของคุณได้รับการยืนยันจากโทเค็นบนผู้สำรวจ **Ethereum/Goerli**

**→ขั้นที่ 4** หลังจากเพิ่ม**ที่อยู่ Token Token ซึ่ง**เป็นหน่วยวัดที่เกี่ยวข้อง **ชื่อโทเค็น ซิมโบล Token และเดเลขทศนิยมโทเคน**จะถูกเพิ่มขึ้นโดยอัตโนมัติด้วยรายละเอียดสัญญา

**→ขั้นที่ 5** ตอนนี้ ให้คลิกที่ปุ่ม **Map เริ่ม** เพื่อเริ่มการทำงานเนื่องจากนี้เกี่ยวข้องกับธุรกรรม Ethereum คุณจะต้องเชื่อมต่อกระเป๋าสตางค์ของคุณเพื่อดำเนินการต่อ

**→ ขั้นที่ 6** คุณจะแสดงรีวิวแบบโมดพร้อมข้อมูลโทเค็น และค่าธรรมเนียมแก๊สโดยประมาณเพื่อทำการแมปที่สมบูรณ์ตรวจสอบรายละเอียดและเริ่มต้นธุรกรรมการแปบด้วยการเลือก**ค่าธรรมเนียมแก๊สสำหรับแมป**

หลังจากยืนยันธุรกรรมจากกระเป๋าสตางค์ของคุณ คุณต้องรอรับธุรกรรมเพื่อสร้างเสร็จบน Ethereumเมื่อเสร็จสิ้นธุรกรรม คุณจะแสดงความสำเร็จกับที่อยู่ของโฮดอล สำหรับเด็กของคุณบนเครือข่าย Polygon PoSคุณสามารถตรวจสอบการแมปได้ต่อไปโดยการตรวจสอบที่อยู่สำหรับเด็กที่สร้างขึ้นบน [Polygonsan](https://polygonscan.com/)

สำหรับการเมปลิงเมนเน็ตที่ประสบความสำเร็จ คุณสามารถให้รายละเอียดของโทเค็นของคุณ[ได้ที่นี่](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) เพื่อเพิ่มเติม[**บนลิสต์โทเค็น ของ Polygon**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json)

:::tip

ในกรณีของ[<ins>แมปลิงแบบกำหนดเอง</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) คุณสามารถเยี่ยมชมเอกสาร [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) ของเราและใช้ข้อมูลที่ให้ไว้เพื่อสร้างการนำ FX ของคุณเองไปยังโทเค็นส์

:::

## คู่มือการใช้งานแบบวิดีโอ {#video-guide}

นี่คือบทเรียนสำหรับการสอนวิดีโอแบบรวดเร็วเกี่ยวกับวิธีการแผนที่ tokens ระหว่าง **Ethereum Goerli gon Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>เบราว์เซอร์ของคุณไม่รองรับองค์ประกอบวิดีโอ</p>
</video>
