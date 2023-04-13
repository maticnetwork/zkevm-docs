---
id: web3
title: 'Web3js 설정'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Web3.js 설치와 설정'
---

# Web3.js {#web3-js}

[웹3.js는](https://web3js.readthedocs.io/) HTTP, IPC 또는 웹Socket을 사용하여 로컬 또는 원격 이더리움 노드와 상호 작용할 수 있는 라이브러리 모음입니다.

## Web3.js 설정 {#setup-web3-js}

Web3.js 지원은 Matic.js의 플러그인으로 별도의 패키지를 통해 이용 가능합니다.

### 설치 {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### 설정 {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

웹3을 사용해 `POSClient`를 생성하는 예를 살펴봅시다.

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## 예 {#examples}

다양한 사례 예시는 [웹3 플러그인 저장소](https://github.com/maticnetwork/maticjs-web3)에서 볼 수 있습니다.
