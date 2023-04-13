---
id: withdraw-exit-faster
title: जल्दी एक्ज़िट से निकासी करें
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'withdrawStart से txHash का उपयोग करके निकासी प्रक्रिया ले तेज़ी से एक्ज़िट करें.'
---

`withdrawExitFaster`txHash from विधि का उपयोग करके निकासी प्रक्रिया से तेजी से बाहर निकलने के लिए `withdrawStart`तरीके का उपयोग किया जा सकता है.

यह आम तौर पर तेज़ होता है क्योंकि यह बैकएंड में सबूत उत्पन्न करता है. आपको [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) को कॉन्फ़िगर करना होगा.

**नोट**- निकालने से बाहर निकलने के लिए निकालना शुरू करने की ट्रांज़ैक्शन को चेकपॉइएन्ट करना होगा.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

एक बार ट्रांज़ैक्शन पूरा हो जाने और चेकपॉइंट पूरा हो जाने के बाद, रकम रूट चेन में जमा की जाएगी.
