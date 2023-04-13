---
id: bank
title: Banque
description: Transferts de solde de compte de gestion de modules pour Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Module Banque {#bank-module}

Le `bank`module gère des transferts de balance de compte pour Heimdall. Ce module correspond au `bank` module de cosmos-sdk.

## Messages {#messages}

### MsgSend {#msgsend}

`MsgSend` gère le transfert entre les comptes dans Heimdall. Voici une structure pour le message de transaction:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` gère plusieurs transferts entre compte pour Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Paramètres {#parameters}

Le module de banque contient les paramètres suivants:

| Clé | Type | Valeur par défaut |
|----------------------|--------|------------------|
| `sendenabled` | bool | vrai |

## Les Commandes CLI {#cli-commands}

### Envoyer la balance {#send-balance}

La commande suivante enverra 1000 jetons matic à mentionnés `address`;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
