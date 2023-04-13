---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Vérifie si le retrait a été supprimé pour plusieurs jetons.'
---

`isWithdrawExitedMany`la méthode vérifie si le retrait a été supprimé pour plusieurs jetons. Elle renvoie une valeur booléenne.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
