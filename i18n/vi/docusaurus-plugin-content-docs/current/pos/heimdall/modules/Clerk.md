---
id: clerk
title: Clerk
description: Mô-đun điều khiển này sẽ tạo đồng bộ từ Ethereum đến Bor
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerk quản lý đồng bộ hóa trạng thái chung từ chuỗi Ethereum sang chuỗi Bor. Heimdall đồng ý với đồng bộ tình trạng đồng bộ của bang, được khởi động trên chuỗi Ethereum bằng môđun Clerk.

Thêm chi tiết được sẵn sàng trong [cơ chế đồng bộ bang](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Thông báo {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord`Giao dịch có nhiệm vụ xác thực các sự kiện từ `StateSender.sol`và lưu trữ trạng thái trên Heimdall để Bor sử dụng.

Trình xử lý cho giao dịch này xác thực cho bất kỳ `msg.TxHash`và `msg.LogIndex`nhất định nào. Nó gây ra lỗi `Older invalid tx found`nếu cố gắng xử lý giao dịch nhiều hơn một lần.

Đây là cấu trúc cho thông báo giao dịch:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## Lệnh CLI {#cli-commands}

### Gửi hồ sơ trạng thái giao dịch {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Để truy vấn bản ghi sự kiện trạng thái đã được xác thực {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| Tên | Phương pháp | Điểm cuối |
|----------------------|------|------------------|
| Chi tiết hồ sơ sự kiện | GET | /clerk/event-record/<record-id\> |
| Tất cả các bản ghi sự kiện | GET | /clerk/event-record/list |
