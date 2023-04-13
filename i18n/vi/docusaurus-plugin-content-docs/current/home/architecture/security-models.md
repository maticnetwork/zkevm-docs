---
id: security-models
title: Mô hình Bảo mật
description: PoS, Plasma và chứng khoán Hybrid
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mô hình Bảo mật {#security-models}

Polygon cung cấp ba loại mô hình bảo mật cho một nhà phát triển để xây dựng dApps của họ:

1. [Bảo mật Bằng chứng cổ phần](#proof-of-stake-security)
2. [Bảo mật Plasma](#plasma-security)
3. [Kết hợp (Plasma + PoS)](#hybrid)

Chúng tôi đã mô tả từng mô hình bảo mật này được đề xuất bởi Polygon và dòng công việc phát triển cho mỗi người có một dApp dưới đây.

## Bảo mật Bằng chứng cổ phần {#proof-of-stake-security}

Chứng minh Bảo mật Stake (PoS) được cung cấp bởi lớp Heimdall và Bor được xây dựng trên đỉnh Tendermint. Điểm kiểm duyệt chỉ được cam kết lên chuỗi gốc khi ⅔ người xác thực đã ký vào đó.

Để kích hoạt cơ chế PoS trên nền tảng, chúng tôi sử dụng một tập hợp các hợp đồng quản lý góp cổ phần trên Ethereum, cũng như một tập hợp người xác thực được khuyến khích chạy các nút Heimdall và Bor. Điều này thực hiện các tính năng sau:

- Khả năng cho bất kỳ ai góp cổ phần token MATIC trên hợp đồng thông minh Ethereum và tham gia hệ thống với tư cách là Người xác thực
- Kiếm phần thưởng góp cổ phần cho việc xác thực chuyển đổi trạng thái trên Polygon

Cơ chế PoS cũng hoạt động như một biện pháp giảm thiểu vấn đề không có sẵn dữ liệu cho các chuỗi bên của chúng tôi liên quan đến Plasma.

Chúng tôi có một lớp tính cuối cùng nhanh chóng đóng vai trò hoàn thiện trạng thái chuỗi bên định kỳ thông qua các điểm kiểm duyệt. Tính cuối cùng nhanh chóng giúp chúng tôi củng cố trạng thái chuỗi bên. Chuỗi tương thích EVM có ít người xác thực và thời gian khối nhanh hơn với thông lượng cao. Chuỗi này chọn khả năng mở rộng theo mức độ phi tập trung cao. Heimdall đảm bảo rằng cam kết trạng thái cuối cùng là lớp bảo vệ và chuyển qua một tập hợp người xác thực lớn và do đó có tính phi tập trung cao.

**Đối với nhà phát triển**

Là một nhà phát triển dApp trên bảo mật PoS, quy trình này đơn giản như việc sử dụng hợp đồng thông minh của bạn và triển khai nó trên mạng Polygon PoS. Điều này có thể thực hiện được vì kiến trúc dựa trên tài khoản cho phép một chuỗi bên tương thích với EVM.

## Bảo mật Plasma {#plasma-security}

Polygon cung cấp "Bảo đảm Plasma" với sự tôn trọng đối với nhiều tình huống tấn công khác nhau. Hai trường hợp chính được xem xét là:

- Tổng đài Chain (hoặc ở Polygon, lớp Heimdall ) là sự thối nát, hoặc
- Người dùng gặp sự cố

Trong một số trường hợp, nếu tài sản của người dùng trên chuỗi plasma đã bị lộ, chúng cần bắt đầu xuất khẩu hàng loạt. Polygon cung cấp các cấu trúc trên hợp đồng thông minh chuỗi gốc có thể được tận dụng. Để biết thêm chi tiết và chi tiết kỹ thuật liên quan đến việc xây dựng và véc- tơ tấn công này được xem xét, hãy đọc [ở đây](https://ethresear.ch/t/account-based-plasma-morevp/5480).

Tính hiệu quả, bảo mật do các hợp đồng Plasma của Polygon mang lại hỗ trợ bảo mật cho Ethereum. Quỹ của người dùng chỉ gặp rủi ro nếu Ethereum bị lỗi. Nói một cách đơn giản, chuỗi plasma cũng an toàn như cơ chế đồng thuận của chuỗi chính. Điều này có thể được ngoại lệ để nói rằng chuỗi plasma có thể sử dụng các cơ chế đồng thuận thực sự đơn giản và vẫn được an toàn.

**Đối với nhà phát triển**

Là một developer, nếu bạn muốn xây dựng trên Polygon với sự bảo đảm bảo bảo mật Plasma, bạn sẽ được yêu cầu viết lời tiên đoán cho các hợp đồng thông minh của bạn. Cơ bản điều này có nghĩa là viết các hợp đồng bên ngoài điều kiện xử lý điều kiện tranh chấp được thiết lập bởi công trình tạo plasma Polygon.

## Kết hợp {#hybrid}

Ngoài việc bảo mật Plasma thuần và Proof an ninh Stake có thể được triển khai trên Polygon, cũng có một phương pháp Hybrid mà các nhà phát triển có thể theo dõi - đơn giản là có cả Plasma và Proof Stake trên một số công trình cụ thể của App.

Phương pháp này được hiểu rõ hơn bằng một ví dụ.

Hãy xem xét một dApp bằng một số hợp đồng thông minh mô tả logic của trò chơi. Giả sử trò chơi sử dụng token erc20 riêng để thưởng cho người chơi. Giờ đây, các hợp đồng thông minh xác định logic trò chơi có thể được triển khai trực tiếp trên chuỗi bên Polygon - đảm bảo bảo mật Bằng chứng cổ phần với các hợp đồng trong khi việc chuyển token erc20 có thể được bảo mật bằng bảo đảm Plasma và bằng chứng gian lận được nhúng trong các hợp đồng chuỗi gốc của Polygon.
