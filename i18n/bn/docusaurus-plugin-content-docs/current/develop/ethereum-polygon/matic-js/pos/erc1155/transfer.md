---
id: transfer
title: transfer
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'একজন ব্যবহারকারী থেকে অন্য কোনো ব্যবহারকারীর কাছে টোকেন ট্রান্সফার করে।'
---

একজন ব্যবহারকারী থেকে অন্য কোনো ব্যবহারকারীর কাছে টোকেন ট্রান্সফার করতে `transfer`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.transfer({
    tokenId: <tokenId>,
    amount: <amount>,
    from : <from address>,
    to : <to address>,
    data : <data to sent>, // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
