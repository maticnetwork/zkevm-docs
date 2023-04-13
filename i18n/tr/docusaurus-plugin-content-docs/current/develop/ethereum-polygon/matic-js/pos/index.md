---
id: index
title: POSClient
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient, POS Köprüsü ile etkileşime girmenize izin verir.'
---

`maticjs`, **POS** Köprüsü ile etkileşim için `POSClient` sağlar.

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

`POSClient` başlatıldıktan sonra mevcut tüm API'ler ile etkileşime girebilirsiniz.
