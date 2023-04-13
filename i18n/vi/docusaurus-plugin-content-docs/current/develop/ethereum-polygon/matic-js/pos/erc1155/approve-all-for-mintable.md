---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Phê duyệt các token ERC1155 có thể tạo.'
---

# approveAllForMintable {#approveallformintable}

Có thể sử dụng phương pháp `approveAllForMintable` để phê duyệt tất cả token có thể tạo trên token gốc.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
