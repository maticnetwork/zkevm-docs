---
id: chainmanager
title: 체인 관리자
description: 필요한 모든 의존성을 제공하는 모듈
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 체인 관리자 {#chain-manager}

이 문서는 Heimdall의 체인 매니저 모듈의 개요를 지정합니다.

체인 **매니저** 모듈은 필요한 모든 `contract-addresses``bor_chain_id,`의존성을 제공합니다.`tx_confirmation_time` 나중에 다른 파라미터를 추가할 수 있습니다.

파라미터는 `gov` 모듈을 통해 업데이트됩니다.

## 유형 {#types}

Heimdall의 Chainmanager 구조는 다음과 같습니다.

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

## CLI 명령어 {#cli-commands}

### 파라미터 {#parameters}

모든 파라그램을 인쇄하려면

```go
heimdallcli query chainmanager params --trust-node
```

### 예상 결과 {#expected-result}

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

### 기타 API {#rest-apis}

| 이름 | 메서드 | URL |
|----------------------|------|------------------|
| 파라미터 | GET | chainmanager/params |

모든 쿼리 API는 다음 형식으로 응답을 제공합니다.

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
