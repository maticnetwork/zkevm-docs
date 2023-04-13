---
id: clerk
title: Clerk
description: Modul, das generische State-Sync von Ethereum zu Bor verwaltet.
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

Clerk verwaltet die generische State-Sync von der Ethereum-Chette zur Bor-Chain. Heimdall stimmt der State Sync zu, die auf der Ethereum-Chain mit dem Clerk initiiert wird.

Weitere Details sind im [State Sync Mechanismus](/docs/pos/bor/core_concepts.md#state-management-state-sync) verfügbar

## Nachrichten {#messages}

### MsgEventRecord {#msgeventrecord}

Die Transaktion von `MsgEventRecord` ist verantwortlich für die Validierung von Ereignissen aus `StateSender.sol` und die Speicherung des Zustands auf Heimdall für Bor zur Verwendung.

Der Handler für diese Transaktion validiert für jede gegebene `msg.TxHash` und `msg.LogIndex`. Es wird der Fehler `Older invalid tx found` ausgegeben, wenn versucht wird, die Transaktion mehr als einmal zu verarbeiten.

Hier finden Sie die Struktur einer Top-Up-Transaktionsnachricht:

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

## CLI Befehle {#cli-commands}

### Senden der Status-Datensatz-Transaktion {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### So fragen Sie einen bereits validierten Ereignisdatensatz ab {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST APIs {#rest-apis}

| Name | Methode | Endpunkt |
|----------------------|------|------------------|
| Ereignisdatensatzdetails | HOLEN | /clerk/event-record/<record-id\> |
| Alle Ereignis-Datensätze | HOLEN | /clerk/event-record/list |
