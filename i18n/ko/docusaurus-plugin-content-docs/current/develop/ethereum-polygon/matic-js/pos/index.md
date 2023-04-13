---
id: index
title: 'POSClient'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient를 사용하면 PoS 브리지와 상호작용할 수 있습니다.'
---

`maticjs`는 **PoS** 브리지와 상호작용할 수 있는 `POSClient`를 제공합니다.

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

`POSClient`가 시작되면 사용 가능한 모든 API와 상호작용할 수 있습니다.
