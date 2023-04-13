---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Sal del proceso de retiro usando el hash de la transacción de withdrawStart.'
---

El método `withdrawExitMany` puede utilizarse para salir del proceso de retiro utilizando el hash de la transacción del método `withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
