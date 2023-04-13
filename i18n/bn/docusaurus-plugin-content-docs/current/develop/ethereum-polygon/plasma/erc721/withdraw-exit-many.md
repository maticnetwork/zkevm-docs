---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'plasma client, erc721, withdrawExitMany, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# withdrawExitMany {#withdrawexitmany}

সবগুলো টোকেন অনুমোদন করতে`withdrawExitMany` পদ্ধতি ব্যবহার করা যাবে।

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
