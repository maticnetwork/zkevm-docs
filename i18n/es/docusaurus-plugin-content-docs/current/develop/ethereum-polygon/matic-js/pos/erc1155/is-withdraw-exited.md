---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Comprueba si se ha salido de un retiro.'
---

El método `isWithdrawExited` comprueba si se ha salido de un retiro. Devuelve el valor booleano.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
