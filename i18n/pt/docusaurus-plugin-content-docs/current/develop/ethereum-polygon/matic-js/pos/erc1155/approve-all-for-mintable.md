---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Aprovar tokens mintable ERC-1155.'
---

# approveAllForMintable {#approveallformintable}

O método `approveAllForMintable` pode ser usado para aprovar todos os tokens mintable no token ROOT.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
