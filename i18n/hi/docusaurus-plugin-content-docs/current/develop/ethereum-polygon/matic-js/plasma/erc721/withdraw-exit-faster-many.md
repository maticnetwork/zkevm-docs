---
id: withdraw-exit-faster-many
title: शीघ्र बाहर निकालें बहुत से
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

`withdrawExitFasterMany`तरीके का उपयोग सभी टोकन को मंज़ूर करने के लिए किया जा सकता है.

यह इसलिए तेज़ होता है क्योंकि यह बैकएंड में सबूत जनरेट करता है. बैकएंड को, समर्पित निजी rpc के साथ कॉन्फ़िगर किया जा सकता है.

**नोट**- निकासी से बाहर निकलने के लिए withdrawStart ट्रांज़ैक्शन को चेकपॉइंट करना होगा.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
