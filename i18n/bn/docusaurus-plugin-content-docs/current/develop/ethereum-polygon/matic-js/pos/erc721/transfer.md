---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'একজন ব্যবহারকারী থেকে অন্য কোনো ব্যবহারকারীর কাছে টোকেন ট্রান্সফার করে।'
---

একজন ব্যবহারকারী থেকে অন্য কোনো ব্যবহারকারীর কাছে টোকেন ট্রান্সফার করতে `transfer`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
