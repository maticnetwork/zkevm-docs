---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: '''withdrawStartMany'' থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসে'
---

`withdrawStartMany`পদ্ধতি থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসতে `withdrawExitMany`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
