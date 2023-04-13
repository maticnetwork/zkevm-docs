---
id: bor
title: Kiến trúc Bor
description: Vai trò Bor trong kiến trúc Polygon
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Kiến trúc Bor {#bor-architecture}

Polygon là một nền tảng laid **Plasma + Plasma- Prof-of-Stake (PoS)** Chúng tôi sử dụng kiến trúc đồng thuận kép trên Mạng polygon để tối ưu hóa tốc độ và phân quyền. Chúng tôi đã kiến trúc hệ thống một cách có ý thức để hỗ trợ các chuyển đổi trạng thái tùy ý trên các chuỗi bên được hỗ trợ EVM của chúng tôi.

## Kiến trúc {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Blockchain là một tập hợp các máy khách trên mạng tương tác và làm việc cùng nhau. Máy khách là một phần mềm có khả năng thiết lập một kênh giao tiếp p2p với các máy khách khác, ký và truyền phát các giao dịch, triển khai và tương tác với các hợp đồng thông minh, v.v. Máy khách thường được gọi là một nút.

Đối với Polygon, nút được thiết kế với hai lớp thực thi Heimdall (Validator Layer) và Bor(Block Production Layer).

1. Heimdall
    - Xác thực Bằng chứng Cổ phần
    - Các khối điểm kiểm duyệt trên chuỗi chính Ethereum
    - Quản lý Phần thưởng và Người xác thực
    - Đảm bảo Đồng bộ với chuỗi chính Ethereum
    - Cầu nối Phi tập trung
2. Bor
    - Chuỗi Polygon
    - VM tương thích EVM
    - Lựa chọn tập hợp Người đề xuất và Nhà sản xuất
    - SystemCall
    - Mô hình phí

## Heimdall (lớp người xác thực) {#heimdall-validator-layer}

Heimdall (All-Protector) là người vận hành của tất cả những gì xảy ra trong hệ thống chứng khoán Polygon - tốt hoặc xấu.

Heimdall là lớp Xác thực Bằng chứng Cổ phần của chúng tôi, có trách nhiệm gửi điểm kiểm duyệt đại diện của các khối Plasma lên chuỗi chính trong kiến trúc của chúng tôi. Chúng tôi đã triển khai lớp này bằng cách phát triển dựa trên cơ cấu đồng thuận Tendermint cùng với các thay đổi về sơ đồ chữ ký và cấu trúc dữ liệu khác nhau.

Để biết thêm thông tin, vui lòng đọc [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

## Bor (lớp Nhà sản xuất Khối) {#bor-block-producer-layer}

Việc thực hiện nút Bor về cơ bản là trình vận hành chuỗi bên. VM chuỗi bên có khả năng tương thích EVM. Hiện nay, đây là một triển khai Geth cơ bản với các thay đổi tùy chỉnh được thực hiện đối với thuật toán đồng thuận. Tuy nhiên, nút này sẽ được xây dựng từ nền tảng để có cấu hình nhẹ và tính năng tập trung.

Bor là lớp Nhà sản xuất Khối của chúng tôi, đồng bộ với Heimdall để chọn các nhà sản xuất và người xác thực cho mỗi khoảng thời gian và sprint. Tương tác cho người dùng Polygon diễn ra trên chuỗi bên này, tương thích với EVM để tận dụng chức năng và khả năng tương thích của công cụ và ứng dụng dành cho nhà phát triển Ethereum.

### Chuỗi Polygon {#polygon-chain}

Chuỗi này là blockchain riêng biệt được gắn với Ethereum bằng cách sử dụng chốt hai chiều. Chốt hai chiều cho phép hoán đổi tài sản giữa Ethereum và Polygon.

### VM tương thích EVM {#evm-compatible-vm}

Máy Ảo Ethereum (EVM) là một ngăn xếp ảo hộp cát mạnh mẽ được nhúng bên trong mỗi nút Polygon đầy đủ, có trách nhiệm thực hiện mã byte hợp đồng. Các hợp đồng thường được viết bằng các ngôn ngữ cấp cao hơn, như Solidity, sau đó được biên dịch sang mã byte EVM.

### Lựa chọn Người đề xuất và Nhà sản xuất {#proposers-and-producers-selection}

Nhà sản xuất Khối cho lớp Bor là một ban được chọn từ nhóm Người xác thực dựa trên cổ phần của họ, diễn ra trong các khoảng thời gian đều đặn và được xáo trộn định kỳ. Những khoảng thời gian này do ban quản trị Người xác thực quyết định theo dynasty và mạng.

Tỷ lệ Cổ phần/Quyền góp cổ phần xác định khả năng được chọn làm thành viên của ban nhà sản xuất khối.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Quy trình Lựa chọn {#selection-process}

- Giả sử chúng ta có 3 người xác thực trong nhóm, và họ là Alice, Bill và Clara.
- Alice góp cổ phần 100 phiếu thưởng Matic trong khi Bill và Clara góp cổ phần 40 phiếu thưởng Matic.
- Người xác thực được cấp các slot theo cổ phần, vì Alice góp cổ phần 100 phiếu thưởng Matic, cô ấy sẽ nhận được các slot theo tỷ lệ. Alice sẽ có tổng cộng 5 slot. Tương tự, Bill và Clara có tổng cộng 2 slot.
- Tất cả người xác thực đều được cung cấp các slot này [A, A, A, A, A, B, B, C, C]
- Sử dụng dữ liệu khối Ethereum lịch sử làm mầm mống, chúng tôi xáo trộn mảng này.
- Sau khi xáo trộn các slot bằng cách sử dụng mầm mống, giả sử chúng ta có được mảng này [A, B, A, A, C, B, A, A, C]
- Giờ đây, tùy thuộc vào số lượng Nhà sản xuất* (do ban quản trị người xác thực duy trì)*, chúng ta đặt các người xác thực từ trên xuống. Ví dụ: nếu chúng ta muốn chọn 5 nhà sản xuất, chúng ta có được tập hợp nhà sản xuất là [A, B, A, A, C]
- Do đó, tập hợp nhà sản xuất cho span tiếp theo được xác định là [A: 3, B:1, C:1].
- Bằng việc sử dụng tập hợp người xác thực và thuật toán chọn người đề xuất của tendermint, chúng ta chọn một nhà sản xuất cho mỗi sprint trên Bor.

### Giao diện SystemCall {#systemcall-interface}

Lệnh gọi hệ thống là một địa chỉ trình vận hành nội bộ dưới EVM. Lệnh này giúp duy trì trạng thái cho Nhà sản xuất Khối cho mỗi sprint. Lệnh gọi Hệ thống được kích hoạt vào cuối một sprint và một yêu cầu được đưa ra đối với danh sách Nhà sản xuất Khối mới. Một khi trạng thái được cập nhật, các thay đổi được nhận sau khi tạo khối trên Bor cho tất cả các Người xác thực.

### hàm {#functions}

#### đề xuất {#proposestate}

- Chỉ cho phép gọi cho người xác thực.
- Kiểm tra `stateId`xem nó đã được đề xuất hoặc cam kết chưa.
- Đề xuất `stateId`và cập nhật lá cờ thành`true`.

#### Ủy ban {#commitstate}

- Chỉ cho phép gọi cho Hệ thống.
- Kiểm tra `stateId`xem nó đã được đề xuất hoặc cam kết chưa.
- Thông báo `StateReceiver`Hợp đồng với `stateId`mới.
- Cập nhật `state`lá cờ thành`true`, Và `remove``proposedState`.

#### cầu hôn {#proposespan}

- Chỉ cho phép gọi cho người xác thực.
- Kiểm tra xem đề xuất Span có phải không`pending`.
- Cập nhật Đề xuất Span thành `true`

#### Đề xuất {#proposecommit}

- Chỉ cho phép gọi cho Hệ thống.
- Cài `initial validators`nếu span hiện tại là 0.
- Kiểm tra Điều kiện để biết `spanId`và `time_period`của Sprint và Span.
- Cập nhật `span`và `time_period`mới.
- Cài `validators`và `blockProducers`cho  `sprint`.
- Cập nhật lá cờ cho `spanProposal`thành `true`.

### Mô Hình Phí Bor {#bor-fee-model}

Đối với các giao dịch thông thường, phí trong phiếu thưởng Matic được thu thập và phân phối cho các nhà sản xuất khối, tương tự như các giao dịch Ethereum.

Giống như các blockchain khác, Polygon có phiếu thưởng gốc được gọi là Matic(MATIC). MATIC là một phiếu thưởng ERC20 chủ yếu được sử dụng để thanh toán gas (phí giao dịch) trên Polygon và khi góp cổ phần.

:::info

Một điều quan trọng cần ghi chú là trên chuỗi Polygon, phiếu thưởng MATIC hoạt động như một phiếu thưởng ERC20, nhưng cũng hoạt động như phiếu thưởng gốc – cả hai cùng thời gian. Do đó, điều này có nghĩa là người dùng có thể thanh toán gas bằng MATIC cũng như gửi MATIC cho các tài khoản khác.

:::

Đối với hợp đồng genesis, `gasPrice`và cũng `gasLimit`làm việc tương tự như Ethereum, nhưng trong khi thực thi nó sẽ không khấu trừ phí từ tài khoản người gửi.

Giao dịch dựng sẵn từ các người xác thực hiện tại được thực hiện với `gasPrice = 0`.

Ngoài ra, các trình xác thực phải gửi theo các loại giao dịch như các đề xuất State như đề xuất gửi và Span trên Bor.

## Thông tin chi tiết về kỹ thuật {#technical-insight}

### Hợp đồng dựng sẵn {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Hợp đồng này quản lý tập hợp người xác thực cho từng span và sprint.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Hợp đồng này quản lý việc chuyển nhượng dữ liệu hợp đồng tùy ý từ hợp đồng Ethereum sang hợp đồng Polygon

MaticChildERC20(0x1010) ⇒ Hợp đồng con cho phiếu thưởng Chuỗi Chính, cho phép chuyển tài sản từ Ethereum sang Polygon.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Giao thức Bor

## Thuật ngữ {#glossary}

- StartEpoch – Post số điểm kiểm duyệt mà người xác thực được kích hoạt và sẽ tham gia vào sự đồng thuận.
- EndEpoch – Post số điểm kiểm duyệt mà người xác thực được coi là đã ngừng hoạt động và sẽ không tham gia vào sự đồng thuận.
- Sprint – Sprint là một tập hợp các khối liên tục được tạo bởi một người xác thực đơn lẻ.
- Span – Span là một tập hợp các khối lớn với một tập hợp người xác thực cố định nhưng bao gồm các sprint khác nhau. Ví dụ: đối với một span có chiều dài 6400 khối, nó sẽ bao gồm 100 sprint dài 64 khối.
- Dynasty: Thời gian giữa thời điểm kết thúc phiên đấu giá trước và thời gian bắt đầu phiên đấu giá tiếp theo.

## Tài nguyên {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [EVM Hoạt Động Thế Nào?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Lựa chọn Proposmint](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
