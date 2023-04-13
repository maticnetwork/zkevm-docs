---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# withdrawExit {#withdrawexit}

`withdrawExit` può essere utilizzato per uscire dal processo di prelievo una volta terminato il periodo di challenge.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
