---
id: auth
title: Auth
description: โมดูลสำหรับการกำหนดธุรกรรมพื้นฐานและประเภทบัญชี
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# โมดูลการAuthor {#auth-module}

เอกสารนี้อธิบาย`auth`โมดูลของ Heimdall

โมดูล `auth` มีหน้าที่กำหนดประเภทบัญชีและธุรกรรมพื้นฐานสำหรับแอปพลิเคชันประกอบด้วยตัวจัดการ Ante ซึ่งทำการตรวจสอบความถูกต้องของธุรกรรมพื้นฐานทั้งหมด (การลงนาม, nonce, ฟิลด์เสริม) และแสดงตัวดูแลบัญชี ซึ่งช่วยให้โมดูลอื่นๆ สามารถอ่าน เขียน และแก้ไขบัญชีได้

## แก๊สและค่าธรรมเนียม {#gas-and-fees}

ค่าธรรมเนียมมีวัตถุประสงค์สองประการสำหรับตัวดำเนินการเครือข่าย

ค่าธรรมเนียมจำกัดการเติบโตของสถานะที่จัดเก็บโดยโหนดเต็มทุกโหนด และอนุญาตให้มีการตรวจสอบยับยั้งธุรกรรมทั่วไปที่มีมูลค่าทางเศรษฐกิจเพียงเล็กน้อยค่าธรรมเนียมเหมาะสมที่สุดในฐานะกลไกป้องกันสแปม โดยที่ไม่สนใจตัวตรวจสอบความถูกต้องในการใช้เครือข่ายและข้อมูลประจำตัวของผู้ใช้

เนื่องจาก Heimdall ไม่รองรับสัญญาหรือโค้ดสำหรับธุรกรรมใด ๆ จึงใช้ธุรกรรมค่าใช้จ่ายที่กำหนดสำหรับธุรกรรมต้นทุนคงที่ ตัวตรวจสอบความถูกต้องสามารถเติมเงินในบัญชีของตนในเชน Ethereum และรับโทเค็นบน Heimdall โดยใช้โมดูล [Topup](Topup.md)

## ประเภท {#types}

นอกจากบัญชี (ที่ระบุในสถานะ) ประเภทที่ได้รับโดยโมดูลที่ ath คือ **StdSignature** การรวมกันของคีย์สาธารณะตัวเสริมและลายเซ็น**ของ** cryptoographs เป็น aray **โดย** StdTx โครงสร้างที่ใช้งานต่อ`sdk.Tx`อินเทอร์เฟซโดยใช้ StdSignature และ **StdSignDSign,** โครงสร้างการป้องกันการเล่นใหม่สำหรับ **StdTx** ซึ่งผู้ส่งธุรกรรมต้องลงนามด้วย

### StdSignature {#stdsignature}

`StdSignature` คือประเภทอาร์เรย์ของไบต์

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

`StdTx` เป็นโครงสร้างที่นำอินเทอร์เฟซ `sdk.Tx` ไปใช้ และมีแนวโน้มเป็นแบบทั่วไปเพื่อให้เพียงพอที่จะตอบสนองต่อวัตถุประสงค์ของธุรกรรมหลายประเภท

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

`StdSignDoc` เป็นโครงสร้างการป้องกันการเล่นซ้ำที่ต้องลงนาม ซึ่งทำให้มั่นใจได้ว่าธุรกรรมใดๆ ที่ส่ง (ซึ่งเป็นเพียงการลงนามบนสตริงของไบต์เฉพาะ) จะสามารถดำเนินการได้เพียงครั้งเดียวบน Heimdall

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### บัญชี {#account}

จัดการที่อยู่ เหรียญ และ Nonce สำหรับธุรกรรมนอกจากนี้ ยังลงนามและตรวจสอบการทำธุรกรรม

ที่มา: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## พารามิเตอร์ {#parameters}

โมดูลการตรวจสอบความถูกต้องประกอบด้วยพารามิเตอร์ต่อไปนี้:

| คีย์ | ประเภท | ค่าเริ่มต้น |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | สตริง | "1000000000000000" |


## คำสั่ง CLI {#cli-commands}

### แสดงบัญชี {#show-account}

เพื่อพิมพ์ข้อมูลที่เกี่ยวข้องกับ Heimdall

```bash
heimdalld show-account
```

ผลที่คาดไว้:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### รายละเอียดบัญชีและเหรียญ {#account-and-coin-details}

เพื่อแสดงรายละเอียดบัญชี, เหรียญ ลำดับและหมายเลขบัญชี;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

ผลที่คาดไว้:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### พารามิเตอร์ {#parameters-1}

เพื่อพิมพ์พารามิเตอร์ทั้งหมด;

```go
heimdallcli query auth params
```

ผลที่คาดไว้:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API {#rest-apis}

| ชื่อ | Endpoint | คำอธิบาย |
|----------------------|--------|------------------|
| รายละเอียดบัญชี | /auth/accounts/{address} | ส่งกลับรายละเอียดทั้งหมดสำหรับที่อยู่ |
| รายละเอียดลำดับบัญชี | /auth/accounts/{address}/sequence | ส่งกลับเฉพาะรายละเอียดที่จำเป็นสำหรับการลงนาม |
| พารามิเตอร์ตรวจสอบความถูกต้อง | /auth/params | ส่งคืนพารามิเตอร์ทั้งหมดที่โมดูลตรวจสอบความถูกต้องใช้ |
