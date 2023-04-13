---
id: connext
title: Chuyển nhượng xuyên chuỗi bằng Connect
description: Xây dựng ứng dụng blockchain tiếp theo của bạn trên Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connect là một mạng lưới thanh khoản xuyên chuỗi, cung cấp khả năng hoán đổi nhanh chóng, hoàn toàn không lưu ký giữa các chuỗi tương thích với evm và hệ thống Ethereum L2.

Ethereum đang đi theo hướng đa chuỗi. Với việc ngày càng áp dụng các chuỗi tương thích với evm và L2, một thách thức mới đã xuất hiện xung quanh sự phân mảnh thanh khoản trong hệ sinh thái. Connext giải quyết vấn đề này bằng cách kết nối các nhóm thanh khoản rời rạc trên mỗi chuỗi thành một mạng lưới toàn mục mà không đưa ra tiền công mới, đáng kể cho người dùng. Các nhà phát triển có thể tận dụng tính thanh khoản này để xây dựng một lớp mới gồm các dApp vốn dùng được với nhiều chuỗi trên Connext.

Ở cấp độ cao, Connext cho phép người dùng hoán đổi assetA trên chainA cho assetB trên chainB bằng các chuyển giao có điều kiện. Điều này xảy ra trong một vài bước đơn giản:

Alice – một người dùng Connext – gửi một chuyển giao assetA có điều kiện cho Bob. Bob – một nhà cung cấp thanh khoản (còn gọi là nhà định tuyến) – gửi một lượng assetB tương đương cho Alice. Alice mở khóa chuyển nhượng có điều kiện của mình để nhận assetB, do đó cho phép Bob làm điều tương tự. Các nhà định tuyến tạo thành xương sống của mạng lưới của chúng tôi, cung cấp tính thanh khoản trên các chuỗi khác nhau và thu phí khi làm như vậy. Bạn có thể tìm hiểu thêm về cách điều này hoạt động theo cách không thể tin được trong Giao thức Primer của chúng tôi.

Để thiết lập các chuyển giao crosschain từ Ethereum Goerli Testnet cho Polygon Mumbai, trong một trình duyệt dApp vui lòng xem qua [hướng dẫn](https://docs.connext.network/quickstart-polygon-matic-integration) này.
