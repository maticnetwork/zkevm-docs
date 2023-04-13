---
id: polygon-architecture
title: Kiến trúc của Polygon
description: Kiến trúc của Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Kiến trúc của Polygon {#the-architecture-of-polygon}

**Polygon** là một nền tảng ứng dụng blockchain cung cấp cho phép chứng thực và sidef-Stake và plasma.

Về mặt kiến trúc, vẻ đẹp của Polygon nằm ở thiết kế trang nhã, được tích hợp lớp xác thực chung tách biệt khỏi các môi trường thực thi nhiều biến động như các chuỗi có hỗ trợ Plasma, các chuỗi bên EVM toàn diện, và trong tương lai là các phương pháp tiếp cận Lớp 2 khác như các Optimistic Rollups.

Mạng Polygon PoS có kiến trúc 3 lớp:

* **Lớp Ethereum** - một bộ hợp đồng trên máy chủ Ethereum.
* **Lớp Heimdall** - một bộ phận của các nút Heimdall đang chạy song song song với máy chủ Ethereum, giám sát thiết lập các hợp đồng giả định được triển khai trên máy chủ Ethereum và thực hiện các kiểm tra Polygon Network cho mạng chủ yếu Ethereum. Heimdall dựa trên Tendermint.
* **Lớp Bor** - một bộ nút sản xuất Bor đã chuyển thành bởi các nút Heimdall Bor dựa trên Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

Hiện tại, các nhà phát triển có thể sử dụng **Plasma** cho các chuyển đổi trạng thái cụ thể mà các thuộc tính Plasma đã được viết, chẳng hạn như ERC20, ERC721, hoán đổi tài sản, hoặc các thuộc tính tùy chỉnh khác. Đối với các chuyển đổi trạng thái tùy ý, họ có thể sử dụng PoS. Hoặc cả hai! Điều này có thể thực hiện được nhờ cấu trúc kết hợp của Polygon.

Để cho phép cơ chế PoS trên nền tảng của chúng tôi, một bộ hợp đồng quản lý **góp cổ phần** được triển khai trên Ethereum, và một bộ những người xác thực được khuyến khích chạy các nút **Heimdall** và **Bor**. Ethereum là
chuỗi cơ sở đầu tiên Polygon hỗ trợ, nhưng Polygon dự định hỗ trợ cho các chuỗi cơ sở bổ sung nhằm cho phép một nền tảng blockchain Lớp 2 phi tập trung có thể tương tác dựa trên đề xuất và đồng thuận của cộng đồng.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Hợp đồng góp cổ phần {#staking-contracts}

Để cho phép cơ chế [Bằng chứng Cổ phần (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) trên Polygon, hệ thống sử dụng một bộ hợp đồng quản lý [góp cổ phần](/docs/maintain/glossary#staking) trên mạng chính Ethereum.

Các hợp đồng góp cổ phần triển khai các tính năng sau:

* Bất kỳ ai cũng có thể góp cổ phần phiếu thưởng MATIC trên các hợp đồng góp cổ phần trên mạng chính Ethereum và tham gia hệ thống như một [người xác thực](/docs/maintain/glossary#validator).
* Kiếm phần thưởng góp cổ phần cho việc xác thực chuyển đổi trạng thái trên Mạng Polygon.
* Lưu [các điểm kiểm duyệt](/docs/maintain/glossary#checkpoint-transaction) trên mạng chính Ethereum.

Cơ chế PoS cũng hoạt động như một sự giảm thiểu thiếu dữ liệu cho các chuỗi bên của Polygon.

## Heimdall {#heimdall}

Heimdall là lớp xác thực bằng chứng cổ phần xử lý tập hợp các khối được tạo ra bởi [Bor](/docs/maintain/glossary#bor) vào một cây Merkle và định kỳ phát hành gốc Merkle lên chuỗi gốc. Việc xuất bản định kỳ các ảnh chụp nhanh của chuỗi bên Bor được gọi là [các điểm kiểm duyệt](/docs/maintain/glossary#checkpoint-transaction).

1. Xác thực tất cả các khối kể từ điểm kiểm duyệt cuối cùng.
2.
Tạo cây Merkle của khối băm.
3. Phát hành hàm băm gốc Merkle vào mạng chính Ethereum.

Các điểm kiểm duyệt rất quan trọng vì hai lý do:

1. Cung cấp tính chất cuối cùng trên chuỗi gốc.
2. Cung cấp bằng chứng đốt khi rút tài sản.

Tổng quan về quy trình:

*
Một tập hợp con các nhà xác thực đang hoạt động từ nhóm được chọn để hoạt động như [các nhà sản xuất khối](/docs/maintain/glossary#block-producer) trong một [khoảng thời gian](/docs/maintain/glossary#span). Các nhà sản xuất khối này có trách nhiệm tạo ra các khối và phát các khối đã tạo lên mạng.
* Điểm kiểm duyệt bao gồm hàm băm gốc Merkle của tất cả các khối được tạo ra trong khoảng thời gian cố định bất kỳ. Tất cả các nút xác thực hàm băm gốc Merkle và gắn chữ ký của mình vào đó.
* Một [người đề xuất](/docs/maintain/glossary#proposer) được chọn từ tập hợp người xác thực có trách nhiệm thu thập tất cả các chữ ký cho điểm kiểm duyệt cụ thể và cam kết điểm kiểm duyệt trên mạng chính Ethereum.
* Trách nhiệm tạo ra khối và đề xuất các điểm kiểm duyệt có thể thay đổi tùy thuộc vào tỷ lệ cổ phần của người xác thực trong tổng thể nhóm.

Có sẵn thêm chi tiết về Heimdall trên hướng dẫn [kiến trúc Heimdall](/docs/pos/heimdall/overview).

## Bor {#bor}

Bor là lớp khối sidechain của Polygon - thực thể chịu trách nhiệm cho việc phân phối giao dịch thành khối Hiện tại, đây là một triển khai Geth cơ bản với các thay đổi tùy chỉnh được thực hiện đối với thuật toán đồng thuận.

Nhà sản xuất khối là một mạng phụ của các trình xác thực và đang chuyển đổi theo thời gian qua sự lựa chọn trên ủy ban [Heimdall](/docs/maintain/glossary#heimdall) trong thời gian được gọi là được gọi là `span`trong Polygon. Các khối được sản xuất tại nút **Bor**, và VM chuỗi bên tương thích với EVM.
 Các khối được sản xuất trên Bor cũng được các nút Heimdall xác thực định kỳ, và một điểm kiểm duyệt có chứa
 hàm băm cây Merkle của một tập hợp khối trên Bor được định kỳ cam kết lên Ethereum.

Có sẵn thêm chi tiết trên hướng dẫn [kiến trúc Bor](/docs/pos/bor/overview).

## Tài nguyên {#resources}

* [Kiến trúc Bor](https://wiki.polygon.technology/docs/pos/bor)
* [Kiến trúc Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Cơ chế điểm kiểm duyệt](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
