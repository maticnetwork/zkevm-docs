---
id: approve
title: मंज़ूर करें
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'maticjs से शुरूआत करें'
---

# मंज़ूर करें {#approve}

रुट टोकन पर ज़रूरी रकम मंज़ूर करने के लिए `approve`तरीका इस्तेमाल किया जा सकता है.

पॉलीगॉन चेन पर राशि डिपाज़िट करने के लिए अनुमोदन आवश्यक है.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
