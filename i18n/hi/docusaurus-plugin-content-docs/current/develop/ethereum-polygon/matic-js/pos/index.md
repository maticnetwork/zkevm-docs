---
id: index
title: 'पॉस क्लाइंट'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'पॉस क्लाइंट आपको पॉस ब्रिज से इंटरैक्ट करने देता है.'
---

`maticjs` **पॉस** ब्रिज से इंटरैक्ट करने के लिए `POSClient` देता है.

```
import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient();

await posClient.init({
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

एक बार `POSClient` के शुरू होने पर, आप सभी उपलब्ध APIS से इंटरैक्ट कर सकते हैं.
