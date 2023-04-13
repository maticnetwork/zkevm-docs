---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Tüm token''ların onaylanmış olup olmadığını denetler.'
---

`isApprovedAll` metodu bir kullanıcı için tüm token'ların onaylanmış olup olmadığını denetler. Boolean değeri döndürür.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
