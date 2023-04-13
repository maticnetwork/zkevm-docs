---
id: bank
title: ธนาคาร
description: โมดูลการจัดการการโอนยอดคงเหลือของบัญชีสำหรับ Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# โมดูลของธนาคาร {#bank-module}

โมดูล `bank` ทำหน้าที่จัดการการโอนยอดคงเหลือของบัญชีสำหรับ Heimdallโมดูลนี้สอดคล้องกับโมดูล `bank` จาก Cosmos SDK

## ข้อความ {#messages}

### MsgSend {#msgsend}

`MsgSend` จัดการการโอนระหว่างบัญชีบน Heimdallโครงสร้างสำหรับข้อความของธุรกรรมมีดังนี้:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` จัดการการโอนหลายรายการระหว่างบัญชีสำหรับ Heimdall

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## พารามิเตอร์ {#parameters}

โมดูลธนาคารประกอบด้วยพารามิเตอร์ต่อไปนี้:

| คีย์ | ประเภท | ค่าเริ่มต้น |
|----------------------|--------|------------------|
| `sendenabled` | bool | true |

## คำสั่ง CLI {#cli-commands}

### ส่งยอดคงเหลือ {#send-balance}

คำสั่งต่อไปจะส่งโทเค็นแบบmatic 1000 ไปยังที่กล่าว`address`ถึงนี้

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
