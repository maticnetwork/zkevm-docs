---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# withdrawStart {#withdrawstart}

`withdrawStart` পদ্ধতি ব্যবহার করা যেতে পারে উইথড্র প্রক্রিয়া শুরু করার জন্য, যেখানে Polygon চেইনে নির্দিষ্ট টোকেন বার্ন করবে।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
