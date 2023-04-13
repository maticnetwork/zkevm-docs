---
id: withdraw-start
title: withdraw start
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া শুরু করে।'
---

উইথড্র প্রক্রিয়া শুরু করার জন্য `withdrawStart`পদ্ধতি ব্যবহার করা যেতে পারে, যেখানে চাইল্ড টোকেনে নির্দিষ্ট পরিমাণ বার্ন করবে।

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

txHash স্টোর করে যা পরবর্তীতে উইথড্র প্রক্রিয়াকে চ্যালেঞ্জ করতে ব্যবহার করা হবে।
