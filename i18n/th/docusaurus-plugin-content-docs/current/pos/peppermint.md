---
id: peppermint
title: Peppermint
description: Peppermint คือเมนต์ที่รองรับ Ethereum
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint เป็น Tendermint แบบดัดแปลงโดยปรับเปลี่ยนเพื่อให้เข้ากันได้กับที่อยู่ Ethereum และตรวจสอบความถูกต้องได้บนเชน Ethereum

## ภาพรวม {#overview}

1. การเปลี่ยนแปลงรูปแบบการลงนาม
2. การเปลี่ยนแปลงใน `vote` เพื่อให้สามารถตรวจสอบได้บนสัญญาอัจฉริยะ Ethereum
3. การเปลี่ยนแปลงรูปแบบการเข้ารหัส `vote`

Peppermint ใช้โครงการ`secp256k1`ลายเซ็นเพื่อตรวจสอบโหวตของ Tendermint บนสัญญาอัจฉริยะของโซลิity

ที่มา: [https://github.com/maticnetwork/tender/blob/people/peoption/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

โดยเพิ่มฟิลด์ `Data` เข้าใน `Vote` และโครงสร้าง `Proposal` เพื่อให้ได้ `hash` สำหรับธุรกรรมในบล็อกในสัญญาอัจฉริยะ Peppermint จะมีการตรวจสอบว่า `Data` ตรงกับแฮชข้อมูลเช็คพอยต์และการลงนามของตัวตรวจสอบความถูกต้องส่วนใหญ่ (⅔+1) หรือไม่แนวคิดคือตรวจสอบว่าชุดตัวตรวจสอบความถูกต้องส่วนใหญ่เห็นด้วยกับธุรกรรมในสัญญาหรือไม่

Peppermint ใช้ RLP เพื่อให้ได้ไบต์ `Vote` แทนการเข้ารหัส Amino`Data`นี่คือ`Txs.Hash()`สำหรับบล็อก

ที่มา: [https://github.com/maticnetwork/tenter/blob/peppermint /tes/canal.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

```go
// [peppermint] create RLP vote to decode in contract
type CanonicalRLPVote struct {
	ChainID string
	Type    byte
	Height  uint
	Round   uint
	Data    []byte
}
```

และการใช้ไลบรารีการเข้ารหัส RLP เพื่อรับข้อมูลไบต์สำหรับการลงนามใน Vote

ที่มา: [https://github.com/maticnetwork/tenter/blob/peppermint /tes/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

```go
func (vote *Vote) SignBytes(chainID string) []byte {
	// [peppermint] converted from amino to rlp
	bz, err := rlp.EncodeToBytes(CanonicalizeVote(chainID, vote))
	if err != nil {
		panic(err)
	}
	return bz
}
```

ที่มา[ครบวงจร https://github.com/maticnetwork/Converted](https://github.com/maticnetwork/tendermint)
