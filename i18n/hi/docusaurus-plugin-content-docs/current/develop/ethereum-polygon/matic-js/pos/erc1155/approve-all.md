---
id: approve-all
title: सभी को मंज़ूर करें
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: 'ERC1155 टोकन को मंज़ूरी दें.'
---

# सभी को मंज़ूर करें {#approveall}

रूट टोकन पर सारे टोकनों को मंज़ूर करने के लिए `approveAll` तरीके का इस्तेमाल किया जा सकता है.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
