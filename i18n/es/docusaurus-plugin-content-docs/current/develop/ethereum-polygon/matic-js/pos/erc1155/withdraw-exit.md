---
id: withdraw-exit
title: withdrawExit (Salida del retiro)
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Sal del proceso de retiro usando el hash de la transacción de withdrawStart.'
---

El método `withdrawExit` puede utilizarse para salir del proceso de retiro utilizando el hash de la transacción del método `withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
