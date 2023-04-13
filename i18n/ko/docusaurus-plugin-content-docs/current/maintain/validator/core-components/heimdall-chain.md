---
id: heimdall-chain
title: Heimdall 체인
description: Polygon 네트워크의 Proof-of-stake 검증 레이어
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall은 이더리움 메인넷에 Plasma 블록의 표현을 [체크킹하는](/docs/maintain/glossary.md#checkpoint-transaction) 책임이 있는 Proscription 검증층입니다. Heimdall은 [Tendermint](https://tendermint.com/)를 기반으로 합니다.

이더리움 메인넷의 스테이킹 계약은 Heimdall 노드와 협력하여 [유효성 검사자](/docs/maintain/glossary.md#validator) 세트 선정, 유효성 검사자 업데이트 등을 포함하여 PoS 엔진의 신뢰 없는 스테이크 관리 메카니즘 역할을 합니다. 스테이킹이 이더리움 메인넷의 계약에서 수행되기 때문에 Polygon은 유효성 검사자의 정직성에만 의존하지 않고 이더리움 메인넷의 보안을 이어받습니다.

Heimdall 층은 [Bor](/docs/maintain/glossary.md#bor)가 생성한 블록을 머클 트리에 한데 모아 이 머클 루트를 정기적으로 이더리움 메인넷에 게시합니다. 이러한 정기적 게시를 *체크포인팅*이라고 합니다.

Bor의 몇 개 블록마다 Heimdall 층의 유효성 검사자는 다음을 수행합니다.

1. 마지막 체크포인트 이후 모든 블록의 유효성을 검사합니다.
2. 블록 해시로 구성된 머클 트리를 생성합니다.
3. 머클 루트를 이더리움 메인넷에 게시합니다.

체크포인트는 다음의 두 가지 이유로 중요합니다.

1. 루트 체인에 완결성을 제공합니다.
2. 자산 인출시 소각의 증거를 제공합니다.

프로세스 개요는 다음과 같습니다.

* 풀에서 활성 상태의 유효성 검사자 하위 세트가 선정되어 특정 [범위](/docs/maintain/glossary.md#span)에 대해 [블록프로듀서](/docs/maintain/glossary.md#block-producer) 역할을 합니다. 이러한 블록프로듀서는 블록을 생성하고 생성한 블록을 네트워크에 브로드캐스트할 책임이 있습니다.
* 체크포인트에는 특정 간격으로 생성된 모든 블록의 머클 루트 해시가 포함되어 있습니다. 모든 노드는 이 머클 루트 해시의 유효성을 검사한 후 서명을 첨부합니다.
* 유효성 검사자 세트에서 선정된 [제안자](/docs/maintain/glossary.md#proposer)는 특정 체크포인트에 대한 모든 서명을 수집하고 이더리움 메인넷에 해당 체크포인트를 제공할 의무가 있습니다.
* 블록을 생성하고 체크포인트를 제안하는 책임은 전체 풀에서 유효성 검사자의 스테이크가 차지하는 비율에 따라 가변적으로 결정됩니다.

[Heimdall 아키텍쳐](/docs/pos/heimdall/overview)도 확인해 보세요.
