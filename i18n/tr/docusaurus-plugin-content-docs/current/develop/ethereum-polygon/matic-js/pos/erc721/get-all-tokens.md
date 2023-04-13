---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Belirlenen kullanıcının sahip olduğu tüm token''ları getirir.'
---

`getAllTokens` metodu belirlenen kullanıcının sahip olduğu tüm token'ları getirir.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

ayrıca, ikinci parametrede limit değeri belirleyerek token'ları sınırlandırabilirsiniz.
