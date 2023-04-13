---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Tingnan kung na-exit o hindi ang pag-withdraw.'
---

Maaaring gamitin ang paraang `isWithdrawExited` upang malaman kung na-exit o hindi ang pag-withdraw.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
