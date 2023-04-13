---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Meta veriler ile fon çekme işlemini başlatır.'
---

`withdrawStartWithMetaData` metodu, polygon zinciri üzerinde belirlenen token'ı yakacak olan fon çekme işlemini başlatmak için kullanılabilir. Arka planda, token sözleşmesi üzerinde `withdrawWithMetadata` metodunu çağırır.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
