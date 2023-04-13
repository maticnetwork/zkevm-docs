---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# approve {#approve}

রুট টোকেনে প্রয়োজনীয় পরিমাণ অনুমোদনের জন্য `approve`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
