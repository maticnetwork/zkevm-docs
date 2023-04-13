---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: '`withdrawStart` से txHash का इस्तेमाल करते हुए निकासी की प्रक्रिया से बाहर निकलें'
---

`withdrawExitFaster` मेथड को `withdrawStart`मेथड से txHash का इस्तेमाल करके निकासी की प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.


यह इसलिए तेज़ होता है क्योंकि यह बैकएंड में सबूत जनरेट करता है. आपको [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) को कॉन्फ़िगर करना होगा.

**नोट**- निकासी से बाहर निकलने के लिए withdrawStart ट्रांज़ैक्शन को चेकपॉइंट करना होगा.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
