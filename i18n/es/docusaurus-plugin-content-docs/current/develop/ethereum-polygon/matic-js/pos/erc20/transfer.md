---
id: transfer
title: transfer (Transferencia)
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Transfiere una cantidad de una dirección a otra.'
---

El método `transfer` puede utilizarse para transferir una cantidad de una dirección a otra.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
