---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'ERC1155 token''larını onaylar.'
---

# approveAll {#approveall}

`approveAll` metodu kök token üzerindeki tüm token'ları onaylamak için kullanılabilir.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
