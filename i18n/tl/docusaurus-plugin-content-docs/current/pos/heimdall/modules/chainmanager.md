---
id: chainmanager
title: Chain Manager
description: Module na nagbibigay ng lahat ng kinakailangang dependency
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Chain Manager {#chain-manager}

Tinukoy ng dokumentong ito ang isang pangkalahatang-ideya ng chain manager module ng Heimdall.

Nagbibigay ang module ng **chain manager** ng lahat ng kinakailangang dependency tulad ng `contract-addresses`, `bor_chain_id,`at .`tx_confirmation_time` Ang iba pang mga parameter ay maaaring idagdag dito sa ibang pagkakataon.

Ang mga Params ay na-update sa pamamagitan ng `gov`modyul.

## Mga Uri {#types}

Ang Chainmanager istraktura Heimdall ay mukhang ang mga sumusunod:

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

## Mga CLI Command {#cli-commands}

### Mga Parameter {#parameters}

Para i-print ang lahat ng param;

```go
heimdallcli query chainmanager params --trust-node
```

### Inaasahang Resulta {#expected-result}

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

| Pangalan | Pamamaraan | URL |
|----------------------|------|------------------|
| Params | GET | chainmanager/params |

Magkakaloob ang lahat ng query API ng tugon sa sumusunod na format:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
