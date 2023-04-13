---
id: withdraw-exit-faster-many
title: विथड्रॉ स्टार्ट मैनी
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'विथड्रॉ स्टार्ट मैनी के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawStartMany` तरीके के txHash का इस्तेमाल करके निकालने की प्रक्रिया से बाहर निकलने के लिए `withdrawExitFasterMany`तरीके का इस्तेमाल किया जा सकता है.

यह इसलिए तेज़ होता है क्योंकि यह बैकएंड में सबूत जनरेट करता है. आपको [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) को कॉन्फ़िगर करना होगा.


**नोट**- निकासी से बाहर निकलने के लिए withdrawStart ट्रांज़ैक्शन को चेकपॉइंट करना होगा.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
