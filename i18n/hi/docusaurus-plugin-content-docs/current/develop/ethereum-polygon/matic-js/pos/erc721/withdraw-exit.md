---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: '`withdrawStart` से txHash का इस्तेमाल करते हुए निकासी की प्रक्रिया से बाहर निकलें'
---

`withdrawExit`मेथड को `withdrawStart`मेथड से txHash का इस्तेमाल करके निकासी की प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


यह मेथड सबूत जनरेट करने और बाहर निकलने की प्रक्रिया के लिए कई RPC कॉल करता है. इसलिए, withdrawExitFaster तरीके का इस्तेमाल करने का सुझाव दिया जाता है.
>
