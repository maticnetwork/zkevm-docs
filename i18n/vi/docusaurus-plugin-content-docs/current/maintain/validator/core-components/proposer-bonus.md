---
id: proposer-bonus
title: Khoản thưởng cho người đề xuất
description: Khuyến khích bổ sung thêm cho việc trở thành người xác thực.
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Khoản thưởng cho người đề xuất {#proposer-bonus}

Polygon có yếu tố bổ sung về cam kết [các điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction) định kỳ cho mạng lưới chính Ethereum.
Đây là phần chính trong trách nhiệm của người xác thực và họ được khuyến khích thực hiện hoạt động này. Điều này tạo thành một khoản chi phí cho người xác thực và là chi phí duy nhất cho giải pháp Lớp 2 như Polygon. Chúng tôi cố gắng đáp ứng chi phí này trong cơ chế thanh toán phần thưởng góp cổ phần của người xác thực như một phần thưởng được chi trả cho người [đề xuất](/docs/maintain/glossary.md#proposer), người chịu trách nhiệm thực hiện điểm kiểm duyệt. Phần thưởng trừ đi khoản thưởng sẽ được chia theo tỷ lệ cho tất cả những người góp cổ phần; người đề xuất và [người ký tên](/docs/maintain/glossary.md#signer-address).

Để tận dụng hoàn toàn khoản thưởng, người đề xuất phải bao gồm tất cả các chữ ký trong điểm kiểm duyệt. Vì giao thức mong muốn trọng số 2/3 + 1 trong tổng cổ phần, nên điểm kiểm duyệt sẽ được chấp nhận ngay cả với 80% số lượng biểu quyết. Tuy nhiên, trong trường hợp này, người đề xuất chỉ nhận được 80% số tiền thưởng đã được tính toán.
