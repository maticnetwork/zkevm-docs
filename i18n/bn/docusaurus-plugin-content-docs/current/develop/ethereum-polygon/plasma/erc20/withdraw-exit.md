---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# withdrawExit {#withdrawexit}

`withdrawExit` পদ্ধতি চ্যালেঞ্জের সময়কাল সম্পন্ন হওয়ার পর উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসার জন্য ব্যবহার করা যেতে পারে।

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
