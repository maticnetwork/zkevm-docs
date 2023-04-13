---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' Bir fon çekme işleminden çıkılıp çıkılmadığını denetler.'
---

`isWithdrawExited` metodu bir fon çekme işleminden çıkılıp çıkılmadığını denetler. Bir boolean değeri döndürür.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
