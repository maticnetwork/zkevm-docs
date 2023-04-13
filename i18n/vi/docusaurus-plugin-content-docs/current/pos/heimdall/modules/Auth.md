---
id: auth
title: Auth
description: Mô-đun để xác định giao dịch căn cứ và kiểu tài khoản
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Mô-đun Auths {#auth-module}

Tài liệu này mô tả `auth`mô-đun của Heimdall.

Mô-đun `auth`chịu trách nhiệm chỉ định giao dịch cơ sở và các loại tài khoản cho một ứng dụng. Nó chứa trình xử lý ante, nơi tất cả các kiểm tra tính hợp lệ của giao dịch cơ bản (chữ ký, nonce, trường bổ trợ) được thực hiện và hiển thị trình giữ tài khoản, cho phép các mô-đun khác đọc, ghi và sửa đổi tài khoản.

## Gas và Phí {#gas-and-fees}

Phí phục vụ hai mục đích cho một trình vận hành mạng.

Phí giới hạn sự phát triển của trạng thái được lưu trữ bởi mọi nút đầy đủ và cho phép kiểm duyệt mục đích chung đối với các giao dịch có giá trị kinh tế nhỏ. Phí phù hợp nhất như một cơ chế chống thư rác trong đó người xác nhận không quan tâm đến việc sử dụng mạng và danh tính của người dùng.

Vì Heimdall không hỗ trợ hợp đồng hoặc mã cho bất kỳ giao dịch nào, nó sử dụng các giao dịch chi phí cố định. Đối với các giao dịch chi phí cố định, người xác thực có thể nạp tiền vào tài khoản của họ trên chuỗi Ethereum và nhận mã thông báo trên Heimdall bằng cách sử dụng mô-đun [Nạp tiền](Topup.md).

## Loại {#types}

Ngoài tài khoản (đã xác định trong tình trạng ), các loại được phơi bày bởi mô-đu**n** auth là **StdSignature**, sự kết hợp của một khóa công khai tùy chọn và một đặc điểm mật mã như một trang bị byte, **StdTx**, một cấu trúc thực hiện thực hiện `sdk.Tx`giao diện bằng **cách sử dụng SdSignature,** và StdSignature, một cấu trúc phòng ngừa lại cho người chuyển dịch S**tdTx **phải ký quá tải.

### StdSignature {#stdsignature}

`StdSignature` là các kiểu của một dãy byte.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

`StdTx` là một cấu trúc triển khai `sdk.Tx`giao diện và có khả năng đủ tổng quát để phục vụ các mục đích của nhiều loại giao dịch.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

`StdSignDoc` là một cấu trúc ngăn chặn phát lại được ký tên, đảm bảo rằng bất kỳ giao dịch nào đã gửi (chỉ đơn giản là chữ ký trên một chuỗi byte cụ thể) sẽ chỉ được thực thi một lần trên Heimdall.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### Tài khoản {#account}

Nó quản lý địa chỉ, đồng và nonce cho các giao dịch. Nó cũng ký và xác nhận các giao dịch.

Nguồn: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Tham số {#parameters}

Mô-đun auth chứa các thông số sau:

| Khóa | Loại | Giá trị mặc định |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | string | "1000000000000000" |


## Lệnh CLI {#cli-commands}

### Hiển thị tài khoản {#show-account}

Để in dữ liệu liên quan đến Heimdall,

```bash
heimdalld show-account
```

Kết quả mong đợi:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Tài khoản và chi tiết tiền đồng {#account-and-coin-details}

Để hiển thị chi tiết tài khoản, đồng xu, chuỗi và số tài khoản;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Kết quả mong đợi:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### Tham số {#parameters-1}

Để in tất cả các para;

```go
heimdallcli query auth params
```

Kết quả mong đợi:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## API REST {#rest-apis}

| Tên | Điểm cuối | Mô tả |
|----------------------|--------|------------------|
| Chi tiết tài khoản | /auth/accounts/{address} | Trả lại tất cả các chi tiết cho một địa chỉ |
| Chi tiết trình tự tài khoản | /auth/accounts/{address}/sequence | Chỉ trả về các chi tiết cần thiết để ký kết |
| Các tham số xác thực | /auth/params | Trả về tất cả các lần sử dụng mô-đun tham số auth |
