---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: '`withdrawStartMany` से txHash का उपयोग करके निकासी प्रक्रिया से बाहर निकलें.'
---

`withdrawExitFasterMany`तरीके को txHash का इस्तेमाल कर `withdrawStartMany`तरीके से निकालने की प्रक्रिया से बाहर निकलने के लिए इस्तेमाल किया जा सकता है.


यह इसलिए तेज़ होता है क्योंकि यह बैकएंड में सबूत जनरेट करता है. आपको [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) को कॉन्फ़िगर करना होगा.

**नोट**- निकासी से बाहर निकलने के लिए withdrawStart ट्रांज़ैक्शन को चेकपॉइंट करना होगा.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
