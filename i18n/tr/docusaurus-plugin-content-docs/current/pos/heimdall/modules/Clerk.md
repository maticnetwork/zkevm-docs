---
id: clerk
title: Clerk
description: Ethereum'dan Bor için genel durum senkronizasyonunu yöneten modül
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

Clerk, ethereum zinciri ile bor zinciri arasında genel durum senkronizasyonunu yönetir. Heimdall Ethereum zincirinde Clerk modülü kullanılarak başlatılan devlet senkronizasyonu üzerinde kabul eder.

Daha fazla ayrıntı [devlet senkronizasyon mekanizmasında](/docs/pos/bor/core_concepts.md#state-management-state-sync) mevcuttur

## Mesajlar {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord` işlemi, `StateSender.sol` işleminden gelen olayların doğrulanmasından ve Bor'un kullanması için durumun Heimdall üzerinde depolanmasından sorumludur.

Bu işlemi ele alan herhangi bir `msg.TxHash` ve `msg.LogIndex` için doğrular. İşlemi birden fazla kez yapmaya çalışırsa `Older invalid tx found` hatasını atar.

İşlem mesajı için yapı şu şekildedir:

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

## CLI komutları {#cli-commands}

### Durum kayıt işlemi gönder {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Zaten doğrulanmış olay kaydını sorgulamak {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API’leri {#rest-apis}

| Ad | Yöntem | Bitiş noktası |
|----------------------|------|------------------|
| Olay kayıt detayları | GET | /clerk/event-record/<record-id\> |
| Tüm olay kayıtları | GET | /clerk/event-record/list |
