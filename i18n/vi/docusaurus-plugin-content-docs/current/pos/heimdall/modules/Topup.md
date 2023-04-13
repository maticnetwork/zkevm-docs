---
id: topup
title: Nạp tiền
description: Một số lượng sẽ được sử dụng để trả phí trên chuỗi Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Nạp tiền {#topup}

Nạp tiền Heimdall là một số tiền sẽ được sử dụng để thanh toán phí trên chuỗi Heimdall.

Có hai cách để đề cập tài khoản của bạn:

1. Khi các join xác thực mới, chúng có thể đề cập đến một `topup`số lượng lớn như số lượng trên đã được thực hiện, sẽ được chuyển như số lượng cân bằng trên chuỗi Heimdall để trả phí trên Heimdall.
2. Người dùng có thể gọi trực tiếp chức năng trên của hợp đồng thông minh trên Ethereum để tăng số dư trên Heimdall.

## Thông báo {#messages}

### MsgTopup {#msgtopup}

Giao dịch `MsgTopup`chịu trách nhiệm chuyển số dư đến một địa chỉ trên Heimdall dựa trên hợp đồng quản lý góp cổ phần `TopUpEvent` của chuỗi Ethereum.

Trình xử lý cho giao dịch này xử lý nạp tiền và tăng số dư chỉ một lần cho bất kỳ `msg.TxHash` và `msg.LogIndex`nhất định nào. Nó trả ra lỗi`Older invalid tx found`, nếu cố gắng xử lý việc nạp tiền nhiều hơn một lần.

Đây là cấu trúc cho thông báo giao dịch nạp tiền:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

Giao dịch `MsgWithdrawFee`chịu trách nhiệm rút số dư từ Heimdall sang chuỗi Ethereum. Người xác thực có thể rút bất kỳ số tiền nào từ Heimdall.

Trình xử lý tiến hành việc rút tiền bằng cách khấu trừ số dư từ trình xác thực và chuẩn bị trạng thái để gửi điểm kiểm duyệt tiếp theo. Điểm kiểm duyệt khả năng kế tiếp sẽ chứa trạng thái liên quan đến việc rút tiền cho trình xác thực cụ thể.

Trình xử lý nhận thông tin xác thực dựa trên `ValidatorAddress`và tiến hành việc rút tiền.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Lệnh CLI {#cli-commands}

### Phí nạp tiền {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Phí rút tiền {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Để kiểm tra số tiền được phản ánh trên tài khoản, hãy chạy lệnh sau

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## API REST {#rest-apis}

| Tên | Phương pháp | URL | Ý nghĩa tham số |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Phí nạp tiền | POST | /topup/fee | `id` ID trình xác thực, `tx_hash`Hàm băm giao dịch của sự kiện nạp tiền thành công trên chuỗi Ethereum, `log_index`Chỉ mục nhật ký của sự kiện nạp tiền được phát ra trên chuỗi Ethereum |
| Phí rút tiền | POST | /topup/withdraw | `amount`Số lượng tiền rút |
