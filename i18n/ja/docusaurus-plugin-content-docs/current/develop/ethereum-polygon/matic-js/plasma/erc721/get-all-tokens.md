---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: '特定のユーザーが所有するすべてのトークンを返します。'
---

`getAllTokens`メソッドは、特定のユーザーが所有するすべてのトークンを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

2 番目のパラメーターで制限バリューを指定して、トークンを制限することもできます。
