---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'plasma client, erc721, withdrawExitMany, polygon, sdk'
description: 'निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawExitMany` तरीके का उपयोग सभी टोकन को मंज़ूर करने के लिए किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
