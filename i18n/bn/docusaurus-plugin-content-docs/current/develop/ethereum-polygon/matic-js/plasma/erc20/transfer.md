---
id: transfer
title: transfer
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'erc20 প্লাজমা টোকেন ট্রান্সফার করে।'
---

একটি ঠিকানা থেকে অন্য কোনো ঠিকানায় ট্রান্সফার করতে `transfer`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## MATIC টোকেন ট্রান্সফার করে {#transfer-matic-token}

Polygon-এ MATIC টোকেন হলো ন্যাটিভ টোকেন। তাই আমরা কোনো টোকেন ঠিকানা ছাড়াই MATIC টোকেন ট্রান্সফারকে সাপোর্ট করি।

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
