---
id: withdraw-exit
title: निकालने से बाहर निकलें
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# निकालने से बाहर निकलें {#withdrawexit}

`withdrawExit` तरीका चुनौती अवधि पूरी होने के बाद निकालने के प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
