---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'withdrawStart''tan txHash kullanarak fon çekme işleminden çıkar.'
---

`withdrawExitMany` metodu, `withdrawStartMany` metodundan txHash kullanarak fon çekme işleminden çıkmak için kullanılabilir.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
