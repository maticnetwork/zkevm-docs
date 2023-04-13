---
id: chainmanager
title: Trình quản lý chuỗi
description: Mô-đun cung cấp tất cả các phụ thuộc cần thiết
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Trình quản lý chuỗi {#chain-manager}

Tài liệu này chỉ định một sự giám sát của môđun quản lý chuỗi của Heimdall.

Mô-đun **quản lý chuỗi** cung cấp tất cả các sự phụ thuộc cần thiết như `contract-addresses`, `bor_chain_id,`và .`tx_confirmation_time` Các tham số khác có thể được thêm vào tài liệu này sau.

Các tham số được cập nhật thông qua mô-đun`gov`.

## Loại {#types}

Cấu trúc Chainmanager trên Heimdall trông giống như sau:

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

## Lệnh CLI {#cli-commands}

### Tham số {#parameters}

Để in tất cả các para;

```go
heimdallcli query chainmanager params --trust-node
```

### Kết quả mong đợi {#expected-result}

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

### API REST {#rest-apis}

| Tên | Phương pháp | URL |
|----------------------|------|------------------|
| Tham số | GET | chainmanager/params |

Tất cả APis đều truy vấn sẽ cung cấp phản ứng theo định dạng sau:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
