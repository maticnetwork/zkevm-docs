---
id: deposit
title: deposit
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# deposit {#deposit}

রুট টোকেন থেকে চাইল্ড টোকেনে প্রয়োজনীয় পরিমাণ জমা করার জন্য `deposit`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
