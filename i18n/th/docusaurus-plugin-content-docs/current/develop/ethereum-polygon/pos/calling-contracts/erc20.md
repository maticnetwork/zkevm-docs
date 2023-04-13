---
id: erc20
title: คู่มือการฝากและถอน ERC20
sidebar_label: ERC20
description: "ฟังก์ชันที่พร้อมใช้งานสำหรับสัญญา ERC20"
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## ขั้นตอนการประมวลผลระดับสูง {#high-level-flow}

การฝาก ERC20 -

1. **_อนุมัติ_**สัญญา **_ERC20Predicate_** เพื่อใช้โทเค็นที่ต้องฝาก
2. ทำการเรียก **_depositFor_** บน **_RootChainManager_**

การถอน ERC20 -

1. **_เบิร์น_**โทเค็นบนเชน Polygon
2. เรียกฟังก์ชัน **_exit_** บน **_RootChainManager_** เพื่อส่งหลักฐานธุรกรรมการเบิร์นทำการเรียกนี้ได้ **_หลังจากส่งเช็คพอยต์_**ให้กับบล็อกที่มีธุรกรรมการเบิร์น

## รายละเอียดการตั้งค่า {#setup-details}

### ยกตัวอย่างสัญญา {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Approve {#approve}
อนุมัติ **_ERC721Predicate_** เพื่อใช้โทเค็นโดยการเรียกฟังก์ชัน **_approve_** ของสัญญาโทเค็นฟังก์ชันนี้ใช้สองอาร์กิวเมนต์คือ spender และ amount โดย **_spender_** คือที่อยู่ที่ได้รับการอนุมัติให้ใช้โทเค็นของผู้ใช้ **_amount_** คือจำนวนโทเค็นที่สามารถนำไปใช้ได้ให้ amount มีค่าเท่ากับจำนวนที่ฝากสำหรับการอนุมัติครั้งเดียว หรือส่งผ่านจำนวนที่มากกว่าเพื่อหลีกเลี่ยงการอนุมัติหลายครั้ง
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Deposit {#deposit}
โปรดทราบว่าต้องมีการแมปโทเค็นและอนุมัติยอดสำหรับการฝากก่อนทำการเรียกนี้  เรียก`depositFor()`ฟังก์ชั่นของ`RootChainManager`สัญญาฟังก์ชั่นนี้ต้องใช้อาร์กิวเมนต์ 3 ประการ: `userAddress``rootToken`, `depositData`และ `userAddress`คือที่อยู่ของผู้ใช้ที่จะได้รับการฝากบนเชน Polygon `rootToken`คือที่อยู่ของโทเค็นบนเชนหลัก `depositData`คือจำนวนการเข้ารหัส ABI
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Burn {#burn}
เบิร์นโทเค็นบนเชน Polygon ได้โดยเรียกฟังก์ชัน **_withdraw_** บนสัญญาโทเค็นย่อยฟังก์ชันนี้ใช้อาร์กิวเมนต์เดียวคือ **_amount_** ที่ระบุจำนวนโทเค็นที่จะเบิร์นต้องส่งหลักฐานการเบิร์นนี้ในขั้นตอนการออกดังนั้น ให้เก็บแฮชธุรกรรมไว้
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
ต้องเรียกฟังก์ชัน ทางออกบน`RootChainManager`สัญญา เพื่อปลดล็อคและรับโทเค็นกลับ`ERC20Predicate`ฟังก์ชันนี้ใช้อาร์กิวเมนต์ไบต์เดียวที่พิสูจน์ธุรกรรมการเบิร์นรอเช็คพอยต์พร้อมส่งธุรกรรมการเผาให้ก่อนที่จะเรียกฟังก์ชั่นนี้Proof ถูกสร้างขึ้นโดย RLP การเข้ารหัส ไปยังฟิลด์ต่อไปนี้ -

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
