---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'Phê duyệt các token ERC1155.'
---

# approveAll {#approveall}

Có thể sử dụng phương pháp `approveAll` để phê duyệt tất cả token trên token gốc.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
