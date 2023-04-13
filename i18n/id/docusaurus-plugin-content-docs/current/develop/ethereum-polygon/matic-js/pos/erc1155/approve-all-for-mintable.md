---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Menyetujui token ERC1155 yang dapat dicetak.'
---

# approveAllForMintable {#approveallformintable}

Metode `approveAllForMintable` dapat digunakan untuk menyetujui semua token yang dapat dicetak (mintable) di token root.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
