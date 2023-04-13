---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'রুট টোকেনে সর্বোচ্চ পরিমাণ অনুমোদন করে।'
---

রুট টোকেনে সর্বোচ্চ পরিমাণ অনুমোদন করার জন্য `approveMax` পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

যে ঠিকানার জন্য অনুমোদন দেওয়া হয় তাকে বলে `spenderAddress`। আপনার পক্ষে কোনো তৃতীয়-পক্ষীয় ব্যবহারকারী বা স্মার্ট চুক্তি আপনার টোকেন ট্রান্সফার করতে পারবে।

ডিফল্ট হিসেবে, spenderAddress মান হলো ERC20 প্রেডিকেট ঠিকানা।

আপনি ম্যানুয়ালি স্পেন্ডার অ্যাড্রেসের মান নির্দিষ্ট করতে পারেন।

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
