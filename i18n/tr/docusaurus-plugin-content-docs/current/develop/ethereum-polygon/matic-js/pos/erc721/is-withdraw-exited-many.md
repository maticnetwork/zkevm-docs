---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Birden çok token için fon çekme işleminden çıkılıp çıkılmadığını denetler.'
---

`isWithdrawExitedMany` metodu, birden çok token için fon çekme işleminden çıkılıp çıkılmadığını denetler. Boolean değeri döndürür.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
