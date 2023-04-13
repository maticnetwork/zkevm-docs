---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'L''approbation du montant maximum sur le jeton root.'
---

`approveMax`la méthode  peut être utilisée pour approuver le montant maximum sur le jeton root.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```