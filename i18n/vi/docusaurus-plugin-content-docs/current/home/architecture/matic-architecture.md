---
id: polygon-architecture
title: Kiến trúc Polygon PoS
description: Kiến trúc Polygon PoS bao gồm chuỗi Heimdall và Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Kiến trúc Polygon PoS {#polygon-pos-architecture}

Mạng Polygon là một nền tảng ứng dụng blockchain cho phép cung cấp các chuỗi bên kết hợp có hỗ trợ Bằng chứng cổ phần và Plasma.

Kiến trúc, vẻ đẹp của Polygon là thiết kế thanh lịch của nó, có tính năng một lớp xác thực được cách biệt từ môi trường thực thi varying như side-blown EVM và các lớp khác sẽ tiếp cận như là sự cố định không nhận thức.

Để kích hoạt cơ chế PoS trên nền tảng của chúng tôi, một tập hợp các hợp đồng quản lý **góp cổ phần** được triển khai trên Ethereum, cũng như một tập hợp người xác thực được khuyến khích chạy các nút **Heimdall** và **Bor**. Ethereum là
chuỗi cơ sở đầu tiên Polygon hỗ trợ, nhưng Polygon cũng dự định hỗ trợ cho các chuỗi cơ sở
 khác theo đề xuất và đồng thuận của cộng đồng, nhằm xây dựng một nền tảng blockchain Lớp 2 phi tập trung có thể tương tác.

Polygon PoS có kiến trúc ba lớp:

1. Hợp đồng thông minh góp cổ phần trên Ethereum
2. Heimdall (lớp Bằng chứng cổ phần)
3. Bor (lớp nhà sản xuất Khối)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Hợp đồng thông minh Polygon (trên ethereum) {#polygon-smart-contracts-on-ethereum}

Polygon duy trì một tập hợp hợp đồng thông minh trên Ethereum, các hợp đồng này xử lý những vấn đề sau:

- Quản lý góp cổ phần phục vụ lớp Bằng chứng cổ phần
- Quản lý ủy quyền bao gồm cổ phần người xác thực
- Điểm kiểm duyệt/ảnh chụp nhanh của trạng thái chuỗi bên

### Heimdall (lớp người xác thực Bằng chứng cổ phần) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** là nút người xác thực PoS hoạt động hài hòa với hợp đồng Góp cổ phần trên Ethereum để kích hoạt cơ chế PoS trên Polygon. Chúng tôi đã triển khai lớp này bằng cách phát triển dựa trên cơ cấu đồng thuận Tendermint cùng với các thay đổi về sơ đồ chữ ký và cấu trúc dữ liệu khác nhau. Lớp này chịu trách nhiệm xác thực khối, lựa chọn ủy ban nhà sản xuất khối, gửi điểm kiểm duyệt đại diện của các khối chuỗi bên lên Ethereum trong kiến trúc của chúng tôi cùng nhiều trách nhiệm khác.

Lớp Heimdall xử lý tập hợp các khối được tạo ra bởi Bor vào một cây Merkle và định kỳ phát hành gốc Merkle lên chuỗi gốc. Các xuất bản kinh nguyệt này được gọi là `checkpoints`. Cứ với vài khối trên Bor sẽ có một người xác thực (trên lớp Heimdall):

1. Xác thực tất cả các khối kể từ điểm kiểm duyệt cuối cùng
2. Tạo một cây merkle của hàm băm khối
3. Phát hành gốc merkle lên chuỗi chính

Các điểm kiểm duyệt rất quan trọng vì hai lý do:

1. Tạo ra tính cuối cùng trên Chuỗi Gốc
2. Cung cấp bằng chứng đốt cháy khi rút tài sản

Tổng quan về quy trình có thể được giải thích như sau:

- Một tập hợp con người xác thực đang hoạt động trong nhóm được chọn làm nhà sản xuất khối cho một span. Sự chọn lựa mỗi span cũng sẽ được đồng thuận bởi ít nhất 2/3 số người nắm quyền. Các nhà sản xuất khối này chịu trách nhiệm tạo ra các khối và phát thanh nó cho mạng còn lại.
- Điểm kiểm duyệt bao gồm gốc của tất cả các khối được tạo ra trong khoảng thời gian cố định bất kỳ. Tất cả các nút xác thực điểm kiểm duyệt và gắn chữ ký của mình vào đó.
- Một đề xuất đã chọn từ bộ xác thực sẽ chịu trách nhiệm thu thập tất cả các chữ ký cho một điểm kiểm tra đặc biệt và thực hiện tương tự trên chuỗi chính.
- Trách nhiệm tạo ra khối và cũng đề xuất các điểm kiểm duyệt có thể thay đổi tùy thuộc vào tỷ lệ cổ phần của người xác thực trong tổng thể nhóm.

### Bor (Lớp Nhà sản xuất Khối) {#bor-block-producer-layer}

Bor là lớp nhà sản xuất khối Polygon - thực thể chịu trách nhiệm tổng hợp các giao dịch thành các khối.

Các nhà sản xuất khối được luân chuyển định kỳ thông qua việc lựa chọn ủy ban trên Heimdall trong khoảng thời gian được gọi là `span` trong Polygon. Các khối được sản xuất tại nút **Bor** và VM chuỗi bên tương thích với EVM. Các khối được sản xuất trên Bor cũng được xác thực định kỳ bởi các nút Heimdall và một điểm kiểm duyệt có chứa hàm băm cây Merkle của một tập hợp khối trên Bor được định kỳ cam kết lên Ethereum.

### Đọc thêm {#further-reading}

- [Tòa nhà với Nhà cung cấp Polygon Node](https://www.alchemy.com/overviews/polygon-node)
- [Sâu Dive vào Polygon Architecture](https://101blockchains.com/polygon-architecture/)

### Tài nguyên {#resources}

- [Kiến trúc Bor](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Kiến trúc Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Cơ chế điểm kiểm duyệt](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
