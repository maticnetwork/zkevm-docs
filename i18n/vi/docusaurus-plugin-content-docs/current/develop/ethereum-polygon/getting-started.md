---
id: getting-started
title: Cầu nối Ethereum↔Polygon
sidebar_label: Overview
description: Một kênh giao dịch hai chiều giữa Polygon và Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon mang đến cho bạn một kênh giao dịch hai chiều không thể tin được giữa Polygon và Ethereum bằng cách giới thiệu cầu nối chuỗi chéo với bảo mật Plasma và PoS. Với tính năng này, người dùng có thể chuyển token qua Polygon mà không phải chịu rủi ro của bên thứ ba và giới hạn tính thanh khoản thị trường. **Cầu Plasma và Plasma có mặt trên cả hai Testnet Mumbai, cũng như Polygon Mainnet**.

**Cây cầu Polygon cung cấp một cơ chế cầu được thiết lập gần gũi và khá linh hoạt**. Polygon sử dụng kiến trúc đồng thuận kép (nền tảng Plasma + Proof-of-Stake (PoS)) để lạc quan cho tốc độ và sự phân lập. Chúng tôi đã kiến trúc hệ thống một cách có ý thức để hỗ trợ các chuyển đổi trạng thái tùy ý trên các chuỗi bên được hỗ trợ EVM của chúng tôi.

**Không có thay đổi nào đối với nguồn cung lưu hành token của bạn khi nó qua cầu nối**;

- Các tượng để lại mạng Ethereum được khóa và số tượng đồng thời được đúc trên Polygon như một dấu hiệu pegged (1:1).
- Để di chuyển các token trở lại mạng lưới ethereum, các token được đốt trên mạng lưới Polygon và được mở khóa trên mạng lưới ethereum trong quy trình này.

## PoS so với Plasma {#pos-vs-plasma}

|                                      | Cầu nối PoS (Khuyên dùng) | Cầu nối Plasma |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Mô tả ngắn** | Nhà phát triển DApp tìm kiếm sự linh hoạt và rút nhanh hơn với bảo mật hệ thống POS. | Các nhà phát triển DApp đang tìm cách tăng cường bảo mật bằng cơ chế thoát Plasma\. |
| **Cấu trúc** | Rất linh hoạt | Cứng nhắc, kém linh hoạt |
| **Nạp tiền\(Ethereum → Polygon\)** | 22-30 mins | 22-30 mins |
| **Rút tiền\(Polygon → Ethereum\)** | 1 checkpoint = ~ 30 mins đến 6 tiếng | Gọi cho quy trình thoát quá trình trên hợp đồng Ethereum |
| **Bảo mật** | Hệ thống Proof\-of\-Stake, được bảo mật bằng một tập hợp các trình xác thực bên ngoài mạnh mẽ\. | Hợp đồng Plasma của Polygon mang lại bảo mật cho Ethereum. |
| **Tiêu chuẩn hỗ trợ** | ETH, ERC20, ERC721, ERC1155 và các token khác | Chỉ ETH, ERC20, ERC721 |

:::info

[**FxPortal**](/develop/l1-l2-communication/fx-portal.md) là một loại cầu khác rất giống với Cầu PoS. Chúng chia sẻ các đặc điểm giống như đề cập cho PoS trong bảng trên. Sự khác biệt duy nhất là Tokens không cần được vẽ trên Cầu FxPortal trước khi cầu. Việc bản đồ xảy ra trong quá trình giao dịch gửi đầu tiên được khởi động cho một vật được giao. Ngoài ra, bất kỳ ai cũng có thể sử dụng FxPortal để xây dựng đường hầm riêng của họ/cầu trên đầu cầu Polygon. Nó được khuyến nghị sử dụng FxPortal cho bất kỳ trường hợp sử dụng cầu xin. Bản vẽ mới trên PoS và Plasma sẽ bị tắt sau ngày 31 tháng 3 năm 2023 để quá trình phát triển bản đồ được phát triển hoàn toàn và linh hoạt.

:::

## Tài nguyên bổ sung {#additional-resources}

- [Giới thiệu với Blockchain](https://ethereum.org/en/bridges/)
- [Cây cầu Cross-Chain là gì?](https://www.alchemy.com/overviews/cross-chain-bridges)
