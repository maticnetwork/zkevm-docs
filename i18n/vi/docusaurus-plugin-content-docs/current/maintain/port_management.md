---
id: port-management
title: Cơ sở hạ tầng kỹ thuật cho các nút
sidebar_label: Technical Infrastructure For Nodes
description: Danh sách các cổng mặc định được sử dụng trên các nút Polygon
keywords:
  - docs
  - polygon
  - matic
  - port
  - port management
  - infrastructure
  - default ports
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Dưới đây là danh sách các cổng mặc định được sử dụng trên các nút Polygon:

## Bor {#bor}

| Tên | Cổng | Thẻ | mô tả |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Cổng nghe mạng lưới | 30303 | công khai | Cổng nghe mạng lưới. Bor sử dụng cổng này để kết nối với mạng ngang hàng và đồng bộ |
| Máy chủ RPC | 8545 | có thể công khai, nội bộ | Cổng RPC để gửi giao dịch và nhận dữ liệu từ Bor. Heimdall sử dụng cổng này để nhận các tiêu đề Bor đối với các điểm kiểm duyệt |
| Máy chủ WS | 8546 | có thể công khai, nội bộ | Cổng websocket |
| Máy chủ graphql | 8547 | có thể công khai, nội bộ | Cổng graphql |
| Máy chủ prometheus | 9091 | có thể công khai, giám sát | API máy chủ prometheus như nguồn dữ liệu trong Grafana. Nó có thể được hoán đổi cho 80/443 thông qua proxy nghịch đảo nginx |
| Máy chủ grafana | 3001 | có thể công khai, giám sát | Máy chủ web grafana. Nó có thể được hoán đổi cho 80/443 thông qua proxy nghịch đảo nginx |
| Máy chủ pprof | 7071 | nội bộ, giám sát | Máy chủ pprof để thu thập các chỉ số từ Bor |
| Phát hiện UDP | 30301 | có thể công khai, nội bộ | Cổng mặc định bootnode (để phát hiện mạng ngang hàng) |

## Heimdall {#heimdall}

| Tên | Cổng | Thẻ | mô tả |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Cổng nghe mạng lưới | 30303 | công khai | Cổng nghe mạng lưới. Bor sử dụng cổng này để kết nối với mạng ngang hàng và đồng bộ |
| Máy chủ RPC | 8545 | có thể công khai, nội bộ | Cổng RPC để gửi giao dịch và nhận dữ liệu từ Bor. Heimdall sử dụng cổng này để nhận các tiêu đề Bor đối với các điểm kiểm duyệt |
| Máy chủ WS | 8546 | có thể công khai, nội bộ | Cổng websocket |
| Máy chủ graphql | 8547 | có thể công khai, nội bộ | Cổng graphql |
| Máy chủ prometheus | 9091 | có thể công khai, giám sát | API máy chủ prometheus như nguồn dữ liệu trong Grafana. Nó có thể được hoán đổi cho 80/443 thông qua proxy nghịch đảo nginx |
| Máy chủ grafana | 3001 | có thể công khai, giám sát | Máy chủ web grafana. Nó có thể được hoán đổi cho 80/443 thông qua proxy nghịch đảo nginx |
| Máy chủ pprof | 7071 | nội bộ, giám sát | Máy chủ pprof để thu thập các chỉ số từ Bor |
| Phát hiện UDP | 30301 | có thể công khai, nội bộ | Cổng mặc định bootnode (để phát hiện mạng ngang hàng) |