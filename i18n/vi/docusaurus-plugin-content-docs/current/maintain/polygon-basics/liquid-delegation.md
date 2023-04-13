---
id: liquid-delegation
title: Thanh khoản ủy quyền (Liquid Delegation)
sidebar_label: Liquid Delegation
description: Cách Polygon sử dụng thanh khoản ủy quyền để duy trì mạng lưới.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Trong một bằng chứng truyền thống Proof Stake mechanism, blockchain theo dõi một bộ phận xác thực. Bất kỳ ai có thể tham gia cấp này hoặc quyền xác thực giao dịch bằng cách gửi một loại giao dịch đặc biệt làm tăng đồng xu (trong trường hợp của Ethereum, ETH) và khóa thành một cọc. Sau đó, quá trình tạo và đồng ý với các khối mới được thực hiện thông qua thuật toán đồng thuận của tất cả các xác thực đang hoạt động.

Chúng khóa một phần cổ phần của chúng trong một khoảng thời gian nhất định (như một khoản tiền gửi bảo mật), và sau đó, chúng sẽ có cơ hội xác định cổ phần đó để chọn khối kế tiếp.

Phần thưởng Stake được phân phối như một sự khuyến khích cho người tham gia.

## Ủy quyền {#delegation}

Sắc-xin có thể sẽ rất đắt tiền, nâng rào cản để vào, điều đó sẽ giúp người giàu trở nên giàu hơn. Mọi người nên tham gia vào an ninh mạng và nhận được những dấu hiệu đánh giá cao. Lựa chọn duy nhất là tham gia một hồ bơi giả mạo tương tự như một bể nước khai thác, nơi mà người xác thực phải được tin cậy. Chúng tôi tin rằng việc gắn bó vào giao thức là phương pháp tốt nhất cho các đại biểu mới. Vì vốn và phần thưởng được mở và được bảo vệ bởi các cơ chế giao thức.

Các máy xác thực có thể tham gia vào sự xác thực mặc dù chúng không thể chủ toàn bộ nút Tuy nhiên, bằng cách xác thực với các trình xác thực, chúng có thể tăng cường sức mạnh của mạng và nhận được phần thưởng bằng cách trả một khoản tiền hoa hồng nhỏ (điều đó thay đổi tùy thuộc vào trình xác thực) cho trình xác thực của sự lựa chọn của chúng.

## Hạn chế của Delegator và trình xác thực {#limitation-of-traditional-delegator-and-validator}

Chi phí khóa vốn cho cả người xác thực và người ủy quyền đều cao do thiết kế giao thức Bằng chứng Cổ phần.

Tuy nhiên, chúng ta có thể mang thêm cơ chế xem thanh lý như là trình xác thực NFT nơi mà bất kỳ người nào muốn trở thành một người xác thực có thể mua được NFT từ một trình xác thực muốn thoát khỏi hệ thống vì một lý do.

Trong trường hợp của các đại biểu số lượng được cho là được xác định ở số lượng nhỏ hơn vì vậy chúng tôi muốn nó trở thành chất lỏng để sự tham gia sẽ hoạt động hơn (tức là nếu một số đại biểu cho rằng hiện tại cơ hội này là lớn trong DeFi nhưng vốn của họ đã được khóa trong hồ bơi giả mạo thậm chí để rút lui, chúng vẫn cần đợi 21 ngày).

Ngoài ra, khóa X ETH trong một khoản gửi không phải là miễn phí; nó sẽ tạo ra sự hi sinh sự lựa chọn cho người giữ RĂNG Ngay bây giờ, nếu bạn có 1000 ETH, bạn có thể làm bất cứ điều gì bạn muốn với nó. Nếu bạn khóa nó lại trong một khoản cọc, thì nó sẽ kẹt ở đó trong hàng tháng để ngăn chặn các cuộc tấn công như không có [**gì trên cọc**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) và trừng phạt người xác thực cho sự tham gia xấu của chúng.

## Lớp Ứng dụng vs In-Giao thức {#in-protocol-vs-application-layer}

Chất lỏng đơn giản là chất lượng đơn giản có vấn đề tin cậy. Chất lỏng chất lượng giao thức sẽ được đánh giá cao hơn nhiều vì sự thật rằng bất kỳ diễn viên mới nào cũng có thể tin tưởng nó (điều đó thu hút nhiều vốn, thậm chí là từ các diễn viên nhỏ hơn / đại biểu).

##
Giải pháp của Polygon cho Ủy quyền {#polygon-s-solution-for-delegation}

Trong khi khám phá đại biểu, chúng tôi nhận ra rằng đại biểu cần được thực thi theo quy định để có được nhiều sự tin cậy hơn từ các đại biểu.

Chúng ta đang đối mặt với sự thanh toán vốn tương tự với sự thanh toán và nghĩ rằng sẽ biến nó thành một NFT có thể được chuyển và khám phá về những suy nghĩ tương tự như cách nó có thể được tạo ra nhiều chất lỏng hơn và sikka-chorus. [Thiết kế tuyệt vời](https://blog.chorus.one/delegation-vouchers/) của người ta đã gây chú ý.

Suy nghĩ hướng tới việc cổ phần của bể xác thực là một ý tưởng tuyệt vời và do góp cổ phần của Polygon được thực hiện trên hợp đồng thông minh ethereum, nó mở ra nhiều lựa chọn hơn cho chúng tôi như khiến nó tương thích với ERC20 để có thể được sử dụng trong các giao thức defi.

Tính đến lúc này mỗi trình xác thực có VMatic (tức là trình xác thực) của họ sẽ có Amish (AMAtic token) bởi vì mỗi trình xác thực có hiệu suất khác nhau (phần thưởng và tỷ lệ hoa quả). Các máy xác thực có thể mua nhiều cổ phần xác thực và hàng rào rủi ro của chúng đối với hiệu suất kém của người xác thực cụ thể.

## Ưu điểm {#advantages}

- Vì thiết kế của chúng ta theo dõi ERC20 như giao diện trong việc triển khai , các ứng dụng DeFi có thể dễ dàng xây dựng trên nó.
- Các token được ủy quyền có thể được sử dụng trong các giao thức cho vay.
- Người ủy quyền có thể phòng ngừa rủi ro của họ thông qua các thị trường dự đoán như Auger.

Phạm vi trong tương lai:

- Hiện tại ERC20 không hài lòng với những người xác thực khác ERC20 / Chia sẻ nhưng trong tương lai, chúng tôi nghĩ nhiều ứng dụng DeFi mới có thể xây dựng trên nó và tạo ra một số thị trường cho nó hoặc thậm chí là một số sản phẩm tốt hơn.
- Với việc nghiên cứu [chấm. Một](http://chorus.one) khởi xướng được khởi xướng , chúng tôi cũng đang khám phá các vấn đề như là trình xác thực đang ngắn gọn các dấu hiệu và các vấn đề khác (ngắn gọn có thể tránh được thông qua những điều như là trình xác thực khóa cổ phần của chúng cho X tháng và những thứ khác như bảo hiểm xác thực (on-chain), sẽ mang lại nhiều sự tin cậy hơn cho các đại biểu.
- Quyền bỏ phiếu để tham gia vào các quyết định của chính phủ.
- Trong khi tạo chất lượng đại biểu, chúng tôi cũng muốn đảm bảo an ninh mạng Đó là lý do, trong một số dạng nào đó, vốn có thể bị khóa trong trường hợp hoạt động gian lận.


Với thiết kế sẵn có trong giao thức ở trên, người xác thực luôn có thể triển khai các cơ chế tương tự của riêng họ và mua cổ phần thông qua một hợp đồng sẽ không có sẵn trong Giao diện cổ phần của Polygon.

## Mục tiêu trong tương lai {#future-goals}

Những thứ như liên hệ / chuỗi chéo qua công ty Cosmos và thiết kế Everett B-harm.

## Tài nguyên {#resources}

- [Thiết kế pos của Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [
Giới thiệu về Chứng khoán phái sinh](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Bể góp cổ phần](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Lạm phát trong Bằng chứng Cổ phần](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
