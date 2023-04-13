---
id: transactions
title: Giao dịch
description: Giao dịch là gì và khi chúng được sử dụng
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Giao dịch {#transactions}

Các giao dịch được tổ chức bởi metadata được tổ chức trong [các liên kết](https://docs.cosmos.network/main/core/context.html) và [thông điệp](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) mà trạng thái kích hoạt thay đổi trong mô-đun thông qua Handler của mô-đun

Khi người dùng muốn tương tác với ứng dụng và tạo các thay đổi trạng thái (ví dụ: gửi xu), họ tạo các giao dịch. Mỗi `message` của giao dịch phải được ký bằng cách sử dụng khóa riêng tư liên kết với tài khoản thích hợp trước khi giao dịch được phát lên mạng. Giao dịch sau đó phải được bao gồm trong khối, xác thực, và sau đó được mạng chấp thuận thông qua quy trình đồng thuận. Để đọc thêm về vòng đời của giao dịch, hãy nhấp vào [đây](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Định nghĩa loại {#type-definition}

Đối tượng giao dịch là các loại SDK thực hiện giao `Tx`diện.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Thêm chi tiết về Transactions: [https://docs.cos.nets/main/core/transport.html](https://docs.cosmos.network/main/core/transactions.html)
