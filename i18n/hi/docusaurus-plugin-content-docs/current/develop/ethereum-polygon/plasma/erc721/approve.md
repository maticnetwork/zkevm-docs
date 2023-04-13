---
id: approve
title: मंज़ूर करें
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'maticjs से शुरूआत करें'
---

# मंज़ूर करें {#approve}

`approve`मेथड को रुट टोकन पर ज़रूरी रकम मंज़ूर करने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
