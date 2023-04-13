---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Überprüfe, ob die Auszahlung beendet wurde oder nicht.'
---

`isWithdrawExited` Methode kann verwendet werden, um zu erfahren, ob die Auszahlung beendet wurde.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
