---
id: ethereum-polygon
title: Ethereum ↔ Polygon
description: Phát triển ứng dụng blockchain tiếp theo trên Polygon.
keywords:
  - docs
  - matic
  - polygon
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Ethereum ↔ Polygon {#ethereum-polygon}

Giải pháp bảo mật Plasma để chuyển nhượng tài sản từ Ethereum sang Polygon và ngược lại.
*  Sử dụng [matic.js](https://github.com/maticnetwork/matic.js)1 để tương tác với hợp đồng Polygon Plasma.

## Quy trình {#flow}
Đây là Quy trình triển khai các hợp đồng trên Polygon và Hỗ trợ cho Ethereum↔Polygon.

1. Người dùng triển khai token ERC-20 cho Ethereum - XToken

2. Bây giờ hãy chia sẻ địa chỉ hợp đồng với [Polygon](https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ). Dưới đây là một yêu cầu ví dụ...

> Xin chào mọi người, Chúng tôi là AwesomeDApp được triển khai trên Polygon. Đang tìm giải pháp để chuyển nhượng tài sản từ Ethereum sang Polygon và ngược lại. <br/><br/>Mô tả ngắn trên AwesomeDApp...<br/><br/> Token_Address trên Ropsten-> "0x.."<br/> Token_Name-> "XToken"<br/> Token_Symbol-> "X"<br/> Token_Decimals-> "18<br/><br/>" Yêu cầu bạn Hoán đổi các token này sang Phiên bản mạng thử nghiệm Polygon.<br/>

Chúng tôi sẽ triển khai Hợp đồng con cho bạn trên Polygon sao cho phù hợp với yêu cầu và đã hoán đổi sang token Ethereum ↔ Polygon.( Cần có token gốc của Polygon để triển khai trên Polygon, bạn có thể gửi từ Ethereum sang Polygon hoặc mua tại Thị trường thứ cấp.)

3. Người dùng có thể mint Xtoken và Chuyển nhượng trên Ethereum. Ví dụ: giả sử 100XToken là mint rồi chuyển nhượng sang tài khoản khác.

4. Để sử dụng các token này trên Chuỗi Polygon, thực hiện lời gọi hàm nạp tiền để yêu cầu phê duyệt hai giao dịch trước và sau đó nạp ERC20.

5. Giờ 100XTokens đã có trên Chuỗi Polygon tại cùng một địa chỉ.

6. Bạn có thể chuyển 50 XToken từ YourAddress sang NewAddress. Cũng như vậy, đối với các giao dịch trên Polygon tương tự Ethereum, Polygon sẽ sử dụng token gốc riêng.

7. Nếu người dùng muốn lấy lại Xtoken này trên chuỗi Ethereum, hãy thực hiện gọi StartWithdraw để rút tiền từ childTokenContract và Tiêu hủy các token này trên Chuỗi Polygon. Để tránh bất kỳ tình trạng xấu nào xảy ra, sẽ có một loạt thông báo xác nhận. Xong khi hoàn thành xác nhận, token sẽ có sẵn tại Chuỗi Ethereum.

8. Thực hiện gọi processExits() để nhận token cho EOA hoặc địa chỉ tài khoản của bạn.

9. Bạn sẽ thấy 50 XToken trên mạng lưới chính Ethereum tại Địa chỉ tài khoản.
