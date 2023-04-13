---
id: bor
title: Bor
description: Modulo che gestisce la gestione di una gamma su Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Modulo Bor {#bor-module}

Il modulo Bor si occupa della gestione dello span su Heimdall. Dato l'attuale numero di blocco corrente della catena di Bor `n`, l'attuale span `span`, se `span.StartBlock <= n < span.EndBlock`, un nuovo span viene proposto su Heimdall da qualsiasi validatore.

## Messaggi {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`imposta il comitato dei validatori per una data `span`e memorizza una nuova gamma nello stato di Heimdall.

Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Ecco come questa transazione sceglie i produttori tra tutti i validatori:

1. Crea più slot in base alla potenza dei validatori. Esempio: A con potenza 10 avrà 10 slot, B con potenza 20 avrà 20 slot.
2. Con tutti gli slot, la funzione `shuffle` li mescola utilizzando `seed` e seleziona i primi `producerCount` produttori. Il modulo  `bor` su Heimdall utilizza l'algoritmo shuffle ETH 2.0 per scegliere i produttori tra tutti i validatori. Ogni span `n` utilizza l'hash del blocco di Ethereum (ETH 1.0) `n`  come `seed`. Si noti che la selezione basata sugli slot consente ai validatori di essere selezionati in base alla loro potenza. Il validatore di potenza maggiore avrà una probabilità maggiore di essere selezionato. Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Tipi {#types}

Ecco i dettagli dello span che utilizza Heimdall:

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

## Parametri {#parameters}

Il modulo Bor contiene i seguenti parametri:

| Chiave | Tipo | Valore predefinito |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Comandi CLI {#cli-commands}

### Span propone tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Ricerca lo span corrente {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Uscita prevista:

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

### Ricerca span per id {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Stampa il risultato nello stesso formato di sopra.

### Parametri {#parameters-1}

Per stampare tutte le parametri;

```go
heimdalldcli query bor params
```

Risultato previsto:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## API REST {#rest-apis}

| Nome | Metodo | Endpoint |
|----------------------|------|------------------|
| Dettagli dello span | GET | /bor/span/<span-id\> |
| Ottenere l'ultimo span | GET | /bor/latest-span |
| Ottenere i parametri | GET | /bor/params |
