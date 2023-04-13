---
id: chainmanager
title: Gestionnaire de Chaîne
description: Module qui fournit toutes les dépendances nécessaires
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Gestionnaire de Chaîne {#chain-manager}

Ce document spécifie un aperçu du module de gestionnaire de chaîne de Heimdall.

Le module **de gestionnaire de chaîne** fournit toutes les dépendances nécessaires comme `contract-addresses`, `bor_chain_id,`et .`tx_confirmation_time` D'autres paramètres peuvent être ajoutés à cela plus tard.

Les params sont mis à jour via le `gov`module.

## Types {#types}

La structure de Chainmanager sur Heimdall ressemble au suivant:

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

## Les Commandes CLI {#cli-commands}

### Paramètres {#parameters}

Pour imprimer tous les params;

```go
heimdallcli query chainmanager params --trust-node
```

### Résultat Attendu {#expected-result}

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

### API de REST {#rest-apis}

| Nom | Méthode | URL |
|----------------------|------|------------------|
| Params | GET | chainmanager/params |

Toutes les API de requête fourniront la réponse au format suivant:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
