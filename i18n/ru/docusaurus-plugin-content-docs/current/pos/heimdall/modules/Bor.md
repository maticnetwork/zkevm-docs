---
id: bor
title: Bor
description: Модуль отвечает за управление диапазонами в Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Модуль {#bor-module}

Модуль Bor отвечает за управление диапазонами в Heimdall. Если текущий номер блока цепочки Bor равен `n`, текущий диапазон `span`, если `span.StartBlock <= n < span.EndBlock`, любой валидатор способен предложить новый диапазон на Heimdall.

## Сообщения {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`sets комитет валидаторов для данного `span`и сохраняет новый диапазон в состоянии Heimdall.

Источник: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Эта транзакция выбирает продюсеров из всех валидаторов следующим образом:

1. Он создает несколько слотов на основе мощности валидаторов. Пример: «А» с мощностью 10 будет иметь 10 слотов, «B» с мощностью 20 будет иметь 20 слотов.
2. Функция `shuffle` перемешивает все слоты, используя `seed`, и выбирает первых `producerCount` продюсеров. Модуль `bor` на Heimdall использует алгоритм перетасовки ETH 2.0 для выбора продюсеров из всех валидаторов. Каждый диапазон `n` использует хэш блока Ethereum (ETH 1.0) блока `n`,  как `seed`. Обратите внимание, что выбор на основе слотов позволяет валидаторам выбираться на основе их мощности. Валидатор с более высокой мощностью будет иметь более высокую вероятность быть выбранным. Источник: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Типы {#types}

Heimdall использует следующие данные диапазона:

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

## Параметры {#parameters}

Модуль Bor содержит следующие параметры:

| Ключ | Тип | Значение по умолчанию |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Команды CLI {#cli-commands}

### Span propose tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Запросить текущий диапазон {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Ожидаемый вывод:

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

### Запросить диапазон по идентификатору {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Он выводит результат в том же формате.

### Параметры {#parameters-1}

Чтобы вывести все параметры;

```go
heimdalldcli query bor params
```

Ожидаемый результат:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API {#rest-apis}

| Название | Метод | Конечная точка |
|----------------------|------|------------------|
| Данные Span | GET | /bor/span/<span-id\> |
| Получить последний диапазон | GET | /bor/latest-span |
| Получить параметры | GET | /bor/params |
