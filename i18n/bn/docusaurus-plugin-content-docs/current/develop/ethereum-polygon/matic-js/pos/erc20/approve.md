---
id: approve
title: অনুমোদন
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "রুট টোকেনে প্রয়োজনীয় পরিমাণ অনুমোদন করে।"
---

`approve` পদ্ধতিটি রুট টোকেনে প্রয়োজনীয় পরিমাণ অনুমোদনের ক্ষেত্রে ব্যবহার করা যেতে পারে।

Polygon চেইনে অর্থ জমা করার জন্য অনুমোদন প্রয়োজন।

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

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
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
