---
id: governance
title: Governance
sidebar_label: Governance
description: Hệ thống với một dấu hiệu - cơ sở phiếu bầu 1
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governance {#governance}

Chính phủ Heimdall hoạt động y hệt như [môđun `x/gov`Cosmos-sdk.](https://docs.cosmos.network/master/modules/gov/)

Trong hệ thống này, những người nắm giữ phiếu thưởng góp cổ phần gốc của chuỗi có thể biểu quyết về các đề xuất trên cơ sở`1 token = 1 vote`. Dưới đây là danh sách các tính năng mà mô-đun hiện có sự hỗ trợ:

- **Gửi đề xuất:** Người xác thực có thể gửi đề xuất với một khoản tiền nạp. Một khi đạt được khoản tiền nạp tối thiểu, đề xuất sẽ bước vào kỳ biểu quyết. Những người xác thực nạp tiền cho đề xuất có thể thu hồi khoản tiền nạp một khi đề xuất bị từ chối hoặc được chấp nhận.
- **Vote:** Người xác thực có thể bỏ phiếu về các đề xuất đạt được MinDeposit.

Có kỳ nạp tiền và kỳ biểu quyết như các tham số trong mô-đun`gov`. Tiền gửi tối thiểu phải được thực hiện trước khi kỳ ký gửi kết thúc, nếu không đề xuất sẽ được từ chối.

Một khi đạt được khoản tiền nạp tối thiểu trong kỳ nạp tiền, kỳ biểu quyết sẽ bắt đầu. Trong kỳ biểu quyết, tất cả người xác thực nên biểu quyết lựa chọn của họ cho đề xuất. Sau khi kỳ biểu quyết kết thúc, `gov/Endblocker.go`thực hiện `tally`chức năng  và chấp nhận hoặc từ chối đề xuất dựa trên  —`tally_params`,`quorum`  `threshold`và`veto`.

Nguồn: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Có nhiều loại đề xuất khác nhau có thể được thực hiện ở Heimdall. Tính đến nay, nó chỉ hỗ trợ đề **xuất thay đổi Param**.

### Đề xuất thay đổi tham số {#param-change-proposal}

Sử dụng loại đề xuất này, trình xác thực có thể thay đổi bất kỳ điều gì `params`trong `module`bất kỳ Heimdall.

Ví dụ: thay đổi `tx_fees`tối thiểu cho giao dịch trong mô-đun`auth`. Khi đề xuất được chấp nhận, nó tự động thay đổi `params`trong trạng thái Heimdall. Không cần TX thêm.

## Lệnh CLI {#cli-commands}

### Truy vấn tham số gov {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Việc này cho thấy tất cả các tham số cho mô-đun quản trị.

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### Gửi đề xuất {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` là một tệp bao gồm đề xuất ở định dạng json.

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### Truy vấn đề xuất {#query-proposal}

Để truy vấn tất cả các đề xuất:

```go
heimdallcli query gov proposals --trust-node
```

Để truy vấn một đề cụ thể:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Biểu quyết về đề xuất {#vote-on-proposal}

Để bỏ phiếu trên một đề xuất cụ thể:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

Đề xuất sẽ được tự động đánh dấu sau kỳ biểu quyết.

## API REST {#rest-apis}

| Tên | Phương pháp | Điểm cuối |
|----------------------|------|------------------|
| Nhận tất cả các đề xuất | GET | /gov/proposals |
| Nhận chi tiết về đề xuất | GET | /gov/proposals/`proposal-id` |
| Nhận tất cả biểu quyết cho đề xuất | GET | /gov/proposals/`proposal-id`/votes |
