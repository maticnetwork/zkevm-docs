---
id: withdraw-start
title: withdraw start
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া শুরু করে।'
---

উইথড্র প্রক্রিয়া শুরু করার জন্য প`withdrawStart`দ্ধতি ব্যবহার করা যেতে পারে, যেখানে Polygon চেইনে নির্দিষ্ট পরিমাণ বার্ন করবে।

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

উইথড্র প্রক্রিয়া থেকে বেরিয়ে আসতে প্রাপ্ত লেনদেনের হ্যাশ ব্যবহার করা হবে। তাই আমরা এটি স্টোর করে রাখার পরামর্শ দিই।

