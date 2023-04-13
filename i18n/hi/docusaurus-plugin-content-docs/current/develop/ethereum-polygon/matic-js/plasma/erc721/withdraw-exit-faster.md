---
id: withdraw-exit-faster
title: तेज़ी से विथड्रॉ करें
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'निकालने की प्रक्रिया से बाहर निकलें.'
---

`withdrawExitFaster` तरीके का इस्तेमाल सभी टोकन को मंज़ूर करने के लिए किया जा सकता है.

यह इसलिए तेज़ होता है क्योंकि यह बैकएंड में सबूत जनरेट करता है. बैकएंड को, समर्पित निजी rpc के साथ कॉन्फ़िगर किया जा सकता है.

**नोट**- निकासी से बाहर निकलने के लिए withdrawStart ट्रांज़ैक्शन को चेकपॉइंट करना होगा.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
