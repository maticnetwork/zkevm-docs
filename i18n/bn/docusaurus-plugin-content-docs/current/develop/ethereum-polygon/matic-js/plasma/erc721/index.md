---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'কোনো ERC721 টোকেনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি `ERC721` পদ্ধতি প্রদান করে।'
---

# ERC721 {#erc721}

`plasmaClient` আপনাকে `erc721` পদ্ধতি প্রদান করে যা কোনো ERC721 টোকেনের সাথে ইন্টারঅ্যাক্ট করতে আপনাকে সহায়তা করে।

পদ্ধতিটি একটি অবজেক্ট হাজির করে যার বিভিন্ন পদ্ধতি রয়েছে।

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## চাইল্ড টোকেন {#child-token}

এই সিনট্যাক্স ব্যবহার করে Polygon-এ টোকেন শুরু করা যেতে পারে -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## প্যারেন্ট টোকেন {#parent-token}

দ্বিতীয় প্যারামিটারের মান `true` প্রদান করার মাধ্যমে Ethereum-এ টোকেন শুরু করা যেতে পারে।

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
