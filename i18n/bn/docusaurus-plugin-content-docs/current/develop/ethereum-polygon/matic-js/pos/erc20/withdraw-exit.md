---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'withdrawStart থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসা।'
---

`withdrawStart`পদ্ধতি থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসতে `withdrawExit` পদ্ধতি ব্যবহার করা যেতে পারে।

**দ্রষ্টব্য**- উইথড্র থেকে বেরিয়ে আসার জন্য withdrawStart লেনদেনটি অবশ্যই চেকপয়েন্ট করতে হবে।

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


প্রমাণ তৈরি করতে এবং বেরিয়ে আসার প্রক্রিয়া চালাতে এই পদ্ধতিটি একাধিক RPC কল করে। তাই withdrawExitFaster পদ্ধতি ব্যবহার করার পরামর্শ দেওয়া হয়।
>

