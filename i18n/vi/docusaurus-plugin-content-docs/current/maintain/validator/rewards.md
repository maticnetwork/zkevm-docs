---
id: rewards
title: Phần thưởng
sidebar_label: Rewards
description: Tìm hiểu về các khoản tiền thưởng khi góp cổ phần vào mạng lưới Polygon.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Để một sự giới thiệu Polygon và bằng chứng của thuật toán Stake để xem [Bằng chứng gì là Bằng chứng của Stake](/docs/home/polygon-basics/what-is-proof-of-stake)

Trong Polygon, những người xác thực góp cổ phần bằng token MATIC làm tài sản thế chấp để hoạt động dưới sự bảo mật của mạng lưới và kiếm được phần thưởng để đổi lấy dịch vụ của họ.

Để tận dụng lợi ích kinh tế của Polygon, bạn nên trở thành người xác thực hoặc người ủy quyền.

Để trở thành[ người xác thực](/docs/maintain/glossary.md#validator), bạn cần **chạy một nút xác thực đầy đủ** và góp cổ phần MATIC. Xem [Xác thực](/docs/maintain/validate/validator-index).

Cũng kiểm tra trang [của Validator Responsity](/docs/maintain/validate/validator-responsibilities).

Để trở thành [người ủy quyền](/docs/maintain/glossary.md#delegator), bạn chỉ cần **ủy quyền MATIC cho người xác thực**. Xem [Ủy quyền](/docs/maintain/delegate/delegate).

## Khoản tiền thưởng là gì? {#what-is-the-incentive}

Polygon phân bổ 12% trong tổng nguồn cung 10 tỷ token của mình để tài trợ cho các phần thưởng cho góp cổ phần. Điều này là để đảm bảo rằng mạng lưới được tạo đủ tốt cho đến khi phí giao dịch đạt được sức hút. Những phần thưởng này chủ yếu nhằm mục đích khởi động mạng lưới, trong khi giao thức về lâu dài nhằm mục đích duy trì chính nó trên cơ sở thu phí giao dịch.

**Phần thưởng cho Người xác thực = Phần thưởng góp cổ phần + Phí giao dịch**

Điều này được phân bổ theo cách để đảm bảo tách dần phần thưởng góp cổ phần khỏi thành phần chính của phần thưởng cho người xác thực.

| Năm |
Cổ phần mục tiêu (30% nguồn cung lưu hành) | Tỷ lệ phần thưởng cho 30% cổ phần |
Nhóm phần thưởng |
|---|---|---|---|
| Thứ nhất | 1.977.909.431 | 20% | 312.917.369 |
| Thứ hai | 2.556.580.023 | 12% | 275.625.675 |
| Thứ ba | 2.890.642.855 | 9% | 246.933.140 |
| Thứ tư | 2.951.934.048 | 7% | 204.303.976 |
| Thứ năm | 2.996.518.749 | 5% | 148.615.670 + **11.604.170** |

Bên dưới là ảnh chụp nhanh mẫu về phần thưởng hàng năm dự kiến ​​trong 5 năm đầu tiên; xét nguồn cung cấp cổ phần nằm trong khoảng từ 5% đến 40% ở khoảng thời gian 5%

| % nguồn cung cổ phần được góp lưu hành | 5% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|
| Phần thưởng hàng năm cho năm |
| Thứ nhất | 120% | 60% | 40% | 30% | 24% | 20% | 17,14% | 15% |
| Thứ hai | 72% | 36% | 24% | 18% | 14,4% | 12% | 10,29% | 9% |
| Thứ ba | 54% | 27% | 18% | 13,5% | 10,8% | 9% | 7,71% | 6,75% |
| Thứ tư | 42% | 21% | 14% | 10,5% | 8,4% | 7% | 6% | 5,25% |
| Thứ năm | 30% | 15% | 10% | 7,5% | 6% | 5% | 4,29% | 3,75% |

## Ai nhận được những khoản thưởng này? {#who-gets-the-incentives}

Những người góp cổ phần chạy các nút xác thực và những người ủy quyền token của mình cho người xác thực mà họ chọn.

Người xác thực có quyền chọn thu phí hoa hồng trên phần thưởng của những người ủy quyền.

Các quỹ thuộc về toàn bộ những người góp cổ phần bị khóa trong một hợp đồng được triển khai trên mạng lưới chính Ethereum.

Không có người xác thực nào giữ quyền giám sát đối với token của người ủy quyền.

## Phần thưởng cho việc góp cổ phần {#staking-rewards}

Tiền thưởng hàng năm là chắc chắn — bất kể tổng số cổ phần góp hay tỷ lệ khoản góp cổ phần mục tiêu trong mạng lưới, số tiền thưởng được trao định kỳ như một phần thưởng cho tất cả những người đăng ký.

Polygon có yếu tố bổ sung về cam kết [các điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction) định kỳ cho mạng lưới chính Ethereum.
Đây là phần chính trong trách nhiệm của người xác thực và họ được khuyến khích thực hiện hoạt động này. Điều này tạo thành một khoản chi phí cho người xác thực và là chi phí duy nhất cho giải pháp Lớp 2 như Polygon. Chúng tôi cố gắng đáp ứng chi phí này trong cơ chế thanh toán phần thưởng góp cổ phần của người xác thực như một phần thưởng được chi trả cho [người đề xuất](/docs/maintain/glossary.md#proposer), người chịu trách nhiệm thực hiện điểm kiểm duyệt. Phần thưởng trừ đi khoản thưởng sẽ được chia theo tỷ lệ cho tất cả những người góp cổ phần; người đề xuất và [người ký tên](/docs/maintain/glossary.md#signer-address).

## Khuyến khích người đề xuất bao gồm tất cả các chữ ký {#encouraging-the-proposer-to-include-all-signatures}

Để tận dụng hoàn toàn khoản thưởng,[ người đề xuất](/docs/maintain/glossary.md#proposer) phải bao gồm tất cả các chữ ký trong [điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction). Vì giao thức mong muốn trọng số 2/3 + 1 trong tổng cổ phần, nên điểm kiểm duyệt sẽ được chấp nhận ngay cả với 80% số lượng biểu quyết. Tuy nhiên, trong trường hợp này, người đề xuất chỉ nhận được 80% số tiền thưởng đã được tính toán.

## Phí giao dịch {#transaction-fees}

Mỗi nhà sản xuất khối tại [Bor](/docs/maintain/glossary.md#bor) được cung cấp một tỷ lệ phần trăm nhất định của phí giao dịch thu được trong mỗi khối. Việc lựa chọn các nhà sản xuất cho bất kỳ khoảng thời gian nào phụ thuộc vào tỷ lệ của người xác thực trên tổng cổ phần. Phí giao dịch còn lại phân bổ qua cùng một kênh tương tự như các phần thưởng được phân chia cho tất cả những người xác thực hoạt động tại lớp [Heimdall](/docs/maintain/glossary.md#heimdall).
