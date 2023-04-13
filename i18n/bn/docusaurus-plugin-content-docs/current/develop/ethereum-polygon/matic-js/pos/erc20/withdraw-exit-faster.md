---
id: withdraw-exit-faster
title: উইথড্র থেকে দ্রুত বের হওয়া
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'WithdrawStart থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে দ্রুত বেরিয়ে আসুন।'
---

`withdrawStart`পদ্ধতি থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে দ্রুত বেরিয়ে আসতে `withdrawExitFaster` পদ্ধতি ব্যবহার করা যেতে পারে।

এটি সাধারণত দ্রুতগতির, কারণ এটি ব্যাকএন্ডে প্রমাণ তৈরি করে। আপনাকে [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) কনফিগার করতে হবে।

**দ্রষ্টব্য**- উইথড্র থেকে বের হওয়ার জন্য withdrawStart লেনদেনটি অবশ্যই চেকপয়েন্ট করতে হবে।

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

লেনদেন এবং চেকপয়েন্ট সম্পন্ন হলে, রুট চেইনে সংশ্লিষ্ট পরিমাণটি জমা হবে।
