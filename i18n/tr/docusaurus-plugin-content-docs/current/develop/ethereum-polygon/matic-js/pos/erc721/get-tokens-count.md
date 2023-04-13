---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Belirlenen  kullanıcı için token sayısını getirir.'
---

`getTokensCount` metodu belirlenen kullanıcı için token sayısını döndürür.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
