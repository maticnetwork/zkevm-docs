---
id: heimdall-chain
title: Chuỗi Heimdall là gì?
sidebar_label: Heimdall Chain
description: Xây dựng ứng dụng blockchain tiếp theo của bạn trên Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Chuỗi Heimdall {#heimdall-chain}

Heimdall là một lớp Kiểm định Bằng chứng cổ phần Polygon, lớp này chịu trách nhiệm gửi điểm kiểm duyệt đại diện của các khối Plasma lên chuỗi chính trong kiến trúc. Chúng tôi đã triển khai lớp này bằng cách phát triển dựa trên cơ cấu đồng thuận Tendermint cùng với các thay đổi về sơ đồ chữ ký và cấu trúc dữ liệu khác nhau.

Hợp đồng Quản lý chuỗi chính Stake hoạt động cùng với nút Heimdall để hành động như cơ chế quản lý cổ phần không tin cậy cho động cơ PoS, bao gồm việc chọn thiết lập trình xác thực, cập nhật trình xác thực, v. v. Vì việc xác thực thực được thực hiện trên hợp đồng thông minh Ethereum, chúng ta không chỉ dựa vào sự trung thực và thừa kế khóa bảo mật cho phần này.

Lớp Heimdall xử lý tập hợp các khối được tạo ra bởi Bor vào một cây Merkle và định kỳ phát hành gốc Merkle lên chuỗi gốc. Xuất bản kỳ kinh này được gọi là **"checkpoint"**. Cứ với vài khối trên Bor sẽ có một người xác thực (trên lớp Heimdall):

1. Xác thực tất cả các khối kể từ điểm kiểm duyệt cuối cùng
2. Tạo một cây merkle của hàm băm khối
3. Phát hành gốc merkle lên chuỗi chính

Các điểm kiểm duyệt rất quan trọng vì hai lý do:

1. Tạo ra tính cuối cùng trên Chuỗi Gốc
2. Cung cấp bằng chứng đốt cháy khi rút tài sản

Tổng quan về quy trình có thể được giải thích như sau:

- Một tập hợp con người xác thực đang hoạt động trong nhóm được chọn làm nhà sản xuất khối cho một span. Sự chọn lựa mỗi span cũng sẽ được đồng thuận bởi ít nhất 2/3 số người nắm quyền. Các nhà sản xuất khối này chịu trách nhiệm tạo ra các khối và phát chúng cho mạng còn lại.
- Điểm kiểm duyệt bao gồm gốc của tất cả các khối được tạo ra trong khoảng thời gian cố định bất kỳ. Tất cả các nút xác thực và gắn chữ ký của chúng vào nó.
- Một đề xuất đã chọn từ bộ xác thực sẽ chịu trách nhiệm thu thập tất cả các chữ ký cho một điểm kiểm tra đặc biệt và thực hiện tương tự trên chuỗi chính.
- Trách nhiệm tạo ra khối và cũng đề xuất các điểm kiểm duyệt có thể thay đổi tùy thuộc vào tỷ lệ cổ phần của người xác thực trong tổng thể nhóm.