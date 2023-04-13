---
id: clerk
title: Clerk
description: Module qui gère la synchronisation d'état générique d'Ethereum à Bor
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerk gère la synchronisation d'état générique de la chaîne d'Ethereum à la chaîne de Bor. Heimdall est d'accord sur la synchronisation d'état, qui est initié sur la chaîne Ethereum à l'aide du module Clerk.

Plus de détails sont disponibles dans le [mécanisme de synchronisation d'état](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Messages {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord` La transaction est responsable de la validation des événements provenant de `StateSender.sol` et du stockage de l'état sur Heimdall pour que Bor puisse l'utiliser.

Le gestionnaire de cette transaction valide pour tout `msg.TxHash` et `msg.LogIndex`. Une erreur `Older invalid tx found` est générée si la transaction est traitée plus d'une fois.

Voici la structure pour le message de transaction:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## Commandes CLI {#cli-commands}

### Envoie d'une transaction d'enregistrement d'état {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Pour demander un enregistrement d'événement d'état déjà validé {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## API de REST {#rest-apis}

| Nom | Méthode | Point de terminaison |
|----------------------|------|------------------|
| Détails de l'enregistrement d'événement | GET | /clerk/event-record/<record-id\> |
| Tous les enregistrements d'événement | GET | /clerk/event-record/list |
