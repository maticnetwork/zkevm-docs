---
id: chainmanager
title: Zincir Yöneticisi
description: Gerekli tüm bağımlılıkları sağlayan modül
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Zincir Yöneticisi {#chain-manager}

Bu belge Heimdall'ın zincir yöneticisi modülü hakkında genel bir bakış belirtir.

**Zincir yöneticisi** modülü `contract-addresses`gerekli tüm bağımlılıkları sağlar `bor_chain_id,`ve`tx_confirmation_time` Daha sonra buna diğer parametreler eklenebilir.

Parametreler, `gov` modülü üzerinden güncellenir.

## Türler {#types}

Heimdall’daki zincir yöneticisi yapısı şu şekilde görünür:

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

## CLI Komutları {#cli-commands}

### Parametreler {#parameters}

Tüm parametreleri yazdırmak için;

```go
heimdallcli query chainmanager params --trust-node
```

### Beklenen Sonuç {#expected-result}

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

### REST API’leri {#rest-apis}

| Ad | Yöntem | URL |
|----------------------|------|------------------|
| Parametreler | GET | chainmanager/params |

Tüm sorgu API'leri aşağıdaki formatta yanıt sağlayacaktır:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
