---
id: index
title: 'POSClient'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClientにより、PoSブリッジとやり取りできます。'
---

`maticjs`は、**PoS**ブリッジとやり取りするために`POSClient`を提供します。

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

`POSClient`が開始されると、利用可能なすべてのAPIとやり取りできます。
