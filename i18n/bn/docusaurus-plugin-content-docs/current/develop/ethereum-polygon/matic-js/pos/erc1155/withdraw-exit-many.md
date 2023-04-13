---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'withdrawStart থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসে।'
---

`withdrawStartMany`পদ্ধতি থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসতে `withdrawExitMany`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
