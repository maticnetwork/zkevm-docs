---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসে।'
---

প্লাজমায় `withdrawExit`পদ্ধতি ব্যবহার করে যে কেউ উইথড্র প্রক্রিয়া থেকে বেরিয়ে যেতে পারে। চ্যালেঞ্জের সময়কাল সম্পন্ন হওয়ার পরেই বেরিয়ে আসার প্রক্রিয়া কাজ করবে।

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

আপনি অ্যারেতে টোকেনের তালিকা প্রদান করার মাধ্যমে একাধিক টোকেন থেকে বের হতে পারেন।
