---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "কোনো ERC20 টোকেনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি পদ্ধতি প্রদান করে।"
---

# ERC20 {#erc20}

`POSClient` আপনাকে `erc20` পদ্ধতি প্রদান করে, যা কোনো **ERC20** টোকেনের সাথে ইন্টারঅ্যাক্ট করতে আপনাকে সহায়তা করে।

পদ্ধতিটি একটি অবজেক্ট হাজির করে যার বিভিন্ন পদ্ধতি রয়েছে।

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

`isRoot`-এর জন্য দ্বিতীয় দফায় আর্গুমেন্ট করা ঐচ্ছিক বিষয়।

## চাইল্ড টোকেন {#child-token}

এই সিনট্যাক্স ব্যবহার করে Polygon-এ টোকেন শুরু করা যেতে পারে -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## প্যারেন্ট টোকেন {#parent-token}

দ্বিতীয় প্যারামিটারের মান `true` প্রদান করে Ethereum-এ টোকেন শুরু করা যেতে পারে।

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
