---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া শুরু করে।'
---

উইথড্র প্রক্রিয়া শুরু করতে `withdrawStart`পদ্ধতি ব্যবহার করা যেতে পারে যা Polygon চেইনে নির্দিষ্ট পরিমাণ tokenId বার্ন করবে।

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
