---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'txHash का इस्तेमाल कर निकालना शुरू करें से निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawStartMany` तरीके के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलने के लिए `withdrawExitMany`तरीके का इस्तेमाल किया जा सकता है.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
