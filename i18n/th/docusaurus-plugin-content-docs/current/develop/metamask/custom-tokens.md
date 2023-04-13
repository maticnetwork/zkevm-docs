---
id: custom-tokens
title: ปรับแต่งโทเค็นต์เอง
description: กำหนดค่าโทเค็นที่กำหนดเองบน Metamask
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

หน้านี้แสดงกระบวนการการตั้งค่า / เพิ่มโทเค็นแบบกำหนดไปยัง เมตาสก์

คุณสามารถใช้กระบวนการเดียวกันเพื่อเพิ่มโทเค็นแบบกำหนดเองไปยังเครือข่ายใด ๆ บน เมตาสก์คุณสามารถอ้างอิงถึง[ตารางนี้](#tokens-and-contract-adresses)เพื่อแสดงตัวอย่างของโทเค็นการทดสอบด้วยที่อยู่สัญญาที่เกี่ยวข้อง

## การเพิ่มโทเค็นแบบกำหนดเองลงในบัญชี MetaMask ของคุณ {#adding-a-custom-token-to-your-metamask-account}

ก่อนอื่นเลือกเครือข่ายที่เหมาะสมสำหรับโทเค็นใหม่บนหน้าจอโฮมเมสก์ ของคุณจากนั้นคลิกที่โทเคนการนำเข้า

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

จากนั้นจะพาคุณไปยังหน้าจอใหม่บนหน้าจอ Image Tokens วางที่อยู่แบบคัดลอกในฟิลด์ที่อยู่ Token

:::info
เพื่อแสดงกระบวนการนี้ เราใช้โทเค็น **ER20 TESTV4** บน**เครือข่าย Goerli**ค้นหาโทเค็นการทดสอบอื่น ๆ จากเครือข่ายอื่น[<ins>ที่นี่</ins>](#tokens-and-contract-adresses)
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

จะมีการเติมข้อมูลในฟิลด์ต่างๆ โดยอัตโนมัติคลิกบนเพิ่มโทเค็นแบบกำหนดเอง จากนั้นก็คลิกที่โทเค็นต์การนำเข้าตอนนี้โทเค็น `TEST` ควรปรากฏในบัญชีของคุณบน Metamask

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**การเพิ่มโทเค็นการทดสอบ ERC1155 ไปยังบัญชี Metamask ของคุณ**

แม้ว่าเครือข่าย Polygon จะรองรับ ERC1155 แต่ [Metamask ยังไม่รองรับมาตรฐานดังกล่าว](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-)การอัปเดตนี้คาดว่าจะเกิดขึ้นในไตรมาสที่สี่ของปี 2021

### ผู้ดูแลระบบ {#tokens-and-contract-adresses}

| token | เครือข่าย | ที่อยู่สัญญา |
|---------------|---------|----------------------------------------------|
| ER20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATI-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ER721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ER721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |