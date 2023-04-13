---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'মিন্টযোগ্য ERC1155 টোকেন অনুমোদন করে।'
---

# approveAllForMintable {#approveallformintable}

রুট টোকেনে সকল মিন্টযোগ্য টোকেন অনুমোদন করার জন্য `approveAllForMintable`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
