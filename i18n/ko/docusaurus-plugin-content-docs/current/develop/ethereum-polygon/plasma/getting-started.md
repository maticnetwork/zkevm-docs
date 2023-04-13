---
id: getting-started
title: 플라스마 브리지
sidebar_label: Introduction
description: 플라스마 브리지 및 Polygon 네트워크와 상호작용
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

시작하려면 [플라스마에 대한 최신 Matic.js 문서](https://maticnetwork.github.io/matic.js/docs/plasma/)를 확인하세요.

브리지는 기본적으로 루트 체인에서 하위 체인으로 자산을 이동하도록 돕는 일련의 계약입니다. 이더리움과 Polygon 사이에 자산을 이동하는 두 개의 주요 브리지가 있습니다. 첫째는 플라스마 브리지 그리고 두 번째는 **PoS 브리지** 또는 **지분증명 브리지**입니다. **Plasma 브리지는** Plasma 출구 메커니즘으로 인해 증가 된 보안 보증을 제공합니다.

하지만 하위 토큰은 특정 제한 사항이 있으며, 플라스마 브리지에는 Polygon에서 이더리움으로의 모든 종료/출금과 관련한 7일간의 출금 기간이 있습니다. [PoS 브리지는](/docs/develop/ethereum-polygon/pos/getting-started) 높은 유연성과 빠른 출금이라는 장점이 있습니다.

이 튜토리얼에서는 Polygon [네트워크에서](https://github.com/maticnetwork/matic.js) Plasma 브리지와 상호 작용할 수 있는 가장 쉬운 방법입니다.

## 플라스마 브리지 자산 흐름 {#assets-flow-in-plasma-bridge}

이 튜토리얼에서는 Polygon의 자산 이전 흐름을 살펴보고 Matic.js를 사용해 동일한 작업을 수행하는 방법을 설명합니다.

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Polygon 계약의 사용자 예금 자산 주요 체인에 대한 암호 계약에서 사용자 예금
2. 일단 기탁 토큰이 주 체인에서 확인되면, 해당 토큰은 Polygon 체인에 반영될 것입니다.
   - 사용자는 이제 소정의 비용으로 원하는 누구에게나 즉시 토큰을 이전할 수 있습니다. Polygon 체인은 더 빠른 블록(약 1초)을 가지고 있습니다. 이를 통해 이전 작업이 거의 즉시 이루어집니다.
3. 사용자가 준비되면 메인 체인에서 남은 토큰을 철회할 수 있습니다. 자금 출금은 플라스마 사이드체인에서 시작됩니다. 체크포인트 간격 5분이 설정되며, Polygon 블록 레이어에 있는 모든 블록이 마지막 체크포인트 이후부터 검증됩니다.
4. 검문소가 메인 체인 이더리움 계약에 제출되면 Exit NFT (ERC721) 토큰을 동일한 값으로 생성합니다.
5. 철회 된 기금은 Process-출구 절차를 사용하여 메인 체인 계약에서 이더리움 account로 다시 청구 될 수 있습니다.
   - 사용자는 0x 또는 Dharma를 통해 '빠르게 종료'할 수도 있습니다(예정).

### 기본 요건 {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

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

### Görli Faucet {#görli-faucet}

튜토리얼을 따르는 동안 트랜잭션 진행을 위해 사용할 테스트 계정에도 이더가 조금 필요할 것입니다. Görli에 Eth가 없는 경우 https://goerli-faucet.slock/에서 주어진 faucet 링크를 사용할 수 있습니다.

### Polygon Faucet {#polygon-faucet}

튜토리얼 전반에 걸쳐 Görli 네트워크의 ERC20 토큰 `TEST`를 예시로 사용할 것입니다. 이것은 테스트 토큰입니다. dApp에서 ERC20 토큰으로 대체할 수 있습니다. Polygon 네트워크에서 테스트 `TEST` 토큰을 얻기 위해 [Polygon Faucet](https://faucet.polygon.technology/)을 이용할 수 있습니다.

:::note

예금 및 인출에 대한 자체 토큰을 사용하려면 토큰을 '매핑'해야 하며, 이는 본질적으로 사용자 정의 토큰의 주요 체인과 sidechain 'aware'에서 계약을 만드는 것을 의미합니다.

:::

### 메타마스크 지갑 기본 설정(선택 사항) {#basic-setup-for-the-metamask-wallet-optional}

1. [지갑을](/docs/develop/metamask/hello) 만듭니다. 지갑에 새로운 경우 메타마스크 계정을 설정합니다.
2. [Polygon 테스트넷 설정](/docs/develop/metamask/config-polygon-on-metamask): Polygon에서 자금의 흐름을 쉽게 쉽게 시각적으로 보려면 메타마스크에서 Polygon 테스트넷을 구성하는 경우 유익합니다. 메타마스크는 시각화 목적으로만 사용하는 것입니다. Polygon 사용을 위해 메타마스크를 사용할 필요는 전혀 없습니다.
3. [여러 계정 생성](/docs/develop/metamask/multiple-accounts): 튜토리얼을 시작하기 전에 이더리움 테스트 계정 3개를 준비하세요.
4. [Polygon에서 토큰 구성](/docs/develop/metamask/custom-tokens): Matic.js를 사용해 Polygon에서 자금 흐름을 쉽게 보기 위해 메타마스크에서 토큰을 구성할 수 있습니다.
이 튜토리얼의 예로 가져온 `TEST`토큰은 메타마스크에서 구성할 수 있으므로 잔액을 쉽게 그릴 수 있습니다. 다시 한 번 주의하면 **선택 사항입니다**. [웹3.js를](https://web3js.readthedocs.io/en/1.0/) 사용하여 토큰의 잔액 및 기타 변수를 매우 쉽게 쿼리 할 수 있습니다.
