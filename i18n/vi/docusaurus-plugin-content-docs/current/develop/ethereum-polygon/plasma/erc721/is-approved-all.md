---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# isApprovedAll {#isapprovedall}

Phương pháp `isApprovedAll` kiểm tra xem tất cả token đã được phê duyệt hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
