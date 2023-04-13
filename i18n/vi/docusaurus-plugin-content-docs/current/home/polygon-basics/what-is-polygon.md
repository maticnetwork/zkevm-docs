---
id: what-is-polygon
title: Polygon là gì?
description: Tìm hiểu về giải pháp scaling Polygon
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) là một giải pháp mở rộng Lớp 2 đạt được quy mô bằng cách sử dụng các chuỗi bên để tính toán ngoài chuỗi và một mạng lưới người xác thực Bằng chứng cổ phần (PoS) phi tập trung.

Polygon cố gắng giải quyết các vấn đề về khả năng mở rộng và khả năng sử dụng trong khi không ảnh hưởng đến tính phi tập trung và tận dụng cộng đồng nhà phát triển và hệ sinh thái hiện có. Nó nhằm mục đích cải thiện các nền tảng hiện tại bằng cách cung cấp khả năng và trải nghiệm người dùng cao hơn cho các ứng dụng và chức năng người dùng.

Đây là giải pháp mở rộng cho các các blockchain công khai. Polygon PoS hỗ trợ tất cả các công cụ Ethereum hiện có và giúp thực hiện giao dịch nhanh hơn, tiết kiệm hơn.

## Các tính năng & điểm nổi bật chính {#key-features-highlights}

- **Khả năng mở rộng**: Giao dịch nhanh chóng, chi phí thấp và an toàn trên các chuỗi bên của Polygon với tính cuối cùng đạt được trên chuỗi chính và Ethereum như là chuỗi cơ sở Lớp 1 tương thích đầu tiên.
- **Thông lượng cao**: Đạt đến 10.000 TPS trên một chuỗi bên duy nhất trên mạng thử nghiệm nội bộ; Nhiều chuỗi sẽ được thêm vào để mở rộng theo chiều ngang.
- **Trải nghiệm người dùng**: Trải nghiệm người dùng mượt mà và sự trừu tượng của nhà phát triển từ chuỗi chính đến chuỗi Polygon; ứng dụng di động gốc và SDK có hỗ trợ WalletConnect.
- **Bảo mật**: Người vận hành chuỗi Polygon cũng chính là những người góp cổ phần trong hệ thống PoS.
- **Chuỗi bên công khai**: Các chuỗi bên Polygon có bản chất là công khai (so với các chuỗi DApp riêng lẻ), không cần cấp phép và có khả năng hỗ trợ nhiều giao thức.

Hệ thống Polygon được kiến trúc một cách có ý thức để hỗ trợ các chuyển đổi trạng thái tùy ý trên các chuỗi bên Polygon, các chuỗi này được hỗ trợ EVM.

## Vai trò Người ủy quyền và Người xác thực {#delegator-and-validator-roles}

Bạn có thể tham gia vào mạng Polygon với tư cách là người ủy quyền hoặc người xác thực. Xem:

* [Ai là Người xác thực](/docs/maintain/polygon-basics/who-is-validator)
* [Ai là Người ủy quyền](/docs/maintain/polygon-basics/who-is-delegator)

## Kiến trúc {#architecture}

Nếu mục tiêu của bạn là trở thành người xác thực, thì hiểu về kiến trúc Polygon là điều cần thiết.

Xem [Kiến trúc Polygon](/docs/maintain/validator/architecture) để biết thêm thông tin.

### Thành phần {#components}

Để hiểu chi tiết về kiến trúc của Polygon, hãy xem các thành phần cốt lõi sau:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Hợp đồng](/docs/pos/contracts/stakingmanager)

#### Cơ sở mã {#codebases}

Để hiểu chi tiết về các thành phần cốt lõi, hãy xem các cơ sở mã sau:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Hợp đồng](https://github.com/maticnetwork/contracts)

## Các cách làm {#how-tos}

### Thiết lập nút {#node-setup}

Nếu bạn muốn chạy một nút đầy đủ trên Polygon Mainnet hoặc Mumbai, bạn có thể theo dõi [Chạy một hướng dẫn của Valenator nút](/maintain/validate/run-validator.md)

### Hoạt động góp cổ phần {#staking-operations}

Xem cách thực hiện quy trình góp cổ phần cho hồ sơ người xác thực và người ủy quyền:

* [Hoạt động Góp cổ phần của Người xác thực](docs/maintain/validate/validator-staking-operations)
* [Ủy quyền](/docs/maintain/delegate/delegate)
