---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Kiểm tra xem tất cả token đã được phê duyệt hay chưa.'
---

Phương pháp `isApprovedAll` kiểm tra xem tất cả token đã được phê duyệt hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
