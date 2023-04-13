---
id: index
title: 'POSClient'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient позволяет взаимодействовать с мостом POS.'
---

`maticjs` предоставляет `POSClient` для взаимодействия с мостом **POS**.

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

После инициации `POSClient` вы сможете взаимодействовать со всеми доступными API.
