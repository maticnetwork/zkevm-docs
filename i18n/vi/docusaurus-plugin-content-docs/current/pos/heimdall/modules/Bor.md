---
id: bor
title: Bor
description: Mô-đun điều khiển ban quản lý Span trên Heimdall
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Mô- đun Bor {#bor-module}

Mô-đun Bor thực hiện quản lý span trên Heimdall. Với số khối hiện tại của chuỗi Bor là`n`, span hiện tại`span`, nếu`span.StartBlock <= n < span.EndBlock`, span mới được đề xuất trên Heimdall bởi bất kỳ trình xác thực nào.

## Thông báo {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`struớc của ủy ban xác thực cho một ban cho `span`và lưu trữ một span mới vào trạng thái Heimdall.

Nguồn: [https://github.com/maticnets/heimdall/blob/develope/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

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

Đây là cách giao dịch này chọn nhà sản xuất trong số tất cả các trình xác thực:

1. Nó tạo ra nhiều vị trí dựa trên sức mạnh của trình xác nhận. Ví dụ: A có công suất 10 sẽ có 10 chỗ, B có công suất 20 có 20 chỗ.
2. Với tất cả các slot, chức năng `shuffle`xáo trộn chúng bằng cách sử dụng `seed`và chọn nhà sản xuất `producerCount`đầu tiên.  Mô-đun `bor`trên Heimdall sử dụng thuật toán xáo trộn ETH 2.0 để chọn nhà sản xuất trong số tất cả các người xác thực. Mỗi span`n` sử dụng hàm băm khối của Ethereum (ETH 1.0) khối `n`là`seed`. Lưu ý rằng lựa chọn dựa trên vị trí cho phép các trình xác thực được chọn dựa trên sức mạnh của mình. Trình xác nhận công suất cao hơn sẽ có xác suất được chọn cao hơn. Nguồn: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

## Loại {#types}

Dưới đây là chi tiết span mà Heimdall sử dụng:

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

## Tham số {#parameters}

Mô-đun Bor chứa các tham số sau:

| Khóa | Loại | Giá trị mặc định |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## Lệnh CLI {#cli-commands}

### Span propose tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### Truy vấn span hiện tại {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

Kết quả mong đợi:

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

### Truy vấn span id {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

Nó in kết quả ở định dạng tương tự như trên.

### Tham số {#parameters-1}

Để in tất cả các para;

```go
heimdalldcli query bor params
```

Kết quả mong đợi:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## API REST {#rest-apis}

| Tên | Phương pháp | Điểm cuối |
|----------------------|------|------------------|
| Chi tiết span | GET | /bor/span/<span-id\> |
| Nhận span mới nhất | GET | /bor/latest-span |
| Nhận tham số | GET | /bor/params |
