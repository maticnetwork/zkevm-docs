---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: '特定のユーザーのトークン数を返します。'
---

`getTokensCount`メソッドは、特定のユーザのトークン数を返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
