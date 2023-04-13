---
id: getting-started
title: Cầu nối PoS
sidebar_label: Introduction
description: Linh hoạt hơn và rút tiền nhanh hơn với Polygon POS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Vui lòng kiểm tra [tài liệu Matic.js về PoS](../matic-js/get-started.md) mới nhất để bắt đầu.

Cầu nối về cơ bản là một tập hợp các hợp đồng trợ giúp việc di chuyển tài sản từ chuỗi gốc sang chuỗi con. Về cơ bản, có hai loại cầu nối để di chuyển tài sản giữa Ethereum và Polygon. Người thứ nhất là cầu Plasma và người thứ hai được gọi là **Cầu PoS** hoặc **cầu Stake (Plasma)**. **Cầu nối Plasma** cung cấp cung cấp sự bảo đảm bảo mật gia tăng nhờ cơ chế thoát Plasma.

Tuy nhiên, có các hạn chế nhất định trên token con và có kỳ rút tiền 7 ngày liên quan đến tất cả các lần thoát/rút tiền từ Polygon sang Ethereum trên cầu nối Plasma.

Điều này khá đau đớn cho những DApp/người dùng cần chút **linh hoạt** và **rút tiền nhanh hơn**, và hài lòng với mức độ bảo mật do cầu nối Bằng chứng Cổ phần Polygon cung cấp, được bảo mật bằng một bộ các trình xác thực bên ngoài mạnh mẽ.

Bằng chứng cổ phần dựa trên tài sản cung cấp bảo mật PoS và thoát nhanh hơn với một khoảng thời gian kiểm soát.

## Các bước để sử dụng Cầu nối PoS {#steps-to-use-the-pos-bridge}

Trước khi chúng ta nhập vào phần này của các tiến sĩ, nó có thể giúp có sự hiểu biết kỹ lưỡng về một số điều khoản như bạn sẽ tương tác với chúng trong khi cố sử dụng cầu: [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) và [Cơ chế State Syncism](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Sau đó, bước đầu tiên sử dụng cây cầu PoS là bản đồ **bài hát Token** và **Trẻ em**. Nghĩa là hợp đồng vật dụng trên chuỗi gốc và hợp đồng vật dụng trên chuỗi trẻ em phải duy trì sự kết nối (được gọi là mapping) để chuyển tài sản giữa chúng. Nếu bạn đang quan tâm đến việc gửi một yêu cầu bản đồ, vui lòng thực hiện điều đó bằng [hướng dẫn này](/docs/develop/ethereum-polygon/submit-mapping-request/).

Ở mức thấp hơn và với chi tiết hơn, đây là điều sẽ xảy ra:

### nạp {#deposit}

  1. Chủ sở hữu token tài sản **(ERC20/ERC721/ERC1155)** phải phê duyệt một hợp đồng cụ thể trên cầu nối PoS để tiêu số lượng token sẽ được chuyển. Hợp đồng cụ thể này được gọi là **Hợp đồng Thuộc tính** (được triển khai trên mạng lưới Ethereum) thực ra sẽ **khóa số lượng token được nạp**.
  2. Sau khi được phê duyệt, bước tiếp theo là **nạp tiền cho tài sản**. Một cuộc gọi chức năng phải được thực hiện trên `RootChainManager`hợp đồng mà khi chuyển `ChildChainManager`hợp đồng lên chuỗi Polygon.
  3. Điều này xảy ra thông qua cơ chế đồng bộ trạng thái, có thể tìm hiểu chi tiết từ [đây](/docs/pos/state-sync/state-sync/).
  4. Bên `ChildChainManager`trong gọi `deposit`chức năng của hợp đồng vật dụng và số lượng tài sản tương ứng được **gửi vào tài khoản người dùng.** Điều quan trọng là lưu ý rằng chỉ `ChildChainManager`có thể truy cập được `deposit`chức năng trên hợp đồng vật dụng của con.
  5. Khi người dùng lấy được token, chúng có thể được **chuyển gần như ngay lập tức với phí không đáng kể trên chuỗi Polygon**.

### Rút tiền {#withdrawals}

  1. Rút tài sản trở về Ethereum là một quá trình 2 bước trong đó dấu hiệu tài sản phải được **đốt đầu tiên trên chuỗi Polygon** và sau đó **bằng chứng của giao dịch đốt này phải được gửi** trên chuỗi Ethereum.
  2. Mất khoảng 20 phút đến 3 giờ để giao dịch đốt được qua trạm kiểm soát vào chuỗi Ethereum. Việc này do trình xác thực Bằng chứng Cổ phần thực hiện.
  3. Một khi giao dịch đã được thêm vào trạm kiểm soát, bằng chứng của giao dịch burn có thể được gửi trên `RootChainManager`hợp đồng trên Ethereum bằng cách gọi chức năng`exit`.
  4. Lệnh gọi chức năng **này xác minh việc đưa vào trạm kiểm soát** và sau đó kích hoạt hợp đồng Thuộc tính đã khóa token tài sản khi tài sản được nạp lần đầu.
  5. Khi bước cuối cùng, **hợp đồng dự báo sẽ phát hành những dấu đã khóa** và hoàn trả chúng cho tài khoản người dùng trên Ethereum.

:::tip

Khi đã hoàn tất ánh xạ, bạn có thể sử dụng **SDK matic.js** để tương tác với các hợp đồng hoặc bạn có thể làm điều tương tự mà không có SDK. Tuy nhiên, SDK matic.js được thiết kế theo cách rất thân thiện với người dùng để biến cơ chế chuyển nhượng tài sản trở nên rất dễ dàng khi tích hợp với bất kỳ ứng dụng nào.

:::