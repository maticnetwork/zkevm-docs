---
id: withdraw-exit-faster
title: निकालने से और तेज़ी से बाहर निकलें
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'txHash का इस्तेमाल कर withdrawStart से निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawExitFaster` तरीके को txHash का इस्तेमाल कर `withdrawStart`तरीके से निकालने की प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.

यह इसलिए तेज़ होता है क्योंकि यह बैकएंड में सबूत जनरेट करता है. आपको [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) को कॉन्फ़िगर करना होगा.

**नोट**- निकासी से बाहर निकलने के लिए withdrawStart ट्रांज़ैक्शन को चेकपॉइंट करना होगा.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
