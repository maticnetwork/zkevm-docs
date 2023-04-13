---
id: index
title: 'POSClient'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient vous permet d''interagir avec le pont PoS.'
---

`maticjs` fournit `POSClient` pour interagir avec le Pont **POS.**

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

Une fois `POSClient`est lancé, vous pouvez interagir avec tous les APIS disponibles.
