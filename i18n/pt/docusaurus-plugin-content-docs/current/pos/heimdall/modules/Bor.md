---
id: bor
title: BOR
description: Módulo que lida com o gerenciamento do espaço no Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Módulo do Bor {#bor-module}

O módulo BOR lida com a gestão de span no Heimdall. Dado o número atual de bloco `n` da chain do BOR e span atual `span`, se `span.StartBlock <= n < span.EndBlock`, é proposto um novo span no Heimdall por qualquer validador.

## Mensagens {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`define o comitê de validadores para um determinado `span`e armazena um novo período no estado de Heimdall.

Fonte: [https://github.com/maticnetwork/heimdall/blob/developer/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Veja aqui como esta transação escolhe produtores de entre todos os validadores:

1. Este cria múltiplos slots com base no poder dos validadores. Exemplo: A com poder 10 terá 10 slots, B com poder 20 terá 20 slots.
2. Com todos os slots, a função `shuffle` baralha-os usando `seed` e seleciona os primeiros produtores `producerCount`. O módulo `bor` da Heimdall usa o algoritmo de baralhamento ETH 2.0 para escolher produtores de entre todos os validadores. Cada span `n` usa o hash de bloco do bloco da Ethereum (ETH 1.0) `n` como `seed`. Note que a seleção baseada em slots permite que os validadores sejam selecionados com base no seu poder. O validador de maior poder terá uma maior probabilidade de ser selecionado. Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Tipos {#types}

Veja aqui os detalhes de span que o Heimdall usa:

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

## Parâmetros {#parameters}

O módulo BOR contém os seguintes parâmetros:

| Chave | Tipo | Valor padrão |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Comandos CLI {#cli-commands}

### Span proposta tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Consultar span atual {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Resultado esperado:

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

### Consultar span por ID {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Este imprime o resultado no formato acima.

### Parâmetros {#parameters-1}

Para imprimir todos os parâmetros;

```go
heimdalldcli query bor params
```

Resultado esperado:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## APIs REST {#rest-apis}

| Nome | Método | Endpoint |
|----------------------|------|------------------|
| Detalhes do span | GET | /bor/span/<span-id\> |
| Obter o span mais recente | GET | /bor/latest-span |
| Obter params | GET | /bor/params |
