---
id: approve
title: स्वीकृत करें
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'रुट टोकन पर ज़रूरी रकम स्वीकृत करें'
---

रुट टोकन पर ज़रूरी रकम स्वीकृत करने के लिए`approve` तरीका इस्तेमाल किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
