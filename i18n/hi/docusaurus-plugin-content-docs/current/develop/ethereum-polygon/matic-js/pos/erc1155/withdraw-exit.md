---
id: withdraw-exit
title: निकालने से बाहर निकलें
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'विथड्रॉ स्टार्ट के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawStart` तरीके के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलने के लिए `withdrawExit`तरीके का इस्तेमाल किया जा सकता है.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
