---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'Утвердите токены ERC1155.'
---

# approveAll {#approveall}

Метод `approveAll` можно использовать для утверждения всех токенов на корневом токене.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
