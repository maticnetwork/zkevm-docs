---
id: adding-a-custom-token
title: Thêm một Token Tùy chỉnh
sidebar_label: Adding a Custom Token
description: Phát triển ứng dụng blockchain tiếp theo trên Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Tính năng **Thêm Token Tùy chỉnh** cho phép bạn thêm trực tiếp một token bất kỳ và sử dụng token đó với Bộ Ví Polygon. Bạn chỉ cần tìm kiếm token đó theo địa chỉ hợp đồng, gốc hoặc con đều được:

* Hợp đồng **gốc** là hợp đồng token trên Ethereum
* Hợp đồng **con** là hợp đồng trên Polygon

### Làm thế nào để tìm hợp đồng token? {#how-do-i-find-the-token-contract}

Bạn có thể tìm kiếm token theo tên trên [Coingecko](http://coingecko.com) hoặc [Coinmarketcap](https://coinmarketcap.com/), nơi bạn sẽ có thể thấy địa chỉ của token trên chuỗi Ethereum (đối với các token ERC 20) và các chuỗi nối tiếp được hỗ trợ như Polygon. Địa chỉ token trên các chuỗi khác có thể không được cập nhật nhưng bạn chắc chắn có thể sử dụng địa chỉ gốc cho mọi mục đích.

Vì vậy, khi chọn một token, bạn sẽ có thể tìm kiếm theo:
* biểu tượng token
* tên token
* hợp đồng

Đây là cách quy trình hoạt động:

1. Bạn có thể dễ dàng thêm bất kỳ token nào vào danh sách của mình bằng cách thêm địa chỉ hợp đồng làm token tùy chỉnh (chúng tôi hỗ trợ

đia chỉ hợp đồng trên cả Polygon và Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Sau khi thông tin token được tìm nạp, bạn sẽ thấy một màn hình xác nhận với toàn bộ thông tin token. Sau đó, bạn có thể thêm token này dưới dạng token tùy chỉnh, được lưu trữ cục bộ trong hệ thống của bạn. Chúng tôi khuyên bạn nên xác minh lại các hợp đồng token vì có rất nhiều token nhân bản hoặc lừa đảo:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Token bạn vừa thêm giờ đây sẽ được hiển thị khi chọn một token:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Bạn cũng có thể thêm một dấu hiệu trực tiếp từ thẻ các dấu hiệu của màn hình **Quản lý**:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>