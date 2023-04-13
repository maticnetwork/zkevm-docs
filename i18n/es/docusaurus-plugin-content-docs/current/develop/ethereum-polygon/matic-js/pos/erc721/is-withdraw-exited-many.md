---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Revisa si se ha salido del retiro para varios tokens.'
---

El método `isWithdrawExitedMany` comprueba si se ha salido del retiro para varios tokens. Devuelve un valor booleano.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
