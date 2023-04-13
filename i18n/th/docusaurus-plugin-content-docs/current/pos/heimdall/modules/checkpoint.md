---
id: checkpoint
title: เช็คพอยต์
description: โมดูลที่จัดการการทำงานที่เกี่ยวข้องกับเช็คพอยต์โดยจัดการกับฟังก์ชัน
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# เช็คพอยต์ {#checkpoint}

โมดูล `checkpoint` จัดการการทำงานเกี่ยวกับเช็คพอยต์สำหรับ Heimdallโดยต้องใช้เชน Bor เมื่อมีการเสนอเช็คพอยต์ใหม่บน Heimdall เพื่อตรวจยืนยันแฮชต้นทางของเช็คพอยต์

ทั้งหมดที่เกี่ยวข้องกับข้อมูลเช็คพอยต์มีการอธิบายรายละเอียด[ได้ที่นี่](/docs/pos/heimdall/checkpoint)

## วงจรชีวิตของเช็คพอยต์ {#checkpoint-life-cycle}

Heimdall ใช้อัลกอริทึมที่เลือกผู้นำแบบเดียวกันคือ Tendermint เพื่อเลือกผู้เสนอถัดไปในขณะที่ส่งเช็คพอยต์บนเชน Ethereum การทำงานอาจล้มเหลวได้เนื่องด้วยสาเหตุหลายประการ เช่น ขีดจำกัดของแก๊ส ปริมาณการใช้งานบน Ethereum ค่าแก๊สสูง จึงเป็นสาเหตุที่ต้องใช้กระบวนการเช็คพอยต์หลายระยะ

เช็คพอยต์แต่ละตัวมีตัวตรวจสอบความถูกต้องในฐานะผู้เสนอหากเช็คพอยต์บนเชน Ethereum ล้มเหลวหรือประสบความสำเร็จ `ack`และ`no-ack`ธุรกรรมจะเปลี่ยนผู้เสนอบน Heimdall สำหรับเช็คพอยต์ถัดไปแผนการไหลต่อไปนี้แสดงวงจรชีวิตของเช็คพอยต์:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## ข้อความ {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` จัดการการตรวจยืนยันเช็คพอยต์บน Heimdallเฉพาะข้อความนี้ใช้การเข้ารหัส RLP เนื่องจากจำเป็นต้องมีการตรวจสอบบนเชน Ethereum

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

เมื่อประมวลผลธุรกรรมนี้บน Heimdall แล้ว `proposer` จะรับ `votes` และ `sigs` จาก Tendermint สำหรับธุรกรรมนี้ และส่งเช็คพอยต์บนเชน Ethereum

เนื่องจากบล็อกประกอบด้วยธุรกรรมหลายรายการ และตรวจยืนยันธุรกรรมดังกล่าวบนเชน Ethereum จึงจำเป็นต้องใช้การพิสูจน์ Merkleเพื่อหลีกเลี่ยงการตรวจยืนยันด้วยการพิสูจน์ Merkle บน Ethereum เพิ่มเติม Heimdall จึงอนุญาตเพียงธุรกรรมเดียวในบล็อกสำหรับธุรกรรมประเภท `MsgCheckpoint`

เพื่อให้กลไกนี้ทำงานได้ Heimdall จึงตั้งค่าธุรกรรม `MsgCheckpoint` เป็นธุรกรรมที่ใช้แก๊สในปริมาณสูงตรวจดู [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

ธุรกรรมนี้จะเก็บเช็คพอยต์ที่เสนอในสถานะ `checkpointBuffer` แทนสถานะของรายการเช็คพอยต์จริง

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` จัดการการส่งเช็คพอยต์ที่เป็นผลสำเร็จ`HeaderBlock`นี่คือตัวตอบรับ

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

เพื่อ `TxHash` และ `LogIndex` ที่ถูกต้องสำหรับเช็คพอยต์ที่เสนอ ธุรกรรมนี้ตรวจยืนยันเหตุการณ์ต่อไปนี้และตรวจสอบความถูกต้องของเช็คพอยต์ในสถานะ `checkpointBuffer`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

เมื่อตรวจสอบเหตุการณ์ที่ประสบความสำเร็จ ก็จะอัปเดตจำนวนเช็คพอยต์จริง ซึ่งรู้จักกันในนาม `ackCount`และล้างความสะอาด`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` จัดการเช็คพอยต์ที่ทำงานไม่สำเร็จหรือผู้เสนอออฟไลน์ธุรกรรมนี้ใช้งานได้ก็ต่อเมื่อหลังจาก `CheckpointBufferTime` ได้ผ่านไปแล้วจากเหตุการณ์ต่อไปนี้:

- ธุรกรรม `ack` ที่ทำงานสำเร็จล่าสุด
- ธุรกรรม `no-ack` ที่ทำงานสำเร็จล่าสุด

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

ธุรกรรมนี้ให้ช่วงการหมดเวลาเพื่อให้ผู้เสนอล่าสุดส่ง checkpoint/ack ก่อนที่ Heimdall จะเลือก `proposer` ใหม่สำหรับเช็คพอยต์ถัดไป

## พารามิเตอร์ {#parameters}

โมดูลเช็คพอยต์ประกอบพารามิเตอร์ต่อไปนี้:

| คีย์ | ประเภท | ค่าเริ่มต้น |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## คำสั่ง CLI {#cli-commands}

### พารามิเตอร์ {#params}

เพื่อพิมพ์พารามิเตอร์ทั้งหมด:

```go
heimdallcli query checkpoint params --trust-node
```

ผลที่คาดไว้:

```yaml
checkpoint_buffer_time: 16m40s
```

### ส่งเช็คพอยต์ {#send-checkpoint}

คำสั่งต่อไปนี้ส่งธุรกรรมเช็คพอยต์บน Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### ส่ง`ack`

คำสั่งต่อไปนี้ส่งธุรกรรม ack บน Heimdall หากเช็คพอยต์ทำงานสำเร็จบน Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### ส่ง`no-ack`

คำสั่งต่อไปนี้ส่งธุรกรรม no-ack บน Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| ชื่อ | เมธอด | ตำแหน่งข้อมูล |
|----------------------|------|------------------|
| รับสถานะบัฟเฟอร์ของเช็คพอยต์ปัจจุบัน | GET | /checkpoint/buffer |
| รับจำนวนเช็คพอยต์ | GET | /checkpoint/count |
| รับรายละเอียดเช็คพอยต์ตามดัชนีบล็อก | GET | /checkpoint/headers/<header-block-index\> |
| รับเช็คพอยต์ล่าสุด | GET | /checkpoint/latest-checkpoint |
| รับรายละเอียดของ no-ack ล่าสุด | GET | /checkpoint/last-no-ack |
| รายละเอียดเช็คพอยต์สำหรับบล็อกเริ่มต้นและสิ้นสุดที่กำหนด | GET | /checkpoint/<start\>/<end\> |
| เช็คพอยต์ตามหมายเลข | GET | /checkpoint/<checkpoint-number\> |
| เช็คพอยต์ทั้งหมด | GET | /checkpoint/list |
| รับจำนวน ack บัฟเฟอร์ ชุดตัวตรวจสอบความถูกต้อง จำนวนตัวตรวจสอบความถูกต้อง และรายละเอียดของ no-ack ล่าสุด  | GET | /overview |


เอพีไอแบบสอบถามทั้งหมดจะให้ผลลัพธ์ในรูปแบบต่อไปนี้:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
