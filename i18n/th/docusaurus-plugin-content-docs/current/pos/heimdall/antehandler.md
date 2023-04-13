---
id: antehandler
title: ตัวจัดการ Ante
description: เช็คตัวจัดการของ Ante และตรวจสอบความถูกต้องของธุรกรรม
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# ตัวจัดการ Ante {#ante-handler}

ตัวจัดการ Ante ตรวจเช็คและตรวจสอบความถูกต้องของธุรกรรม ภายหลังการตรวจยืนยัน ก็จะตรวจสอบยอดคงเหลือของผู้ส่งเพื่อดูว่าเพียงพอชำระค่าธรรมเนียมหรือไม่ และหักค่าธรรมเนียมในกรณีที่รวมธุรกรรมเป็นผลสำเร็จ

## ขีดจำกัดของแก๊ส {#gas-limit}

แต่ละบล็อกและธุรกรรมมีขีดจำกัดสำหรับการใช้แก๊สบล็อกสามารถประกอบด้วยธุรกรรมหลายชนิด แต่แก๊สที่ใช้โดยธุรกรรมทั้งหมดในบล็อกต้องน้อยกว่าขีดจำกัดของแก๊สเพื่อหลีกเลี่ยงบล็อกขนาดใหญ่

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

โปรดทราบว่าการปรับเปลี่ยนสถานะกับธุรกรรมแต่ละครั้งต้องใช้แก๊ส รวมทั้งการตรวจยืนยันลายเซ็นสำหรับธุรกรรม

### ขีดจำกัดของแก๊สในบล็อก {#block-gas-limit}

ในขณะตั้งค่าพารามิเตอร์ฉันทามติของแอป จะมีการผ่านค่าสูงสุดสำหรับขีดจำกัดของแก๊สในบล็อกและจำนวนไบต์ต่อบล็อก: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### ขีดจำกัดของแก๊สสำหรับธุรกรรม {#transaction-gas-limit}

ขีดจำกัดของแก๊สสำหรับธุรกรรมกำหนดไว้ในพารามิเตอร์ในโมดูล `auth`สามารถเปลี่ยนแปลงได้โดยใช้โมดูล `gov` บน Heimdall

### จำกัดแก๊สการโอนแบบ เช็คพอยต์ {#checkpoint-transaction-gas-limit}

เนื่องจากบล็อกประกอบด้วยธุรกรรมหลายรายการ และตรวจยืนยันธุรกรรมดังกล่าวบนเชน Ethereum จึงจำเป็นต้องใช้การพิสูจน์ Merkleเพื่อหลีกเลี่ยงการตรวจยืนยันเพิ่มเติมด้วยการพิสูจน์ Merkle สำหรับธุรกรรมเช็คพอยต์ Heimdall จึงอนุญาตเพียงธุรกรรมเดียวในบล็อกสำหรับธุรกรรมประเภท `MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## การตรวจยืนยันธุรกรรมและการป้องกันการใช้งานซ้ำ {#transaction-verification-and-replay-protection}

ตัวจัดการ Ante ควบคุมและตรวจยืนยันลายเซ็นในธุรกรรมที่เข้ามา: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

แต่ละธุรกรรมต้องมี `sequenceNumber` เพื่อป้องกันการโจมตีด้วยการใช้งานซ้ำหลังจากที่การรวมธุรกรรมเป็นผลสำเร็จแต่ละครั้ง ตัวจัดการ Ante จะเพิ่มหมายเลขลำดับสำหรับบัญชีผู้ส่ง TX เพื่อป้องกันการดำเนินการซ้ำสำหรับธุรกรรมก่อนหน้า (การใช้งานซ้ำ)