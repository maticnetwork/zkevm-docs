---
id: deposit
title: डिपाज़िट करें
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'matic.js का इस्तेमाल करके erc1155 टोकन डिपाज़िट करें'
---

`deposit` तरीके का एथेरेयम से पॉलीगॉन चेन में टोकन की आश्यक मात्रा डिपॉज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

**डेटा** देना ऑप्शनल है.