---
id: deposit
title: डिपाज़िट करें
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'maticjs से शुरूआत करें'
---

# डिपाज़िट करें {#deposit}

`deposit` तरीका रूट टोकन से चाइल्ड टोकन में ज़रूरी मात्रा डिपाज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
