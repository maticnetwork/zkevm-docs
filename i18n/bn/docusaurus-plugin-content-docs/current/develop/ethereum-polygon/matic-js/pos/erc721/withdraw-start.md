---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া শুরু করে।'
---

`withdrawStart` পদ্ধতি ব্যবহার করা যেতে পারে উইথড্র প্রক্রিয়া শুরু করার জন্য, যেখানে Polygon চেইনে সুনির্দিষ্ট টোকেন বার্ন করবে।

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
