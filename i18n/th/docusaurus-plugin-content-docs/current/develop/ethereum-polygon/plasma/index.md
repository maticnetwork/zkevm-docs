---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient ช่วยให้คุณสามารถโต้ตอบกับบริดจ์ POS'
---

# บริดจ์ Plasma {#plasma-bridge}

ฟังก์ชันบริดจ์ Plasma มีอยู่ใน[พื้นที่เก็บข้อมูลแยก](https://github.com/maticnetwork/maticjs-plasma)ดังนั้น เพื่อที่จะใช้บริดจ์ `plasma` คุณจำเป็นต้องติดตั้งแพ็คเกจแยกต่างหาก

## การติดตั้ง {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## การตั้งค่า {#setup}

ใช้ `PlasmaClient` เพื่อโต้ตอบกับบริดจ์ **Plasma** ได้

```
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
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

เมื่อเริ่มต้น `plasmaClient` แล้ว คุณสามารถโต้ตอบกับ APIS ที่มีอยู่ทั้งหมดได้
