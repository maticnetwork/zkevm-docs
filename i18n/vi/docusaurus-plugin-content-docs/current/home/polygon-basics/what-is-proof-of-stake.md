---
id: what-is-proof-of-stake
title: Bằng chứng cổ phần là gì?
description: Một thuật toán đồng thuận phụ thuộc vào người xác thực.
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

# Bằng chứng của Stake (PoS) {#proof-of-stake-pos}

Bằng chứng cổ phần (PoS) là một loại thuật toán đồng thuận dành cho các blockchain công khai, phụ thuộc vào [cổ phần](/docs/maintain/glossary#staking) kinh tế của người xác thực trong mạng lưới.

Trong các blockchain công khai dựa trên bằng chứng công việc (PoW), thuật toán sẽ trả phần thưởng cho những người tham gia giải được các câu đố mật mã nhằm xác thực các giao dịch và tạo khối mới. Ví dụ blockchain PoW: Bitcoin, Ethereum trước đó.

Trong các blockchain công khai dựa trên PoS, một tập hợp người xác thực thay phiên nhau đề xuất và bỏ phiếu cho khối tiếp theo. Tỷ trọng trong biểu quyết của người xác thực phụ thuộc vào quy mô của khoản nạp tiền — [cổ phần](/docs/maintain/glossary#staking) của người đó. Những lợi thế đáng kể của PoS bao gồm tính bảo mật, giảm rủi ro tập trung hóa và tiết kiệm năng lượng. Các ví dụ về blockchain PoS: Eth2, Polygon.

Nhìn chung, một thuật toán PoS có thể được miêu tả như sau. Blockchain theo dõi một tập hợp người xác thực và bất kỳ ai nắm giữ tiền mã hóa cơ sở của blockchain đó (trong trường hợp của Ethereum là ether) đều có thể trở thành người xác thực bằng cách gửi một loại giao dịch đặc biệt để khóa ether của họ vào một khoản nạp tiền. Sau đó, quy trình tạo và chấp thuận các khối mới được thực hiện thông qua một thuật toán đồng thuận mà tất cả những người xác thực hiện tại đều có thể tham gia.

Có nhiều loại thuật toán đồng thuận và nhiều cách để chỉ định phần thưởng cho những người xác thực tham gia vào thuật toán đồng thuận, do đó, bằng chứng cổ phần có rất nhiều "hương vị". Từ góc độ thuật toán, có hai loại PoS chính: PoS dựa trên chuỗi và PoS kiểu [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Trong **bằng chứng cổ phần dựa trên chuỗi**, thuật toán giả chọn ngẫu nhiên một người xác thực trong mỗi khung thời gian (ví dụ: mỗi khoảng thời gian 10 giây có thể là một khung thời gian) và trao quyền cho người xác thực đó để tạo một khối duy nhất. Khối này phải trỏ đến một số khối trước đó (thường là khối cuối của chuỗi dài nhất trước đó) và do đó theo thời gian, hầu hết các khối hội tụ thành một chuỗi liên tục phát triển.

Trong **bằng chứng cổ phần kiểu BFT**, người xác thực được **ngẫu nhiên** trao quyền *đề xuất* các khối, nhưng *việc thống nhất khối nào là hợp quy* được thực hiện thông qua một quy trình nhiều vòng, trong đó mỗi người xác thực gửi một "phiếu bầu" cho một số khối cụ thể trong mỗi vòng. Vào cuối quy trình, tất cả những người xác thực (trung thực và đang trực tuyến) đồng ý vĩnh viễn về việc một khối bất kỳ nào đó có phải là một phần của chuỗi hay không. Lưu ý rằng các khối vẫn có thể được *xâu chuỗi với nhau*; sự khác biệt chính nằm ở chỗ sự đồng thuận về một khối có thể đến trong phạm vi của khối đó và không phụ thuộc vào chiều dài hay kích thước của chuỗi sau nó.

Để biết thêm chi tiết, vui lòng tham khảo [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Xem thêm:

* [Người ủy quyền](/docs/maintain/glossary#delegator)
* [Người xác thực](/docs/maintain/glossary#validator)
