---
id: approve-all
title: approveAll (Aprobar todo)
keywords:
- 'pos client, erc721, approveAll, polygon, sdk'
description: 'Aprueba todos los tokens.'
---

El método `approveAll` se puede utilizar para aprobar todos los tokens.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
