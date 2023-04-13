---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'प्लाज़्मा क्लाइंट आपको पॉस ब्रिज से इंटरैक्ट करने देता है.'
---

# प्लाज़्मा ब्रिज {#plasma-bridge}

प्लाज्मा ब्रिज फ़ंक्शनैलिटी [अलग रिपॉज़िटरी](https://github.com/maticnetwork/maticjs-plasma) में उपलब्ध है. तो `plasma`ब्रिज का उपयोग करने के लिए, आपको अलग पैकेज इंस्टॉल करना होगा.

## इंस्टॉल करना {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## सेटअप {#setup}

**प्लाज्मा** ब्रिज से इंटरैक्ट करने के लिए `PlasmaClient`का उपयोग किया जा सकता है.

```
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

एक बार `plasmaClient`के शुरू होने पर, आप सभी उपलब्ध APIS से इंटरैक्ट कर सकते हैं.
