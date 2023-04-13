---
id: responsibilities
title: Trách nhiệm
description: Các trách nhiệm của việc trở thành một trình xác thực trên Polygon Network
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Luôn nắm bắt những điều mới mẻ

Tiếp tục cập nhật nút và sự xác thực mới nhất từ đội Polygon và cộng đồng bằng cách đăng ký cho [nhóm thông báo Polygon](https://polygon.technology/notifications/).

:::

Người xác thực blockchain là một người có trách nhiệm xác thực các giao dịch trong blockchain. Trên Mạng Polygon Network, bất kỳ người tham gia nào có thể được điều kiện để trở thành người xác thực của Polygon bằng cách chạy một **nút Validator (Sentry + Validator)** để kiếm được phần thưởng và thu thập các khoản giao dịch. Để đảm bảo sự tham gia hiệu quả của người xác thực, họ khoá ít nhất 1 token MATIC làm cổ phần trong hệ sinh thái.

:::info

Hiện tại, có một giới hạn của 100 trình xác thực đang hoạt động trong một lúc. Để có mô tả chi tiết về một trình xác thực là gì, hãy xem [Validator](/maintain/validator/architecture).

Ngoài ra, sau khi [<ins>dự án điều trị PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) được thực hiện trên mức hợp đồng, số lượng cố định tối thiểu sẽ tăng lên 10.000 MATIC.

:::

Bất kỳ [người xác thực nào](/maintain/glossary.md#validator) trên Mạng lưới Polygon sẽ có những trách nhiệm sau:

* Hoạt động nút kỹ thuật (được thực hiện tự động bởi các nút)
* Hoạt động
  * Duy trì thời gian hoạt động cao
  * Kiểm tra các dịch vụ liên quan và tiến hành hàng ngày
  * Chạy giám sát nút
  * Giữ cân bằng EU (từ 0.5 đến 1) trên địa chỉ của người ký
* Ủy quyền
  * Hãy mở rộng cho đại biểu
  * Thông báo tỷ lệ hoa hồng
* Thông tin
  * Thông báo sự cố
  * Đưa ra phản hồi và gợi ý
* Phần thưởng Earn để xác thực các khối trên blockchain

## Hoạt động nút kỹ thuật {#technical-node-operations}

Các thao tác nút kỹ thuật sau được **thực hiện tự động bởi các nút:**

* Chọn nhà sản xuất khối:
  * Chọn một tập hợp phụ người xác thực cho nhà sản xuất khối được thiết lập cho mỗi [khoảng thời gian](/docs/maintain/glossary.md#span)
  * Đối với mỗi khoảng thời gian, chọn lại tập hợp nhà sản xuất khối trên [Heimdall](/maintain/glossary.md#heimdall) và gửi định kỳ thông tin lựa chọn cho [Bor](/maintain/glossary.md#bor).
* Xác thực các khối trên Bor:
  * Đối với tập hợp các khối chuỗi bên Bor, mỗi người xác thực đọc độc lập dữ liệu khối cho những khối này và xác thực dữ liệu trên Heimdall.
* Gửi điểm kiểm duyệt:
  * Một [người đề xuất](/maintain/glossary.md#proposer) được chọn trong số những người xác thực cho mỗi khối Heimdall. Người đề xuất [điểm kiểm duyệt](/maintain/glossary.md#checkpoint-transaction) tạo điểm kiểm duyệt của dữ liệu khối Bor, xác thực và gửi giao dịch đã ký để người xác thực khác duyệt.
  * Nếu hơn 2/3 số người xác thực đang hoạt động đạt được sự đồng thuận trên trạm kiểm soát, thì trạm kiểm soát sẽ được gửi đến mạng lưới chính Ethereum.
* Đồng bộ các thay đổi đối với hợp đồng góp cổ phần Polygon trên Ethereum:
  * Tiếp tục từ bước gửi điểm kiểm duyệt, vì đây là cuộc gọi mạng lưới ngoài, giao dịch điểm kiểm duyệt trên Ethereum có thể hoặc không thể được xác nhận hoặc có thể phải chờ xử lý do các vấn đề tắc nghẽn Ethereum.
  * Trong trường hợp này, phải thực hiện quy trình `ack/no-ack`để đảm bảo rằng điểm kiểm duyệt tiếp theo chứa ảnh chụp nhanh của khối Bor trước. Ví dụ, nếu điểm kiểm duyệt 1 cho các khối Bor 1-256 và không đạt vì một lý do nào đó, điểm kiểm duyệt 2 tiếp theo sẽ cho các khối Bor 1-512. Xem thêm [Kiến trúc Heimdall: Điểm kiểm duyệt](/pos/heimdall/checkpoint).
* Đồng bộ trạng thái từ mạng lưới chính Ethereum sang chuỗi bên Bor:
  * Trạng thái hợp đồng có thể chuyển đổi giữa Ethereum và Polygon, cụ thể qua [Bor](/maintain/glossary.md#bor):
  * Hợp đồng DApp trên Ethereum gọi một chức năng về hợp đồng Polygon đặc biệt trên Ethereum.
  * Sự kiện tương ứng được chuyển tiếp lên Heimdall và rồi đến Bor.
  * Giao dịch đồng bộ trạng thái được gọi trên hợp đồng thông minh Polygon và DApp có thể nhận giá trị trên Bor qua một chức năng được gọi trên chính Bor.
  * Cơ chế tương tự được áp dụng đối với chuyển trạng thái từ Polygon sang Ethereum. Xem thêm [Cơ chế đồng bộ trạng thái](/docs/pos/state-sync/state-sync).

## Hoạt động {#operations}

### Duy trì thời gian hoạt động cao {#maintain-high-uptime}

Thời gian hoạt động của nút trên mạng lưới Polygon dựa trên số lượng [giao dịch trạm kiểm soát](/docs/maintain/glossary.md#checkpoint-transaction) mà nút xác thực đã ký.

Sau khoảng mỗi 34 phút, người đề xuất gửi một giao dịch trạm kiểm soát tới mạng lưới chính Ethereum. Giao dịch checkpoint phải được ký bởi mỗi [trình xác](/maintain/glossary.md#validator) thực trên Mạng Polygon. **Thất bại khi ký kết quả chuyển đổi điểm kiểm soát trong việc giảm hiệu suất nút của bạn**.

Quy trình ký giao dịch trạm kiểm soát được tự động. Để đảm bảo nút xác thực của bạn ký tất cả các giao dịch trạm kiểm soát hợp lệ, bạn phải duy trì và giám sát tình trạng nút của mình.

### Kiểm tra các dịch vụ nút và quy trình hàng ngày {#check-node-services-and-processes-daily}

Bạn phải kiểm tra hàng ngày dịch vụ và tiến trình liên quan đến [Heimdall](/maintain/glossary.md#heimdall) và [Bor](/maintain/glossary.md#bor). Ngoài ra, việc tháo gỡ các nút sẽ được thực hiện thường xuyên để giảm khả năng sử dụng đĩa.

### Chạy giám sát nút {#run-node-monitoring}

Bạn phải chạy hoặc:

* Bảng điều khiển grafana do Polygon cung cấp. Xem sự lưu trữ Github : [Thiết lập Matic-Jagar](https://github.com/vitwit/matic-jagar)
* Hoặc sử dụng công cụ giám sát của bạn cho trình [xác thực](/maintain/glossary.md#validator) và các nút [sentry](/maintain/glossary.md#sentry)
* Điểm cuối Ethereum được sử dụng trên các nút sẽ được theo dõi để đảm bảo nút nằm trong giới hạn yêu cầu.

### Giữ số dư ETH {#keep-an-eth-balance}

Bạn phải duy trì một lượng RĂNG tương xứng (sẽ luôn ở quanh giá trị thềm , 0.5 đến 1) trên [địa chỉ của người ký](/maintain/glossary.md#signer-address) xác thực trên Mainnet Ethereum.

Bạn cần ETH để:

* Ký các [giao dịch điểm kiểm duyệt](/maintain/glossary.md#checkpoint-transaction) đề xuất trên mạng lưới chính Ethereum.
* Đề xuất và gửi giao dịch điểm kiểm duyệt trên mạng lưới chính Ethereum.

Việc không giữ đủ số lượng ETH trên địa chỉ người ký sẽ dẫn đến:

* Chậm trong việc gửi điểm kiểm duyệt. Lưu ý rằng phí gas giao dịch trên mạng lưới Ethereum có thể biến động tăng hoặc giảm.
* Chậm hoàn tất giao dịch trong các điểm kiểm duyệt.
* Chậm trong các giao dịch điểm kiểm duyệt tiếp theo.

## Ủy quyền {#delegation}

### Cởi mở với ủy quyền {#be-open-for-delegation}

Tất cả các trình xác thực phải được mở cho phái đoàn từ cộng đồng. Mỗi người xác thực có quyền lựa chọn mức lập tỷ lệ hoa hồng của riêng họ. Không có mức trần đối với tỷ lệ hoa hồng.

### Thông báo tỷ lệ hoa hồng {#communicate-commission-rates}

Đây là nhiệm vụ đạo đức của người xác thực để giao tiếp với tỷ lệ hoa hồng và tỷ lệ hoa hồng thay đổi cho cộng đồng. Các nền tảng ưu tiên để thông báo tỷ lệ hoa hồng là:

* [Discord](https://discord.com/invite/0xPolygon)
* [Diễn đàn](https://forum.polygon.technology/)

## Thông tin {#communication}

### Thông báo sự cố {#communicate-issues}

Liên hệ sớm nhất có thể đảm bảo rằng cộng đồng và Polygon có thể khôi phục lại các vấn đề càng sớm càng tốt. Các nền tảng ưu tiên để thông báo tỷ lệ hoa hồng là:

* [Discord](https://discord.com/invite/0xPolygon)
* [Diễn đàn](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Đưa ra phản hồi và gợi ý {#provide-feedback-and-suggestions}

Ở Polygon, chúng tôi đánh giá cao sự phản hồi của bạn và gợi ý trên bất kỳ khía cạnh nào của hệ sinh thái xác thực. [Diễn đàn](https://forum.polygon.technology/) là nền tảng ưu tiên để đưa ra phản hồi và gợi ý.
