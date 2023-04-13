---
id: bor
title: Bor
description: Heimdallでスパン管理を処理するモジュール
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Borモジュール {#bor-module}

BorモジュールはHeimdallでスパン管理を行います。Borチェーンの現在のブロックナンバー`n`、現在のスパン`span`である場合、`span.StartBlock <= n < span.EndBlock`であれば、新しいスパンはどのバリデータによってもHeimdallで提案されます。

## メッセージ {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`バリデータ委員会を指定するように設定し、新しいスパンをHeimdall状態に保存`span`します。

出典：[https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

ここではこのトランザクションがすべてのバリデータからプロデューサを選ぶ方法を説明します。

1. バリデータのパワーを基に複数のスロットを作成します。例：10のパワーを持つAは、10のスロットを持ちます。20のパワーを持つBは、20のスロットを持ちます。
2. すべてのスロットで、`shuffle`関数はそれらをシャッフル`seed`し、最初のプロデューサーを選択します。Heimdallの`bor`モジュールでは、ETH 2.0シャッフルアルゴリズムを使用して、すべてのバリデータからプロデューサーを選択します`producerCount`。各スパン`n`は、`seed`としてEthereum（ETH 1.0）ブロック`n`のブロックハッシュを使用します。選択に基づくスロットにより、バリデータはそのパワーに基づいて選択されることができるということにご注意ください。バリデータがより大きなパワーを持つほど、選択される可能性が高まります。出典：[https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## タイプ {#types}

これがHeimdallが使用するスパンの詳細です：

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

## パラメータ {#parameters}

Borモジュールは、次のパラメータを含みます：

| 鍵 | タイプ | デフォルト値 |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## CLIコマンド {#cli-commands}

### Spanはtxを提案する {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### 現在のスパンをクエリする {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

予測出力：

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

### IDでスパンをクエリする {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

これで、上記と同じフォーマットで結果を出力します。

### パラメータ {#parameters-1}

すべてのパラメータを印刷する；

```go
heimdalldcli query bor params
```

予測される結果：

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## 他のAPI {#rest-apis}

| 名前 | メソッド | エンドポイント |
|----------------------|------|------------------|
| Span details | GET | /bor/span/<span-id\> |
| Get latest span | GET | /bor/latest-span |
| Get params | GET | /bor/params |
