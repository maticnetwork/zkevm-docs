---
id: checkpoint
title: Điểm kiểm duyệt
description: Mô-đun điều khiển này sẽ kiểm tra các chức năng liên quan đến điểm
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Điểm kiểm duyệt {#checkpoint}

Mô-đun `checkpoint`quản lý các chức năng liên quan đến điểm kiểm duyệt cho Heimdall. Nó cần chuỗi Bor khi một điểm kiểm duyệt mới được đề xuất trên Heimdall để xác minh hàm băm gốc điểm kiểm duyệt.

Tất cả liên quan đến dữ liệu kiểm tra point đều được giải thích trong chi tiết ở [đây](/docs/pos/heimdall/checkpoint).

## Vòng đời điểm kiểm duyệt {#checkpoint-life-cycle}

Heimdall sử dụng thuật toán chọn cùng một lãnh đạo như Tendermint để chọn đề xuất tiếp theo. Trong khi gửi các điểm kiểm duyệt trên chuỗi Ethereum, nó có thể thất bại do nhiều lý do như giới hạn gas, lưu lượng truy cập trên Ethereum, phí gas cao. Đó là lý do tại sao quy trình điểm kiểm duyệt đa giai đoạn là cần thiết.

Mỗi kiểm tra có trình xác thực như là người đề xuất. Nếu kiểm tra point trên chuỗi Ethereum thất bại hoặc thành công, `ack`và `no-ack`giao dịch sẽ thay đổi người đề xuất trên Heimdall cho điểm kiểm tra tiếp theo. Biểu đồ lưu lượng sau đại diện cho chu kỳ cuộc sống của trạm kiểm soát:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Thông báo {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` xử lý xác minh điểm kiểm duyệt trên Heimdall. Chỉ thông điệp này mới sử dụng mã RLP vì cần được xác thực trên chuỗi Ethereum.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

Một khi giao dịch này được xử lý trên Heimdall, `proposer`lấy `votes`và `sigs`từ Tendermint cho giao dịch này và gửi điểm kiểm duyệt trên chuỗi Ethereum.

Vì khối chứa nhiều giao dịch và xác minh giao dịch cụ thể này trên chuỗi Ethereum, nên cần phải có bằng chứng Merkle. Để tránh xác minh thêm bằng chứng Merkle trên Ethereum, Heimdall chỉ cho phép một giao dịch trong khối nếu loại giao dịch là `MsgCheckpoint`

Để cho phép cơ chế này, Heimdall đặt giao `MsgCheckpoint`dịch khi giao dịch tiêu thụ gas cao. Hãy kiểm tra [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Giao dịch này sẽ lưu trữ điểm kiểm duyệt được đề xuất trên trạng thái `checkpointBuffer`thay vì trạng thái danh sách điểm kiểm duyệt thực tế.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` xử lý việc gửi điểm kiểm duyệt thành công. Đây `HeaderBlock`là một trạm kiểm soát;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Để `TxHash`và `LogIndex`hợp lệ cho điểm kiểm duyệt đã gửi, giao dịch này xác minh sự kiện sau và xác thực điểm kiểm duyệt ở trạng thái `checkpointBuffer`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

Trên sự kiện xác thực thành công, nó cập nhật số lượng thực tế của trạm kiểm soát, cũng được biết đến như `ackCount`và xoá sạch số lượng sự kiện.`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` xử lý các điểm kiểm duyệt không thành công hoặc các người đề xuất ngoại tuyến. Giao dịch này chỉ có giá trị sau khi `CheckpointBufferTime`được chuyển từ các sự kiện sau:

- Giao dịch `ack`thành công cuối cùng
- Giao dịch `no-ack`thành công cuối cùng

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Giao dịch này cung cấp khoảng thời gian chờ để người đề xuất hiện tại gửi điểm kiểm duyệt/ack trước khi Heimdall chọn `proposer`mới cho điểm kiểm duyệt tiếp theo.

## Tham số {#parameters}

Mô-đun điểm kiểm duyệt chứa các tham số sau:

| Khóa | Loại | Giá trị mặc định |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * thời_gian.Giây |


## Lệnh CLI {#cli-commands}

### Tham số {#params}

Để in tất cả các para:

```go
heimdallcli query checkpoint params --trust-node
```

Kết quả mong đợi:

```yaml
checkpoint_buffer_time: 16m40s
```

### Gửi điểm kiểm duyệt {#send-checkpoint}

Lệnh sau gửi giao dịch điểm kiểm duyệt trên Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Gửi`ack`

Lệnh sau gửi giao dịch ack trên Heimdall nếu điểm kiểm duyệt thành công trên Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Gửi`no-ack`

Lệnh sau gửi giao dịch no-ack trên Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## API REST {#rest-apis}

| Tên | Phương pháp | Điểm cuối |
|----------------------|------|------------------|
| Nhận trạng thái vùng đệm điểm kiểm duyệt hiện tại | GET | /checkpoint/buffer |
| Nhận số điểm kiểm duyệt | GET | /checkpoint/count |
| Nhận chi tiết về điểm kiểm duyệt theo chỉ số khối | GET | /checkpoint/headers/<header-block-index\> |
| Nhận điểm kiểm duyệt mới nhất | GET | /checkpoint/latest-checkpoint |
| Nhận chi tiết về no-ack cuối cùng | GET | /checkpoint/last-no-ack |
| Chi tiết về điểm kiểm duyệt cho khối bắt đầu và kết thúc nhất định | GET | /checkpoint/<start\>/<end\> |
| Điểm kiểm duyệt theo số | GET | /checkpoint/<checkpoint-number\> |
| Tất cả các điểm kiểm duyệt | GET | /checkpoint/list |
| Nhận số lượng ack, bộ đệm, tập hợp người xác thực, số lượng người xác thực và chi tiết no-ack cuối cùng | GET | /overview |


Tất cả APis đều sẽ cung cấp kết quả theo định dạng sau:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
