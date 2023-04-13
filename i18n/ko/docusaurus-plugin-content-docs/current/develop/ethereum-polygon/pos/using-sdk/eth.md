---
id: eth
title: ETH 입금 및 출금 가이드
sidebar_label: ETH
description: "Polygon 네트워크에서 ETH 토큰을 입금하고 출금합니다."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

[ETH에 대한 최신 Matic.js 문서](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/)를 확인하세요.

## 요약 {#quick-summary}

이 섹션에서는 Polygon 네트워크에서 ERC20 토큰을 입금 및 출금하는 방법을 설명합니다. 문서의 ETH, ERC20, ERC721 및 ERC1155 섹션에서 공통적인 함수를 다루지만 표준에 맞는 명명 및 구현 패턴에 차이가 있습니다. 문서의 이 섹션을 사용하기 위한 가장 중요한 기본 요건은 자산을 매핑하는 것이므로 [여기](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)에서 매핑 요청을 제출하세요.

## 소개 {#introduction}

본 가이드에서는 자체 네트워크에서 Goerli로 매핑되는 Polygon 테스트넷(Mumbai)을 사용하여 두 블록체인 간의 자산 이전을 보여줍니다. 이 튜토리얼에서는 가능하면 언제든지 프록시 주소를 사용해야 합니다. 이는 새로운 업데이트가 계약 코드에 추가될 경우 구현 계약 주소가 변경되기 쉽지만, 프록시는 변경되지 않고 수신 호출을 모두 최신 구현으로 리디렉션하기 때문입니다. 기본적으로 프록시 주소를 사용하는 경우 준비하기 전에 구현 계약에서 발생하는 변경 사항에 대해 걱정할 필요가 없습니다.

예를 들어, 주소 대신 `RootChainManagerProxy`주소를 `RootChainManager`사용하십시오. PoS 계약 주소, ABI 및 테스트 토큰 주소와 같은 배포 세부 사항은 [여기에서](/docs/develop/ethereum-polygon/pos/deployment/) 확인할 수 있습니다.

자산 매핑은 애플리케이션에 PoS 브리지를 통합하는 데 필요한 단계이므로 아직 매핑 요청을 제출하지 않은 경우 [여기](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)에서 제출하세요. 이 튜토리얼에서 팀은 테스트 토큰을 배포하고 PoS 브리지에 매핑했습니다. [Faucet](https://faucet.polygon.technology/)에서 사용할 자산을 요청하세요. 사용 가능한 테스트 토큰을 없는 경우 [Discord](https://discord.com/invite/0xPolygon) 팀에 문의하시면 즉시 회신해드립니다.

다음 튜토리얼에서는 모든 단계를 몇 가지 코드 스니펫과 함께 자세히 설명합니다. 그러나 언제든지 이 [저장소](https://github.com/maticnetwork/matic.js/tree/master/examples)의 모든 **예시 소스 코드**를 참조하여 PoS 브리지의 작동 방식을 이해하고 종합할 수 있습니다.

## 상위 수준 흐름 {#high-level-flow}

ETH 입금 -

1. **_RootChainManager_**에서 **_depositEtherFor_**를 호출하고 필요한 이더를 **전송**합니다.

ETH 출금 -

1. Polygon 체인에서 토큰을 **_소각_**합니다.
2. **_RootChainManager에서_** **_종료_** 함수를 호출해 소각 트랜잭션 증명을 제출하세요. 이 호출은 소각 트랜잭션이 포함된 블록의 **_체크포인트가 제출된 후_**에 할 수 있습니다.

## 단계 {#steps}

### 입금 {#deposit}

ETH는 **RootChainManager** 계약에서 **depositEtherFor**를 호출하여 Polygon 체인에 입금할 수 있습니다. Polygon PoS 클라이언트는 이 호출을 위한 **depositEther** 메서드를 제공합니다.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
이더리움에서 **스테이트 동기화** 메커니즘을 사용하여 Polygon에 대한 예시를 입력하면 약 22-30분이 소요됩니다. 이 시간 간격을 기다리는 후, 웹3.js/matic.js 라이브러리를 사용하여 밸런스를 확인하는 것이 좋습니다. 하위 체인에서 1회 이상의 자산 이전이 발생한 경우에만 탐색기에 잔액이 표시됩니다. 이 [<ins>링크는</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) 예치 이벤트를 추적하는 방법을 설명합니다.
:::

### 소각 {#burn}

ETH는 Polygon 체인에서 ERC20 토큰으로 등록되어 있습니다. 인출을 하면 ERC20 토큰을 인출하는 것과 동일한 프로세스를 따릅니다.

토큰을 태우고 철수 프로세스를 참여하려면 maticWEH 계약의 철수 함수를 호출합니다. Ether는 Polygon 체인에서 ERC20 토큰이기 때문에 Polygon PoS 클라이언트에서 **ERC20** 토큰을 시작하고 해당 방법을 호출하여 화상 프로세스를 시작하는 `withdrawStart()`방법을 호출해야 합니다.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

이 호출의 트랜잭션 해시를 저장하여 소각 증명을 생성하는 동안 사용합니다.

### 종료 {#exit}


일단 **검색어가** 화상 거래가 포함된 블록에 제출되면 사용자는 `RootChainManager`계약 **종료** 기능을 호출하고 화상 증거를 제출해야 합니다. 유효한 증명을 제출하면 토큰이 사용자에게 이전됩니다. Polygon PoS 클라이언트 `erc20`은 이 호출을 위한 `withdrawExit` 메서드를 제공합니다. 이 함수는 메인 체인에 체크포인트가 포함된 후에만 호출할 수 있습니다. 이 [가이드](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)를 따라 체크포인트 포함 상태를 추적할 수 있습니다.


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
