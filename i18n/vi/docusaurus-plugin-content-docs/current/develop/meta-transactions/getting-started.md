---
id: meta-transactions
title: Giao dịch Meta
sidebar_label: Overview
description: Tìm hiểu về giao dịch meta và cách thức bạn có thể sử dụng chúng.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Các lệnh gọi hợp đồng thông minh hàng ngày đang ở mức cao nhất, đạt khoảng 2,5 đến 3 triệu mỗi ngày. DApp đang bắt đầu hiện thực hóa tiện ích nhưng cũng đang trở thành nạn nhân cho sự thành công của chúng hoặc thành công của các ứng dụng khác do phí gas. Chưa kể, những rào cản tham gia của người dùng và những thách thức của trải nghiệm người dùng hiện tại không dễ dàng khắc phục.

## Phục vụ Hợp đồng Thông minh {#servicing-smart-contracts}

Theo thiết kế, hợp đồng thông minh là những máy trạng thái tất định thực thi khi phí giao dịch được thanh toán để phục vụ logic của hợp đồng bằng cách sử dụng các tài nguyên tính toán của mạng lưới. Điều này được thực hiện bằng mô hình đo gas trên Ethereum (và Polygon).

## Trạng thái Giao dịch Hiện tại {#the-current-state-of-transacting}

Có các hạn chế đối với mô hình giao dịch truyền thống này trên Ethereum (và các blockchain khác tương tự). Một hạn chế phổ biến là người dùng không có phương tiện để trả phí gas. Theo mặc định, người gửi giao dịch đóng vai trò là người thanh toán, vì những hành vi này được gộp lại với nhau, vì vậy nếu người dùng cố gắng tạo và gửi giao dịch, họ phải có trách nhiệm về phí gas liên quan. Tương tự như vậy, nếu người dùng xây dựng, tương tác với, hoặc chạy một dApp, người dùng phải trả phí gas.

Không thực tế khi mong đợi người dùng bình thường mua tiền mã hóa và trả phí gas để tương tác với một ứng dụng. Những gì có thể được làm để giải quyết vấn đề này là tách người gửi giao dịch khỏi vai trò của một người thanh toán, tạo cơ hội mở rộng quy mô thực thi giao dịch và bắt đầu một trải nghiệm giao dịch liền mạch.

Thay vì thực thi giao dịch trực tiếp, một phần sụn sẽ tồn tại (qua bên thứ ba) để xử lý phí gas. Đây là nơi để giao dịch meta phát huy tác dụng.

## Giao dịch Meta là gì? {#what-are-meta-transactions}

Giao dịch meta cho phép bất kỳ ai cũng có thể tương tác với blockchain. Các giao dịch này không yêu cầu người dùng phải có token để thanh toán cho các dịch vụ của mạng lưới thông qua phí giao dịch. Điều này được thực hiện bằng cách tách người gửi giao dịch và người thanh toán gas.

Một giải pháp có thể tiếp cận người dùng mới và trợ giúp người dùng hiện tại.

Người thực thi giao dịch đóng vai trò là người gửi. Thay vì chi tiêu gas, họ chỉ tạo một yêu cầu giao dịch bằng cách ký thao tác dự định của họ (các thông số giao dịch) bằng khóa riêng tư của họ. Giao dịch meta là một giao dịch Ethereum thông thường bao gồm các tham số bổ sung để tạo ra giao dịch meta.

Các tham số giao dịch đã ký được chuyển vào một mạng lưới thứ cấp, hoạt động như một trình chuyển tiếp. Mặc dù có các kế hoạch khác nhau cho việc này, nhưng trình chuyển tiếp nhìn chung sẽ chọn giao dịch nào đáng gửi bằng cách xác thực giao dịch (ví dụ: có liên quan đến dApp). Sau khi xác thực, trình chuyển tiếp sẽ gói yêu cầu (thông báo đã ký) thành một giao dịch thực tế (có nghĩa là thanh toán phí gas) và phát nó lên mạng lưới, nơi hợp đồng mở giao dịch ra bằng cách xác thực chữ ký ban đầu và thay mặt người dùng thực thi nó.

:::note Các từ "meta" và "hàng loạt" có thể tương tự nhau đối với một số người

Để làm rõ: giao dịch meta khác với giao dịch hàng loạt, trong đó giao dịch hàng loạt là giao dịch có thể gửi nhiều giao dịch cùng một lúc và sau đó được thực thi từ một người gửi đơn lẻ (được chỉ định một lần) theo trình tự.

:::

Tóm lại, giao dịch meta là một mẫu thiết kế trong đó:

* Người dùng (người gửi) ký yêu cầu bằng khóa riêng tư của mình và gửi nó đến trình chuyển tiếp
* Trình chuyển tiếp gói yêu cầu thành một tx và gửi nó đến một hợp đồng
* Hợp đồng mở tx ra và thực thi nó

Giao dịch gốc ngụ ý rằng “người gửi” cũng là “người thanh toán”. Khi đưa “người thanh toán” ra khỏi “người gửi”, “người gửi” trở nên giống như một “người dự định” – người gửi thể hiện mục đích của giao dịch mà họ muốn thực thi trên blockchain bằng cách ký một thông báo chứa các thông số cụ thể liên quan đến thông báo của họ, và không phải là một giao dịch được khởi tạo hoàn toàn.

## Trường hợp Sử dụng {#use-cases}

Người ta có thể tưởng tượng khả năng của các giao dịch meta để mở rộng quy mô dApp và các tương tác với các hợp đồng thông minh. Người dùng không chỉ có thể tạo giao dịch không tốn phí gas, mà họ còn có thể làm vậy rất nhiều lần, và với công cụ tự động hóa, giao dịch meta có thể ảnh hưởng đến làn sóng ứng dụng tiếp theo cho các trường hợp sử dụng thực tế. Giao dịch meta kích hoạt tiện ích thực sự trong logic hợp đồng thông minh, vốn thường bị hạn chế do phí gas và những tương tác cần thiết trên chuỗi.

### Ví dụ với việc biểu quyết {#example-with-voting}

Một người dùng muốn tham gia vào quản trị trên chuỗi, và người đó dự định bỏ phiếu cho một kết quả cụ thể qua một hợp đồng biểu quyết. Người dùng sẽ ký một thông báo, trong đó nêu quyết định của người dùng trong một cuộc biểu quyết trong hợp đồng cụ thể này. Theo truyền thống, họ sẽ cần phải thanh toán phí gas để tương tác với hợp đồng (và biết cách tương tác với hợp đồng), nhưng thay vào đó, họ có thể ký một giao dịch meta (ngoài chuỗi) với thông tin cần thiết cho phiếu biểu quyết của họ và chuyển nó cho một trình chuyển tiếp sẽ thay mặt họ thực thi giao dịch.

Thông báo đã ký được gửi đến một trình chuyển tiếp (các thông số tx đã ký về thông tin biểu quyết). Trình chuyển tiếp xác nhận rằng giao dịch này là một biểu quyết ưu tiên, gói yêu cầu biểu quyết thành một giao dịch thực tế, thanh toán phí gas, và phát nó tới hợp đồng biểu quyết. Mọi thứ sẽ được kiểm tra ở phía hợp đồng biểu quyết, và phiếu biểu quyết sẽ thay mặt nguời dùng thực thi.

## Thử Giao Dịch {#try-them-out}

Giả sử bạn đã quen với các cách tiếp cận khác nhau mà bạn có thể thực hiện để tích hợp các giao dịch meta trong dApp của mình, và tùy thuộc vào việc bạn đang chuyển sang giao dịch meta hay xây dựng dApp mới bằng cách sử dụng nó.

Để tích hợp dApp của bạn với Giao dịch Meta trên Polygon, bạn có thể chọn sử dụng một trong các trình chuyển tiếp sau hoặc tạo ra một giải pháp tùy chỉnh:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
