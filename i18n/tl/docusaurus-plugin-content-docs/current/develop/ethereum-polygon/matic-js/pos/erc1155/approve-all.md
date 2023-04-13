---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'Aprubahan ang mga ERC1155 token.'
---

# approveAll {#approveall}

Maaaring gamitin ang paraang `approveAll` upang aprubahan ang lahat ng token sa root token.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
