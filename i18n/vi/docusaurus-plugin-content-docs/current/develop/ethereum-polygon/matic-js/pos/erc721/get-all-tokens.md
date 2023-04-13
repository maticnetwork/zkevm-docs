---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Truy xuất tất cả token thuộc sở hữu của người dùng cụ thể.'
---

Phương pháp `getAllTokens` trả về tất cả token thuộc sở hữu của người dùng cụ thể.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

bạn cũng có thể giới hạn token bằng cách định rõ giá trị giới hạn trong thông số thứ hai.
