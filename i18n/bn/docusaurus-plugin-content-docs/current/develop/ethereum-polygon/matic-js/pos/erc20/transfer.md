---
id: transfer
title: transfer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'কোনো ঠিকানা থেকে অন্য কোনো ঠিকানায় ট্রান্সফার করে।'
---

কোনো ঠিকানা থেকে অন্য কোনো ঠিকানায় ট্রান্সফার করতে `transfer`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
