---
id: bor
title: Bor 아키텍쳐
description: Polygon 아키텍처에서 Bor 역할
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor 아키텍쳐 {#bor-architecture}

Polygon은 하이브리드 **Plasma + Proof-Stake(PoS)** 플랫폼입니다. Polygon 네트워크에서 듀얼 합의 아키텍쳐를 사용하여 속도 및 분산화를 최적화합니다. Polygon은  의도적으로 EVM을 사용하는 사이드체인에서 임의 상태 전환을 지원하도록 시스템을 구성했습니다.

## 아키텍쳐 {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

블록체인은 상호 작용하며 협력하는 네트워크 클라이언트 세트입니다. 클라이언트는 다른 클라이언트와 함께 p2p 통신 채널을 구축하고, 트랜잭션을 서명하고 알리며, 스마트 계약 등을 배포하고 상호 작용할 수 있는 일종의 소프트웨어입니다. 클라이언트는 종종 노드라고도 불립니다.

Polygon의 경우 노드는 하이밍몰(Heimdall (유효성 검사층) 및 Bor(Block Producer Layer)을 두 층 구현한 것으로 설계되었습니다.

1. Heimdall
    - 스테이크 증명 검증
    - 이더리움 메인 체인의 체크포인트 블록
    - 유효성 검사자 및 보상 관리
    - 이더리움 메인 체인과의 동기화 보장
    - 분산형 브리지
2. Bor
    - Polygon 체인
    - EVM(이더리움 가상 머신) 호환 VM(가상 머신)
    - 제안자 및 프로듀서 세트 선택
    - 시스템 호출
    - 수수료 모델

## Heimdall (유효성 검사자 계층) {#heimdall-validator-layer}

Heimdall (모든 프로텍터)은 Polygon Proof-of-Stake의 시스템에서 발생하는 모든 것의 privyor입니다.

Heimdall은 Polygon의 스테이크 증명 검증자 계층으로, Polygon 아키텍쳐 내의 메인 체인에 대한 플라스마 블록의 체크포인트 역할을 합니다. 우리는 Tendermint 합의 엔진에 추가하여 서명 방식 및 다양한 데이터 체계를 변경함으로써 이를 구현하였습니다.

자세한 내용은 [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/)를 참조하십시오.

## Bor (블록 프로듀서 계층) {#bor-block-producer-layer}

Bor 노드는 기본적으로 사이드체인에서 운용됩니다. 사이드체인 VM(가상머신)은 EVM(이더리움 가상머신)과 호환됩니다. 현재 Bor는 기본적인 Geth 구현으로서, 사용자 지정 변경 사항을 합의 알고리즘에 적용합니다. 그러나 이는 더 가볍고 집약적으로 근본부터 다시 구축될 예정입니다.

Bor는 Heimdall과 동기화하여 각 스팬 및 스프린트에 대해 프로듀서 및 검증자를 선택하는 블록 프로듀서 계층입니다. Polygon 사용자를 위한 상호 작용은 EVM과 호환되는 사이드체인에서 발생하므로 이더리움 개발자 도구와 애플리케이션의 기능 및 호환성을 활용할 수 있습니다.

### Polygon 체인 {#polygon-chain}

이 체인은 양방향 페그를 사용하여 이더리움에 연결되는 별도의 블록체인입니다. 양방향 페그를 통하여 이더리움과 Polygon 사이에 자산이 상호 교환될 수 있습니다.

### EVM(이더리움 가상 머신) 호환 VM(가상 머신) {#evm-compatible-vm}

이더리움 가상 머신(EVM)은 계약 바이트코드 실행을 담당하는 각 전체 Polygon 노드에 내장된 강력한 샌드박스 가상 스택입니다. 계약은 일반적으로 Solidity와 같은 수준 높은 언어로 작성된 다음 EVM 바이트코드로 컴파일됩니다.

### 제안자 및 프로듀서 선택 {#proposers-and-producers-selection}

Bor 계층의 블록 프로듀서는 스테이크를 기반으로 유효성 검사자 풀에서 선정되는 집단으로, 정기적으로 발생하며 주기적으로 교체됩니다. 선정 간격은 다이너스티 및 네트워크와 관련하여 유효성 검사자의 거버넌스에 의해 결정됩니다.

스테이크/스테이킹 파워의 비율은 블록프로듀서 집단의 일원으로 선정될 확률을 나타냅니다.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### 선정 프로세스 {#selection-process}

- 풀에 3명의 유효성 검사자가 있고, Alice, Bill, Clara라고 가정해 봅시다.
- Alice는 100개의 매틱 토큰을 스테이킹했고, Bill과 Clara는 각각 40개의 매틱 토큰을 스테이킹했습니다.
- 유효성 검사자에게는 스테이크에 따라 슬롯이 제공됩니다. Alice는 100개의 매틱 토큰을 스테이킹했기 때문에 이에 비례하는 슬롯을 얻을 것입니다. Alice는 총 5개의 슬롯을 얻게 됩니다. 마찬가지로, Bill과 Clara는 총 2개의 슬롯을 얻습니다.
- 모든 유효성 검사자에게 [A, A, A, A, A, B, B, C, C]의 슬롯이 제공됩니다.
- 과거 이더리움 블록 데이터를 시드로 사용하여 이 배열을 섞습니다.
- 시드를 사용하여 슬롯을 섞은 후 [A, B, A, A, C, B, A, A, C]의 배열을 얻었다고 가정하겠습니다.
- 프로듀서 수*(유효성 검사자의 거버넌스에 의해 유지됨)*에 따라 유효성 검사자를 앞에서부터 선정합니다. 예를 들어, 5명의 프로듀서를 선정하려는 경우 [A, B, A, A, C]의 프로듀서 세트를 얻습니다.
- 따라서 다음 스팬의 프로듀서 세트는 [A:3, B:1, C:1]이 됩니다.
- 이 유효성 검사자 세트와 텐더민트의 제안자 선택 알고리즘을 사용하여 BOR의 모든 스프린트에 대해 프로듀서를 선정합니다.

### 시스템 호출 인터페이스 {#systemcall-interface}

시스템 호출은 EVM 아래에 있는 내부 운영자 주소로 합니다. 이를 통해 모든 스프린트에 대해 블록프로듀서의 상태를 유지할 수 있습니다. 시스템 호출은 스프린트가 끝날 때 일어나며, 새로운 블록 프로듀서 리스트가 요청됩니다. 상태가 업데이트되면 Bor에서 블록이 생성된 후 모든 유효성 검사자가 변경 사항을 수신합니다.

### 함수 {#functions}

#### ProposeState {#proposestate}

- 유효성 검사자만 호출할 수 있습니다.
-  `stateId`를 검사하여 이미 제안 또는 커밋 되었는지 확인합니다.
- `stateId`를 제안하고 플래그를 `true`로 업데이트합니다.

#### 커밋 {#commitstate}

- 시스템만 호출할 수 있습니다.
-  `stateId`를 검사하여 이미 제안 또는 커밋 되었는지 확인합니다.
- 새로운 `stateId`로 `StateReceiver` 계약을 통지합니다.
- `state` 플래그를 `true`로 업데이트하고, `proposedState`를 `remove`합니다.

#### ProposeSpan {#proposespan}

- 유효성 검사자만 호출할 수 있습니다.
- Span 제안이 `pending`인지 확인합니다.
- Span 제안을 `true`로 업데이트합니다.

#### Profe커밋 {#proposecommit}

- 시스템만 호출할 수 있습니다.
- 현재 스팬이 0이면 `initial validators`를 설정합니다.
- 스프린트 및 스팬의 `spanId` 과  `time_period`에 대한 조건을 확인합니다.
- 새로운 `span` 과 `time_period`를 업데이트합니다.
- `sprint`를 위한 `validators` 와 `blockProducers`를 설정합니다.
- `spanProposal`의 플래그를 `true`로 업데이트합니다.

### Bor 수수료 모델 {#bor-fee-model}

정상적인 트랜잭션이 이루어지면, 이더리움 트랜잭션과 마찬가지로 매틱 토큰의 수수료가 지급되어 블록 프로듀서에게 분배됩니다.

다른 블록체인과 마찬가지로 Polygon은 매틱(MATIC)이라는 네이티브 토큰을 가지고 있습니다. 매틱은 Polygon에서 가스 요금(트랜잭션 비용)을 지불하고 스테이킹을 수행하는 데 주로 사용되는 ERC20 토큰입니다.

:::info

주목해야 할 중요한 점은 Polygon 체인에서 매틱 토큰이 ERC20 토큰 역할을 하는 동시에 네이티브 토큰의 역할도 수행한다는 것입니다. 즉, 사용자는 매틱으로 가스 요금을 지불할 수도 있고 다른 계정으로 매틱을 보낼 수도 있습니다.

:::

`gasPrice`genesis-contracts의 경우 이더리움과 동일한 `gasLimit`작업을 하지만, 실행 중에 보낸 계정의 수수료를 공제하지 않습니다.

현재 유효성 검사자의 제네시스 거래는 `gasPrice = 0`으로 실행됩니다.

또한 유효자는 Bor의 예금 및 Span 제안과 같은 유형의 트랜잭션 유형에 따라 보내야합니다.

## 기술 인사이트 {#technical-insight}

### 제네시스 계약 {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ 이 계약은 각 스팬 및 스프린트를 위한 유효성 검사자 세트를 관리합니다.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ 이 계약은 이더리움 계약에서 Polygon 계약으로 임의의 계약 데이터를 이전하는 작업을 관리합니다.

MaticChildERC20(0x1010) ⇒ 이더리움에서 Polygon으로 자산 이전을 할 수 있게 하는 메인 체인 토큰의 차일드 계약입니다.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Bor 프로토콜

## 용어집 {#glossary}

- StartEpoch - 체크포인트 번호의 하나로, 이 번호 이후에는 유효성 검사자가 활성화되어 합의에 참여합니다.
- EndEpoch - 체크포인트 번호의 하나로, 이 번호 이후에는 유효성 검사자가 비활성 상태로 간주되고 합의에 참여하지 않습니다.
- 스프린트 - 스프린트는 단일 유효성 검사자가 생성한 연속적인 블록 세트입니다.
- 스팬 -  스팬은 특정 유효성 검사자 세트가 생성하고, 다수의 스프린트로 구성되는 큰 블록 세트입니다. 예를 들어, 길이가 6,400개 블록인 스팬은 64개 블록의 스프린트 100개로 구성됩니다.
- 다이너스티: 마지막 경매 종료 시점에서 다음 경매 시작 시점 사이의 시간입니다.

## 리소스 {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [EVM이 얼마나 작동합니까?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Tendermint Proposer 선택](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
