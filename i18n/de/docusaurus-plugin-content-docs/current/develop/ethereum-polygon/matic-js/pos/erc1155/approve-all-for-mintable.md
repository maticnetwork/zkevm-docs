---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'ERC1155 mintable Token freigeben.'
---

# approveAllForMintable {#approveallformintable}

`approveAllForMintable`Methode kann verwendet werden, um alle mintable Token auf Root-Token freizugeben.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
