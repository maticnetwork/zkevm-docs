---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Fon çekme işleminden çıkılıp çıkılmadığını denetler.'
---

`isWithdrawExited` metodu, fon çekme işleminden çıkılıp çıkılmadığını anlamak için kullanılabilir.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
