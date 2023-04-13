---
id: bank
title: Ngân hàng
description: Mô-đun xử lý việc chuyển cân bằng tài khoản cho Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Môđun ngân hàng {#bank-module}

Mô-đun `bank`xử lý các giao dịch chuyển nhượng số dư tài khoản cho Heimdall. Mô-đun này tương ứng với mô-đun `bank`từ cosmos-sdk.

## Thông báo {#messages}

### MsgSend {#msgsend}

`MsgSend` xử lý các giao dịch chuyển nhượng giữa các tài khoản trong Heimdall. Dưới đây là cấu trúc cho thông báo giao dịch:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` xử lý đa chuyển nhượng giữa các tài khoản cho Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Tham số {#parameters}

Mô-đun ngân hàng chứa các thông số sau:

| Khóa | Loại | Giá trị mặc định |
|----------------------|--------|------------------|
| `sendenabled` | bool | đúng |

## Lệnh CLI {#cli-commands}

### Gửi số dư {#send-balance}

Sau lệnh sẽ gửi 1000 biểu tượng thực chất để đề cập `address`đến:

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
