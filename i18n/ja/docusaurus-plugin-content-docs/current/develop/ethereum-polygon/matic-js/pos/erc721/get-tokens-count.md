---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: '特定のユーザーのトークン数を取得します。'
---

`getTokensCount`メソッドは、特定のユーザのトークン数を返します。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
