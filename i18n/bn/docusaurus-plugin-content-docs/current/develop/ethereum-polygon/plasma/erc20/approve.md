---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# approve {#approve}

রুট টোকেনে প্রয়োজনীয় পরিমাণ অনুমোদনের জন্য `approve`পদ্ধতি ব্যবহার করা যেতে পারে।

Polygon চেইনে অর্থ জমা করার জন্য অনুমোদন প্রয়োজন।

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
