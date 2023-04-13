---
id: governance
title: Governance
sidebar_label: Governance
description: ระบบที่มีโทเค็น 1 โหวต
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governance {#governance}

การกำกับดูแล Heimdall ทำงานเหมือนกับ[`x/gov`โมดูล Cosmos-sdk](https://docs.cosmos.network/master/modules/gov/)

ในระบบนี้ ผู้ถือโทเค็นการเดิมพันดั้งเดิมของเชนสามารถโหวตข้อเสนอได้ตามหลักการ `1 token = 1 vote`นี่คือรายการคุณสมบัติที่รองรับโมดูลปัจจุบัน:

- **การยื่นข้อเสนอ:** ตัวตรวจสอบความถูกต้องสามารถยื่นข้อเสนอที่เงินฝากได้ เมื่อถึงจำนวนขั้นต่ำในการฝากแล้ว ข้อเสนอก็จะเข้าสู่ช่วงเวลาโหวตตัวตรวจสอบความถูกต้องที่ได้ฝากเงินในข้อเสนอสามารถเรียกคืนการฝากได้ เมื่อข้อเสนอถูกปฏิเสธหรือยอมรับ
- **โวe:** ตัวตรวจสอบความถูกต้องสามารถลงคะแนนเกี่ยวกับข้อเสนอที่ถึง Mindeit

โดยมีทั้งช่วงเวลาฝากและช่วงเวลาโหวตเป็นพารามิเตอร์ในโมดูล `gov`จะต้องมีการจัดการเงินฝากขั้นต่ำก่อนวันฝากจะสิ้นสุดลง มิฉะนั้นจะปฏิเสธโดยอัตโนมัติ

เมื่อถึงจำนวนขั้นต่ำในการฝากภายในช่วงเวลาฝาก ช่วงเวลาโหวตจะเริ่มขึ้นในช่วงเวลาโหวต ตัวตรวจสอบความถูกต้องทั้งหมดควรจะโหวตตัวเลือกของตนสำหรับข้อเสนอ หลังจากที่ช่วงเวลาโหวดสิ้นสุดลง `gov/Endblocker.go` จะดำเนินการฟังก์ชัน `tally`  และยอมรับหรือปฏิเสธข้อเสนอตามหลักการ  `tally_params` — `quorum`, `threshold` และ `veto`

ที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

มีข้อเสนอประเภทต่าง ๆ ที่สามารถนำมาใช้งานใน Heimdallในขณะนี้ รองรับเฉพาะ**ข้อเสนอการเปลี่ยนแปลง Param**

### ข้อเสนอในการเปลี่ยนพารามิเตอร์ {#param-change-proposal}

โดยใช้ข้อเสนอประเภทนี้ ตัวตรวจสอบความถูกต้องสามารถเปลี่ยนแปลงใด ๆ `params``module`ใน Heimdall

ตัวอย่าง: เปลี่ยน `tx_fees` สำหรับธุรกรรมในโมดูล `auth`เมื่อยอมรับข้อเสนอแล้ว ก็จะเปลี่ยน `params` ในสถานะ Heimdall โดยอัตโนมัติไม่จำเป็นต้องใช้ TX เพิ่มเติม

## คำสั่ง CLI {#cli-commands}

### Query gov params {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

แสดงพารามิเตอร์ทั้งหมดสำหรับโมดูลการกำกับดูแล

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### ยื่นข้อเสนอ {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` คือไฟล์ที่รวมข้อเสนอในรูปแบบ json

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### สืบค้นข้อเสนอ {#query-proposal}

เพื่อตรวจสอบข้อเสนอทั้งหมด:

```go
heimdallcli query gov proposals --trust-node
```

เพื่อค้นหาข้อเสนอเฉพาะ:

```go
heimdallcli query gov proposals 1 --trust-node
```

### โหวตข้อเสนอ {#vote-on-proposal}

เพื่อโหวตเกี่ยวกับข้อเสนอเฉพาะ:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

ข้อเสนอจะถูกนับโดยอัตโนมัติภายหลังช่วงเวลาโหวต

## REST API {#rest-apis}

| ชื่อ | เมธอด | ตำแหน่งข้อมูล |
|----------------------|------|------------------|
| รับข้อเสนอทั้งหมด | GET | /gov/proposals |
| รับรายละเอียดข้อเสนอ | GET | /gov/proposals/`proposal-id` |
| รับโหวตทั้งหมดสำหรับข้อเสนอ | GET | /gov/proposals/`proposal-id`/votes |
