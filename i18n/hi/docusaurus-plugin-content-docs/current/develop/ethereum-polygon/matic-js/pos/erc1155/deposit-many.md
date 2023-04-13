---
id: deposit-many
title: कई डिपॉज़िट करें
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'matic.js का इस्तेमाल करते हुए कई erc1155 टोकन डिपॉज़िट करना'
---

`depositMany` तरीका एथेरेयम से पॉलीगॉन चेन में कई टोकन की ज़रूरी मात्रा डिपॉज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

**डेटा** देना ऑप्शनल है.