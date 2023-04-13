---
id: who-is-validator
title: Ai là Người xác thực
sidebar_label: Who is a Validator
description: "Người tham gia vào mạng lưới và chạy các nút Heimdall và Bor."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Validator là một người tham gia trong mạng đã khóa các dấu MATIC trong hệ thống và chạy nút xác thực Heimdall và nút nhà sản xuất khối Bor để giúp chạy mạng. Người xác thực góp cổ phần token MATIC của họ làm tài sản thế chấp để hoạt động nhằm duy trì bảo mật mạng và kiếm được phần thưởng đổi lấy dịch vụ họ cung cấp.


Phần thưởng được phân phối cho tất cả những người có cổ phần tỷ lệ thuận với số cổ phần của họ tại mọi điểm kiểm duyệt, ngoại trừ người đề xuất nhận được thêm tiền thưởng. Số dư phần thưởng của người dùng được cập nhật trong hợp đồng và sẽ được nêu ra khi yêu cầu phần thưởng.

Cổ phần có nguy cơ bị cắt trong trường hợp nút xác thực thực hiện một hành động độc hại như ký hai lần, điều này cũng ảnh hưởng đến người ủy quyền được liên kết tại điểm kiểm duyệt đó.

:::tip

Những ai quan tâm đến việc bảo vệ mạng lưới nhưng không chạy một nút đầy đủ có thể tham gia vào vai trò [đại biểu](/docs/maintain/glossary.md#delegator).

:::

## Tổng quan {#overview}

Người xác thực trên mạng lưới Polygon được chọn thông qua quy trình đấu giá diễn ra thường kỳ trên chuỗi. Những người xác thực được chọn này tham gia với tư cách là nhà sản xuất và người xác minh khối. Một khi [điểm kiểm duyệt ](/docs/maintain/glossary.md#checkpoint-transaction)được xác thực bởi người tham gia, các bản cập nhật được thực hiện trên chuỗi mẹ (mạng lưới chính Ethereum) sẽ chi trả phần thưởng cho những người xác thực tùy thuộc vào cổ phần của họ trên mạng lưới.

Polygon dựa vào một tập hợp [người xác thực](/docs/maintain/glossary.md#validator) để bảo mật mạng lưới. Vai trò của người xác thực là chạy một nút đầy đủ; [sản xuất các khối](/docs/maintain/glossary.md#block-producer), xác thực và tham gia vào các [điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction) đồng thuận và cam kết trên mạng lưới chính Ethereum. Để trở thành người xác thực, một người cần [góp cổ phần](/docs/maintain/glossary.md#staking) token MATIC của họ với các hợp đồng quản lý góp cổ phần nằm trên mạng lưới chính Ethereum.

## Thành phần lõi {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) đọc các sự kiện được phát ra từ các hợp đồng góp cổ phần để chọn những người xác thực hiện tại với tỷ lệ cổ phần được cập nhật của họ, tỷ lệ này cũng được [Bor](/docs/maintain/glossary.md#bor) sử dụng trong khi sản xuất các khối.

[Việc ủy ​​quyền](/docs/maintain/glossary.md#delegator) cũng được ghi lại trong các hợp đồng góp cổ phần và bất kỳ cập nhật nào trong nguồn xác thực hoặc [địa chỉ người ký](/docs/maintain/glossary.md#signer-address) nút hoặc các yêu cầu hủy liên kết sẽ có hiệu lực khi trạm kiểm soát tiếp theo được cam kết.


## Dòng đầu-cuối cho người xác thực Polygon {#end-to-end-flow-for-a-polygon-validator}

Người xác thực thiết lập các nút ký của họ, dữ liệu đồng bộ và sau đó góp cổ phần token của họ trên hợp đồng góp cổ phần mạng lưới chính ethereum để được chấp nhận làm người xác thực trong các thiết bị hiện tại. Nếu có vị trí trống, người xác thực đó được chấp nhận ngay lập tức. Nếu không, người xác thực cần phải qua tuân thủ cơ chế thay thế để nhận được vị trí.

:::warning

Có mức giới hạn cho việc chấp nhận những người xác thực mới. Những người xác thực mới chỉ có thể tham gia nhóm hoạt động khi một người xác thực đang hoạt động mở khoá. Quy trình đấu giá mới để thay thế người xác thực sẽ được triển khai.

:::

Các nhà sản xuất khối được chọn từ người xác thực đặt ra trách nhiệm của những người xác thực chọn lọc để sản xuất các khối cho [span](/docs/maintain/glossary.md#span) chỉ định.

Các nút Heimdall xác thực các khối được sản xuất, tham gia đồng thuận và cam kết các điểm kiểm duyệt trên mạng lưới chính ethereum vào các khoảng thời gian xác định.

Xác suất người xác thực được chọn làm nhà sản xuất khối hoặc [người đề xuất](/docs/maintain/glossary.md#proposer) điểm kiểm duyệt phụ thuộc vào tỷ lệ cổ phần của một người bao gồm các ủy quyền trong bể tổng thể.

Người xác thực nhận phần thưởng tại mọi điểm kiểm duyệt theo tỷ lệ cổ phần của họ, sau khi trừ đi phần thưởng của người đề xuất được giải ngân cho người đề xuất điểm kiểm duyệt.

Một người có thể chọn không tham gia hệ thống ở bất kỳ thời điểm nào và có thể rút token khi thời gian hủy liên kết kết thúc.

## Kinh tế {#economics}

Xem [Phần thưởng](/docs/maintain/validator/rewards).

## Thiết lập nút xác thực {#setting-up-a-validator-node}

Xem [Xác thực](/docs/maintain/validate/validator-index).

## Xem thêm {#see-also}

* [Trách nhiệm người xác thực](/docs/maintain/validate/validator-responsibilities)
* [Xác thực](/docs/maintain/validate/validator-index)
* [Hỏi đáp về người xác thực](/docs/maintain/validate/faq/validator-faq)
