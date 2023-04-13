---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'withdrawStart থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসা।'
---

`withdrawStart`পদ্ধতি থেকে txHash ব্যবহার করে উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসতে `withdrawExitFaster`পদ্ধতি ব্যবহার করা যেতে পারে।

এটি দ্রুত কারণ এটি ব্যাকএন্ডে প্রমাণ তৈরি করে। আপনাকে [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) কনফিগার করতে হবে।

**দ্রষ্টব্য**- উইথড্র থেকে বেরিয়ে আসার জন্য withdrawStart লেনদেনটি অবশ্যই চেকপয়েন্ট করতে হবে।

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
