---
id: polygon-architecture
title: Polygon의 아키텍쳐
description: Polygon의 아키텍쳐
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon의 아키텍쳐 {#the-architecture-of-polygon}

Polygon은 하이브리드 Pro-of-Stake와 **Plasma가** 가능한 sidechains를 제공하는 블록체인 애플리케이션 플랫폼입니다.

아키텍쳐 측면에서 Polygon의 아름다움은 간단명료한 설계에서 찾아볼 수 있습니다. Polygon의 설계는 플라스마 지원 체인, 완전한 EVM 사이드체인과 같은 다양한 실행 환경 그리고 미래 옵티미스틱 롤업과 같은 기타 레이어 2 접근 방식에서 분리된 일반 유효성 검사 계층을 특징으로 합니다.

Polygon PoS 네트워크에는 세 계층의 아키텍쳐가 있습니다.

* **이더리움 계층** - 이더리움 메인넷에 대한 계약 세트.
* **Heimdall 계층** - Eythere 메인넷과 평행으로 실행되는 일련의 Proscription Heimdall 노드인 Heimdall 노드가 Eythere 메인넷에 배포된 스테이킹 계약 세트를 모니터링하고 Eythere Network 체크포인트를 Eythere 메인넷에 투입하는 Seimdall 레이어 - Ethyeum 메인넷에 배포한 스테이킹 계약 세트를 모니터링합니다. Heimdall은 Tendermint를 기반으로 합니다.
* Heimdall 노드가 섞인 **블록** 생성 Bor 노드들 세트. Bor는 Go 이더리움을 기반으로 합니다.

<img src={useBaseUrl("img/staking/architecture.png")} />

현재 개발자는 ERC20, ERC721, 자산 스왑, 기타 맞춤형 술어와 같이 플라스마 술어가 작성된 특정 상태 전환을 위해 **Plasma**를
사용할 수 있습니다. 임의 상태 전환을 위해서는
PoS를 사용할 수 있습니다. 또는 둘 모두도 가능합니다! Polygon의 하이브리드 구조가 이를 지원합니다.

Polygon 플랫폼에서는 PoS 메카니즘을 활성화하기 위해 일련의 **스테이킹** 관리 계약을
이더리움 그리고 **Heimdall** 및 **Bor** 노드를 실행하며 인센티브를 누리는 유효성 검사자들에게 배포합니다. 이더리움은
Polygon이 지원하는 첫 번째 베이스체인이지만, Polygon은 커뮤니티 제안과 합의에 기반하여
상호 운용 가능한 분산형 레이어 2 블록체인 플랫폼을 활성화하기 위해 추가 베이스체인을 지원할 계획입니다.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## 스테이킹 계약 {#staking-contracts}

Polygon에서 [스테이크 증명(PoS)](docs/home/polygon-basics/what-is-proof-of-stake) 메카니즘을 활성화하기 위해
시스템은 이더리움 메인넷에서 일련의 [스테이킹](/docs/maintain/glossary#staking) 관리 계약을 사용합니다.

스테이킹 계약은 다음과 같은 기능을 구현합니다.

* 누구나 이더리움 메인넷에서 스테이킹 계약에 매틱 토큰을 스테이킹하고 [유효성 검사자](/docs/maintain/glossary#validator)로 시스템에 합류할 수 있습니다.
* Polygon 네트워크에서 상태 전환의 유효성을 검증하고 스테이킹 보상을 얻습니다.
* 이더리움 메인넷에 [체크포인트](/docs/maintain/glossary#checkpoint-transaction)를 저장합니다.

PoS 메커니즘은 또한 Polygon 사이드체인의 데이터 불가용성 문제를 완화하는 역할도 합니다.

## Heimdall {#heimdall}

Heimdall은 스테이크 증명 유효성 검사 층으로,
[Bor](/docs/maintain/glossary#bor)에서 생성된 블록을 머클 트리로 집계하는 작업을 처리하고 주기적으로 루트 체인에
머클 트리를 게시합니다. Bor 사이드체인의 스냅샷을 정기적으로 게시하는 것을 [체크포인트](/docs/maintain/glossary#checkpoint-transaction)라고 합니다.

1. 마지막 체크포인트 이후 모든 블록의 유효성을 검사합니다.
2. 블록 해시로 구성된 머클 트리를 생성합니다.
3. 머클 루트 해시를 이더리움 메인넷에 게시합니다.

체크포인트는 다음의 두 가지 이유로 중요합니다.

1. 루트 체인에 완결성을 제공합니다.
2. 자산 인출시 소각의 증거를 제공합니다.

프로세스 개요는 다음과 같습니다.

* 풀에서 활성 상태의 유효성 검사자 하위 세트가 선정되어 특정 [스팬](/docs/maintain/glossary#span)에 대해 [ 블록 프로듀서](/docs/maintain/glossary#block-producer) 역할을 합니다. 이러한 블록 프로듀서는 블록을 생성하고 생성한 블록을 네트워크에 전달할 책임이 있습니다.
* 체크포인트에는 특정 간격으로 생성된 모든 블록의 머클 루트 해시가 포함되어 있습니다. 모든 노드는 이 머클 루트 해시의 유효성을 검사한 후 서명을 첨부합니다.
* 유효성 검사자 세트에서 선정된 [제안자](/docs/maintain/glossary#proposer)는 특정 체크포인트에 대한 모든 서명을 수집하고 이더리움 메인넷에 해당 체크포인트를 제공할 의무가 있습니다.
* 블록을 생성하고 체크포인트를 제안하는 책임은 전체 풀에서 유효성 검사자의 스테이크가 차지하는 비율에 따라 가변적으로 결정됩니다.

Heimdall에 대한 자세한 내용은 [Heimdall 아키텍쳐](/docs/pos/heimdall/overview) 가이드에서 확인할 수 있습니다.

## Bor {#bor}

Bor는 Polygon의 sidecha인 블록 프로듀서 층입니다 - 트랜잭션을 블록으로 집계 할 책임이있는 엔터티입니다. 현재 Bor는 합의 알고리즘에 사용자 정의 변경 사항을 적용한 기본 Geth 구현입니다.

블록 제작자는 유효성 검사자의 서브넷 이며 주기적으로 [히므탈에](/docs/maintain/glossary#heimdall) 대한 위원회 선택을 통해 섞여 있습니다. `span`이라고 하는 기간 동안 Heimdall의 위원회 선택을 통해 주기적으로 교체됩니다. 블록은 **Bor** 노드에서 생성되며 사이드체인 VM은 EVM과 호환됩니다.
또한, Bor에서 생성된 블록은 주기적으로 Heimdall 노드의 유효성 검사를 받으며 Bor의 블록 세트에 대한 머클 트리 해시로 구성된 체크포인트는 주기적으로 이더리움에 커밋됩니다.

자세한 내용은 [Bor 아키텍쳐](/docs/pos/bor/overview) 가이드에서 확인할 수 있습니다.

## 자료 {#resources}

* [Bor 아키텍쳐](https://wiki.polygon.technology/docs/pos/bor)
* [Heimdall 아키텍쳐](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [체크포인트 메커니즘](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
