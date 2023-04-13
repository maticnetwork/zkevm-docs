---
id: withdraw-exit
title: निकालने के प्रोसेस से बाहर निकलें
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawExit` तरीका चुनौती अवधि पूरी होने के बाद निकालने की प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
