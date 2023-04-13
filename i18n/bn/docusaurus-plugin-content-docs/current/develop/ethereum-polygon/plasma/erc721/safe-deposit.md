---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# safeDeposit {#safedeposit}

Ethereum থেকে Polygon চেইনে কোনো টোকেন জমা করার জন্য `safeDeposit`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
