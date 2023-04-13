---
id: approve-all
title: सभी स्वीकृत करें
keywords:
- 'pos client, erc721, approveAll, polygon, sdk'
description: 'सभी टोकन स्वीकृत करें.'
---

`approveAll`तरीके का उपयोग सभी टोकन को स्वीकृत करने के लिए किया जा सकता है.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
