---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'Fon çekme işlemini başlatır.'
---

`withdrawStart` metodu, polygon zinciri üzerinde belirlenen token'ı yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
