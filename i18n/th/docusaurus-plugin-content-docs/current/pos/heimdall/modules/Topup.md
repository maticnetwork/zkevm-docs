---
id: topup
title: Topup
description: จำนวนที่จะใช้เพื่อจ่ายค่าใช้จ่ายบนเชน Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Heimdall Topup เป็นจำนวนที่จะใช้เพื่อชำระค่าธรรมเนียมบนเชน Heimdall

มีสองวิธีในการเติมบัญชีของคุณ:

1. เมื่อเข้าร่วม ตัวตรวจสอบความถูกต้องใหม่จะสามารถกล่าวถึง`topup`จำนวนที่เติมเติมเพื่อเพิ่มเติมเติมเติมค่าใช้จ่ายที่กำหนด ซึ่งจะมีการย้ายเป็นดุลยพินิจบนเชน Heimdall เพื่อจ่ายค่าธรรมเนียมบน Heimdall
2. ผู้ใช้สามารถเรียกฟังก์ชันการอัพโหลดบนสัญญาอัจฉริยะการเดิมพันบน Ethereum โดยตรงเพื่อเพิ่มยอดคงเหลือบน Heimdall

## ข้อความ {#messages}

### MsgTopup {#msgtopup}

ธุรกรรม `MsgTopup` มีหน้าที่สร้างข้อมูลยอดคงเหลือไปยังที่อยู่บน Heimdall ตาม `TopUpEvent` ของเชน Ethereum บนสัญญาตัวจัดการ Stake

ตัวจัดการสำหรับธุรกรรมนี้ดำเนินการเติมเงินและเพิ่มยอดคงเหลือเพียงครั้งเดียวสำหรับ `msg.TxHash` และ `msg.LogIndex` ที่ระบุตัวจัดการจะส่งข้อผิดพลาด `Older invalid tx found` หากพยายามประมวลผลการเติมเงินมากกว่าหนึ่งครั้ง

นี่คือโครงสร้างข้อความธุรกรรมเติมเงิน:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

ธุรกรรม `MsgWithdrawFee` มีหน้าที่ถอนยอดคงเหลือจาก Heimdall ไปยังเชน Ethereumตัวตรวจสอบความถูกต้องสามารถถอนยอดจำนวนเท่าใดก็ได้จาก Heimdall

ตัวจัดการจะประมวลผลการถอนโดยหักยอดคงเหลือจากตัวตรวจสอบความถูกต้องที่กำหนดและเตรียมสถานะเพื่อส่งเช็คพอยต์ถัดไปเช็คพอยต์ถัดไปที่เป็นไปได้จะมีสถานะที่เกี่ยวข้องกับการถอนสำหรับตัวตรวจสอบความถูกต้องที่ระบุ

ตัวจัดการได้รับข้อมูลตัวตรวจสอบความถูกต้องตาม `ValidatorAddress` และประมวลผลการถอน

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## คำสั่ง CLI {#cli-commands}

### ค่าธรรมเนียมการเติมเงิน {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### ค่าธรรมเนียมการถอน {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

หากต้องการตรวจสอบการเติมเงินที่มีผลแล้วในบัญชี ให้เรียกใช้คำสั่งต่อไปนี้

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| ชื่อ | เมธอด | URL | คำอธิบายพารามิเตอร์ |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| ค่าธรรมเนียมการเติมเงิน | POST | /topup/fee | `id` ID ตัวตรวจสอบความถูกต้อง `tx_hash` แฮชธุรกรรมของอีเวนต์เติมเงินที่ประสบความสำเร็จบนเชน Ethereum `log_index` ดัชนีบันทึกของอีเวนต์เติมเงินที่ปล่อยบนเชน Ethereum |
| ค่าธรรมเนียมการถอน | POST | /topup/withdraw | `amount`ยอดการถอน |
