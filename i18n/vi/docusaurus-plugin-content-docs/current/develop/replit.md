---
id: replit
title: Triển khai Công ty Thông minh bằng Relit
sidebar_label: Using Replit
description: Triển khai Công cụ Thông minh sử dụng ReplititiDE trên Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Tổng quan {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) là một nền tảng lập trình cho phép bạn viết mã và lưu trữ các ứng dụng. Replit hỗ trợ [ngôn ngữ lập trình Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1) nên nó cung cấp tất cả các tính năng và chức năng để các nhà phát triển Web3 tạo và triển khai các hợp đồng thông minh.

Bài viết này hướng dẫn bạn xây dựng và triển khai một hợp đồng thông minh vững chắc trên Polygon bằng cách [phát triển Aplit IDE](https://replit.com/signup) và [xác thực hóa chất lượng (beta)](https://replit.com/@replit/Solidity-starter-beta?v=1).

## Những điều bạn sẽ làm {#what-you-will-do}

- Tạo tài khoản Replit
- Tạo môi trường Repl
- Triển khai một dự án mẫu trên mạng Polygon Mumbai.
- Xác minh hợp đồng
- Xuất bản dự án của bạn vào hồ sơ Replit cá nhân.

:::tip

Để tìm ví dụ thêm về Solidity với Replit, bạn có thể đọc bài viết <ins>**[được bắt đầu bằng](https://blog.replit.com/solidity)**</ins> <ins>**[tài liệu Replit Solitity và hướng dẫn hợp đồng Escrow](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>.
:::

## Điều kiện tiên quyết {#prerequisites}

Bạn không cần thiết lập môi trường cục bộ nào để triển khai hợp đồng thông minh của bạn trên Polygon bằng Replit.

Bạn cần ví web3 dựa trên nền trình duyệt để tương tác với Mạng thử nghiệm Polygon Mumbai và các hợp đồng đã triển khai. Nếu bạn vốn đang sử dụng MetaMask, bạn nên tạo một tài khoản mới để thử nghiệm với Replit. Bạn có thể làm điều này từ menu tài khoản, xuất hiện khi bạn nhấn vào ảnh đại diện tài khoản ở góc trên cùng bên phải giao diện MetaMask.

Bạn phải thiết lập tất cả các Điều kiện tiên quyết sau để có thể triển khai hợp đồng thông minh solidity trên Polygon:

1. [Tạo tài khoản Replit](https://replit.com/signup)
2. [Tải ví Metamask về](/docs/develop/metamask/hello)
3. [Định cấu hình Polygon trên MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [Nhận token mạng thử nghiệm](https://faucet.polygon.technology)

## Làm việc với Repl {#working-with-a-repl}

Mỗi Repl mà bạn tạo là một môi trường phát triển và sản xuất đầy đủ chức năng. Hãy thực hiện theo các bước để tạo một Replit trình khởi đầu solidity:

1. [Đăng nhập](https://replit.com/login) hoặc [tạo tài khoản](https://replit.com/signup). Sau khi tạo [tài khoản Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), màn hình nhà của bạn sẽ bao gồm một bảng điều tra nơi bạn có thể xem, tạo các dự án, và quản lý tài khoản.

![img](/img/replit/dashboard.png)

2. Một khi đăng nhập, hãy tạo một phần mềm khởi động Solid, Chọn **+** Tạo Repl từ bảng bên trái hoặc **+** ở góc bên phải của màn hình.

![img](/img/replit/solidity.png)

3. Hãy chọn mẫu [**khởi động Solidity (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) và đưa ra một tựa đề.

4. Nhấn vào **+** Tạo Repl để tạo dự án của bạn.

:::note

Trình khởi động Solidity repl sẽ có mặt với giao diện thân thiện của trình duyệt và được xây dựng bằng <ins>**[API JavaScript Web3](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>, bạn có thể sử dụng để triển khai và tương tác với các hợp đồng của chúng tôi. Chúng ta sẽ triển khai đến testnet của Replit, một phiên bản tự chọn của blocktage Ethereum được quản lý bằng cách Replit và lạc quan để kiểm tra.

:::

## Triển khai trên Polygon {#deploy-on-polygon}

Đảm bảo bạn đã theo dõi danh sách của **Máy xác thực** trên để bạn sẵn sàng triển khai và tương tác với hợp đồng thông minh.

1. Nhấn vào **Run** (ở trên cùng) để cài đặt tất cả các gói liên quan và bắt đầu triển khai hợp đồng UI.

2. Kết nối ví MetaMask của bạn cho giao diện web và chuyển sang máy [kiểm tra Mumbai](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Nhấn vào **ví Kết nối**, hãy chọn tài khoản của bạn, sau đó chọn **Kết nối**.

![img](/img/replit/deploy-list.png)

4. Từ danh sách drockdown, hãy chọn hợp đồng bạn muốn triển khai. Nhấn vào **Deploy**.

5. Bạn sẽ nhận được một cửa sổ MetaMask popup yêu cầu xác thực. Ứng dụng giao dịch từ ví của bạn để triển khai hợp đồng của bạn.

## Xác thực và thử nghiệm hợp đồng của bạn {#verifying-and-testing-your-contract}

Khi hợp đồng được triển khai, [Điều hướng đến Polyganscan](https://mumbai.polygonscan.com/) để tìm kiếm tài khoản, xem hợp đồng đã triển khai và sao chép địa chỉ tài khoản của bạn.

Một khi hợp đồng của bạn đã được triển khai, nó sẽ xuất hiện như những hộp có thể mở rộng bên dưới hộp thả xuống. Mở rộng và xem tất cả các chức năng khác nhau. Giờ đây, bạn có thể tương tác với hợp đồng của mình bằng giao diện người dùng được cung cấp hoặc từ một URL có thể chia sẻ được hiển thị trên giao diện.

## Xuất bản lên Replit {#publish-to-replit}

Replit cho phép bạn xuất bản các dự án của mình lên một hồ sơ cá nhân. Sau khi xuất bản, các dự án sẽ hiển thị trên trang nổi bật của bạn để mọi người khám phá, tương tác, nhân bản, và cộng tác.

Theo các bước dưới để công bố các dự án của bạn để khôi phục:

1. Chọn tiêu đề dự án ở trên cùng của màn hình.
2. Hoàn thành tên dự án và mô tả của bạn và nhấn vào công cụ **Publish**.
