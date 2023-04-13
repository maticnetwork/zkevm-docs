---
id: deposit
title: deposit
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'রুট টোকেন থেকে চাইল্ড টোকেনে জমা করার প্রয়োজনীয় পরিমাণ।'
---

রুট টোকেন থেকে চাইল্ড টোকেনে প্রয়োজনীয় পরিমাণ জমা করার জন্য `deposit`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Polygon চেইনে জমাকৃত পরিমাণ প্রদর্শিত হতে কিছুটা সময় লাগতে পারে। স্ট্যাটাস দেখার জন্য [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) পদ্ধতি ব্যবহার করতে পারেন।
