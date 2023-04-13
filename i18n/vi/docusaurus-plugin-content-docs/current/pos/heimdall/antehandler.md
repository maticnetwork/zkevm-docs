---
id: antehandler
title: Trình xử lý ante
description: Kiểm tra Handler và xác thực sự nhận giao dịch
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Trình xử lý ante {#ante-handler}

Trình xử lý ante kiểm tra và xác thực giao dịch. Sau khi xác thực, nó kiểm tra số dư của người gửi để xem có đủ phí không và khấu trừ phí trong trường hợp bao gồm giao dịch thành công.

## Giới hạn gas {#gas-limit}

Từng khối và giao dịch đều có giới hạn gas cho việc sử dụng gas. Một khối có thể chứa nhiều giao dịch, nhưng gas được sử dụng bởi tất cả các giao dịch trong khối phải ít hơn giới hạn gas để tránh các khối lớn hơn.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Lưu ý rằng từng thao tác trạng thái đối với giao dịch đều tốn gas, bao gồm cả việc xác minh chữ ký cho giao dịch.

### Giới hạn gas khối {#block-gas-limit}

Giới hạn gas khối tối đa và số byte mỗi khối bị vượt qua trong khi thiết lập các thông số đồng thuận của ứng dụng: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### Giới hạn gas giao dịch {#transaction-gas-limit}

Giới hạn gas giao dịch được định nghĩa trong các thông số trong mô-đun.`auth` Nó có thể được thay đổi thông qua mô-đun `gov`Heimdall.

### Giới hạn Giao dịch Xăng Checkpoint {#checkpoint-transaction-gas-limit}

Vì khối chứa nhiều giao dịch và xác minh giao dịch cụ thể này trên chuỗi Ethereum, nên cần phải có bằng chứng Merkle. Để tránh xác minh thêm bằng chứng Merkle cho giao dịch điểm kiểm duyệt, Heimdall chỉ cho phép một giao dịch trong khối nếu loại giao dịch là `MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Xác minh giao dịch và bảo vệ phát lại {#transaction-verification-and-replay-protection}

Trình xử lý Ante xử lý và xác minh chữ ký trong giao dịch đến: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Từng giao dịch phải bao gồm `sequenceNumber`để tránh các cuộc tấn công phát lại. Sau mỗi lần bao gồm giao dịch thành công, trình xử lý Ante tăng số thứ tự cho tài khoản người gửi giao dịch để tránh trùng lặp (phát lại) các giao dịch trước đó.