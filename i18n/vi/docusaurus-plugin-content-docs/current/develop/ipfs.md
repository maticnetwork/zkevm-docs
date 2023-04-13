---
id: ipfs
title: IPFS
description: "IPFS – hệ thống phân tán để lưu trữ và truy cập dữ liệu."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Bối cảnh {#context}

Blockchain Polygon giảm chi phí giao dịch khi lưu trữ dữ liệu so với mạng lưới chính Ethereum; tuy nhiên, ngay cả những chi phí thấp hơn này cũng tăng lên nhanh chóng khi lưu trữ các tệp có kích thước lớn. Các nhà phát triển cũng phải cân nhắc các hạn chế về kích thước khối và các giới hạn về tốc độ giao dịch khi lưu trữ dữ liệu trên chuỗi. Một giải pháp mà địa chỉ tất cả những mối quan hệ này là IPFS, Hệ thống File InterPlanet.

#### IPFS là gì? {#what-is-ipfs}

IPFS là hệ thống phân tán nhằm lưu trữ và truy cập tệp tin, trang web, ứng dụng, và dữ liệu. IPFS sử dụng quá trình phi tập trung, chỉ định địa chỉ nội dung, và mạng ngang hàng mạnh mẽ của những người tham gia tích cực để cho phép người dùng lưu trữ, yêu cầu, và chuyển dữ liệu có thể xác minh với nhau.

Quá trình phi tập trung giúp bạn có thể tải xuống tệp tin từ nhiều vị trí không phải do một tổ chức quản lý, mang lại khả năng phục hồi và khả năng chống kiểm duyệt ngay lập tức.

Chỉ định địa chỉ nội dung sử dụng mật mã để tạo một hàm băm có thể xác minh duy nhất dựa trên những gì có trong tệp tin chứ không phải vị trí của tệp. Mã định danh nội dung kết quả (CID) cung cấp sự đảm bảo rằng mảnh dữ liệu là đồng nhất bất kể nơi lưu trữ nó.

Cuối cùng, một cộng đồng người dùng hoạt động tích cực ngày càng phát triển giúp việc chia sẻ nội dung ngang hàng này trở nên khả thi. Nhà phát triển tải và pin nội dung cho IPFS trong khi Filecoin hoặc nhà kho của Crust giúp đảm bảo lưu trữ sự bền bỉ của nội dung đó.


Bộ nhớ trên nền tảng IPFS cho phép bạn chỉ cần lưu trữ CID cho nội dung của mình thay vì tải toàn bộ tệp in vào blockchain Polygon; cho phép giảm chi phí, kích thước tệp tin lớn hơn, và có thể chứng minh việc lưu trữ liên tục. Để biết thêm chi tiết tham khảo các [Docs IPFS](https://docs.ipfs.io/).

### Dự án Ví dụ {#example-projects}

1. Hướng dẫn trong scaffold-eth chứng minh cách phát triển một NFT trên Polygon với IPFS - [liên kết](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Xây dựng một ứng dụng của stack web3 đầy đủ với Next.js, Polygon, Solity, Graph, IPFS, và Hardhat - [Liên hệ](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
