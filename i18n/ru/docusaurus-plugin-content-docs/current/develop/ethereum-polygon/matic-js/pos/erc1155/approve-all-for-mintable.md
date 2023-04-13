---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'Утвердите токены ERC1155 с возможностью произвольного минтинга.'
---

# approveAllForMintable {#approveallformintable}

Метод `approveAllForMintable` можно использовать для утверждения всех токенов с возможностью произвольного минтинга на корневом токене.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
