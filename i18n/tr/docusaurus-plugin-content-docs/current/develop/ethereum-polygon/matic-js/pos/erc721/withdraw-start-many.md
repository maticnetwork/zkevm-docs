---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'Fon çekme işlemini başlatır.'
---

`withdrawStartMany` metodu, polygon zinciri üzerinde birden fazla token yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
