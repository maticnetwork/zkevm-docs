---
id: covalent
title: Sử dụng Covalent
sidebar_label: Covalent
description: Tìm hiểu cách sử dụng API hợp nhất của Covalent dành cho dữ liệu
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Giới thiệu {#introduction}

Polygon mang lại quy mô lớn cho Ethereum bằng cách sử dụng phiên bản Plasma được điều chỉnh với các chuỗi bên dựa trên PoS để cung cấp giải pháp giao dịch nhanh hơn và  chi phí cực thấp với tính cuối cùng trên chuỗi chính. Mạng lưới Polygon đảm bảo sự sống động bằng cách sử dụng các trạm kiểm soát PoS được đẩy lên chuỗi chính Ethereum. Điều này cho phép một chuỗi bên Polygon đơn lẻ đạt được `2^16` các giao dịch về mặt lý thuyết trên mỗi khối và có thể hàng triệu giao dịch trên nhiều chuỗi trong tương lai.

### Thông tin nhanh {#quick-facts}

<TableWrap>

| Tài sản | Giá trị |
|---|---|
| ChainId Mạng lưới chính Polygon | `137` |
| ChainId Mạng thử nghiệm Polygon Mumbai | `80001` |
| Explorer Blockchain Polygon | https://polygonscan.com/ |
| Thời gian khối | ~3 giây |
| Độ trễ làm mới dữ liệu | ~6 giây hoặc 2 Khối |

</TableWrap>

:::tip Khởi động nhanh

Hãy xem **[<ins>video giới thiệu này</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**  để bắt đầu.

:::

## Các điểm cuối được hỗ trợ {#supported-endpoints}

Tất cả điểm cuối [__Lớp A__](https://www.covalenthq.com/docs/api/#tag--Class-A) đều được hỗ trợ đối với mạng lưới chính Matic và mạng thử nghiệm Mumbai. Bạn có thể truy vấn một trong hai mạng lưới qua API hợp nhất bằng cách thay đổi `chainId`.

:::info Điểm cuối

Danh sách đầy đủ tất cả các yêu cầu mà bạn có thể thực hiện trên mạng lưới Polygon bằng Covalent có sẵn trên [<ins>tài liệu API Covalent</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Phụ lục {#appendix}

### Token Gas Matic {#matic-gas-token}

Để tương tác với mạng lưới Matic, các token MATIC được yêu cầu thanh toán dưới dạng phí gas. Phản hồi của Covalent tự động trả về `gas_*` các trường trong đơn vị MATIC.

### Token đang hoán đổi {#token-mapping}

Covalent duy trì trạng thái đang hoán đổi thời gian thực trên chuỗi các địa chỉ token giữa mạng lưới chính Ethereum và chuỗi Matic. Các địa chỉ này được sử dụng để tra cứu ngược giá trên Matic và cũng để trả về các URL biểu trưng token phù hợp.

Một số ví dụ về các token đã hoán đổi:

| Token | Mạng lưới chính Ethereum | Mạng lưới chính Matic |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Giá Token {#token-prices}

Đối với các token đang hoán đổi trở lại mạng lưới chính Ethereum, Covalent có thể trả lại giá đã hoán đổi.
