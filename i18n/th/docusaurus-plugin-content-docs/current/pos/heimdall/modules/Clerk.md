---
id: clerk
title: Clerk
description: โมดูลที่จัดการการซิงค์สถานะทั่วไปจาก Ethereum ถึง Bor
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerk จะจัดการการซิงค์สถานะทั่วไปจากเชน Ethereum ไปยังเชน BorHeimdall ตกลงบนซิงก์สถานะ ซึ่งเริ่มบนเชน Ethereum โดยใช้โมดูล Clerk

รายละเอียดเพิ่มเติมที่มีอยู่ใน[กลไกการซิงค์สถานะ](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## ข้อความ {#messages}

### MsgEventRecord {#msgeventrecord}

ธุรกรรม `MsgEventRecord` มีหน้าที่ตรวจสอบอีเวนต์การตรวจสอบความถูกต้องจาก `StateSender.sol` และจัดเก็บสถานะบน Heimdall เพื่อให้ Bor ใช้

ตัวจัดการธุรกรรมนี้ตรวจสอบความถูกต้องของ `msg.TxHash` และ `msg.LogIndex` ที่ระบุตัวจัดการจะส่งข้อผิดพลาด `Older invalid tx found` หากพยายามประมวลผลธุรกรรมมากกว่าหนึ่งครั้ง

นี่คือโครงสร้างข้อความธุรกรรม:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## คำสั่ง CLI {#cli-commands}

### ส่งธุรกรรมบันทึกสถานะ {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### เพื่อค้นหาบันทึกอีเวนต์สถานะที่ได้รับการตรวจสอบความถูกต้องแล้ว {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| ชื่อ | เมธอด | Endpoint |
|----------------------|------|------------------|
| รายละเอียดบันทึกอีเวนต์ | GET | /clerk/event-record/<record-id\> |
| บันทึกอีเวนต์ทั้งหมด | GET | /clerk/event-record/list |
