---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Kiểm tra xem token đã được phê duyệt cho một tokenId cụ thể hay chưa.'
---

Phương pháp `isApproved` kiểm tra xem token đã được phê duyệt cho một tokenId cụ thể hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
