---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Kiểm tra xem tất cả token đã được phê duyệt chưa.'
---

Phương pháp `isApprovedAll` kiểm tra xem tất cả token đã được phê duyệt cho người dùng hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
