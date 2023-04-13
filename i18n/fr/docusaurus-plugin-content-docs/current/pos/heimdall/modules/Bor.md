---
id: bor
title: Bor
description: Module qui gère la gestion de portée sur Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Module Bor {#bor-module}

Le module de Bor s'occupe de la gestion de la durée sur Heimdall. Vu le numéro de bloc actuel de la chaîne de Bor `n`, la durée actuelle `span`, si `span.StartBlock <= n < span.EndBlock`, une nouvelle durée est proposée sur Heimdall par n'importe quel validateur.

## Messages {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`définit le comité des validateurs pour un certain `span`et stocke une nouvelle portée dans l'état Heimdall.

Source: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Voici comment cette transaction choisit les producteurs parmi tous les validateurs:

1. Il crée plusieurs fentes en fonction de la puissance des validateurs. Exemple: A avec la puissance 10 aura 10 fentes, B avec la puissance 20 aura 20 fentes.
2. Grâce aux fentes, `shuffle`la fonctionnalité les traite en utilisant `seed` et sélectionne les premiers `producerCount`producteurs. `bor`Le module  sur Heimdall utilise l'algorithme de traitement ETH 2.0 pour choisir les producteurs de tous les validateurs. Chaque durée `n` utilise l'identifiant du bloc d'Ethereum (ETH 1.0) `n` en tant que `seed`. Veuillez noter que la sélection basée sur les fentes permet aux validateurs d'être sélectionnés en fonction de leur puissance. Le validateur disposant de la plus grande puissance aura une probabilité plus élevée d'être sélectionné. Source: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Types {#types}

Voici les détails de la durée que Heimdall utilise:

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

## Paramètres {#parameters}

Le module de Bor contient les paramètres suivants:

| Clé | Type | Valeur par défaut |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Commandes CLI {#cli-commands}

### Proposition de tx sur la durée {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Durée de requête actuelle {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Sortie attendue:

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

### Durée de la requête par indentifiant {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Il imprime le résultat dans le même format ci-dessus.

### Paramètres {#parameters-1}

Pour imprimer tous les params;

```go
heimdalldcli query bor params
```

Résultat Attendu:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## API de REST {#rest-apis}

| Nom | Méthode | Point de terminaison |
|----------------------|------|------------------|
| Détails de la durée | GET | /bor/span/<span-id\> |
| Obtenir la dernière durée | GET | /bor/latest-span |
| Obtenir les params | GET | /bor/params |
