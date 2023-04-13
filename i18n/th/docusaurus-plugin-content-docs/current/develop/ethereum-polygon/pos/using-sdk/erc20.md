---
id: erc20
title: คู่มือการฝากและถอน ERC20
sidebar_label: ERC20
description: "ฝากและถอนโทเค็น ERC20 บนเครือข่าย Polygon"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

ลองดู[เอกสาร Matic.js ล่าสุดบน ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/)

บทช่วยสอนนี้ใช้ Polygon Testnet (Mumbai) ซึ่งแมปกับเครือข่าย Goerli เพื่อสาธิตการโอนสินทรัพย์ไปและกลับจากทั้งสองบล็อกเชน**สิ่งสำคัญที่ควรสังเกต**ขณะทำตามบทช่วยสอนนี้คือ คุณควรใช้ที่อยู่พร็อกซีทุกครั้งที่พร้อมใช้งานตัวอย่างเช่น ที่อยู่**ของ RootChainManager จึง**ต้องใช้เพื่อปฏิสัมพันธ์แทนที่อยู่ RootChain**Manager**ดู**ที่อยู่สัญญา PoS, ABI, ที่อยู่โทเค็นทดสอบ** และรายละเอียดการปรับใช้งานอื่นๆ ของสัญญาบริดจ์ PoS ได้[ที่นี่](/docs/develop/ethereum-polygon/pos/deployment)

จำเป็นต้อง**แมปสินทรัพย์ของคุณ** เพื่อรวมบริดจ์ PoS เข้ากับแอปพลิเคชันของคุณคุณสามารถส่งคำขอการแมปได้[ที่นี่](/docs/develop/ethereum-polygon/submit-mapping-request)แต่เพื่อจุดประสงค์ของบทเรียนนี้ เราได้ส่ง**โทเค็นการ**ทดสอบแล้วแล้วส่งข้อความไว้บนสะพาน PoSคุณอาจต้องใช้โทเค็นดังกล่าวเพื่อลองใช้บทช่วยสอนด้วยตัวเองคุณสามารถขอสินทรัพย์ที่ต้องการได้จาก [Faucet](https://faucet.polygon.technology/)หากโทเค็นการทดสอบไม่สามารถใช้งานบน faucet ก็ติดต่อเราบน[ดิสกอร์ด](https://discord.com/invite/0xPolygonn)ได้

ในบทช่วยสอนต่อไปนี้ จะมีการอธิบายทุกขั้นตอนโดยละเอียดพร้อมส่วนย่อยของโค้ดบางส่วนอย่างไรก็ตาม คุณสามารถอ้างอิง[พื้นที่เก็บข้อมูล](https://github.com/maticnetwork/matic.js/tree/master/examples/pos)นี้ได้เสมอ ซึ่งจะมี**ตัวอย่างซอร์สโค้ด**ทั้งหมดที่สามารถช่วยคุณผสานรวมและทำความเข้าใจการทำงานของบริดจ์ PoS ได้

## ขั้นตอนการประมวลผลระดับสูง {#high-level-flow}

ฝาก ERC20 -

1. **_อนุมัติ_**สัญญา **_ERC20Predicate_** เพื่อใช้โทเค็นที่ต้องฝาก
2. ทำการเรียก **_depositFor_** บน **_RootChainManager_**

ถอน ERC20 -

1. เผาโทเค็นบนเชน Polygon
2. เรียก`exit()`ฟังก์ชั่นเกี่ยวกับ`RootChainManager`จะส่งหลักฐานการดำเนินการการเผาไหม้สามารถสร้างสายนี้ได้หลังจากส่งเช็คพอยต์ไปยังบล็อกที่มีธุรกรรมการเผาได้

## รายละเอียด Stencils {#steps-details}

### Approve {#approve}

นี่เป็นการอนุมัติ ERC1155 ตามปกติเพื่อให้ **_ERC20Predicate_** สามารถเเรียกฟังก์ชัน **_transferFrom_**ลูกค้า Polygon POS จะเปิดเผยวิธีการ**_อนุมัติ_**เพื่อทำการเรียกนี้

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### deposit {#deposit}

โปรดทราบว่าโทเค็นจำเป็นต้องได้รับ mapped และได้รับการรับรองสำหรับการโอนล่วงหน้าลูกค้า Polygon PoS จะเปิดเผย`deposit()`วิธีการเพื่อทำการเรียกนี้

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
ฝากจาก Ethereum ไปยัง Polygon จะเกิดขึ้นโดยใช้กลไก**การซิงค์สถานะ** และใช้เวลาราว 22-30 นาทีหลังจากรอช่วงเวลานี้ จึงแนะนำให้ตรวจสอบยอดคงเหลือโดยใช้ไลบรารี web3.js/matic.js หรือใช้ MetamMaskExplorer จะแสดงยอดคงเหลือก็ต่อเมื่อมีการถ่ายโอนสินทรัพย์อย่างน้อยหนึ่งรายการในเชนย่อย[<ins>ลิงค์</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos)นี้อธิบายวิธีการติดตามอีเวนต์การฝากของอีเวนต์การฝากได้
:::

### เมธอด WithdrawStart เพื่อเบิร์น {#withdrawstart-method-to-burn}

สามารถใช้`withdrawStart()`วิธีการเพื่อเริ่มการถอนซึ่งจะเผาจำนวนที่ระบุบนเชน Polygon

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

จัดเก็บแฮชธุรกรรมสำหรับการเรียกนี้ และใช้งานในขณะที่สร้างหลักฐานการเบิร์น

### Exit {#exit}

เมื่อส่งเช็คพอยต์สำหรับบล็อกที่มีธุรกรรมการเผาแล้ว ผู้ใช้ควรเรียก`exit()`ฟังก์ชั่นของ`RootChainManager`สัญญาและส่งหลักฐานการเผาไหม้เมื่อส่งตัวพิสูจน์ความถูกต้องแล้ว โทเค็นจะถูกโอนไปยังผู้ใช้ลูกค้า Polygon PoS จะเปิดเผย`withdrawExit`วิธีการเพื่อทำการเรียกนี้เรียกฟังก์ชันนี้ได้หลังจากรวมเช็คพอยต์ในเชนหลักแล้วเท่านั้นสามารถติดตามข้อมูลของเช็คพอยต์ได้โดยติดตาม[คู่มือนี้](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)

ใช้เมธอด *withdrawExit* เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด *withdrawStart*

:::note
ธุรกรรมเริ่มต้นจะต้องมีการตรวจสอบความถูกต้องเพื่อออกการถอน
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
