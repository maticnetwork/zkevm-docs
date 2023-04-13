---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'plasma client, erc721, withdrawExitMany, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# withdrawExitMany {#withdrawexitmany}

`withdrawExitMany`मेथड का उपयोग सभी टोकनों को मंज़ूर करने के लिए किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
