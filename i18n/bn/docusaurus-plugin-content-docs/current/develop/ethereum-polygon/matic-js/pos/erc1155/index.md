---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'matic.js ব্যবহার করে ERC1155 টোকেনের সাথে ইন্টারঅ্যাক্ট করুন।'
---

# ERC1155 {#erc1155}

আপনাকে `POSClient` `erc1155` পদ্ধতি প্রদান করে যা কোনো ERC1155 টোকেনের সাথে ইন্টারঅ্যাক্ট করতে  আপনাকে সহায়তা করে।

পদ্ধতিটি **ERC1155** ক্লাসের দৃষ্টান্ত হাজির করে যার বিভিন্ন পদ্ধতি রয়েছে।

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

`isRoot`-এর জন্য দ্বিতীয় আর্গুমেন্ট পাস করা ঐচ্ছিক।

## চাইল্ড টোকেন {#child-token}

এই সিনট্যাক্স ব্যবহার করে Polygon-এ টোকেন শুরু করা যেতে পারে -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## প্যারেন্ট টোকেন {#parent-token}

দ্বিতীয় প্যারামিটারের মান `true` প্রদান করার মাধ্যমে Ethereum-এ টোকেন শুরু করা যেতে পারে।

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
