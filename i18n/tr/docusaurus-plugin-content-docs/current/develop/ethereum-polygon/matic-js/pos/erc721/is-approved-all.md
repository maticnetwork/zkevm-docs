---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Tüm token''ların onaylanmış olup olmadığını denetler.'
---

`isApprovedAll` metodu tüm token'ların onaylanmış olup olmadığını denetler. Bir boolean değeri döndürür.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
