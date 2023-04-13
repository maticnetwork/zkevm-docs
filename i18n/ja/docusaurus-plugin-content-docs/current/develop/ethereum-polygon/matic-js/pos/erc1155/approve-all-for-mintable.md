---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'ERC1155ミント可能なトークンを承認します。'
---

# approveAllForMintable {#approveallformintable}

`approveAllForMintable`メソッドは、ルートトークン上のすべてのミント可能なトークンを承認するために使用できます。

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
