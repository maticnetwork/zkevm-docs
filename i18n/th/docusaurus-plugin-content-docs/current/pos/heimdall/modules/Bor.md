---
id: bor
title: Bor
description: โมดูลที่จัดการการจัดการ Span บน Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# โมดูลสำหรับ Bor {#bor-module}

โมดูล Bor ดูแลการจัดการสแปนบน Heimdallสมมติให้จำนวนบล็อกปัจจุบันของเชน Bor เป็น `n`สแปนปัจจุบันเป็น `span` หาก `span.StartBlock <= n < span.EndBlock`สแปนใหม่จะได้รับการเสนอบน Heimdall โดยตัวตรวจสอบความถูกต้องใดก็ได้

## ข้อความ {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`ตั้งค่าคณะกรรมการของตัวตรวจสอบความถูกต้องสำหรับการกำหนด `span`และจัดเก็บสแปนใหม่เข้าสู่สถานะ Heimdall

ที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

```go
// MsgProposeSpan creates msg propose span
type MsgProposeSpan struct {
	ID         uint64                  `json:"span_id"`
	Proposer   hmTypes.HeimdallAddress `json:"proposer"`
	StartBlock uint64                  `json:"start_block"`
	EndBlock   uint64                  `json:"end_block"`
	ChainID    string                  `json:"bor_chain_id"`
}
```

นี่คือวิธีที่ธุรกรรมเลือกผู้สร้างบล็อกจากตัวตรวจสอบความถูกต้องทั้งหมด:

1. โดยสร้างสล็อตจำนวนมากตามอิทธิพลของตัวตรวจสอบความถูกต้องตัวอย่าง: A ที่มีอิทธิพล 10 หน่วยจะมี 10 สล็อต, B ที่มีอิทธิพล 20 หน่วยมี 20 สล็อต
2. ด้วยสล็อตทั้งหมด ฟังก์ชัน `shuffle` จะสับเปลี่ยนสล็อตโดยใช้ `seed` และเลือกผู้สร้างบล็อก `producerCount` รายแรก โมดูล `bor` บน Heimdall ใช้อัลกอริทึมการสับเปลี่ยน ETH 2.0 เพื่อเลือกผู้สร้างบล็อกจากตัวตรวจสอบความถูกต้องทั้งหมดแต่ละ Span `n` ใช้บล็อกแฮชของบล็อก Ethereum (ETH 1.0) `n` เป็น `seed`โปรดทราบว่าการเลือกตามสล็อตช่วยให้ตัวตรวจสอบความถูกต้องถูกเลือกตามอำนาจของตนตัวตรวจสอบความถูกต้องที่มีกำลังสูงกว่าขึ้นจะมีความน่าจะเป็นสูงกว่าที่จะถูกเลือกที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

## ประเภท {#types}

นี่คือรายละเอียดสแปนที่ Heimdall ใช้:

```go
// Span structure
type Span struct {
	ID                uint64       `json:"span_id" yaml:"span_id"`
	StartBlock        uint64       `json:"start_block" yaml:"start_block"`
	EndBlock          uint64       `json:"end_block" yaml:"end_block"`
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}
```

## พารามิเตอร์ {#parameters}

โมดูล Bor มีพารามิเตอร์ต่อไปนี้:

| คีย์ | ประเภท | ค่าเริ่มต้น |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## คำสั่ง CLI {#cli-commands}

### ธุรกรรมการเสนอสแปน {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### ค้นหาสแปนปัจจุบัน {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

เอาต์พุตที่คาดไว้:

```go
{
  "span_id":2,
  "start_block":6656,
  "end_block":13055,
  "validator_set":{
    "validators":[
      {
        "ID":1,
        "startEpoch":0,
        "endEpoch":0,
        "power":1,
        "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
        "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
        "last_updated":"",
        "accum":0
      }
    ],
    "proposer":{
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  },
  "selected_producers":[
    {
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  ],
  "bor_chain_id":"15001"
}
```

### ค้นหาสแปนตาม ID {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

ซึ่งจะสั่งพิมพ์ผลลัพธ์ในรูปแบบเดียวกับด้านบน

### พารามิเตอร์ {#parameters-1}

เพื่อพิมพ์พารามิเตอร์ทั้งหมด;

```go
heimdalldcli query bor params
```

ผลที่คาดไว้:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API {#rest-apis}

| ชื่อ | เมธอด | Endpoint |
|----------------------|------|------------------|
| รายละเอียดของสแปน | GET | /bor/span/<span-id\> |
| รับสแปนล่าสุด | GET | /bor/latest-span |
| รับพารามิเตอร์ | GET | /bor/params |
