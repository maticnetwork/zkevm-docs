---
id: deposit
title: डिपाज़िट करें
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'रूट टोकन से चाइल्ड टोकन तक आवश्यक राशि डिपाज़िट करें.'
---

`deposit` तरीका रूट टोकन से चाइल्ड टोकन में ज़रूरी मात्रा डिपाज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

जमा की गई राशि को पॉलीगॉन चेन पर प्रतिबिंबित करने में कुछ समय लग सकता है. आप स्थिति की जाँच के लिए [जमा](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) पद्धति का उपयोग कर सकते हैं.
