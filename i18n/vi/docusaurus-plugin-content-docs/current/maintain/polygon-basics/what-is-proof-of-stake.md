---
id: what-is-proof-of-stake
title: Bằng chứng cổ phần là gì?
description: Tìm hiểu bằng chứng của cơ chế đồng thuận Stake là gì?
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bằng chứng cổ phần là gì? {#what-is-proof-of-stake}

Bằng chứng cổ phần (PoS) là một loại thuật toán đồng thuận dành cho các blockchain công khai, phụ thuộc vào [cổ phần](/docs/maintain/glossary.md#staking) kinh tế của người xác thực trong mạng lưới.

Trong các blockchain công khai dựa trên bằng chứng công việc (PoW), thuật toán sẽ trả phần thưởng cho những người tham gia giải được các câu đố mật mã nhằm xác thực các giao dịch và tạo khối mới. Các ví dụ blockchain poW: Bitcoin, Ethereum (trước khi kết hợp).

Trong các blockchain công khai dựa trên PoS, một tập hợp người xác thực thay phiên nhau đề xuất và bỏ phiếu cho khối tiếp theo. Tỷ trọng trong biểu quyết của người xác thực phụ thuộc vào quy mô của khoản nạp tiền — [cổ phần](/docs/maintain/glossary.md#staking) của người đó. Những lợi thế đáng kể của PoS bao gồm tính bảo mật, giảm rủi ro tập trung hóa và tiết kiệm năng lượng. Các ví dụ blockchain: Ethereum 2.0, Polygon.

Nhìn chung, một thuật toán PoS có thể được miêu tả như sau. Khối blockchain lưu trữ theo dõi của một bộ phận xác thực, và bất kỳ ai giữ đồng hồ mật mã cơ bản của blockchain (trong trường hợp của Ethereum, ETH) có thể trở thành một trình xác thực bằng cách gửi một loại giao dịch đặc biệt khóa EU của chúng thành một khoản cọc. Sau đó, quy trình tạo và chấp thuận các khối mới được thực hiện thông qua một thuật toán đồng thuận mà tất cả những người xác thực hiện tại đều có thể tham gia.

Có nhiều loại thuật toán đồng thuận và nhiều cách để chỉ định phần thưởng cho những người xác thực tham gia vào thuật toán đồng thuận, do đó, bằng chứng cổ phần có rất nhiều "hương vị". Từ một viễn cảnh thuật toán, có hai kiểu chính : PoS dựa trên xích và [BFT-Dặm](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Trong **bằng chứng cổ phần dựa trên chuỗi**, thuật toán giả chọn ngẫu nhiên một người xác thực trong mỗi khung thời gian (ví dụ: mỗi khoảng thời gian 10 giây có thể là một khung thời gian) và trao quyền cho người xác thực đó để tạo một khối duy nhất. Khối này phải trỏ đến một số khối trước đó (thường là khối cuối của chuỗi dài nhất trước đó) và do đó theo thời gian, hầu hết các khối hội tụ thành một chuỗi liên tục phát triển.

Trong **BFT-Bằng cách Proof Stake**, các trình xác thực được phân công **ngẫu nhiên** quyền **đề xuất các** khối Đồng ý với khối nào là **canonical** được thực hiện thông qua một quá trình đa tròn nơi mỗi người xác thực gửi **Vote** cho một số khối cụ thể trong mỗi vòng, và cuối quá trình, tất cả (trung thực và trực tuyến) đều đồng ý với sự cố hay không cho khối nào là một phần của chuỗi hay không. Lưu ý rằng các khối có thể vẫn sẽ **bị xích cùng nhau**. Sự khác biệt quan trọng là sự đồng thuận trên một khối có thể xuất hiện trong một khối, và không phụ thuộc vào độ dài hoặc kích thước của chuỗi sau đó.

Để biết thêm chi tiết, hãy tham khảo ý kiến [https://github.com/ethereum/wiki/Bằng chứng - Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

## Xem thêm {#see-also}

* [Người ủy quyền](/docs/maintain/glossary.md#delegator)
* [Người xác thực](/docs/maintain/glossary.md#validator)
