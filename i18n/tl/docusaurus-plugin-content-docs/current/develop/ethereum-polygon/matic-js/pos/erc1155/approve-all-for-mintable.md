---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Aprubahan ang mga ERC1155 mintable token.'
---

# approveAllForMintable {#approveallformintable}

Maaaring gamitin ang paraang `approveAllForMintable` upang aprubahan ang lahat ng mintable token sa root token.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
