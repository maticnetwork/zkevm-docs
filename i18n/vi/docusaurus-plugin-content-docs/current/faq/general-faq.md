---
id: general-faq
title: Câu hỏi Thường Gặp Chung
description: Những câu hỏi phổ biến về mạng Polygon.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Mạng Polygon là gì? {#what-is-polygon-network}

Mạng Polygon là giải pháp mở rộng Lớp 2 đạt được quy mô bằng cách sử dụng các chuỗi bên để tính toán ngoài chuỗi, đồng thời đảm bảo tính bảo mật và phi tập trung hóa tài sản thông qua những người xác thực Bằng chứng cổ phần (PoS).

Xem thêm [Polygon Là Gì](/docs/home/polygon-basics/what-is-polygon).

## Bằng chứng cổ phần (PoS) là gì? {#what-is-proof-of-stake-pos}

Bằng chứng cổ phần là một hệ thống trong đó mạng blockchain hướng đến việc đạt được sự đồng thuận phân tán. Bất kỳ ai có đủ số lượng token đều có thể khóa tiền mã hóa của họ và khoản thưởng về kinh tế nằm ở giá trị được chia sẻ của mạng lưới phi tập trung. Các cá nhân góp cổ phần tiền mã hóa của họ xác thực các giao dịch bằng cách biểu quyết cho các giao dịch đó trong khi sự đồng thuận đạt được khi một giao dịch hoặc một tập hợp các giao dịch trong một khối hoặc một tập hợp các khối trong một điểm kiểm duyệt nhận được đủ số phiếu. Ngưỡng biểu quyết sử dụng trọng số về cổ phần đi kèm với mỗi phiếu bầu. Ví dụ: trong Polygon, sự đồng thuận cho việc cam kết các điểm kiểm duyệt của các khối Polygon lên mạng Ethereum, đạt được khi có ít nhất ⅔ +1 tổng phiếu bầu của những người nắm cổ phần.

Xem thêm [Bằng chứng cổ phần Là Gì](/docs/home/polygon-basics/what-is-proof-of-stake).

## Bằng chứng cổ phần đóng vai trò gì trong kiến trúc Polygon? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Lớp Bằng chứng cổ phần trong kiến trúc Polygon phục vụ 2 mục đích sau:

* Hoạt động như một lớp khuyến khích để duy trì sự tồn tại của chuỗi Plasma, chủ yếu giảm thiểu vấn đề khó khăn về tình trạng không có sẵn dữ liệu.
* Triển khai các bảo đảm bảo mật Bằng chứng cổ phần cho các chuyển đổi trạng thái không được Plasma đảm nhận.

## Polygon PoS khác với các hệ thống tương tự khác như thế nào? {#how-is-polygon-pos-different-from-other-similar-systems}

Điểm khác biệt nằm ở chỗ hệ thống này phục vụ mục đích kép — cung cấp bảo đảm tính khả dụng dữ liệu cho chuỗi Plasma bao gồm các chuyển đổi trạng thái thông qua Vị từ Plasma cũng như xác thực Bằng chứng cổ phần cho các hợp đồng thông minh chung trong EVM.

Kiến trúc Polygon cũng tách quy trình sản xuất khối và xác thực thành 2 lớp riêng biệt. Người xác thực trong vai trò là nhà sản xuất khối tạo ra các khối như tên gợi ý trên chuỗi Polygon để xác nhận từng phần nhanh hơn (< 2 giây) trong khi sự xác nhận cuối cùng đạt được sau khi điểm kiểm duyệt được cam kết trên chuỗi chính với một khoảng thời gian nhất định, khoảng thời gian đó có thể thay đổi dựa trên nhiều yếu tố như tình trạng tắc nghẽn của Ethereum hoặc số lượng giao dịch của Polygon. Trong điều kiện lý tưởng, quy trình này sẽ mất khoảng 15 phút đến 1 giờ.

Về cơ bản, điểm kiểm duyệt là gốc Merkle của tất cả các khối được tạo ra giữa các khoảng thời gian. Người xác thực đóng nhiều vai trò, tạo các khối ở lớp nhà sản xuất khối, tham gia vào sự đồng thuận bằng cách ký tất cả các điểm kiểm duyệt và cam kết điểm kiểm duyệt khi đóng vai trò là người đề xuất. Xác suất người xác thực trở thành nhà sản xuất khối hoặc người đề xuất dựa trên tỷ lệ cổ phần của họ trong tổng thể nhóm.

## Khuyến khích người đề xuất đưa vào tất cả các chữ ký {#encouraging-the-proposer-to-include-all-signatures}

Để được hưởng toàn bộ phần thưởng dành cho người đề xuất, người đề xuất sẽ cần phải đưa tất cả các chữ ký vào điểm kiểm duyệt. Vì giao thức mong muốn trọng số 2/3+1 trong tổng cổ phần, nên điểm kiểm duyệt sẽ được chấp nhận ngay cả với 80% số lượng phiếu bầu. Tuy nhiên, trong trường hợp này, người đề xuất chỉ nhận được 80% số tiền thưởng đã được tính toán.

## Làm thế nào để tạo phiếu hỗ trợ hoặc đóng góp vào tài liệu của Polygon? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Nếu bạn cho rằng cần phải sửa nội dung nào đó trên tài liệu của chúng tôi hoặc thậm chí bạn muốn thêm thông tin mới vào tài liệu, bạn có thể [nêu vấn đề trên kho lưu trữ Github](https://github.com/maticnetwork/matic.js/issues). [Tệp Readme](https://github.com/maticnetwork/matic-docs/blob/master/README.md) trên kho lưu trữ cũng cung cấp cho bạn một vài gợi ý về cách đóng góp vào tài liệu của chúng tôi.

Nếu bạn vẫn cần trợ giúp, bạn luôn có thể liên hệ với **đội ngũ hỗ trợ của chúng tôi**.
