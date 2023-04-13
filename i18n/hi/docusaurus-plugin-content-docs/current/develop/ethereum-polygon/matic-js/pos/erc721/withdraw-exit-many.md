---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: '`withdrawStartMany` से txHash का इस्तेमाल करके निकासी की प्रक्रिया से बाहर निकलें'
---

`withdrawExitMany`मेथड को `withdrawStartMany`मेथड से txHash का इस्तेमाल करके निकासी की प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
