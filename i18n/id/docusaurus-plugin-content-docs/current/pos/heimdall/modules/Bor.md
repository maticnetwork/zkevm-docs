---
id: bor
title: Bor
description: Modul yang menangani pengelolaan pada Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Modul Bor {#bor-module}

Modul Bor menangani manajemen span di Heimdall. Mempertimbangkan nomor blok saat ini dari rantai Bor `n`, span saat ini `span`, jika `span.StartBlock <= n < span.EndBlock`, maka span baru diusulkan di Heimdall oleh validator apa pun.

## Pesan {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`Menentukan komite validator untuk pemberian `span`dan menyimpan rentang baru ke dalam keadaan Heimdall.

[Sumber: https://github.com/maticnetwork/heimdall/blob/develd/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Berikut adalah cara transaksi ini memilih produsen dari semua validator:

1. Transaksi ini menghasilkan banyak slot berdasarkan kekuatan validator. Contoh: A dengan kekuatan 10 akan memiliki 10 slot, B dengan kekuatan 20 akan memiliki 20 slot.
2. Dengan semua slot, fungsi `shuffle` mengacaknya menggunakan `seed` dan memilih `producerCount` produsen pertama. Modul `bor` di Heimdall menggunakan algoritme pengacakan ETH 2.0 untuk memilih produsen dari semua validator. Setiap span `n` menggunakan hash blok dari blok Ethereum (ETH 1.0) `n` sebagai `seed`. Ingatlah pemilihan yang berdasarkan slot memungkinkan validator dipilih berdasarkan kekuatan mereka. Semakin besar kekuatan validator, maka akan semakin besar kemungkinannya untuk dipilih. Sumber: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Jenis {#types}

Berikut ini perincian span yang digunakan Heimdall:

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

## Parameter {#parameters}

Modul Bor berisi parameter berikut:

| Kunci | Jenis | Nilai default |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Perintah CLI {#cli-commands}

### tx usulan span {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Kueri span saat ini {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Keluaran yang diharapkan:

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

### Kueri span berdasarkan id {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Ini mencetak hasilnya dalam format yang sama seperti di atas.

### Parameter {#parameters-1}

Untuk mencetak semua parameter;

```go
heimdalldcli query bor params
```

Hasil yang Diharapkan:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API {#rest-apis}

| Nama | Metode | Endpoint |
|----------------------|------|------------------|
| Detail span | GET | /bor/span/<span-id\> |
| Dapatkan span terakhir | GET | /bor/latest-span |
| Dapatkan parameter | GET | /bor/params |
