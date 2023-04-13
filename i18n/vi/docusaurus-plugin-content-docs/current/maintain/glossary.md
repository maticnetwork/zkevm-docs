---
id: glossary
title: Thuật ngữ
description: Các đặc điểm Polygon Key
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Nhà sản xuất khối {#block-producer}

Một nhà sản xuất khối là một người xác thực [hoạt động](#validator) được chọn để làm nhà sản xuất khối trong [span](#span).

Nhà sản xuất khối có trách nhiệm tạo ra các khối và phát các khối đã tạo lên mạng lưới.

## Bor {#bor}

Nút bor là nút tạo ra các khối trên Mạng lưới Polygon.

Bor dựa trên [Go Ethereum](https://geth.ethereum.org/).

## Giao dịch điểm kiểm duyệt {#checkpoint-transaction}

Giao dịch điểm kiểm duyệt là một giao dịch chứa gốc Merkle các khối của lớp [Bor](#bor) giữa hai khoảng điểm kiểm duyệt.

Giao dịch được cam kết đối với các hợp đồng góp cổ phần Polygon trên mạng lưới chính Ethereum bằng nút [Heimdall](#heimdall).

Xem thêm:

* [Kiến trúc Heimdall: Điểm kiểm duyệt](/docs/pos/heimdall/checkpoint)
* [Cơ chế điểm kiểm duyệt](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Hoa hồng {#commission}

Hoa hồng là tỷ lệ phần thưởng mà [người xác thực](#validator) nhận được từ [người ủy thác](#delegator) góp cổ phần với người xác thực.

Xem [Hoạt động hoa hồng cho người xác thực](/docs/maintain/validate/validator-commission-operations).

## Người ủy quyền {#delegator}

Người ủy quyền góp token MATIC để bảo đảm Mạng lưới Polygon với [người xác thực](#validator) hiện có mà không tự chạy các nút.

Xem [Ai là người ủy quyền](/docs/maintain/polygon-basics/who-is-delegator).

## Nút đầy đủ {#full-node}

Một nút đầy đủ là một [nút canh gác](#sentry) được đồng bộ hoàn toàn chạy cả [Heimdall](#heimdall) và [Bor](#bor).

Xem [Triển khai nút đầy đủ](/docs/operate/full-node-deployment).

## Heimdall {#heimdall}

Nút Heimdall là một nút chạy song song với mạng lưới chính Ethereum, giám sát bộ hợp đồng được triển khai trên mạng lưới chính Ethereum và cam kết [điểm kiểm duyệt](#checkpoint-transaction) Mạng lưới Polygon với mạng lưới chính Ethereum.

Heimdall phụ thuộc vào [Tendermint](https://tendermint.com/).

## Địa chỉ người sở hữu {#owner-address}

Địa chỉ người sở hữu là địa chỉ được sử dụng để góp cổ phần, tái góp cổ phần, thay đổi địa chỉ người ký, rút phần thưởng và quản lý các tham số liên quan đến uỷ quyền trên mạng lưới chính Ethereum.

Trong khi [khoá người ký](#signer-address) được giữ trên nút và được xem là một ví **nóng**, khoá chủ sở hữu phải được bảo mật, sử dụng không thường xuyên và được coi là ví **lạnh**.

Xem [Quản lý khoá](validator/core-components/key-management.md).

## Người đề xuất {#proposer}

Người đề xuất là [người xác thực](#validator) được chọn bằng thuật toán để đề xuất một khối mới.

Người đề xuất cũng chịu trách nhiệm thu thập tất cả các chữ ký cho một [điểm kiểm duyệt](#checkpoint-transaction) và cam kết điểm kiểm duyệt với mạng lưới chính Ethereum.

## Sentry {#sentry}

Nút sentry là nút chạy cả nút [Heimdall](#heimdall) và nút [Bor](#bor) để tải về dữ liệu từ các nút khác trên mạng lưới và truyền dữ liệu [người xác thực](#validator) trên mạng lưới.

Nút sentry được mở cho tất cả các nút bảo vệ khác trên mạng lưới.

## Span {#span}

Một tập khối xác thực logic đã được chọn cho một tập người xác thực từ tất cả những [người xác thực](#validator) khả dụng.

Việc chọn từng span được quyết định bởi ít nhất 2/3 số người xác thực về quyền góp cổ phần.

Xem [Đồng thuận Bor: Span](/docs/pos/bor/consensus.md#span).

## Góp cổ phần {#staking}

Góp cổ phần là quy trình khoá token trong một khoản tiền gửi để giành quyền xác thực và tạo khối trên blockchain. Thông thường staking được thực hiện trong dấu hiệu bản xứ cho mạng - cho dấu hiệu MATIC được khóa bởi các trình xác thực / stakers trong Polygon Network. Các ví dụ khác bao gồm Ethereum (sau khi gọi), ATOM in Cosmos, v.v.

Xem thêm [Bằng chứng cổ phần Là Gì](polygon-basics/what-is-proof-of-stake.md).

## Địa chỉ người ký {#signer-address}

Địa chỉ người ký là địa chỉ tài khoản Ethereum của nút xác thực [Heimdall](#heimdall). Địa chỉ người ký ký và gửi [giao dịch điểm kiểm duyệt](#checkpoint-transaction).

Trong khi khoá người ký được giữ trên nút và được xem là một ví **nóng**, [khoá chủ sở hữu](#owner-address) phải được bảo mật, sử dụng không thường xuyên và được coi là ví **lạnh**.

Xem [Quản lý khoá](validator/core-components/key-management.md).

## Người xác thực {#validator}

Các người xác định [cọng cổ phần của họ](/docs/maintain/validate/validator-staking-operations) bằng các hợp đồng định dạng được triển khai trên mạng lưới chủ yếu Ethereum và đang chạy cả nút [Heimdall](#heimdall) và nút [Bor](#bor) để thực hiện các kiểm tra mạng cho máy tính chủ Ethereum và để tạo ra khối khối trên mạng.

Nút xác thực chỉ mở đối với nút [sentry](#sentry) và khoá đối với phần còn lại của mạng lưới.

Xem [Ai là người xác thực](polygon-basics/who-is-validator.md).
