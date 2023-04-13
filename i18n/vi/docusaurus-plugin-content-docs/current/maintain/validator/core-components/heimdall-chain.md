---
id: heimdall-chain
title: Chuỗi Heimdall
description: Lớp xác thực trên mạng Polygon Network
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall là tầng lớp bằng chứng của người phát triển, có trách nhiệm [kiểm tra](/docs/maintain/glossary.md#checkpoint-transaction) số lượng của khối Plasma cho máy chủ Ethereum. Heimdall phụ thuộc vào [Tendermint](https://tendermint.com/).

Hợp đồng góp cổ phần trên mạng lưới chính Ethereum hoạt động cùng với nút Heimdall để hoạt động như cơ chế quản lý góp cổ phần không tin cậy cho công cụ PoS, bao gồm chọn tập hợp [người xác thực](/docs/maintain/glossary.md#validator), cập nhật người xác thực, v.v. Vì việc góp cổ phần được thực hiện trong hợp đồng trên mạng lưới chính Ethereum, ngoài việc dựa vào tính trung thực của người xác nhận, Polygon còn kế thừa tính năng bảo mật của mạng lưới chính Ethereum.

Lớp Heimdall xử lý tập hợp các khối được tạo ra bởi [Bor](/docs/maintain/glossary.md#bor) vào một cây Merkle và định kỳ phát hành gốc Merkle lên mạng lưới chính Ethereum. Việc thông báo định kỳ này được gọi là *kiểm duyệt*.

Cứ với vài khối trên Bor sẽ có một người xác thực (trên lớp Heimdall):

1. Xác thực tất cả các khối kể từ điểm kiểm duyệt cuối cùng.
2.
Tạo cây Merkle của khối băm.
3. Phát hành hàm băm gốc Merkle vào mạng lưới chính Ethereum.

Các điểm kiểm duyệt rất quan trọng vì hai lý do:

1. Cung cấp tính chất cuối cùng trên chuỗi gốc.
2. Cung cấp bằng chứng đốt khi rút tài sản.

Tổng quan về quy trình:

*
Một tập hợp con các nhà xác thực đang hoạt động từ nhóm được chọn để hoạt động [như các nhà sản xuất khối](/docs/maintain/glossary.md#block-producer) trong một khoảng [thời gian](/docs/maintain/glossary.md#span). Nhà sản xuất khối có trách nhiệm tạo ra các khối và phát các khối đã tạo lên mạng lưới.
* Điểm kiểm duyệt bao gồm hàm băm gốc của tất cả các khối được tạo ra trong khoảng thời gian cố định bất kỳ. Tất cả các nút xác thực hàm băm gốc Merkle và gắn chữ ký của mình vào đó.
* Một [người đề xuất](/docs/maintain/glossary.md#proposer) được chọn từ tập hợp người xác thực có trách nhiệm thu thập tất cả các chữ ký cho điểm kiểm duyệt cụ thể và cam kết điểm kiểm duyệt trên mạng chính Ethereum.
* Trách nhiệm tạo ra khối và cũng đề xuất các điểm kiểm duyệt có thể thay đổi tùy thuộc vào tỷ lệ cổ phần của người xác thực trong tổng thể nhóm.

Xem thêm [cấu ​​trúc Heimdall](/docs/pos/heimdall/overview).
