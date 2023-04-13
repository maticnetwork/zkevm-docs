---
id: getting-started
title: Matic.js 시작하기
sidebar_label: Instantiating Matic.js
description: "Matic.js를 사용하여 Polygon PoS 체인과 상호작용합니다."
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

시작하려면 최신 [Matic.js 문서](/docs/develop/ethereum-polygon/matic-js/get-started)를 확인하세요.

## 요약 {#quick-summary}

Matic.js SDK를 통해 Polygon의 모든 컴퓨팅 성능을 손쉽게 활용할 수 있습니다. 맞춤형 함수로 복잡한 작업 없이 승인과 입출금을 수행할 수 있습니다. 사용자가 플랫폼에서 즉각적인 가치를 얻을 수 있도록 이러한 함수를 엔지니어링했습니다.

## 설치 {#installation}
SDK를 통해 Polygon의 놀라운 기능을 사용하는 첫 번째 단계는 NPM으로 Polygon을 설치하는 것입니다. [여기](https://www.npmjs.com/package/@maticnetwork/maticjs)에서 확인하세요.

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## 사용량 {#usage}
SDK에 액세스하려면, 애플리케이션에서 다음을 사용하여 가져오세요.
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

공급자가 요구 사항에 따라 메타마스크 공급자, HDWalletProvider 등과 같은 RPC URL 또는 웹3 기반 공급자가 될 수 있습니다.

자세한 정보는 [PoS에 대한 Matic.js 문서](https://maticnetwork.github.io/matic.js/docs/pos/)를 참조하세요.

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
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
