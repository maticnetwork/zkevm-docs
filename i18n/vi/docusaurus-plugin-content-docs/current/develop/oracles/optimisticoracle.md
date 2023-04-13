---
id: optimisticoracle
title: Optimistic Oracle của UMA
sidebar_label: UMA
description: Oracle Optimistic Omple của UMA, cho phép các hợp đồng có thể yêu cầu nhanh chóng và nhận được bất kỳ loại dữ liệu nào
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Oracle Optimistic Operacle của UMA, cho phép các hợp đồng nhanh chóng yêu cầu và nhận được bất kỳ loại dữ liệu. Hệ thống Oracle của UMA, được cấu tạo gồm hai thành phần cốt lõi:

1. Optimistic Oracle
2. Cơ chế Xác minh Dữ liệu (DVM)

## Optimistic Oracle {#optimistic-oracle}

**Oracle Optimistic** Omple của UMA, cho phép các hợp đồng có thể yêu cầu nhanh chóng và nhận thông tin giá trị. Oracle Optimistic activity như một trò chơi leo thang generation between bracle sẽ khởi động một yêu cầu giá và hệ thống giải quyết tranh chấp của UMA, được gọi là Cơ chế Dữ liệu Verification (DVM).

Giá do Optimistic Oracle đề xuất sẽ không được gửi đến DVM trừ khi bị tranh chấp. Điều này có hợp đồng để có được thông tin giá trong bất kỳ chiều dài nào được xác định trước khi không viết giá của một tài sản trên chuỗi tài sản.

## Cơ chế Xác minh Dữ liệu (DVM) {#data-verification-mechanism-dvm}

Nếu tranh chấp được đưa ra, một yêu cầu sẽ được gửi đến DVM. Tất cả các hợp đồng được xây dựng trên UMA sử dụng DVM làm chặng cuối để giải quyết các tranh chấp. Những tranh chấp được gửi đến DVM sẽ được giải quyết trong 48 giờ sau khi chủ sở hữu token UMA biểu quyết về giá của tài sản tại một thời điểm nhất định. Những hợp đồng trên UMA không cần sử dụng Optimistic Oracle trừ khi nó yêu cầu giá của một tài sản nhanh hơn 48 giờ.

Cơ chế Xác minh Dữ liệu (DVM) là dịch vụ giải quyết tranh chấp cho những hợp đồng được xây dựng trên Giao thức UMA. DVM rất mạnh vì bao gồm yếu tố đánh giá của con người để đảm bảo các hợp đồng được quản lý an toàn và chính xác khi các sự cố phát sinh từ thị trường biến động (và đôi khi có thể bị thao túng).

## Giao diện Optimistic Oracle {#optimistic-oracle-interface}

Optimistic Oracle được các hợp đồng tài chính hoặc bất kỳ bên thứ ba nào sử dụng để truy xuất giá. Khi giá được yêu cầu, bất kỳ ai cũng có thể đề xuất giá trong phản hồi. Khi được đề xuất, giá sẽ trải qua thời gian sống động, trong đó bất kỳ ai cũng có thể tranh chấp giá đề xuất và gửi giá tranh chấp đến UMA DVM để giải quyết.

:::info

Phần này giải thích cách những người tham gia khác nhau có thể tương tác với Optimistic Oracle. Để xem các quá trình triển khai mạng lưới chính, kovan hoặc L2 cập nhật nhất của các hợp đồng Optimistic Oracle, hãy tham khảo [các địa chỉ sản xuất](https://docs.umaproject.org/dev-ref/addresses).

:::

Có mười hai phương pháp tạo nên giao diện Optimistic Oracle.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Yêu cầu giá mới. Phương pháp này phải dành cho một ký hiệu nhận dạng giá đã đăng ký. Lưu ý rằng phương pháp này được gọi tự động bởi hầu hết những hợp đồng tài chính đã đăng ký trong hệ thống UMA, nhưng bất kỳ ai cũng có thể gọi cho bất kỳ ký hiệu nhận dạng giá đã đăng ký nào. Ví dụ: hợp đồng Đa bên Sắp hết hạn (EMP) gọi phương pháp này khi phương pháp `expire` của nó được gọi.

Tham số:
- `identifier`: ký hiệu nhận dạng giá đang được yêu cầu.
- `timestamp`: dấu thời gian của giá đang được yêu cầu.
- `ancillaryData`: dữ liệu phụ đại diện cho các đối số bổ sung đang được chuyển với yêu cầu giá.
- `currency`: token ERC20 sử dụng để thanh toán phần thưởng và phí. Phải được phê duyệt để sử dụng với DVM.
- `reward`: phần thưởng dành cho người đề xuất thành công. Sẽ được người gọi thanh toán. Lưu ý : đây có thể là 0.

### proposePrice {#proposeprice}

Đề xuất giá trị giá cho một yêu cầu giá hiện hữu.

Tham số:
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.
- `proposedPrice`: giá đang được đề xuất.

### disputePrice {#disputeprice}

Tranh chấp giá trị giá cho yêu cầu giá hiện hữu với một đề xuất đang có hiệu lực.

Tham số:
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### settle {#settle}

Cố gắng xử lý một yêu cầu giá chưa thanh toán. Sẽ đảo ngược nếu nó không thể ổn định.

Tham số:
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### hasPrice {#hasprice}

Kiểm tra xem một yêu cầu cụ thể đã được xử lý hoặc thanh toán chưa (tức là oracle lạc quan có một cái giá).

Tham số:
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### getRequest {#getrequest}

Nhận cấu trúc dữ liệu hiện tại chứa tất cả thông tin về yêu cầu giá.

Tham số:
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### settleAndGetPrice {#settleandgetprice}

Truy xuất giá mà người gọi đã yêu cầu trước đó. Trở lại nguyên trạng nếu yêu cầu không được xử lý hoặc thanh toán được. Lưu ý: phương pháp này không được xem để lệnh gọi này có thể thực sự xử lý yêu cầu giá nếu nó chưa được thanh toán.

Tham số:
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### setBond {#setbond}

Đặt trái phiếu đề xuất được liên kết với một yêu cầu về giá.

Tham số:
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.
- `bond`: số lượng trái phiếu tùy chỉnh để đặt.

### setCustomLiveness {#setcustomliveness}

Đặt giá trị sống động tùy chỉnh cho yêu cầu. Sống động là lượng thời gian mà một đề xuất phải chờ trước khi được tự động xử lý.

Tham số:
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.
- `customLiveness`: tính sống động tùy chỉnh mới.

### setRefundOnDispute {#setrefundondispute}

Thiết lập yêu cầu hoàn trả phần thưởng nếu đề xuất bị tranh chấp. Phương pháp này có thể giúp "bao bọc" người gọi trong trường hợp có sự chậm trễ do tranh chấp. Lưu ý: trong trường hợp tranh chấp, người chiến thắng vẫn nhận được trái phiếu của người kia, vì vậy vẫn có lợi nhuận thu được ngay cả khi phần thưởng bị hoàn trả.

Tham số:
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### disputePriceFor {#disputepricefor}

Tranh chấp một yêu cầu giá với một đề xuất đang có hiệu lực thay cho một địa chỉ khác. Lưu ý: địa chỉ này sẽ nhận bất kỳ phần thưởng nào từ tranh chấp này. Tuy nhiên, bất kỳ trái phiếu nào sẽ được kéo từ người gọi này.

Tham số:
- `disputer`: địa chỉ đặt làm người tranh chấp.
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.

### proposePriceFor {#proposepricefor}

Đề xuất giá trị giá thay cho một địa chỉ khác. Ghi chú: địa chỉ này sẽ nhận bất kỳ phần thưởng nào từ đề xuất này. Tuy nhiên, bất kỳ trái phiếu nào sẽ được kéo từ người gọi này.

Tham số:
- `proposer`: địa chỉ đặt làm người đề xuất.
- `requester`: người gửi yêu cầu giá ban đầu.
- `identifier`: ký hiệu nhận dạng giá để nhận dạng yêu cầu hiện hữu.
- `timestamp`: dấu thời gian để nhận dạng yêu cầu hiện hữu.
- `ancillaryData`: dữ liệu phụ của giá đang được yêu cầu.
- `proposedPrice`: giá đang được đề xuất.

## Tích hợp Optimistic Oracle {#integrating-the-optimistic-oracle}

Bản demo này sẽ thiết lập một hợp đồng `OptimisticDepositBox` sẽ lưu ý số dư token ERC-20 của người dùng.

Trên blockchain mạng thử nghiệm cục bộ, người dùng sẽ nạp wETH (Ether bọc) vào hợp đồng và rút wETH được đại diện bằng USD. Ví dụ: nếu người dùng muốn rút $10,000 USD of wETH, and the ETH/USD exchange rate is $2.000, họ sẽ rút 5 wETH.

* Người dùng liên kết  `OptimisticDepositBox`với một trong số các ký hiệu nhận dạng giá được kích hoạt trên DVM.

* Người dùng nạp wETH vào `OptimisticDepositBox` và đăng ký nó với ký hiệu nhận dạng giá `ETH/USD`.

* Người dùng hiện có thể rút một lượng wETH được đại diện bằng USD của họ từ`DepositBox` qua các lệnh gọi hợp đồng thông minh, với Optimistic Oracle cho phép định giá trên chuỗi lạc quan.

Trong ví dụ này, người dùng sẽ không thể chuyển nhượng số lượng wETH được đại diện bằng USD mà không tham chiếu đến nguồn cấp dữ liệu giá `ETH/USD` ngoài chuỗi. Do đó, Optimistic Oracle cho phép người dùng "kéo" giá tham chiếu.

Không giống các yêu cầu về giá cho DVM, yêu cầu về giá cho Optimistic Oracle có thể được xử lý trong một khoảng thời gian sống động được chỉ định nếu không có tranh chấp, khoảng thời gian này có thể ngắn hơn đáng kể so với kỳ biểu quyết DVM. Khoảng thời gian sống động có thể định cấu hình, nhưng thường là hai giờ, so với 2-3 ngày để giải quyết qua DVM.

Người yêu cầu giá hiện không bắt buộc phải trả phí cho DVM. Người yêu cầu có thể đưa ra phần thưởng cho người đề xuất nào phản hồi yêu cầu về giá, nhưng giá trị phần thưởng được đặt thành `0` trong ví dụ này.

Người đề xuất giá đăng một trái phiếu cùng với giá của họ, giá này sẽ được hoàn trả nếu không bị tranh chấp, hoặc nếu tranh chấp được giải quyết có lợi cho người đề xuất. Nếu không, trái phiếu này được sử dụng để thanh toán phí cuối cùng cho DVM và thanh toán phần thưởng cho một người tranh chấp thành công.

Trong bản demo, người yêu cầu không yêu cầu thêm trái phiếu từ người đề xuất giá, do đó, tổng trái phiếu được đăng bằng mức phí cuối cùng của wETH hiện tại là 0,2 wETH. Hãy xem chức `proposePriceFor`năng trong [hợp đồng](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) `OptimisticOracle` để biết chi tiết thực hiện.

## Chạy Demo {#running-the-demo}

1. Đảm bảo rằng bạn đã thực hiện theo tất cả các bước thiết lập tiên quyết [tại đây](https://docs.umaproject.org/developers/setup).
2. Chạy phiên bản Ganache cục bộ (tức là không phải Kovan/Ropsten/Rinkeby/Mạng lưới chính) với `yarn ganache-cli --port 9545`
3. Trong một cửa sổ khác, di chuyển các hợp đồng bằng cách chạy lệnh sau:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Để triển khai [hợp đồng](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) `OptimisticDepositBox` và thực hiện quy trình người dùng đơn giản, chạy tập lệnh demo sau từ gốc của kho lưu trữ:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Bạn sẽ thấy kết quả sau:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Giải thích chức năng hợp đồng {#explaining-the-contract-functions}

Mã `OptimisticDepositBox`[hợp đồng](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) hiển thị cách tương tác với Nhà tiên tri.

Chức năng `constructor` bao gồm một đối số `_finderAddress` cho hợp đồng `Finder` UMA, trong đó duy trì sự đăng ký địa chỉ `OptimisticOracle`, tài sản thế chấp đã được phê duyệt và danh sách cho phép ký hiệu nhận dạng giá, và các địa chỉ hợp đồng quan trọng khác.

Chức năng này cho phép `constructor` kiểm tra xem loại tài sản thế chấp và ký hiệu nhận dạng giá có hợp lệ hay không, đồng thời cho phép `OptimisticDepositBox` tìm kiếm và tương tác với `OptimisticOracle` sau này.

Chức năng `requestWithdrawal` bao gồm một lệnh gọi nội bộ cho `OptimisticOracle` yêu cầu giá `ETH/USD`. Khi được trả về, người dùng có thể gọi `executeWithdrawal` để hoàn tất sự rút tiền.

Có nhiều thông tin và sự giải thích trong các bình luận mã hóa, vì vậy vui lòng xem xét nếu bạn có hứng thú học thêm.

## Tài nguyên bổ sung {#additional-resources}

Dưới đây là một số tài sản bổ sung về UMA DVM:

- [Kiến trúc Kỹ thuật](https://docs.umaproject.org/oracle/tech-architecture)
- [Kiến trúc Kinh tế](https://docs.umaproject.org/oracle/econ-architecture)
- [Bài đăng trên blog](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) về thiết kế DVM của UMA
- [Sách trắng](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) về thiết kế DVM của UMA
- [Kho lưu trữ nghiên cứu](https://github.com/UMAprotocol/research) dành cho chính sách phí tối ưu
- [Kho lưu trữ UMIP](https://github.com/UMAprotocol/UMIPs) dành cho các đề xuất quản trị
