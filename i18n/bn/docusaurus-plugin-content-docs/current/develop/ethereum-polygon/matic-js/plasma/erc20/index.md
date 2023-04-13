---
id: index
title: PlasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'কোনো ERC20 টোকেনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি পদ্ধতি প্রদান করে।'
---

`plasmaClient` আপনাকে `erc20` পদ্ধতি প্রদান করে যা কোনো ERC20 টোকেনের সাথে ইন্টারঅ্যাক্ট করতে ্ সহায়তা করে।

## চাইল্ড টোকেন {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## রুট টোকেন {#root-token}

দ্বিতীয় প্যারামিটারের মান `true` প্রদান করার মাধ্যমে রুট টোকেন শুরু করা যেতে পারে।

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
