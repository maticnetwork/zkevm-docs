---
id: ether
title: คู่มือการฝากและถอน Ether
sidebar_label: Ether
description:  "ฟังก์ชันที่พร้อมใช้งานสำหรับสัญญา Ether"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## ขั้นตอนการประมวลผลระดับสูง {#high-level-flow}

การฝาก Ether -

- ทำการเรียก depositEtherFor บน **RootChainManager** และส่งสินทรัพย์ Ether

การถอน Ether -

1. **_เบิร์น_**โทเค็นบนเชน Polygon
2. เรียกฟังก์ชัน **_exit_** บน **_RootChainManager_** เพื่อส่งหลักฐานธุรกรรมการเบิร์นทำการเรียกนี้ได้ **_หลังจากส่งเช็คพอยต์_**ให้กับบล็อกที่มีธุรกรรมการเบิร์น

## รายละเอียดขั้นตอน {#step-details}

### ยกตัวอย่างสัญญา {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### deposit {#deposit}
เรียก`depositEtherFor`ฟังก์ชั่นของ`RootChainManager`สัญญาฟังก์ชั่นนี้ใช้เวลา 1 `userAddress`อาร์กิวเมนต์ ซึ่งเป็นที่อยู่ของผู้ใช้ที่จะได้รับการฝากบนเชน Polygonจะต้องส่งจำนวนอีเธอร์เพื่อฝากเพื่อเป็นค่าโอนะ

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Burn {#burn}
เนื่องจาก Ether คือโทเค็น ERC20 บนเชน Polygon กระบวนการถอนก็จะเหมือนกับการถอนเงิน ERC20Tokens สามารถถูกเผาได้โดยเรียก`withdraw`ฟังก์ชั่นบนสัญญาโทเค็นของเด็กฟังก์ชั่นนี้ใช้เวลาเถียงเพียงครั้งเดียว โดยแสดง`amount`จำนวนโทเค็นให้ถูกเผาต้องส่งหลักฐานการเบิร์นนี้ในขั้นตอนการออกดังนั้น ให้เก็บแฮชธุรกรรมไว้
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
ต้องเรียกฟังก์ชัน ทางออกบน`RootChainManager`สัญญา เพื่อปลดล็อคและรับโทเค็นกลับ`EtherPredicate`ฟังก์ชันนี้ใช้อาร์กิวเมนต์ไบต์เดียวที่พิสูจน์ธุรกรรมการเบิร์นรอเช็คพอยต์พร้อมส่งธุรกรรมการเผาให้ก่อนที่จะเรียกฟังก์ชั่นนี้Proof ถูกสร้างขึ้นโดยการเข้ารหัส RLP-เข้ารหัส ฟิลด์ต่อไปนี้:

1. headerNumber - หมายเลขบล็อกส่วนหัวของเช็คพอยต์ที่มีธุรกรรมการเบิร์น
2. blockProof - หลักฐานพิสูจน์ว่าส่วนหัวของบล็อก (ในเชนย่อย) เป็นลีฟใน Merkle Root ที่ส่ง
3. blockNumber - หมายเลขบล็อกที่มีธุรกรรมการเบิร์นบนเชนย่อย
4. blockTime - เวลาในการสร้างบล็อกธุรกรรมการเบิร์น
5. txRoot - ต้นทางธุรกรรมของบล็อก
6. receiptRoot - ต้นทางการรับของบล็อก
7. receipt - การรับธุรกรรมการเบิร์น
8. receiptProof - หลักฐานการรับการเบิร์นของ Merkle
9. branchMask - ข้อมูล 32 บิตที่แสดงพาธการรับในแผนภาพ Merkle Patricia
10. receiptLogIndex - ดัชนีข้อมูลบันทึกที่จะอ่านจากรายการรับ

การสร้างหลักฐานด้วยตนเองอาจเป็นเรื่องยาก ดังนั้น ขอแนะนำให้ใช้ Polygon Edgeหากคุณต้องการส่งธุรกรรมด้วยตนเอง คุณสามารถส่งผ่าน **_encodeAbi_** เป็น **_true_** ในอ็อบเจ็กต์ตัวเลือกเพื่อรับข้อมูลการเรียกดิบ

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

ส่งข้อมูลการเรียกนี้ไปยัง **_RootChainManager_**
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
