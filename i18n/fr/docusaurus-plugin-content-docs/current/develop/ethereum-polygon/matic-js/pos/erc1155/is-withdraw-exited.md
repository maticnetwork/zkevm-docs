---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Vérifie si un retrait a été supprimé.'
---

`isWithdrawExited` la méthode vérifie si un retrait a été supprimé. Cela renvoie une valeur booléenne.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
