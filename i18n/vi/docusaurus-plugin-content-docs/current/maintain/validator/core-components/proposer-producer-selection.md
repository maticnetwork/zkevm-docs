---
id: proposers-producers-selection
title: Lựa chọn Người đề xuất & Nhà sản xuất
sidebar_label: Proposers & Producers
description: Sự lựa chọn & khối nhà sản xuất trên Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Nhà sản xuất khối cho lớp BOR là một ban được chọn từ Bể xác thực dựa trên việc góp cổ phần của họ diễn ra trong các khoảng thời gian đều đặn. Những khoảng thời gian này sẽ được quyết định bởi ban quản trị xác thực theo dynasty và mạng lưới.

Tỷ lệ [cổ phần](/docs/maintain/glossary.md#staking) cho biết khả năng được chọn làm thành viên của ban quản trị [nhà sản xuất khối](/docs/maintain/glossary.md#block-producer).

## Quy trình lựa chọn {#selection-process}

Giả sử chúng ta có 3 người xác thực trong bể — Alice, Bill và Clara:

* Alice góp cổ phần 100 token MATIC.
* Bill góp cổ phần 40 token MATIC.
* Clara góp cổ phần 40 token MATIC.

Người xác thực được cấp các slot theo cổ phần.

Do Alice đã góp 100 token MATIC và chi phí mỗi slot là 10 token MATIC được giữ bởi ban quản trị xác thực nên Alice có tổng cộng 5 slot. Tương tự, Bill và Clara có tổng cộng 2 slot.

Những người xác thực Alice, Bill và Clara được cấp các slot sau:

* [A, A, A, A, A, B, B, C, C]

Polygon sau đó phân bổ mảng slot của Alice, Bill và Clara bằng cách sử dụng hash khối Ethereum làm hạt giống.

Kết quả phân bổ là mảng slot sau đây:

* [A, B, A, A, C, B, A, A, C]

Bây giờ tùy thuộc vào tổng số nhà sản xuất khối như được ban quản trị xác thực duy trì, Polygon sử dụng những người xác thực theo thứ tự từ trên xuống — ví dụ, đối với tập 5 nhà sản xuất, mảng slot là [A, B, A, A, C].

Tập nhà sản xuất cho span tiếp theo được xác định là [A: 3, B:1, C:1].

Bằng việc sử dụng tập xác thực tạo ra và [thuật toán chọn người đề xuất](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) của Tendermint, Polygon chọn một nhà sản xuất cho từng sprint trên Bor.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Huyền thoại:**

* Dynasty: Thời gian giữa thời điểm kết thúc phiên đấu giá gần nhất và thời điểm bắt đầu phiên đấu giá tiếp theo.
* Sprint: Khoảng thời gian để bầu ban quản trị nhà sản xuất khối.
* Span: Số khối được sản xuất bởi một nhà sản xuất.
