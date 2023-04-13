---
id: architecture
title: Kiến trúc
description: Ethereum, Heimdall và các lớp Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Mạng lưới Polygon được chia thành ba lớp:

* **Lớp Ethereum** - một bộ hợp đồng trên máy chủ Ethereum.
* **Lớp Heimdall** - một bộ phận của các nút Heimdall đang chạy song song với máy chủ Ethereum, giám sát thiết lập các hợp đồng giả mạo được triển khai trên máy chủ Ethereum, và thực hiện các kiểm tra Polygon Network cho mạng lưới chính xác Ethereum. Heimdall dựa trên Tendermint.
* **Lớp Bor** - một bộ nút sản xuất Bor đã chuyển thành bởi các nút Heimdall Bor dựa trên Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Hợp đồng thông minh Góp cổ phần và Plasma trên Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Để kích hoạt cơ chế [Bằng chứng Cổ phần (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) trên Polygon, hệ thống sử dụng một bộ hợp đồng quản lý [góp cổ phần](/docs/maintain/glossary.md#staking) trên mạng lưới chính Ethereum.

Các hợp đồng góp cổ phần triển khai các tính năng sau:

* Khả năng cho bất kỳ ai góp cổ phần token MATIC trên các hợp đồng trên mạng lưới chính Ethereum và tham gia hệ thống với tư cách là [người xác thực](/docs/maintain/glossary.md#validator).
* Kiếm phần thưởng góp cổ phần cho việc xác thực chuyển đổi trạng thái trên Mạng Polygon.
* Lưu [các điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction) trên mạng chính Ethereum.

Cơ chế PoS cũng hoạt động như một sự giảm thiểu cho dữ liệu không khả dụng cho các chuỗi bên của Polygon.

## Heimdall (Lớp xác thực)  {#heimdall-validation-layer}

Lớp Heimdall xử lý tập hợp các khối được tạo ra bởi [Bor](/docs/maintain/glossary.md#bor) vào một cây Merkle và định kỳ phát hành gốc Merkle lên chuỗi gốc. Việc xuất bản định kỳ các ảnh chụp nhanh của chuỗi bên Bor được gọi là [các điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction).

Đối với mỗi vài khối trên Bor, một người xác thực trên lớp Heimdall:

1. Xác thực tất cả các khối kể từ điểm kiểm duyệt cuối cùng.
2.
Tạo cây Merkle của khối băm.
3. Phát hành hàm băm gốc Merkle vào mạng chính Ethereum.

Các điểm kiểm duyệt rất quan trọng vì hai lý do:

1. Cung cấp tính chất cuối cùng trên chuỗi gốc.
2. Cung cấp bằng chứng đốt khi rút tài sản.

Tổng quan về quy trình:

*
Một tập hợp con các nhà xác thực đang hoạt động từ nhóm được chọn để hoạt động như [các nhà sản xuất khối](/docs/maintain/glossary.md#block-producer) trong một [khoảng thời gian](/docs/maintain/glossary.md#span). Các nhà sản xuất khối này có trách nhiệm tạo ra các khối và phát các khối đã tạo lên mạng.
* Điểm kiểm duyệt bao gồm hàm băm gốc Merkle của tất cả các khối được tạo ra trong khoảng thời gian cố định bất kỳ. Tất cả các nút xác thực hàm băm gốc Merkle và gắn chữ ký của mình vào đó.
* Một [người đề xuất](/docs/maintain/glossary.md#proposer) được chọn từ tập hợp người xác thực có trách nhiệm thu thập tất cả các chữ ký cho điểm kiểm duyệt cụ thể và cam kết điểm kiểm duyệt trên mạng chính Ethereum.
* Trách nhiệm tạo ra khối và cũng đề xuất các điểm kiểm duyệt có thể thay đổi tùy thuộc vào tỷ lệ cổ phần của người xác thực trong tổng thể nhóm.

Xem thêm [cấu ​​trúc Heimdall](/docs/pos/heimdall/overview).

## Bor (lớp nhà sản xuất Khối) {#bor-block-producer-layer}

Bor là nhà sản xuất khối chuỗi bên của Polygon — thực thể chịu trách nhiệm tổng hợp các giao dịch thành các khối.

Các nhà sản xuất khối Bor là một tập hợp con các người xác thực và được các người xác thực [Heimdall](/docs/maintain/glossary.md#heimdall) xáo trộn định kỳ.

Xem thêm [cấu ​​trúc Bor](/docs/pos/bor/overview).
