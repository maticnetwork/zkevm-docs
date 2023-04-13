---
id: index
title: 'POSClient'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient memungkinkan Anda untuk berinteraksi dengan Jembatan POS.'
---

`maticjs` menyediakan `POSClient` untuk berinteraksi dengan Jembatan **POS**.

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

Setelah `POSClient` diinisiasi, Anda dapat berinteraksi dengan semua API yang tersedia.
