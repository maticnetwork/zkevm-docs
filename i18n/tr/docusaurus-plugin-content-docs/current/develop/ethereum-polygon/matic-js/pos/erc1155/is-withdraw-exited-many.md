---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Birden çok token için fon çekme işleminden çıkılıp çıkılmadığını denetler.'
---

`isWithdrawExitedMany` metodu, birden çok token için fon çekme işleminden çıkılıp çıkılmadığını denetler. Boolean değeri döndürür.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
