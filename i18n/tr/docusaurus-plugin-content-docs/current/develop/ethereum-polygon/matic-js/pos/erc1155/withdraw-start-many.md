---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Fon çekme işlemini başlatır.'
---

`withdrawStartMany` metodu, polygon zinciri üzerinde birden fazla token'ı belirlenen miktarlarda sırasıyla yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
