---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Vérifier si le retrait a été supprimé ou non.'
---

`isWithdrawExited` la méthode peut être utilisée pour savoir si le retrait a été supprimé ou non.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
