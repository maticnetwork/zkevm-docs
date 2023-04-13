---
id: eth
title: คู่มือการฝากและถอน ETH
sidebar_label: ETH
description: "ฝากและถอนโทเค็น ETH บนเครือข่าย Polygon"
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

ลองดู[เอกสาร Matic.js ล่าสุดบน ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/)

## สรุปสั้นๆ {#quick-summary}

เอกสารส่วนนี้กล่าวถึงวิธีฝากและถอนโทเค็น ERC20 บนเครือข่าย Polygonมีฟังก์ชันทั่วไปอยู่ระหว่างส่วน ETH, ERC20, ERC721 และ ERC1155 ของเอกสารที่มีรูปแบบการตั้งชื่อและการปรับใช้งานแตกต่างกันไป ซึ่งเหมาะกับมาตรฐานข้อกำหนดเบื้องต้นที่สำคัญที่สุดในการใช้เอกสารส่วนนี้ คือการแมปสินทรัพย์ของคุณ ดังนั้นโปรดส่งคำขอการแมป[ที่นี่](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)

## ข้อมูลเบื้องต้น {#introduction}

คู่มือนี้ใช้ Polygon Testnet (Mumbai) ซึ่งจะได้รับการแมปกับเครือข่าย Goerli เพื่อแสดงการโอนสินทรัพย์ระหว่างทั้งสองบล็อกเชนจำเป็นต้องทราบว่าเพื่อวัตถุประสงค์ของบทช่วยสอนนี้ คุณควรใช้ที่อยู่พร็อกซีเมื่อใดก็ตามที่เป็นไปได้เนื่องจากในขณะที่ที่อยู่ของสัญญาการใช้งานส่งผลต่อเปลี่ยนแปลงเมื่อมีการเพิ่มการอัปเดตใหม่ในรหัสสัญญา พร็อกซีจะไม่เปลี่ยนแปลงเด็ดขาดและจะเปลี่ยนเส้นทางการเรียกเข้าทั้งหมดไปยังการใช้งานล่าสุดโดยพื้นฐานแล้ว หากคุณใช้ที่อยู่พร็อกซี คุณไม่จำเป็นต้องกังวลเกี่ยวกับการเปลี่ยนแปลงใดๆ ที่เกิดขึ้นในสัญญาการใช้งานก่อนที่คุณจะพร้อม

ตัวอย่างเช่น โปรดใช้`RootChainManagerProxy`ที่อยู่สำหรับปฏิสัมพันธ์แทน`RootChainManager`ที่อยู่รายละเอียดการเดาง่าย เช่น ที่อยู่สัญญา PoS การแจกจ่าย ABI และที่อยู่แบบทดสอบสามารถพบได้[ที่นี่](/docs/develop/ethereum-polygon/pos/deployment/)

การแมปสินทรัพย์ของคุณเป็นขั้นตอนที่จำเป็นสำหรับการรวมบริดจ์ PoS ในแอปพลิเคชันของคุณ ดังนั้น หากคุณยังไม่ได้ดำเนินการ โปรดส่งคำขอการแมป[ที่นี่](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)เพื่อให้เป็นไปตามจุดประสงค์ของบทช่วยสอนนี้ ทีมงานได้ปรับใช้โทเค็นทดสอบและจับคู่โทเค็นกับบริดจ์ PoSขอสินทรัพย์ที่คุณต้องการใช้บน [Faucet](https://faucet.polygon.technology/)  และหากโทเค็นการทดสอบไม่พร้อมใช้งาน โปรดติดต่อทีมบน [Discord](https://discord.com/invite/0xPolygon)เราจะพยายามตอบกลับทันที

ในบทช่วยสอนต่อไปนี้ จะมีการอธิบายทุกขั้นตอนโดยละเอียดพร้อมส่วนย่อยของโค้ดบางส่วนอย่างไรก็ตาม คุณสามารถอ้างอิง[พื้นที่เก็บข้อมูล](https://github.com/maticnetwork/matic.js/tree/master/examples)นี้ได้เสมอ ซึ่งจะมี**ตัวอย่างซอร์สโค้ด**ทั้งหมดที่สามารถช่วยคุณผสานรวมและทำความเข้าใจการทำงานของบริดจ์ PoS ได้

## ขั้นตอนการประมวลผลระดับสูง {#high-level-flow}

ฝาก ETH -

1. ทำการเรียก **_depositEtherFor_** บน **_RootChainManager_** และ **ส่ง **Ether ที่จำเป็น

ถอน ETH -

1. **_เบิร์น_**โทเค็นบนเชน Polygon
2. เรียกฟังก์ชัน **_exit_** บน **_RootChainManager_** เพื่อส่งหลักฐานธุรกรรมการเบิร์นทำการเรียกนี้ได้ **_หลังจากส่งเช็คพอยต์_**ให้กับบล็อกที่มีธุรกรรมการเบิร์น

## ขั้นตอน {#steps}

### ฝาก {#deposit}

ฝาก ETH ไปที่เชน Polygon ได้โดยเรียก **depositEtherFor** บนสัญญา **RootChainManager**ไคลเอ็นต์ Polygon PoS แสดงเมธอด **depositEther** เพื่อทำการเรียกนี้

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
ฝากจากอีthereum ไปยัง Polygon เกิดขึ้นโดยใช้กลไก**การซิงค์สถานะ** และใช้เวลาประมาณ 22-30 นาทีหลังจากรอช่วงเวลานี้ จึงแนะนำให้ตรวจสอบยอดคงเหลือโดยใช้ไลบรารี web3.js/matic.js หรือใช้ MetamMaskExplorer จะแสดงยอดคงเหลือก็ต่อเมื่อมีการถ่ายโอนสินทรัพย์อย่างน้อยหนึ่งรายการในเชนย่อย[<ins>ลิงค์</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/)นี้อธิบายวิธีการติดตามอีเวนต์การฝากของอีเวนต์การฝากได้
:::

### Burn {#burn}

ETH ถูกฝากไว้เป็นโทเค็น ERC20 บนเชน Polygonการถอนกำลังตามกระบวนการเดียวกันกับการยกเลิกโทเค็น ERC20

เพื่อเผาโทเค็นและดำเนินกระบวนการถอนโดยอัตโนมัติ เรียกฟังก์ชัน การถอนของสัญญา MaticWETHเนื่องจาก Ether คือโทเค็น ERC20 บนเชน Polygon คุณต้องเริ่ม  เริ่ม ใช้ โทเค็น **ERC20** จากไคลเอนต์ Polygon  แล้วเรียก`withdrawStart()`วิธีการเพื่อเริ่มกระบวนการเผา

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

จัดเก็บแฮชธุรกรรมสำหรับการเรียกนี้ และใช้งานในขณะที่สร้างหลักฐานการเบิร์น

### Exit {#exit}


เมื่อ**ส่งเช็คพอยต์**สำหรับบล็อกที่มีธุรกรรมการเผาแล้ว ผู้ใช้ควรเรียก**ฟังก์ชั่นการออก**จาก`RootChainManager`สัญญาและส่งหลักฐานการเผาไหม้เมื่อส่งหลักฐานที่ถูกต้องแล้ว จะมีการโอนโทเค็นไปยังผู้ใช้ไคลเอ็นต์ Polygon POS `erc20`แสดงเมธอด `withdrawExit` เพื่อทำการเรียกนี้เรียกฟังก์ชันนี้ได้หลังจากรวมเช็คพอยต์ในเชนหลักแล้วเท่านั้นติดตามการรวมเช็คพอยต์ได้โดยปฏิบัติตาม[คู่มือ](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)นี้


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
