---
id: index
title: POSClient
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient cho phép bạn tương tác với Cầu nối POS.'
---

`maticjs` cung cấp `POSClient` để tương tác với Cầu nối **POS** .

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

Sau khi bắt đầu `POSClient`, bạn có thể tương tác với tất cả APIS hiện có.
