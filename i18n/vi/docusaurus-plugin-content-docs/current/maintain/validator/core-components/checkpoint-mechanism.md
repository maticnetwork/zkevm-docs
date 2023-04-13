---
id: checkpoint-mechanism
title: Cơ chế điểm kiểm duyệt
sidebar_label: Checkpoints
description: Kiểm tra tình trạng hệ thống cho mạng lưới chính Ethereum
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon không phải là nền tảng Lớp 1

Polygon tùy thuộc vào Main Ethereum như Lớp Thiết lập 1. Tất cả các cơ chế góp cổ phần cần phải đồng bộ với các hợp đồng trên mạng lưới chính Ethereum.

:::

[Các Proposer](/docs/maintain/glossary.md#proposer) cho một điểm kiểm tra ban đầu được chọn thông qua [thuật toán tròn của Tendermint được cân nhắc](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). Một kiểm tra tùy chỉnh khác được triển khai dựa trên thành công của việc gửi điểm kiểm duyệt. Điều này cho phép hệ thống Polygon phân tách với lựa chọn người đề xuất Tendermint và cung cấp cho Polygon các khả năng như chỉ chọn người đề xuất khi giao dịch điểm kiểm duyệt trên mạng lưới chính Ethereum thành công hoặc gửi giao dịch trạm kiểm soát cho các khối thuộc các trạm kiểm soát không thành công trước đó.


Gửi thành công một điểm kiểm duyệt trên Tendermint là một quy trình cam kết gồm 2 giai đoạn:

* Người đề xuất, được chọn thông qua thuật toán quay vòng, gửi một điểm kiểm duyệt với địa chỉ của người đề xuất và hàm băm Merkle trong trường người đề xuất.
*
Tất cả những người đề xuất khác xác thực dữ liệu trong trường người đề xuất trước khi thêm hàm băm Merkle vào trạng thái của họ.


Người đề xuất tiếp theo sau đó sẽ gửi một giao dịch xác nhận để chứng minh rằng [giao dịch trạm kiểm soát](/docs/maintain/glossary.md#checkpoint-transaction) trước đó đã thành công trên mạng lưới chính Ethereum. Mọi thay đổi của bộ trình xác thực đều được chuyển tiếp bởi các nút xác thực trên [Heimdall](/docs/maintain/glossary.md#heimdall) được nhúng vào nút xác nhận. Điều này cho phép Heimdall luôn đồng bộ với trạng thái hợp đồng Polygon trên mạng lưới chính Ethereum.

Hợp đồng Polygon được triển khai trên mạng chính Ethereum được coi là nguồn tra cuối và do đó tất cả việc xác thực được thực hiện thông qua truy vấn hợp đồng mạng lưới chính Ethereum.
