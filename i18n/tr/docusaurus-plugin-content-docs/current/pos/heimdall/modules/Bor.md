---
id: bor
title: Bor
description: Heimdall üzerinde span yönetimini işleyen modül
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor Modülü {#bor-module}

Bor modülü, Heimdall üzerinde genişlik yönetimini yapar. Bor zincirinin güncel blok numarası `n`, mevcut genişlik `span` göz önünde bulundurulduğunda, eğer `span.StartBlock <= n < span.EndBlock` ise, yeni genişlik Heimdall üzerinde herhangi bir doğrulayıcı tarafından önerilir.

## Mesajlar {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`Bu durumda doğrulayıcı komitesini ayarlar `span`ve Heimdall devletine yeni bir açıklık kazandırır.

Kaynak: [https://github.com/maticnetwork/heimdall/blob/gelişim/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

```go
// MsgProposeSpan creates msg propose span
type MsgProposeSpan struct {
	ID         uint64                  `json:"span_id"`
	Proposer   hmTypes.HeimdallAddress `json:"proposer"`
	StartBlock uint64                  `json:"start_block"`
	EndBlock   uint64                  `json:"end_block"`
	ChainID    string                  `json:"bor_chain_id"`
}
```

Bu işlemin tüm doğrulayıcılardan üreticileri nasıl seçtiğini aşağıda bulabilirsiniz:

1. Doğrulayıcıların gücüne göre birden fazla slot oluşturur. Örnek: Gücü 10 olan A 10 slot'a sahip olacak, gücü 20 olan B ise 20 slot'a sahip olacaktır.
2. `shuffle` işlevi, `seed` kullanarak tüm slot'ları karıştırır ve ilk `producerCount` üreticiyi seçer.  Heimdall'daki `bor` modülü tüm doğrulayıcılar arasından üreticileri seçmek için ETH 2.0 karıştırma algoritmasını kullanır. Her span `n`'i, Ethereum (ETH 1.0) blok `n`'inin blok hash'ini, `seed` olarak kullanır. Slot tabanlı seçimin, doğrulayıcıların güçlerine göre seçilmelerine olanak verdiğini unutmayın. Doğrulayıcının gücü ne kadar yüksek olursa, seçilme olasılığı da o kadar yüksek olur. Kaynak: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

## Türler {#types}

Heimdall'ın kullandığı genişlik ayrıntıları şu şekildedir:

```go
// Span structure
type Span struct {
	ID                uint64       `json:"span_id" yaml:"span_id"`
	StartBlock        uint64       `json:"start_block" yaml:"start_block"`
	EndBlock          uint64       `json:"end_block" yaml:"end_block"`
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}
```

## Parametreler {#parameters}

Bor modülü aşağıdaki parametreleri içerir:

| Anahtar | Tip | Varsayılan değer |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## CLI komutları {#cli-commands}

### Genişlik teklif işlemi {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Güncel genişliği sorgula {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Beklenen çıktı:

```go
{
  "span_id":2,
  "start_block":6656,
  "end_block":13055,
  "validator_set":{
    "validators":[
      {
        "ID":1,
        "startEpoch":0,
        "endEpoch":0,
        "power":1,
        "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
        "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
        "last_updated":"",
        "accum":0
      }
    ],
    "proposer":{
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  },
  "selected_producers":[
    {
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  ],
  "bor_chain_id":"15001"
}
```

### Genişliği kimliği ile sorgula {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Sonuçları yukarıdaki formatla aynı şekilde yazdırır.

### Parametreler {#parameters-1}

Tüm parametreleri yazdırmak için;

```go
heimdalldcli query bor params
```

Beklenen Sonuç:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API’leri {#rest-apis}

| Ad | Yöntem | Bitiş noktası |
|----------------------|------|------------------|
| Genişlik ayrıntıları | GET | /bor/span/<span-id\> |
| En güncel genişliği al | GET | /bor/latest-span |
| Parametreleri al | GET | /bor/params |
