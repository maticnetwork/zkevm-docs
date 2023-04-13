---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Revisa si se ha salido del retiro para varios tokens.'
---

El método `isWithdrawExitedMany` revisa si se ha salido del retiro para varios tokens. Devuelve un valor booleano.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
