---
id: bor
title: Bor
description: Modul, das das Span Management auf Heimdall behandelt.
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor Modul {#bor-module}

Das Bor-Modul wickelt das Spannen-Management auf Heimdall ab. Auf Basis der aktuellen Blocknummer `n` auf der Bor-Chain, aktuelle Spanne `span`, wenn `span.StartBlock <= n < span.EndBlock`, schlägt ein Validator eine neue Spanne auf Heimdall vor.

## Nachrichten {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`legt den Prüfungsausschuss für eine gegeben `span`und speichert eine neue Span in Heimdall

Quelle:  [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Hier siehst du, wie diese Transaktion Produzenten aus der Gesamtheit der Validatoren auswählt:

1. Sie stellt auf der Grundlage der Leistung des Validators mehrfach Slots her. Beispiel: A mit einer Leistung von 10 wird 10 Slots haben, B mit einer Leistung von 20 wird 20 Slots haben.
2. Mithilfe aller Slots, mischt die -`shuffle`Funktion diese durch, indem sie `seed` verwendet und zuerst die `producerCount` -Produzenten auswählt.  Das `bor`-Modul auf Heimdall verwendet den ETH 2.0-Shuffle-Algorithmus, um die Produzenten aus der Gesamtheit der Validatoren auszuwählen. Jede `n`-Spanne verwendet den Block-Hash auf Ethereum-Block (ETH 1.0) `n`  als `seed`. Beachte, dass die auf Slots basierende Auswahl es den Validatoren ermöglicht, auf Grundlage ihrer Leistung ausgewählt zu werden. Der Validator mit höherer Leistung wird mit einer höheren Wahrscheinlichkeit ausgewählt werden. Quelle: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Arten {#types}

Hier sind die Spannen-Details, die Heimdall verwendet:

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

Das Bor-Modul enthält die folgenden Parameter:

| Key | Typ | Standardwert |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## CLI-Befehle {#cli-commands}

### Span propose tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Abfrage der aktuellen Spanne {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Voraussichtliche Ausgabe:

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

### Abfrage der Spanne per ID {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Es druckt das Ergebnis im selben Format wie oben aus.

### Parameter {#parameters-1}

Um alle Params zu drucken;

```go
heimdalldcli query bor params
```

Voraussichtliches Ergebnis:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST APIs {#rest-apis}

| Name | Methode | Endpunkt |
|----------------------|------|------------------|
| Spannen-Details | HOLEN | /bor/span/<span-id\> |
| Hole dir die neueste Spanne | HOLEN | /bor/latest-span |
| Hole dir die Parameter | HOLEN | /bor/params |
