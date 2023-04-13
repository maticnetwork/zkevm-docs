---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# getTokensCount {#gettokenscount}

`getTokensCount`メソッドは、特定のユーザのトークンカウントを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
