---
id: accounts
title: Tài khoản là gì?
sidebar_label: Accounts
description: "EOA và Tài khoản Hợp đồng."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Tài khoản là gì? {#what-are-accounts}

Trạng thái toàn cầu của Ethereum bao gồm các tài khoản tương tác với nhau thông qua một bộ khung truyền thông điệp. Tương tác cơ bản nhất là gửi một số giá trị - như MATIC tokens, dấu hiệu bản xứ Polygon hoặc ETH, dấu hiệu bản xứ của chuỗi blockum.

Mỗi tài khoản được xác định bởi một hex 20byte được gọi là địa chỉ - được tạo ra từ khóa công khai của tài khoản.

Có hai loại tài khoản: **Tài khoản Sở hữu bên ngoài** và **Tài khoản Sở hữu và Hợp đồng**.

## Tài khoản được sở hữu bên ngoài {#externally-owned-accounts}

EOA được kiểm soát bởi một khóa riêng, với khả năng gửi các dấu và thông điệp.

1. Chúng có thể gửi giao dịch (chuyển hoặc mã hợp đồng kích hoạt),
2. được kiểm soát bởi các khóa tư nhân,
3. và không có mã liên quan.

## Tài khoản do hợp đồng sở hữu {#contract-owned-accounts}
Tài khoản Hợp đồng là tài khoản có một mã hợp đồng thông minh liên quan với nó và chìa khóa cá nhân của họ không thuộc sở hữu.

1. Họ có liên quan,
2. Thực thi mã của chúng được kích hoạt bởi giao dịch hoặc thông điệp (cuộc gọi) nhận được từ các hợp đồng khác,
3. và khi mã này được thực thi - nó thực hiện hoạt động của sự phức tạp tùy tiện (Turing completeness) - thao tác kho lưu trữ bền bỉ của nó và có thể gọi là các hợp đồng khác.

### Tài nguyên {#resources}

- [Đọc thêm về tài khoản](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
