---
id: bor
title: Bor
description: Module na humahawak ng span management sa Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Module ng Bor {#bor-module}

Hinahawakan ng Bor module ang pamamahala ng span sa Heimdall. Bilang kasalukuyang block number ng Bor chain na `n`, kasalukuyang span `span`, kung `span.StartBlock <= n < span.EndBlock`, ang bagong span ay iminungkahi sa Heimdall ng anumang validator.

## Mga mensahe {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`nagtatakda ng komite ng validators para sa isang ibinigay `span`at nag-iimbak ng bagong span sa estado ng Heimdall.

Pinagmulan: [https://github.com/maticnetwork/heimdall/blob /develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Narito kung paano pinipili ng transaksyong ito ang mga producer mula sa lahat ng validator:

1. Lumilikha ito ng maramihang slot batay sa kapangyarihan ng mga validator. Halimbawa: Ang A na may power 10 ay magkakaroon ng 10 slot, at B na may power 20 na may 20 slot.
2. Sa lahat ng mga slot, sina-shuffle ng `shuffle` na function ang mga ito gamit ang `seed` at pinipili ang unang `producerCount` na mga producer. Ang `bor` na module sa Heimdall ay gumagamit ng ETH 2.0 shuffle algorithm upang pumili ng mga producer mula sa lahat ng mga validator. Ang bawat span na `n` ay gumagamit ng block hash ng Ethereum (ETH 1.0) na block `n` bilang `seed`. Tandaan na ang pagpili batay sa mga slot ay nagbibigay-daan sa mga validator na mapili batay sa kanilang power. Ang may mas mataas na power na validator ay magkakaroon ng mas mataas na posibilidad na mapili. Pinagmulan: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Mga Uri {#types}

Narito ang mga detalye ng span na ginagamit ng Heimdall:

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

## Mga Parameter {#parameters}

Ang Bor module ay naglalaman ng mga sumusunod na parameter:

| Key | Uri | Default na value |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Mga CLI Command {#cli-commands}

### Span propose tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Query current span {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Inaasahang output:

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

### Span ng query ayon sa id {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Ini-print nito ang resulta sa parehong format tulad ng nasa itaas.

### Mga Parameter {#parameters-1}

Para i-print ang lahat ng param;

```go
heimdalldcli query bor params
```

Mga Inaasahang Resulta:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## Mga REST API {#rest-apis}

| Pangalan | Pamamaraan | Endpoint |
|----------------------|------|------------------|
| Mga detalye ng Span | GET | /bor/span/<span-id\> |
| Kumuha ng pinakabagong span | GET | /bor/latest-span |
| Kumuha ng mga params | GET | /bor/params |
