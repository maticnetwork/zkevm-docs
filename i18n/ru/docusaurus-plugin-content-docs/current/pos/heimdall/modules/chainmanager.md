---
id: chainmanager
title: Менеджер цепочек
description: Модуль обеспечивает все необходимые зависимости
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Менеджер цепочек {#chain-manager}

Этот документ содержит обзор модуля менеджера цепочки Heimdall.

Модуль **менеджера** цепочки обеспечивает все необходимые зависимости, такие как `contract-addresses`, `bor_chain_id,`и .`tx_confirmation_time` Другие параметры могут быть добавлены позже.

Параметры обновляются через модуль `gov`.

## Типы {#types}

Структура менеджера цепочек в Heimdall выглядит следующим образом:

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

## Команды CLI {#cli-commands}

### Параметры {#parameters}

Чтобы вывести все параметры;

```go
heimdallcli query chainmanager params --trust-node
```

### Ожидаемый результат {#expected-result}

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

| Название | Метод | Ссылка |
|----------------------|------|------------------|
| Params | GET | chainmanager/params |

Все API запроса будут отвечать в следующем формате:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
