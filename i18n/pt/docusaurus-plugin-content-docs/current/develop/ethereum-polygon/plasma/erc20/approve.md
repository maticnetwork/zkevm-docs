---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Introdução ao maticjs'
---

# approve {#approve}

O método `approve` pode ser usado para aprovar o valor necessário no token ROOT.

approve é necessário para depositar o valor na chain da Polygon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
