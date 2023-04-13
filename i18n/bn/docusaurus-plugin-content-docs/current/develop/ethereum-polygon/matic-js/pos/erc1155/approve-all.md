---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'ERC1155 টোকেন অনুমোদন করুন।'
---

# approveAll {#approveall}

রুট টোকেনে সবগুলো টোকেন অনুমোদন করার জন্য `approveAll`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
