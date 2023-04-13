---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Belirlenen bir tokenId için token''ın onaylanmış olup olmadığını denetler.'
---

`isApproved` metodu, belirlenen tokenId için token'ın onaylanmış olup olmadığını denetler. Bir boolean değeri döndürür.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
