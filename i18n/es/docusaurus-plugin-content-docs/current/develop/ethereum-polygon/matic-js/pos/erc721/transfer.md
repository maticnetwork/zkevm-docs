---
id: transfer
title: transfer (Transferencia)
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Transfiere tokens de un usuario a otro.'
---

El método `transfer`puede utilizarse para transferir tokens de un usuario a otro.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
