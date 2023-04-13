---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Vérifiez si le retrait a été supprimé pour plusieurs jetons.'
---

`isWithdrawExitedMany`La méthode vérifie si le retrait a été supprimé pour plusieurs jetons. Elle renvoie une valeur booléenne.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
