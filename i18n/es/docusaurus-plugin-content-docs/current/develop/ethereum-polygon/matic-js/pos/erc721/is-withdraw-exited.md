---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' Comprueba si se salió de un retiro.'
---

El método `isWithdrawExited` comprueba si se salió de un retiro. Devuelve el valor booleano.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
