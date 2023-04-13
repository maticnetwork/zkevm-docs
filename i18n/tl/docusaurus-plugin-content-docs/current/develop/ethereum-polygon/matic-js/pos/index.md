---
id: index
title: POSClient
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'Pinapayagan ka ng POSClient na makipag-interaksyon sa POS Bridge.'
---

Ibinibigay ng `maticjs` ang `POSClient` upang makipag-interaksyon sa **POS** Bridge.

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

Sa sandaling pasimulan ang `POSClient`, maaari kang makipag-interaksyon sa lahat ng magagamit na API.
