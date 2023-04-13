---
id: set-proof-api
title: Thiết lập ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Định cấu hình API bằng chứng.
---

Một số chức năng trong matic. J được chấp nhận với thuật ngữ nhanh hơn. Như tên đề nghị, chúng tạo ra kết quả nhanh hơn so với các đối tác không nhanh hơn. Chúng làm như vậy bằng cách sử dụng API Proof Generation như hậu phương có thể được truy cập bởi bất kỳ ai.

[https://apis/matic.mạng](https://apis/matic.network) là một Proof Generation API, được hỗ trợ bởi Polygon.

`setProofApi`Phương pháp này có thể giúp đỡ trong việc thiết lập URL của Proof Generation API cho ví dụ như sự thực tế.j.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Sử dụng một dịch vụ bằng chứng về Hệ thống API tự chủ sẽ cung cấp hiệu suất tốt hơn so với một máy chủ công khai.

Vui lòng tuân theo hướng dẫn cài đặt được cung cấp trong tệp tin ADME.md của https://github.com/matic/mạng và hệ thống bằng chứng để tự chủ dịch vụ.

ví dụ - nếu bạn đã triển khai api bằng chứng và url cơ sở là - `https://abc.com/`, sau đó bạn cần thiết lập url cơ sở trong `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Chúng tôi khuyến nghị sử dụng API nhanh hơn, vì một số AP, đặc biệt là nơi có bằng chứng được phát triển, tạo ra nhiều cuộc gọi RPC và có thể sẽ rất chậm với sự phát triển của RPC.
:::
