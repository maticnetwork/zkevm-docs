---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# approve {#approve}

Il metodo `approve` può essere utilizzato per approvare l'importo richiesto sul token root.

approve è necessario per depositare l'importo sulla catena di Polygon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
