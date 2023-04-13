---
id: chainmanager
title: Chain Manager
description: Modulo che fornisce tutte le dipendenze necessarie
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Chain Manager {#chain-manager}

Questo documento specifica una panoramica del modulo chain manager di Heimdall.

Il modulo **chain manager** fornisce tutte le dipendenze necessarie come `contract-addresses`, `bor_chain_id,`e .`tx_confirmation_time` Altri parametri possono essere aggiunti in un secondo momento.

I parametri vengono aggiornati attraverso il modulo `gov`.

## Tipi {#types}

La struttura di Chain Manager su Heimdall si presenta così:

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

## Comandi CLI {#cli-commands}

### Parametri {#parameters}

Per stampare tutte le parametri;

```go
heimdallcli query chainmanager params --trust-node
```

### Risultato atteso {#expected-result}

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

| Nome | Metodo | URL |
|----------------------|------|------------------|
| Parametri | GET | chainmanager/parametri |

Tutte le API di query forniranno una risposta nel seguente formato:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
