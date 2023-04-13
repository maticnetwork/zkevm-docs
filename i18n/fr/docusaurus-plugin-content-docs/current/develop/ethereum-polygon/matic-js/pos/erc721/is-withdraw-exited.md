---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: 'Vérifiez si un retrait a été supprimé.'
---

`isWithdrawExited`La méthode vérifie si un retrait a été supprimé. Cela renvoie une valeur booléenne.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
