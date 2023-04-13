---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# getTokensCount {#gettokenscount}

Phương pháp `getTokensCount` trả về số token cho người dùng cụ thể.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
