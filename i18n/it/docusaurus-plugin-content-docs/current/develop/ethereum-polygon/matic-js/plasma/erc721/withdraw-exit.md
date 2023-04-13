---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Esce dal processo di prelievo.'
---

Il metodo `withdrawExit` può essere utilizzato per uscire dal processo di prelievo una volta terminato il periodo di challenge.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
