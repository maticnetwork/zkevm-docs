---
id: checkpoint-mechanism
title: 체크포인트 메커니즘
sidebar_label: Checkpoints
description: 이더리움 메인넷에 시스템 상태를 체크하여
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon은 레이어 1 플랫폼이 아닙니다

Polygon은 Eygon 메인넷에 Layer 1 Settlement층으로 구성됩니다. 모든 스테이킹 방법은 이더리움 메인넷의 계약과 동기화되어 있어야 합니다.

:::

[Tendermint의 가중 라운드 로빈 알고리즘을](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) 통해 검문소에 대한 [제안서가](/docs/maintain/glossary.md#proposer) 처음에 선택됩니다. 이후 체크포인트 제출에 성공하면 추가적인 사용자 정의 확인이 수행됩니다. 이렇게 하면 Polygon 시스템은 Tendermint의 제안자 선정 방식에서 분리될 수 있고, 이더리움 메인넷에서 체크포인트 트랜잭션이 성공할 때만 제안자를 선정하거나 이전에 실패한 체크포인트에 속하는 블록에 대해 체크포인트 트랜잭션을 제출하는 등의 기능을 Polygon에 제공합니다.

Tendermint에서 체크포인트를 성공적으로 제출하는 방법은 다음의 2단계 프로세스입니다.

* 라운드 로빈 알고리즘을 통해 선정된 제안자는 제안자 필드의 머클 해시와 제안자 주소가 포함된 체크포인트를 보냅니다.
* 다른 모든 제안자는 자신의 상태에 이 머클 해시를 추가하기 전에 제안자 필드의 데이터에 대한 유효성을 검사합니다.

그러면 다음 제안자가 승인 트랜잭션을 보내 이더리움 메인넷에서 이전의 [체크포인트 트랜잭션](/docs/maintain/glossary.md#checkpoint-transaction)이 성공했음을 증명합니다. 모든 유효성 검사자 세트 변경은 유효성 검사 노드에 내장되어 있는 [Heimdall](/docs/maintain/glossary.md#heimdall)의 유효성 검사 노드에 의해 전달됩니다. 이를 통하여 Heimdall은 이더리움 메인넷의 Polygon 계약 상태와 항상 동기화를 유지할 수 있습니다.

이더리움 메인넷에 배포된 Polygon 계약은 모든 진위 판단의 근거가 되므로, 모든 유효성 검사는 이더리움 메인넷 계약에 쿼리하는 방식으로 수행됩니다.
