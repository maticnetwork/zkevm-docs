---
id: withdraw-exit
title: निकालने से बाहर निकलें
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'विथड्रॉ स्टार्ट के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawStart` तरीके के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलने के लिए `withdrawExit`तरीके का इस्तेमाल किया जा सकता है.

**नोट**- निकालने से बाहर निकलने के लिए विथड्रॉ स्टार्ट ट्रांज़ैक्शन को चेकपॉइएन्ट करना होगा.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


ये तरीका सबूत जनरेट करने और बाहर निकलने की प्रक्रिया के लिए कई RPC कॉल करता है. इसलिए, withdrawExitFaster तरीके का इस्तेमाल करने का सुझाव दिया जाता है.
>

