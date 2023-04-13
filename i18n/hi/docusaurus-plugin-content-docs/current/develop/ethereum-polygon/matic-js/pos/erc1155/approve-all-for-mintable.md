---
id: approve-all-for-mintable
title: AllForMintable को मंज़ूरी दें
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: 'ERC1155 मिंटटेबल टोकन को मंज़ूरी दें.'
---

# AllForMintable को मंज़ूरी दें {#approveallformintable}

`approveAllForMintable`विधि का उपयोग रूट टोकन पर सभी मिंटटेबल टोकन को मंज़ूरी देने के लिए किया जा सकता है.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
