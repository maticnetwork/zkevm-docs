---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Fon çekme işlemini başlatır.'
---

`withdrawStart` metodu, polygon zinciri üzerinde belirlenen miktarda tokenId yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
