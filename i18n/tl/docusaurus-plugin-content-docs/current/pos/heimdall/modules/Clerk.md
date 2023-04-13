---
id: clerk
title: Klerk
description: Module na namamahala ng generic state-sync mula sa Ethereum hanggang sa Bor
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Klerk {#clerk}

Pinamamahalaan ng Clerk ang generic na state-sync mula sa Ethereum chain hanggang sa Bor chain. Sumasang-ayon ang Heimdall sa state sync, na sinimulan sa Ethereum chain gamit ang Clerk module.

Makukuha ang karagdagang detalye sa [state sync mechanism](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Mga mensahe {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord``StateSender.sol`ang transaksyon ay responsable para sa pagpapatunay ng mga kaganapan mula sa at pag-iimbak ng estado sa Heimdall para magamit ng Bor.

Ang handler para sa transaksyon na ito ay nagpapatunay para sa anumang ibinigay na `msg.TxHash`at `msg.LogIndex`Nagbabato ito ng `Older invalid tx found`error kung sinusubukang iproseso ang transaksyon nang higit sa isang beses.

Narito ang istraktura para sa mensahe ng transaksyon:

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

## Mga CLI Command {#cli-commands}

### Magpadala ng rekord ng transaksyon ng estado {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Upang i-query ang na-validate na record ng kaganapan ng estado {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| Pangalan | Pamamaraan | Endpoint |
|----------------------|------|------------------|
| Mga detalye ng talaan ng kaganapan | GET | /clerk/event-record/<record-id\> |
| Lahat ng mga tala ng kaganapan | GET | /clerk/event-record/list |
