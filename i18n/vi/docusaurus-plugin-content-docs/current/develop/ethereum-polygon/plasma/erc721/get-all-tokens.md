---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# getAllTokens {#getalltokens}

Phương pháp `getAllTokens` trả về tất cả token thuộc sở hữu của người dùng đã định.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

bạn cũng có thể giới hạn token bằng cách định rõ giá trị giới hạn trong tham số thứ hai.
