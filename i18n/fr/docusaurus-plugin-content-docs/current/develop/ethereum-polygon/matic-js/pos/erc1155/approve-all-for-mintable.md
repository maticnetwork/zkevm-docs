---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Approuvez les jetons monétisés ERC1155.'
---

# approveAllForMintable {#approveallformintable}

`approveAllForMintable` la méthode peut être utilisée pour approuver tous les jetons monétisés sur les jetons root.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
