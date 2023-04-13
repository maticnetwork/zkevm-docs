---
id: approve
title: approuvez
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: 'Approuvez le montant requis sur le jeton root.'
---

`approve`La méthode  peut être utilisée pour approuver le montant requis sur le jeton root.

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
