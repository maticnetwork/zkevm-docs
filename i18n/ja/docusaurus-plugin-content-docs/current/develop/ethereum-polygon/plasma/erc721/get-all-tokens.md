---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# getAllTokens {#getalltokens}

`getAllTokens`メソッドは、特定のユーザが所有するすべてのトークンを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

2 番目のパラメーターで制限バリューを指定して、トークンを制限することもできます。
