---
id: bor
title: Bor
description: Heimdall에서 스팬 관리를 처리하는 모듈
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor 모듈 {#bor-module}

Bor 모듈은 Heimdall에서 스팬을 관장합니다. Bor 체인의 현재 블록 번호가 `n`이고, 현재 스팬이 `span`일 때, 만약 `span.StartBlock <= n < span.EndBlock`이면 새로운 스팬이 유효성 검사자에 의해 Heimdall에 제안됩니다.

## 메시지 {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan``span`주어진 부분에 대해 유효성 검사자의 위원회를 설정하고 새로운 스펀을 Heimdall 상태에 저장합니다.

출처: [https://github.com/maticnetwork/heimdall/bob/development/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

다음은 트랜잭션이 모든 유효성 검사자 중에서 프로듀서를 선택하는 방법을 보여줍니다.

1. 유효성 검사자의 파워를 바탕으로 여러 슬롯을 만듭니다. 예를 들어, 10 파워를 가진 A는 슬롯이 10개 있으며, 20 파워를 가진 B는 슬롯이 20개입니다.
2. 모든 슬롯에서 `shuffle`기능은 를`seed` 사용해 슬롯을 섞으며 첫 번째 프`producerCount`로듀서를 선택합니다.  Heimdall의 모듈`bor`은 모든 유효성 검사자 중에서 프로듀서를 선택하는데 ETH 2.0 셔플 알고리즘을 사용합니다. 각 스팬 `n`은 이더리움(ETH 1.0) 블록 `n`의 블록 해시를 `seed`로 사용합니다. 슬롯 기반 선택을 통하여, 파워가 큰 유효성 검사자 우선으로 선정된 점에 유의하세요. 높은 파워를 가진 유효성 검사자는 선정된 확률이 높게 됩니다. 출처: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## 유형 {#types}

다음은 Heimdall이 사용하는 스팬 세부 사항입니다.

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

## 파라미터 {#parameters}

Bor 모듈은 다음 파라미터를 포함하고 있습니다.

| 키 | 유형 | 디폴트 값 |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## CLI 명령 {#cli-commands}

### 스팬 프로포즈 트랜잭션 {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### 현재 스팬 쿼리 {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

예상 출력:

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

### ID로 스팬 쿼리 {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

위와 같은 형식으로 결과를 인쇄합니다.

### 파라미터 {#parameters-1}

모든 파라그램을 인쇄하려면

```go
heimdalldcli query bor params
```

예상 결과:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## 기타 API {#rest-apis}

| 이름 | 메서드 | 엔드포인트 |
|----------------------|------|------------------|
| 스팬 세부 정보 | GET | /bor/span/<span-id\> |
| 최신 스팬 가져오기 | GET | /bor/latest-span |
| 파라미터   | GET | /bor/params |
