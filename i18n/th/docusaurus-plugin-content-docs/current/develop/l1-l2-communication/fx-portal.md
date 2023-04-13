---
id: fx-portal
title: FxPortal
description: การโอนสถานะหรือข้อมูลจาก Ethereum ไปยัง Polygon โดยไม่ต้องใช้การ FxPoral
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

กลไกปกติเพื่ออ่านข้อมูล Ethereum จาก Polygon ได้โดยใช้**Sync State**ซึ่งช่วยให้สามารถถ่ายโอนข้อมูลที่ต้องการจาก Ethereum ไปยัง Polygonอย่างไรก็ตาม วิธีการนี้ยังต้องมีการแมปสัญญาต้นทางและสัญญาย่อย หากไม่สามารถใช้อินเทอร์เฟซเริ่มต้นได้FxPortal เป็นทางเลือกหนึ่งที่สามารถปรับใช้โทเค็นมาตรฐานของ ERC ได้ โดยไม่ต้องทำการแมป เพียงแค่ใช้สัญญา FxPortal พื้นฐานที่ปรับใช้

## FxPoral คืออะไร {#what-is-fxportal}

เป็นการดำเนินการที่มีประสิทธิภาพแต่เรียบง่ายของกลไก[การซิงค์สถานะ](../../pos/state-sync/state-sync-mechanism.md) Polygonบริดจ์ Polygon PoS สร้างขึ้นบนสถาปัตยกรรมเดียวกันโค้ดในโฟลเดอร์[ตัวอย่าง](https://github.com/fx-portal/contracts/tree/main/contracts/examples)ที่เป็นตัวอย่างของการใช้งานบางส่วนคุณสามารถใช้ตัวอย่างเหล่านี้เพื่อสร้างการใช้งานของคุณเองหรือสะพานแบบกำหนดเองซึ่งช่วยให้การซิงค์สถานะได้โดยไม่ต้องใช้ mapping

คุณสามารถตรวจสอบ[คลังสินค้า GitHub](https://github.com/fx-portal/contracts) สำหรับสัญญาและตัวอย่าง

## มีลักษณะการทำงานอย่างไร {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) และ [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) คือสัญญาหลักที่ทำงาน FxPortalโดยไม่มีการแม็ป โดยใช้กลไกการซิงค์ของรัฐในการใช้สัญญาหลักที่ปรับใช้ คุณสามารถใช้สัญญาพื้นฐานของ FxPortal ในสัญญาอัจฉริยะที่คุณปรับใช้ - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) และ [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)ด้วยการสร้างสัญญาเหล่านี้ สัญญาที่ปรับใช้ของคุณจะสามารถสื่อสารกันได้โดยใช้กลไกทันเนลข้อมูล

นอกจากนี้ คุณสามารถเลือกเพื่อสร้างโทเค็นของคุณด้วยสัญญาของอุโมงที่ใช้งานอยู่แล้วรายละเอียดการใช้งานแบบ FxTunnel โดยปริยายสำหรับ Polygon Maainnet และ Mabai มีดังนี้:

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [Testbai](https://static.matic.network/network/testnet/mumbai/index.json)

ค้นหาคีย์เวิร์ด`FxPortalContracts`ในลิงก์ข้างต้นเพื่อค้นหาสัญญาเบื้องต้นทั้งหมดและการส่งผ่านสัญญา FxPortal ที่สำคัญอื่น ๆ

## ฉันต้องใช้การดำเนินการ FxTunnel แบบกำหนดเองหรือไม่? {#do-i-need-a-custom-fxtunnel-implementation}

คุณต้องไปสำหรับ**การนำ FxTunnel แบบกำหนดเอง** เฉพาะหากการติดตั้งอุโมงค์เริ่มต้นไม่สอดคล้องกับกรณีการใช้ของคุณเมื่อคุณใช้อุวน FxPortal โดยปริยาย คุณจะไม่สามารถแก้ไขโค้ดสัญญาเด็กได้โดยบesodeสำหรับสัญญาโทเค็นสำหรับเด็กจะถูกแก้ไขอยู่เสมอ และยังคงเดิมสำหรับ[การใช้ FxTunnel โดยปริยาย](https://github.com/fx-portal/contracts/tree/main/contracts/examples)ในกรณีที่คุณต้องการโทเค็นเด็กแบบกำหนดเอง คุณต้องไปหา FxTunnel แบบกำหนดเองของคุณ และอ่านส่วนต่อไปจะแนะนำคุณมากขึ้นในการส่งอุปกรณ์ FxTunel แบบกำหนดเองเพื่อปรับใช้

ขอแนะนำอย่างยิ่งสำหรับการอ่านและเข้าใจ[การโอนแบบ FxPortal State](state-transfer.md) ก่อนที่คุณจะอ่านส่วนที่กำลังกำลังจะมาถึงแต่ละส่วนที่กำลังจะมาถึงเหล่านี้จะมีลิงก์สัญญาแบบตัวอย่างที่แนบมาด้วย ตัวอย่างที่สามารถนำมาใช้เป็นตัวอย่างที่อ้างอิงได้ ในขณะที่สร้างอุโมงค์ที่กำหนดเองของคุณเอง

## การโอน ERC20 {#erc20-transfer}

[สัญญาเด็กและอุโมงค์ราก](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) ช่วยให้การฝากโทเค็นบนห่วงโซ่ต้นทางและถอนบนเชนเด็กได้

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: คุณสามารถเรียกฟังก์ชั่นบนสัญญาที่ใช้งานเพื่อสร้างโทเค็น ER20 ของคุณและสร้างโทเค็นเด็กที่เกี่ยวกับห่วงโซ่เด็ก
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`วิธีการเรียกด้วยที่อยู่ของโทเค็นที่แมป, ที่อยู่ที่สามารถถอนออกด้วยจำนวนที่กำหนด (พร้อมข้อมูลหากจำเป็น)คุณต้องอนุมัติสัญญาโดยใช้ฟังก์ชันมาตรฐาน ERC20 `approve` เพื่อใช้โทเค็นของคุณก่อน

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: ที่อยู่ที่กำหนด ใน `deposit()`สามารถถอนโทเค็นจำนวนของโทเค็นสำหรับเด็กทั้งหมดโดยใช้ฟังก์ชันซึ่งจะได้รับโทเค็นย่อยที่สร้างขึ้นเมื่อทำการแมปครั้งแรก
- `rootToChildToken`: ตัวแปรสาธารณะนี้ประกอบด้วยโทเค็นรากไปยังแมปสำหรับการเมปสำหรับเด็กคุณสามารถค้นหาการแมปด้วยที่อยู่ของโทเค็นต้นทางเพื่อทราบที่อยู่ของโทเค็นย่อยที่ปรับใช้

### จาก Ethereum → Polygon {#polygon}

1. ปรับใช้โทเค็น ERC20 ของคุณเองบนเชนต้นทางคุณจะต้องใช้ที่อยู่นี้ในภายหลัง
2. อนุมัติโทเค็นสำหรับการโอนโดยเรียกฟังก์ชัน `approve()` ของโทเค็นต้นทางด้วยที่อยู่ของทันเนลต้นทางและจำนวนเป็นอาร์กิวเมนต์
3. ดำเนินการต่อเพื่อเรียก `deposit()` ด้วยที่อยู่ของผู้รับและจำนวนบนเชนต้นทางเพื่อรับโทเค็นย่อยที่เทียบเท่ากันในเชนย่อยการกระทำนี้จะแมปโทเค็นโดยอัตโนมัติด้วยหรือคุณสามารถเรียก `mapToken()` ก่อนทำการฝาก
4. หลังจากแผนที่ ตอนนี้คุณควรรีบสามารถดำเนินการโอนผ่านโซ่โดยใช้ฟังก์ชั่น`deposit`และ`withdraw`ฟังก์ชั่นของอุโมงค์

:::note

หลังจากที่คุณดำเนินการ`deposit()`บนเชนผู้คุมระบบ ก็จะใช้เวลา 22-30 นาทีในการซิงค์สถานะจะเกิดขึ้นเมื่อการซิงค์สถานะเกิดขึ้น คุณจะได้รับโทเค็นที่ฝากไว้ที่ที่อยู่ที่กำหนดไว้

:::

### จาก Polygon →อีthereum {#ethereum}

1. ดำเนินการต่อเพื่อเรียก `withdraw()` โดยใช้ที่อยู่โทเค็นและจำนวนที่เกี่ยวข้องเป็นอาร์กิวเมนต์ในสัญญาย่อยเพื่อย้ายโทเค็นย่อยกลับไปยังผู้รับที่กำหนดบนเชนต้นทาง**บันทึกแฮชธุรกรรม** เนื่องจากจะใช้เพื่อสร้างหลักฐานการเบิร์น

2. คุณสามารถค้นหาขั้นตอนเพื่อทำการ[ถอนที่](#withdraw-tokens-on-the-root-chain)นี่ได้สำเร็จ

## การโอน ER721 {#erc721-transfer}

ในกรณีที่คุณต้องการตัวอย่าง โปรดตรวจสอบไกด์ [Root และ Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) นี้

### จาก Ethereum → Polygon {#polygon-1}

1. ปรับใช้โทเค็น ERC721 ของคุณเองบนเชนต้นทางคุณจะต้องใช้ที่อยู่นี้ในภายหลัง
2. อนุมัติโทเค็นสำหรับการโอนโดยเรียกฟังก์ชัน `approve()` ของโทเค็นต้นทางโดยใช้ที่อยู่ของทันเนลต้นทางและ ID โทเค็นเป็นอาร์กิวเมนต์
3. ดำเนินการต่อเพื่อเรียก `deposit()` โดยใช้ที่อยู่ของผู้รับและ ID โทเค็นบนเชนต้นทางเพื่อรับโทเค็นย่อยที่เทียบเท่ากันบนเชนย่อยการกระทำนี้จะแมปโทเค็นโดยอัตโนมัติด้วยหรือคุณสามารถเรียก `mapToken()` ก่อนทำการฝาก

:::note

หลังจากที่คุณดำเนินการ`deposit()`บนเชนผู้คุมระบบ ก็จะใช้เวลา 22-30 นาทีในการซิงค์สถานะจะเกิดขึ้นเมื่อการซิงค์สถานะเกิดขึ้น คุณจะได้รับโทเค็นที่ฝากไว้ที่ที่อยู่ที่กำหนดไว้

:::

### จาก Polygon →อีthereum {#ethereum-1}

1. ดำเนินการต่อเพื่อเรียก `withdraw()` โดยใช้ที่อยู่โทเค็นและ ID โทเค็นที่เกี่ยวข้องเป็นอาร์กิวเมนต์ในสัญญาย่อยเพื่อย้ายโทเค็นย่อยกลับไปยังผู้รับที่กำหนดบนเชนต้นทาง**โปรดทราบว่าแฮช**จะใช้เพื่อสร้างตัวป้องกันการเผาแบบใด

2. คุณสามารถค้นหาขั้นตอนเพื่อทำการ[ถอนที่](#withdraw-tokens-on-the-root-chain)นี่ได้สำเร็จ

## การโอน ERC1155 {#erc1155-transfer}

ในกรณีที่คุณต้องการตัวอย่าง โปรดตรวจสอบคู่มือ[การใช้งานนี้ Root และ Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer)

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: ใช้เพื่อแมปโทเค็น ERC1155 ต้นทางของคุณกับเชนย่อย
- `deposit(rootToken, user, id, amount, data)`: ฟังก์ชันที่ใช้เพื่อฝากโทเค็นต้นทางไปยังเชนย่อย
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: ใช้สำหรับ ID โทเค็นหลายรายการและจำนวนที่เกี่ยวข้อง
- `receiveMessage(inputData)`: จะมีการเรียกหลังจากมีการสร้างหลักฐานการเบิร์นโดยมีเพย์โหลดเป็น `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: ใช้เพื่อถอนโทเค็นจาก Polygon ไปยัง Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: เหมือนกับการถอน แต่ใช้กับการถอน ID โทเค็นหลายรายการ

### จาก Ethereum → Polygon {#polygon-2}

1. ปรับใช้โทเค็น ERC1155 ของคุณบนเชนต้นทางคุณจะต้องใช้ที่อยู่นี้ในภายหลัง
2. เรียก`setApprovalForAll(operator, approved)`บนโทเค็นที่เคลื่อนกำลังพลพร้อม`FxERC1155RootTunnel`ที่อยู่เพื่อ`operator`อนุญาตให้`FxERC1155RootTunnel`โอนโทเค็นของคุณไปยัง `FxERC1155ChildTunnel`Polygon
3. เรียก`mapToken()``FxERC1155RootTunnel`ด้วยที่อยู่โทเค็นที่ใช้งานเป็นอย่างไร`rootToken`ซึ่งจะส่งข้อความเพื่อ`FxERC1155ChildTunnel`แนะนำเพื่อปรับใช้และวางโทเค็น ERC155 บน Polygonเพื่อค้นหาที่อยู่ของโทเค็นสำหรับเด็กของคุณ `rootToChildToken`โทรเรียก`FxERC1155ChildTunnel`
4. เรียก`deposit()``FxERC1155RootTunnel`ด้วยที่อยู่ของโทเค็นบน Ethereum คือ `rootToken`ตัวรับสัญญาณ คือ , `user`token ID `id`และจำนวนเป็น`amount`หรือคุณสามารถเรียก `depositBatch()` เพื่อขอ ID โทเค็นหลายรายการ

:::note

หลังจากที่คุณดำเนินการ`deposit()`บนเชนผู้คุมระบบ ก็จะใช้เวลา 22-30 นาทีในการซิงค์สถานะจะเกิดขึ้นเมื่อการซิงค์สถานะเกิดขึ้น คุณจะได้รับโทเค็นที่ฝากไว้ที่ที่อยู่ที่กำหนดไว้

:::

### จาก Polygon →อีthereum {#ethereum-2}

1. เรียก`withdraw()``FxERC1155ChildTunnel`ด้วยที่อยู่ของโทเค็นเด็กที่ติดตั้งบน Polygon เป็นไอดี`childToken`และโทเค็นเป็น `id`(ที่อยู่ของโทเค็นสามารถสืบค้นได้จากการ Mapping`rootToChildToken`)หรือคุณยังสามารถเรียก `withdrawBatch()` เพื่อขอ ID โทเค็นหลายรายการและจำนวนที่สอดคล้องกันได้อีกด้วย**โปรดทราบว่าแฮช**จะใช้เพื่อสร้างตัวป้องกันการเผาแบบใด

2. คุณสามารถค้นหาขั้นตอนเพื่อทำการ[ถอนที่](#withdraw-tokens-on-the-root-chain)นี่ได้สำเร็จ

## การถอนโทเคนบนเชน Root {#withdraw-tokens-on-the-root-chain}

:::info

หลังจากที่คุณดำเนินการ`withdraw()`บนเชนเด็กแล้ว ก็จะใช้เวลา 30-90 นาทีเพื่อเช็คพอยต์ที่จะเกิดขึ้นเมื่อเช็คพอยต์ต่อไปรวมธุรกรรมการเผาอีก คุณสามารถถอนโทเค็นบนเชนของรากได้

:::

1. สร้างหลักฐานการเผาโดยใช้**แฮช**และ**เมเซ็ธ_Sent_EVENT SIGN**เพื่อสร้างหลักฐาน, คุณสามารถใช้ API รุ่นหลักฐานที่เป็นเจ้าภาพจัดการโดย Polygon หรือคุณยังสามารถหมุนรุ่นหลักฐานของคุณเองได้โดยทำตามคำแนะนำ[ที่นี่](https://github.com/maticnetwork/proof-generation-api)

endpoint รุ่นพิสูจน์ความปลอดภัยมีให้เลือกใช้ Polygon มีใช้งาน[ที่นี่](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`คือ แฮชของ`withdraw()`ธุรกรรมที่คุณเริ่มขึ้นบน Polygon
  - `eventSignature`คือลายเซ็นอีเวนต์ของอีเวนต์ที่ที่ส่งมาด้วย`withdraw()`ฟังก์ชัน`0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`ลายเซ็นอีเวนต์สำหรับเมเซ_Sent_EVENT ESTIG คือ

ตัวอย่าง API สำหรับการใช้งานสำหรับ Maainnet และ Tesnet มีดังนี้:

→ [รุ่นของ Polygon Maainnet](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [รุ่นพิสูจน์ของ Mubi Testnet](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. ป้อนการจ่ายที่สร้างขึ้นเพื่อเป็นตัวโต้เถียงกับ`receiveMessage()`ในสัญญาเบื้องต้นบน Goerli หรือ Ethereum

## การโอน ERC-20 ที่มินต์ได้ {#mintable-erc-20-transfer}

ในกรณีที่คุณต้องการตัวอย่าง โปรดตรวจสอบคู่มือ[การใช้งานแบบ Mintable ERC20 และ Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer)

:::info

ในกรณีของ Token FxTunnel ที่สามารถต้านทานได้ จึงจะถูกส่งโทเค็นแบบเดิมและโทเค็นแบบรากจะถูกใช้งานเฉพาะเมื่อกระบวนการถอน/ออกแรกเสร็จสิ้นแล้วที่อยู่สัญญาโทเค็นต้นสามารถกำหนดได้ล่วงหน้าหลังจากที่สัญญาเด็กมีการใช้งานแล้ว แต่การแม็ป จะมีอยู่เฉพาะเมื่อการถอน/ทางออกแรกเสร็จสิ้นแล้ว

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: การฝากโทเค็นจาก Ethereum ไปยัง Polygon
- `receiveMessage(bytes memory inputData)`: หลักฐานการเบิร์นที่จะป้อนเป็น `inputData` เพื่อรับโทเค็นในเชนต้นทาง

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: เพื่อปรับใช้โทเค็น ER20 บนเครือข่าย Polygon
- `mintToken(address childToken, uint256 amount)`: มินต์โทเค็นจำนวนหนึ่งบน Polygon
- `withdraw(address childToken, uint256 amount)`: เบิร์นโทเค็นบนเชนย่อยเพื่อถอนบนเชนต้นทาง

### โทเก็นการเหมืองบน Polygon {#minting-tokens-on-polygon}

1. เรียก `deployChildToken()` บน `FxMintableERC20ChildTunnel` และส่งผ่านข้อมูลโทเค็นที่จำเป็นในรูปแบบพารามิเตอร์การกระทำนี้จะส่งอีเวนต์ `TokenMapped` ที่มีที่อยู่เป็น `rootToken` และ `childToken`สังเกตที่อยู่เหล่านี้
2. เรียก `mintToken()` บน `FxMintableERC20ChildTunnel` เพื่อมินต์โทเค็นบนเชนย่อย
3. เรียก `withdraw()` บน `FxMintableERC20ChildTunnel` เพื่อถอนโทเค็นจาก Polygonโปรดทราบว่าแฮชของธุรกรรมเนื่องจากจะมีประโยชน์ในการสร้างตัวพิมพ์การเผาไหม้ได้
4. คุณสามารถค้นหาขั้นตอนเพื่อทำการ[ถอนที่](#withdraw-tokens-on-the-root-chain)นี่ได้สำเร็จ

### การถอนโทเคนบน Ethereum {#withdrawing-tokens-on-ethereum}

ป้อนหลักฐานการเบิร์นที่สร้างขึ้นเป็นอาร์กิวเมนต์ต่อ `receiveMessage()` ใน `FxMintableERC20RootTunnel`หลังจากนี้ จะแสดงยอดโทเค็นในเชนต้นทาง

### ฝากเงินกลับไปยัง Polygon {#deposit-tokens-back-to-polygon}

1. โปรดอนุมัติ `FxMintableERC20RootTunnel` เพื่อโอนโทเค็นของคุณ
2. เรียก `deposit()` ใน `FxMintableERC20RootTunnel` โดยใช้ `rootToken` เป็นที่อยู่โทเค็นต้นทางและ `user` เป็นผู้รับ
3. รอรับอีเวนต์การซิงค์สถานะ (22-30 นาที)หลังจากนี้ คุณสามารถค้นหายอดคงเหลือของผู้รับเป้าหมายในเชนย่อย

ตัวอย่างของ **ERC721** และ **ERC155** ตัวอย่าง FxTunnel มีดังนี้:

- [FxMintable ERC721Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintable ERC155Tunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## การปรับใช้ตัวอย่าง {#example-deployments}

### Goerli {#goerli}

- ตัวจัดการเช็คพอยต์: [0x2890bA17E978480615e330ecB65333b80928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- [Token Dummy ERC20 Token 0xe9c7873f81c815d64c71c23462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06ACFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- [FxMintable ERC20RootTunnel: 0xA20076a7D64E54611E2D232A6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- โทเค็น: [0x73594a053cb5dDE558268d28a74375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721[RootTunnel: 0xF9bc4a80464E4836930319645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC[1155 Token 0x1906d](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)395752FE0c930f8d061DFEB785eBE6f0B4E
- [FxERC155RootTunnel : 0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb08413719fE745aB6e3b05C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20Child[Tunnel 0x9C37aEbd7D337E0215BC40152d689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintable ERC20Child[Tunnel: 0xA2C7eBEF68B444056](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)b4A39C2CEC2384275C56e9
- โทเค็นย่อย ERC20 จำลอง: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)x2720927E0487267C0221ffA41A8528048726
- FxERC721Chilt[Tunnel 0x3658ccFDE5e9629b0805EB06ACFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC155ChildTunnel[: 0x3A0f90D3905601501652fe925e96d8B294243EC](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

สามารถพบการใช้งานเมนเน็ตที่เกี่ยวข้อง[ได้ที่นี่](https://static.matic.network/network/mainnet/v1/index.json)ค้นหาคีย์วอร์ด`FxPortalContracts`เพื่อค้นหาสัญญาเริ่มต้นทั้งหมดและการส่งผ่านสัญญา FxPortal ที่สำคัญอื่น ๆคุณสามารถใช้[`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)แพกเกจเพื่อเข้าถึงที่อยู่ของสัญญาและ ABIS

## ที่อยู่สัญญา {#contract-addresses}

### Mumbai Testnet {#mumbai-testnet}

| สัญญา | ที่อยู่ที่ปรับใช้  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| สัญญา | ที่อยู่ที่ปรับใช้  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
