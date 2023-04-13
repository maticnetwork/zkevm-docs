---
id: approve
title: approuver
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'L''approbation du montant requis sur le jeton root.'
---

`approve`la méthode peut être utilisée pour approuver le montant requis sur le jeton root.

l'approbation est requise pour déposer un montant sur la chaîne de Polygon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
