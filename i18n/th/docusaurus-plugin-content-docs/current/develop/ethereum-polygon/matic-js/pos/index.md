---
id: index
title: POSClient
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient ช่วยให้คุณสามารถโต้ตอบกับบริดจ์ POS ได้'
---

`maticjs` ให้ `POSClient` ในการโต้ตอบกับบริดจ์ **POS**

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

เมื่อเริ่มต้น `POSClient`แล้ว คุณสามารถโต้ตอบกับ APIS ที่มีอยู่ทั้งหมดได้
