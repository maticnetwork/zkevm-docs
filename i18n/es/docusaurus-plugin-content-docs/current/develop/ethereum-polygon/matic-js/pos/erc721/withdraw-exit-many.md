---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Sal del proceso de retiro utilizando el hash de la transacción de withdrawStartMany'
---

El método `withdrawExitMany` puede utilizarse para salir del proceso de retiro utilizando el hash de la transacción del método `withdrawStartMany`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
