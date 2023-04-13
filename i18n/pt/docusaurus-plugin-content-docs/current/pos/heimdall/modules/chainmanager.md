---
id: chainmanager
title: Gestor de Chain
description: Módulo que fornece todas as dependências necessárias
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Gestor de Chain {#chain-manager}

Este documento especifica uma visão geral do módulo do gerenciador de chain do Heimdall.

O módulo **do gerenciador** de chain fornece todas as dependências necessárias `contract-addresses`como `bor_chain_id,`e .`tx_confirmation_time` Outros parâmetros podem ser adicionados mais tarde.

Os params são atualizados através do módulo `gov`.

## Tipos {#types}

A estrutura Chainmanager no Heimdall tem este aspeto:

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

## Comandos do CLI {#cli-commands}

### Parâmetros {#parameters}

Para imprimir todos os parâmetros;

```go
heimdallcli query chainmanager params --trust-node
```

### Resultado esperado {#expected-result}

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

### APIs REST {#rest-apis}

| Nome | Método | URL |
|----------------------|------|------------------|
| Params | GET | chainmanager/params |

Todas as APIs de consulta fornecerão resposta no seguinte formato:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
