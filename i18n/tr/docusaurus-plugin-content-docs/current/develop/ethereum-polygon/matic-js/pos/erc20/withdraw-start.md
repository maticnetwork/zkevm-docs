---
id: withdraw-start
title: withdraw start
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Fon çekme işlemini başlatır.'
---

`withdrawStart` metodu, polygon zinciri üzerinde belirlenen miktarı yakacak olan fon çekme işlemini başlatmak için kullanılabilir.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Alınan işlem hash'i, fon çekme işleminden çıkmak için kullanılacaktır. Bu nedenle, kaydedilmesini tavsiye ederiz.

