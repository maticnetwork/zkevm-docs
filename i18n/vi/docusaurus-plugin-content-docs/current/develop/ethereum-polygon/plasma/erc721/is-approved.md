---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# isApproved {#isapproved}

Phương pháp `isApproved` kiểm tra xem token đã được phê duyệt cho tokenId cụ thể hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
