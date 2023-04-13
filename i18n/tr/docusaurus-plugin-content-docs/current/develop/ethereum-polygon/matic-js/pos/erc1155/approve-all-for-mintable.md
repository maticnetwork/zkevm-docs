---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'ERC1155 mint edilebilir token''ları onaylar.'
---

# approveAllForMintable {#approveallformintable}

`approveAllForMintable` metodu kök token üzerindeki mint edilebilir tüm token'ları onaylamak için kullanılabilir.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
