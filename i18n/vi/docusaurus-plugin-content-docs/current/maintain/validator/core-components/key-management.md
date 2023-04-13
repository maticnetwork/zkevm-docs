---
id: key-management
title: Quản lý Khóa
description: Ký hiệu và quản lý các khóa chủ sở hữu
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Từng người xác thực sử dụng hai khóa để quản lý các hoạt động liên quan đến người xác thực trên Polygon:

* Khóa người ký
* Khóa chủ sở hữu

## Khóa người ký {#signer-key}

Khóa người ký là địa chỉ được sử dụng để ký các khối Heimdall, điểm kiểm duyệt và các hoạt động liên quan đến việc ký khác.


Khóa riêng tư của địa chỉ người ký phải được đặt trên máy chạy nút xác thực cho mục đích ký.

Khóa người ký không thể quản lý việc góp cổ phần, phần thưởng hoặc ủy quyền.

Người xác thực phải giữ ETH trên địa chỉ người ký trên mạng lưới chính Ethereum để gửi [các điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction).

## Khóa chủ sở hữu {#owner-key}


Khóa chủ sở hữu là địa chỉ được sử dụng để góp cổ phần, góp lại cổ phần, thay đổi khóa người ký, rút ​​phần thưởng và quản lý các thông số liên quan đến ủy quyền trên mạng lưới chính Ethereum. Khóa riêng tư cho khóa chủ sở hữu phải được bảo mật bằng mọi giá.

Tất cả các giao dịch thông qua khóa chủ sở hữu được thực hiện trên mạng lưới chính Ethereum.

Khóa người ký được giữ trên nút và thường được coi là ví **nóng**, trong khi khóa chủ sở hữu phải được giữ rất an toàn, không được sử dụng thường xuyên và thường được coi là ví **lạnh**. Các quỹ góp cổ phần được kiểm soát bởi khóa chủ sở hữu.

Sự phân tách trách nhiệm này giữa khóa người ký và khóa chủ sở hữu nhằm đảm bảo sự cân bằng hiệu quả giữa tính bảo mật và tính dễ sử dụng.

Cả hai khóa đều là địa chỉ tương thích với Ethereum và hoạt động theo cùng một cách.

## Thay đổi người ký {#signer-change}


Xem [Thay đổi địa chỉ người ký của bạn](/docs/maintain/validate/change-signer-address).
