---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Bir fon çekme işleminden çıkılıp çıkılmadığını denetler.'
---

`isWithdrawExited` metodu bir fon çekme işleminden çıkılıp çıkılmadığını denetler. Bir boolean değeri döndürür.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
