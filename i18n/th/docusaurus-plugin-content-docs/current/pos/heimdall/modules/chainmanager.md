---
id: chainmanager
title: ตัวจัดการเชน
description: โมดูลที่ให้การพึ่งพาที่จำเป็นทั้งหมด
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# ตัวจัดการเชน {#chain-manager}

เอกสารนี้ระบุภาพรวมของโมดูลตัวจัดการโซ่ของ Heimdall

โมดูล**ตัวจัดการโซ่**มีหน้าที่เชื่อมต่อที่จำเป็นทั้งหมด `contract-addresses`เช่น , `bor_chain_id,`และ`tx_confirmation_time`โดยสามารถเพิ่มพารามิเตอร์อื่นๆ ได้ในภายหลัง

โดยพารามิเตอร์จะถูกอัปเดตผ่านทางโมดูล `gov`

## ประเภท {#types}

โครงสร้างตัวจัดการเชนบน Heimdall มีลักษณะดังต่อไปนี้:

```go
type ChainParams struct {
	// BorChainID is valid bor chainId
	BorChainID            string                  `json:"bor_chain_id" yaml:"bor_chain_id"`

	// MaticTokenAddress is valid matic token address
	MaticTokenAddress     hmTypes.HeimdallAddress `json:"matic_token_address" yaml:"matic_token_address"`

	// StakingManagerAddress is valid contract address
	StakingManagerAddress hmTypes.HeimdallAddress `json:"staking_manager_address" yaml:"staking_manager_address"`

	// RootChainAddress is valid contract address
	RootChainAddress      hmTypes.HeimdallAddress `json:"root_chain_address" yaml:"root_chain_address"`

	// StakingInfoAddress is valid contract address
	StakingInfoAddress    hmTypes.HeimdallAddress `json:"staking_info_address" yaml:"staking_info_address"`

	// StateSendedAddress is valid contract address
	StateSenderAddress    hmTypes.HeimdallAddress `json:"state_sender_address" yaml:"state_sender_address"`

	// Bor Chain Contracts
	// StateReceiveAddress is valid contract address
	StateReceiverAddress hmTypes.HeimdallAddress `json:"state_receiver_address" yaml:"state_receiver_address"`

	// ValidatorSetAddress is valid contract address
	ValidatorSetAddress  hmTypes.HeimdallAddress `json:"validator_set_address" yaml:"validator_set_address"`
}
```

## คำสั่ง CLI {#cli-commands}

### พารามิเตอร์ {#parameters}

เพื่อพิมพ์พารามิเตอร์ทั้งหมด;

```go
heimdallcli query chainmanager params --trust-node
```

### ผลที่คาดไว้ {#expected-result}

```yaml
tx_confirmation_time: 12s
chain_params:
  bor_chain_id: "15001"
  matic_token_address: "0x0000000000000000000000000000000000000000"
  staking_manager_address: "0x0000000000000000000000000000000000000000"
  root_chain_address: "0x0000000000000000000000000000000000000000"
  staking_info_address: "0x0000000000000000000000000000000000000000"
  state_sender_address: "0x0000000000000000000000000000000000000000"
  state_receiver_address: "0x0000000000000000000000000000000000000000"
  validator_set_address: "0x0000000000000000000000000000000000000000"
```

### REST API {#rest-apis}

| ชื่อ | เมธอด | URL |
|----------------------|------|------------------|
| Params | GET | chainmanager/params |

เอพีไอแบบสอบถามทั้งหมดจะให้การตอบกลับในรูปแบบต่อไปนี้:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
