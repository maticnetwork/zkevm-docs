---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "ব্যবহারকারীর জন্য অনুমোদিত পরিমাণ নিন।"
---

ব্যবহারকারীর জন্য অনুমোদিত পরিমাণ পেতে `getAllowance` পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

যে ঠিকানার জন্য অনুমোদন দেওয়া হয় তাকে বলে `spenderAddress`। আপনার পক্ষে কোনো তৃতীয়-পক্ষীয় ব্যবহারকারী বা স্মার্ট চুক্তি আপনার টোকেন ট্রান্সফার করতে পারবে।

ডিফল্ট হিসেবে, spenderAddress মান হলো ERC20 প্রেডিকেট ঠিকানা।

আপনি ম্যানুয়ালি স্পেন্ডার অ্যাড্রেসের মান নির্দিষ্ট করতে পারেন।

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
