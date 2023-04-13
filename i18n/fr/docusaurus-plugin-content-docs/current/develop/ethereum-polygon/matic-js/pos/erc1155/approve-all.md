---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'Approuvez les jetons ERC1155.'
---

# approveAll {#approveall}

`approveAll` la méthode peut être utilisée pour approuver tous les jetons sur les jetons root.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
