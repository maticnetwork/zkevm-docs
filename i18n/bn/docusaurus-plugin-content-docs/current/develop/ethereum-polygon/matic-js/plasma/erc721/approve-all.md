---
id: approve-all
title: approveAll
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'সবগুলো টোকেন অনুমোদন করুন।'
---

সবগুলো টোকেন অনুমোদন করতে `approveAll`পদ্ধতি ব্যবহার করা যাবে।

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
