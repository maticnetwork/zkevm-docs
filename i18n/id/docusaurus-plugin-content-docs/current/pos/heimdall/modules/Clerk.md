---
id: clerk
title: Clerk
description: Modul yang mengelola snc keadaan generik dari Ethereum ke Bor
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

Clerk mengelola sinkronisasi kondisi lazim dari rantai Ethereum ke rantai Bor. Heimdall setuju pada sinkronisasi keadaan yang dimulai pada rantai Ethereum menggunakan modul Clerk.

Detail lebih lanjut tersedia dalam mekanisme [sintesis](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Pesan {#messages}

### MsgEventRecord {#msgeventrecord}

Transaksi `MsgEventRecord` bertanggung jawab untuk memvalidasi peristiwa dari `StateSender.sol`  dan menyimpan kondisi ini di Heimdall untuk digunakan Bor.

Handler untuk transaksi ini memvalidasi untuk `msg.TxHash` dan `msg.LogIndex` tertentu apa pun. Handler melemparkan error `Older invalid tx found` jika mencoba memproses transaksi lebih dari sekali.

Berikut adalah struktur untuk pesan transaksi:

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

## Perintah CLI {#cli-commands}

### Mengirimkan transaksi rekaman kondisi {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Untuk meminta rekaman peristiwa kondisi yang sudah tervalidasi {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| Nama | Metode | Endpoint |
|----------------------|------|------------------|
| Detail rekaman peristiwa | GET | /clerk/event-record/<record-id\> |
| Semua rekaman peristiwa | GET | /clerk/event-record/list |
