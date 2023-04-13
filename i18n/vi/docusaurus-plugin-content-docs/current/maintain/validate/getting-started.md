---
id: validator-index
title: Chỉ số xác thực
description: Một bộ sưu tập các hướng dẫn về cách chạy và vận hành các nút xác thực trên Polygon Network
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Luôn nắm bắt những điều mới mẻ

Tiếp tục cập nhật nút và bản cập nhật mới nhất từ đội Polygon và cộng đồng bằng cách đăng ký [thông báo Polygon](https://polygon.technology/notifications/).

:::

Người xác thực là tác nhân chính trong việc duy trì mạng lưới Polygon. Người xác thực chạy nút đầy đủ và bảo mật mạng lưới bằng cách góp cổ phần MATIC để tạo các khối, xác thực và tham gia vào đồng thuận PoS.

:::info

Có không gian giới hạn cho việc chấp nhận những người xác thực mới. Những người xác thực mới chỉ có thể tham gia nhóm hoạt động khi một người xác thực đang hoạt động mở khoá.

Quy trình đấu giá mới để thay thế người xác thực sẽ được triển khai.

:::

## Tổng quan {#overview}

Polygon gồm ba lớp sau:

* Lớp ethereum — một bộ hợp đồng trên mạng lưới chính ethereum.
* Lớp Heimdall — một bộ các nút Heimdall bằng chứng cổ phần chạy song song với mạng lưới chính ethereum, giám sát bộ hợp đồng góp cổ phần được triển khai trên mạng lưới chính ethereum và cam kết các trạm kiểm soát Mạng lưới Polygon với mạng lưới chính ethereum. Heimdall dựa trên Tendermint.
* Lớp Bor — một bộ nút Bor tạo khối được luân chuyển bởi các nút Heimdall. Bor dựa trên Go Ethereum.

Để trở thành một người xác thực trên Mạng lưới Polygon, bạn phải chạy:

* Nút sentry — một cỗ máy riêng biệt chạy cả nút Heimdall và nút Bor. Nút sentry mở với tất cả các nút trên Mạng lưới Polygon.
* Nút xác thực — một cỗ máy riêng biệt chạy cả nút Heimdall và nút Bor. Nút xác thực chỉ mở đối với nút sentry và khoá đối với phần còn lại của mạng lưới.
* Góp cổ phần token MATIC trong các hợp đồng góp cổ phần được triển khai trên mạng lưới chính Ethereum.

## Thành phần {#components}

### Heimdall {#heimdall}

Heimdall thực hiện các chức năng sau:

* Theo dõi hợp đồng góp cổ phần trên mạng lưới chính Ethereum.
* Xác nhận mọi thay đổi trạng thái trên chuỗi Bor.
* Cam kết điểm kiểm duyệt trạng thái chuỗi Bor với mạng lưới chính Ethereum.

Heimdall phụ thuộc vào Tendermint.

:::info Xem thêm

* Kho lưu trữ GitHub: [Heimdall](https://github.com/maticnetwork/heimdall)
* Kho lưu trữ GitHub: [Hợp đồng góp cổ phần](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Bài đăng blog: [Heimdall và Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor thực hiện các chức năng sau:

* Tạo khối trên Mạng lưới Polygon.

Bor là Nút và lớp nhà sản xuất khối cho Mạng lưới Polygon. Nó được dựa trên Go Ethereum. Các khối được tạo ra trên Bor được xác thực bởi các nút Heimdall.

:::info Xem thêm

* Kho lưu trữ GitHub: [Bor](https://github.com/maticnetwork/bor)
* Bài đăng blog: [Heimdall và Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Phần này hướng dẫn bạn về các chủ đề sau:

* [Trách nhiệm người xác thực](validator-responsibilities.md)
* Gia nhập mạng lưới với tư cách là một người xác thực:
  * [Khởi động và chạy các nút với Ansible](run-validator-ansible.md)
  * [Khởi động và chạy các nút với nhị phân](run-validator-binaries.md)
  * [Góp cổ phần với tư cách là người xác thực](validator-staking-operations.md)
* Duy trì các nút xác thực của bạn:
  * [Thay đổi địa chỉ người ký](change-signer-address.md)
  * [Thay đổi hoa hồng](validator-commission-operations.md)

Hỗ trợ cộng đồng:

* [Discord](https://discord.com/invite/0xPolygon)
* [Diễn đàn](https://forum.polygon.technology/)
