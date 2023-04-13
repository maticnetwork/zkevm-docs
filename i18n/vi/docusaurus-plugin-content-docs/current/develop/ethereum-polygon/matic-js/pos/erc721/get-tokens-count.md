---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Lấy số token cho người dùng cụ thể.'
---

Phương pháp `getTokensCount` trả về số token cho người dùng cụ thể.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
