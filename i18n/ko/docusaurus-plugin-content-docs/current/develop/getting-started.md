---
id: getting-started
title: Polygon PoS 소개
sidebar_label: Quick Start
description: Polygon에서 차세대 블록체인 앱을 빌드해 보세요.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution 개발 문서를 업데이트 중입니다.

이 문서는 업데이트 및 개선 과정 중에 있으므로 변경될 수 있습니다.
질문 또는 제안 사항이 있는 경우 언제든지 문제를 제기하거나 요청해 주시기 바랍니다.

:::

**Polygon(이전 매틱 네트워크)**에 오신 것을 환영합니다! 블록체인 애플리케이션을 개발할 수 있는 가장 혁신적이고 흥미로운 플랫폼입니다. 블록체인 기술은 디지털 세상이 데이터를 관리하고 비즈니스를 수행하는 방식에 혁명을 일으킬 수 있습니다. 남보다 앞서 Polygon의 분산형 애플리케이션(dApp) 개발에 참여하고 이 혁명의 일원이 될 수 있습니다.

이 가이드는 Polygon 생태계를 소개합니다. Polygon뿐만 아니라 일반적인 블록체인 애플리케이션 개발에서도 빌드 속도를 높이는 데 도움이 될 유용한 리소스 및 웹사이트 링크를 확인하실 수 있습니다.

:::tip 최신 소식 받기

Polygon의 최신 빌드 업데이트 소식을 받아 보세요.
업데이트 소식을 받아보려면
[<ins>Polygon 알림 그룹</ins>](https://polygon.technology/notifications/).

:::

## Polygon의 주요 특징 {#key-features-of-polygon}

- **속도 **: Polygon 네트워크는 각 체크포인트에서 이해 관계자가 선택한 블록 프로듀서 그룹이 제공하는 컨센서스가 제공하는 하이처리량 블록체인을 사용합니다. 지분증명 레이어는 블록을 검증하는 데 사용되며 주기적으로 블록 프로듀서의 증명을 이더리움 메인넷에 게시합니다. 이를 통해 높은 수준의 분산화를 유지하면서도 약 2초에 해당하는 빠른 블록 확인율과 탁월한 네트워크 처리량을 달성할 수 있습니다.
- **Scalgis**: Polygon 네트워크는 단일 사이드 헤인에서 2초 미만의 가상의 트랜잭션 속도를 제공합니다. 여러 사이드체인을 사용하면 초당 수백만 건의 트랜잭션을 처리하도록 네트워크를 지원할 수 있습니다. Polygon 네트워크는 이 메커니즘(이미 첫 매틱 사이드체인에서 입증됨)을 통해 쉽게 확장될 수 있습니다.
- **보안**: Polygon의 스마트 계약이 이더리움의 보안에 의존합니다. 네트워크 보호를 위해 세 가지 중요한 보안 모델을 사용합니다. 이더리움의 **스테이킹 관리 계약** 그리고 인센티브에 따라 **Heimdall** 및 **Bor** 노드를 운영하는 검증자 그룹을 사용합니다. 개발자도 두 가지 모델(하이브리드)을 dApp에 구현할 수 있습니다.

## Polygon에서 빌드하기 {#building-on-polygon}

이더리움 개발자라면 이미 Polygon 개발자입니다. 간단히 [Polygon RPC](https://polygon-rpc.com/)로 전환하고 시작하세요. Polygon에서는 Truffle, Remix, Web3js와 같이 이더리움 블록체인에서 흔히 사용되는 모든 도구를 기본적으로 지원합니다.

분산형 애플리케이션은 Polygon Mumbai 테스트넷 또는 메인넷에 배포할 수 있습니다. Polygon Mumbai 테스트넷은 상위 체인 역할을 하는 이더리움 Goëri 테스트넷과 연결됩니다. 모든 네트워크 관련 세부 정보는 [네트워크 문서](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md)에서 찾을 수 있습니다.

### 지갑 {#wallets}

Polygon은 이더리움 가상 머신(EVM)에서 실행되기 때문에 Polygon 네트워크와 상호작용하려면 이더리움 기반의 지갑을 보유해야 합니다. [메타마스크](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) 또는 [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md) 지갑을 설정할 수 있습니다. 지갑 관련 정보와 [왜](https://docs.polygon.technology/docs/develop/wallets/getting-started) 지갑 문서에서 더 많은 정보를 얻을 수 있는지 지갑 문서에서 확인할 수 있습니다.

### 스마트 계약 {#smart-contracts}

Polygon은 분산형 애플리케이션을 테스트, 컴파일, 디버깅하고 Polygon 네트워크에 배포하는 데 사용할 수 있는 여러 서비스를 지원합니다. 여기에는 [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) 및 [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md)을 사용한 배포가 포함됩니다.

### Polygon에 연결하기 {#connecting-to-polygon}

Polygon을 메타 마스크에 추가할 수도 있고 직접 Arkane을 사용하여 [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)를 통해 Polygon에 연결할 수도 있습니다.

Polygon 네트워크와 연결하여 블록체인 정보를 읽어 보시려면 Alchemy SDK를 사용하여 권장합니다.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Polygon에 새로운 dApp 구축하기 {#building-a-new-dapp-on-polygon}

분산형 애플리케이션(dApp)은 블록체인에서 사용자와 데이터 프라이버시 간의 브리지 역할을 합니다. 점점 늘어나고 있는 dApp은 중앙 권한 없이 스마트 계약을 통해 두 참여자 간 트랜잭션을 실행하는 것과 같은 과제를 해결하며 블록체인 생태계 내에서 그 유용성을 입증하고 있습니다.

분산형 애플리케이션(dApp)을 빌드한 경험이 없다면, 아래 리소스를 참조해 보세요. Polygon 네트워크에서 dApp을 빌드, 디버깅, 배포하는 데 필요한 도구를 신속하게 이용할 수 있습니다.

- [풀 스택 dApp: 튜토리얼 시리즈](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [메타마스크](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Fauna, Polygon 및 React를 사용하여 dApp 개발하기](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### 이미 dApp이 있는 경우 {#already-have-a-dapp}

이미 분산형 애플리케이션(dApp)이 있고 효율적인 확장을 지원할 플랫폼을 찾고 있다면, 제대로 찾아오셨습니다. Polygon을 다음을 지원하기 때문입니다.

1. **이더리움 가상 머신(EVM) 기반 체인에서 쉽게 마이그레이션하기**: Polygon은 이더리움을 위한 최고의 레이어-2 확장 솔루션이라 자부합니다. EVM과 호환된다면 dApp을 Polygon 네트워크로 이동 또는 배포하면서 하위 아키텍처에 대해 걱정할 필요가 없습니다.
2. **더 빠른 트랜잭션 레이어로 Polygon 사용하기**: dApp을 Polygon 메인넷에 배포하면 dApp을 위한 더 빠른 트랜잭션 레이어로 Polygon을 활용할 수 있습니다. 또한, Polygon에서 토큰을 매핑할 수 있습니다. 자세한 내용을 알아보려면 Telegram에서 Polygon [기술 토론 그룹](http://bit.ly/matic-technical-group)에 가입하세요.

## 참고 {#side-note}

내용이 너무 많아도 걱정하지 마세요. 바로 실습을 시작하실 수 있습니다. 리소스, 저장소 및 문서에 대해 자세히 알아보기 전에 몇 가지 참고할 내용을 알려드립니다.

1. **최첨단 기술의 비용에 주의하세요.** 일반적인 틈새 프로그래밍과 마찬가지로 dApp 및 블록체인 개발은 매우 빠르게 움직입니다. 리서치를 하는 동안 복잡한 코드 저장소, 문서 사이트의 404를 접하게 될 수도 있고 문서를 전혀 찾을 수 없는 경우도 있을 것입니다. 그러한 경우를 기회 삼아 소셜 미디어 채널을 통해 저희에게 문의하세요.
2. **학습 여정은 버거울 수 있지만, 진입 장벽이 낮습니다.** 매우 개방적이고 포용적인 커뮤니티입니다! 프로젝트는 외부인의 풀(pull) 요청을 환영하고 적극적으로 장애 요소를 해결합니다. Polygon은 더 나은 세상을 만들기 위해 노력하고 있으며 모든 형태의 기여를 감사하게 여길 것입니다. 이 훌륭한 웹3 생태계에 참여해주시면 감사하겠습니다.

:::info 최신 정보 받기

분산형 애플리케이션의 개발은 네트워크 분산화를 촉진합니다. Polygon 생태계에 대한 자세한 최신 정보를 원하시면 당사의 소셜 미디어 채널을 팔로우하세요. 모든 Polygon 커뮤니티의 링크는 [여기](https://polygon.technology/community/)에서 찾을 수 있습니다.

:::
