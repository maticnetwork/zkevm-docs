---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient를 사용하면 PoS 브리지와 상호작용할 수 있습니다.'
---

# 플라스마 브리지 {#plasma-bridge}

플라스마 브리지 기능은 [별도의 저장소](https://github.com/maticnetwork/maticjs-plasma)에서 사용 가능합니다. `plasma` 브리지를 사용하기 위해서는 별도의 패키지를 설치해야 합니다.

## 설치 {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## 설정 {#setup}

`PlasmaClient`를 사용해 **플라스마** 브리지와 상호작용할 수 있습니다.

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

`plasmaClient`가 시작되면 사용 가능한 모든 API와 상호작용할 수 있습니다.
