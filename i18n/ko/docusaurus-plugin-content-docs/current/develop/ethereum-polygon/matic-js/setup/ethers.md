---
id: ethers
title: '이더 설정'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Ethers.js 설치와 설정'
---

# Ether.js {#ether-js}

[Ethers.js](https://docs.ethers.io/) 라이브러리는 이더리움 블록체인 및 생태계를 위한 간단하면서도 종합적인 라이브러리를 제공하는 것을 목표로 합니다.

## Ether.js 설정 {#setup-ether-js}

Ether.js 지원은 Matic.js의 플러그인으로 별도의 패키지를 통해 이용 가능합니다.

### 설치 {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### 설정 {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

이더를 사용해 `POSClient`를 생성하는 예를 살펴봅시다.

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## 예 {#examples}

다양한 사례 예시는 [이더 플러그인 저장소](https://github.com/maticnetwork/maticjs-ethers)에서 볼 수 있습니다.
