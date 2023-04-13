---
id: approve-all
title: सभी स्वीकृत करें
keywords:
- 'plasma client, erc721, approveAll, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# मंज़ूर करें {#approve}

`approveAll`तरीके का उपयोग सभी टोकन को मंज़ूर करने के लिए किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
