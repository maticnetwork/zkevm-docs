---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# approveMax {#approvemax}

রুট টোকেনে সর্বোচ্চ পরিমাণ অনুমোদন করার জন্য `approveMax`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
