---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Approva i token coniabili ERC1155.'
---

# approveAllForMintable {#approveallformintable}

Il metodo `approveAllForMintable` può essere utilizzato per approvare tutti i token coniabili sul token root.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
