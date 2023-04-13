---
id: clerk
title: Clerk
description: Modulo che gestisce la generica state-sync da Ethereum a Bor
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

Clerk gestisce la sincronizzazione generica dello stato dalla catena di Ethereum alla catena di Bor. Heimdall concorda sulla sincronizzazione di stato, che è iniziata sulla catena di Ethereum utilizzando il modulo Clerk.

Ulteriori dettagli sono disponibili [il meccanismo di sincronizzazione di stato](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Messaggi {#messages}

### MsgEventRecord {#msgeventrecord}

La transazione `MsgEventRecord` è responsabile della validazione degli eventi da `StateSender.sol`  e della memorizzazione dello stato su Heimdall per l'utilizzo da parte di Bor.

L'handler di questa transazione viene convalidato per ogni `msg.TxHash` e `msg.LogIndex` dato. Segnala errore `Older invalid tx found` se si cerca di elaborare la transazione più di una volta.

Ecco la struttura di un messaggio di transazione:

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

## Comandi CLI {#cli-commands}

### Invia la transazione per il record dello stato {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Per ricercare record di eventi di stato già convalidati {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## API REST {#rest-apis}

| Nome | Metodo | Endpoint |
|----------------------|------|------------------|
| Dettagli del record dell'evento | GET | /clerk/event-record/<record-id\> |
| Tutti i record di eventi | GET | /clerk/event-record/list |
