---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Verifica se il prelievo è stato effettuato o meno.'
---

Il metodo `isWithdrawExited` può essere utilizzato per sapere se il prelievo è stato effettuato o meno.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
