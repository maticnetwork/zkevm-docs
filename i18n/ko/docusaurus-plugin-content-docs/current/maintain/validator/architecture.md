---
id: architecture
title: 아키텍쳐
description: 이더리움, 하이므 및 Bor 레이어
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon 네트워크는 대략 아래의 세 개 층으로 나뉩니다.

* **이더리움 계층** - 이더리움 메인넷에 대한 계약 세트.
* **Heimdall 계층** - 이더리움 메인넷과 병렬 실행중인 몇 개의 Pro Pro Heimdall 노드인 Heimdall Errors - 이더리움 메인넷에 배포된 스테이킹 계약 세트를 모니터링하고 Eygon Network 체크포인트를 이더리움 메인넷에 넣습니다. Heimdall은 Tendermint를 기반으로 합니다.
* Heimdall 노드가 섞인 **블록** 생성 Bor 노드들 세트. Bor는 Go 이더리움을 기반으로 합니다.

<img src={useBaseUrl("img/staking/architecture.png")} />

## 이더리움의 스테이킹 및 플라스마 스마트 계약 {#staking-and-plasma-smart-contracts-on-ethereum}

Polygon에서 [스테이크 증명(PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) 메커니즘을 이용할 수 있도록 하기 위해 시스템은 이더리움 메인넷에서 일련의 [스테이킹](/docs/maintain/glossary.md#staking) 관리 계약을 사용합니다.

스테이킹 계약은 다음과 같은 기능을 구현합니다.

* 누구나 이더리움 메인넷에서 스테이킹 계약에 매틱 토큰을 스테이크하고 [유효성 검사자](/docs/maintain/glossary.md#validator)로서 시스템에 참여할 수 있습니다.
* Polygon 네트워크에서 상태 전환의 유효성을 검증하고 스테이킹 보상을 얻습니다.
* 이더리움 메인넷에 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction)를 저장합니다.

PoS 메커니즘은 또한 Polygon 사이드체인의 데이터 불가용성 문제를 완화하는 역할도 합니다.

## Heimdall (유효성 검사 계층) {#heimdall-validation-layer}

Heimdall 계층은 [Bor](/docs/maintain/glossary.md#bor)가 생성한 블록을 머클 트리에 한데 모아 이 머클 루트를 정기적으로 루트 체인에 게시하는 일을 처리합니다. Bor 사이드체인의 스냅숏을 정기적으로 게시하는 것을 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction)라고 합니다.

Bor의 몇 개 블록마다 Heimdall 층의 유효성 검사자는 다음을 수행합니다.

1. 마지막 체크포인트 이후 모든 블록의 유효성을 검사합니다.
2. 블록 해시로 구성된 머클 트리를 생성합니다.
3. 머클 루트 해시를 이더리움 메인넷에 게시합니다.

체크포인트는 다음의 두 가지 이유로 중요합니다.

1. 루트 체인에 완결성을 제공합니다.
2. 자산 인출시 소각의 증거를 제공합니다.

프로세스 개요는 다음과 같습니다.

* 풀에서 활성 상태의 유효성 검사자 하위 세트가 선정되어 특정 [스팬](/docs/maintain/glossary.md#span)에 대해 [ 블록 프로듀서](/docs/maintain/glossary.md#block-producer) 역할을 합니다. 이러한 블록 프로듀서는 블록을 생성하고 생성한 블록을 네트워크에 전달할 책임이 있습니다.
* 체크포인트에는 특정 간격으로 생성된 모든 블록의 머클 루트 해시가 포함되어 있습니다. 모든 노드는 이 머클 루트 해시의 유효성을 검사한 후 서명을 첨부합니다.
* 유효성 검사자 세트에서 선정된 [제안자](/docs/maintain/glossary.md#proposer)는 특정 체크포인트에 대한 모든 서명을 수집하고 이더리움 메인넷에 해당 체크포인트를 제공할 의무가 있습니다.
* 블록을 생성하고 체크포인트를 제안하는 책임은 전체 풀에서 유효성 검사자의 스테이크가 차지하는 비율에 따라 가변적으로 결정됩니다.

[Heimdall 아키텍쳐](/docs/pos/heimdall/overview)도 확인해 보세요.

## Bor (블록프로듀서 층) {#bor-block-producer-layer}

Bor는 Polygon의 사이드체인 블록프로듀서로서, 트랜잭션을 블록으로 한데 모으는 일을 담당합니다.

Bor 블록 프로듀서는 유효성 검사자의 하위 세트이며 [Heimdall](/docs/maintain/glossary.md#heimdall) 유효성 검사자에 의해 정기적으로 셔플됩니다.

[Bor 아키텍쳐](/docs/pos/bor/overview)도 확인해 보세요.
