---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: '`withdrawStartMany`den gelen txHash''i kullanarak fon çekme işleminden çıkar'
---

`withdrawExitMany` metodu, `withdrawStartMany` metodundan gelen txHash'i kullanarak fon çekme işleminden çıkmak için kullanılabilir.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
