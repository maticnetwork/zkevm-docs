---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'ERC1155トークンを承認します。'
---

# approveAll {#approveall}

`approveAll`メソッドはルートトークンですべてのトークンを承認するために使用することができます。

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
