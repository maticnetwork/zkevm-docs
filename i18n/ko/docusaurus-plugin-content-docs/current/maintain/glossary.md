---
id: glossary
title: 용어집
description: 주요 Polygon 용어
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 블록프로듀서 {#block-producer}

블록프로듀서는 일정 [범위](#span) 에서 블록프로듀서로 작동하도록 선택된 활성 [유효성 검사자](#validator)입니다.

블록프로듀서는 블록을 만들고 생성된 블록을 네트워크에 브로드캐스트하는 역할을 합니다.

## Bor {#bor}

Bor 노드는 Polygon 네트워크에서 블록을 생성하는 노드입니다.

Bor는 [Go Ethereum](https://geth.ethereum.org/)에 기반을 두고 있습니다.

## 체크포인트 트랜잭션 {#checkpoint-transaction}

체크포인트 트랜잭션은 체크포인트 간격 사이에 [Bor](#bor) 계층 블록의 Merkle 루트를 포함하는 트랜잭션입니다.

트랜잭션은 [Heimdall](#heimdall) 노드에 의해 이더리움 메인넷에서 Polygon 스테이크 계약을 수행합니다.

참조:

* [Heimdall 아키텍처: 체크포인트](/docs/pos/heimdall/checkpoint)
* [체크포인트 메커니즘](/docs/maintain/validator/core-components/checkpoint-mechanism)

## 수수료 {#commission}

수수료는 [유효성 검사자](#validator)가 유효성 검사자에게  스테이크를 위임한  [위임자](#delegator)로부터 받은 보상의 일정 비율입니다.

[유효성 검사자 수수료 운영](/docs/maintain/validate/validator-commission-operations)도 참조하세요.

## 위임자 {#delegator}

위임자 역할은 매틱 토근을 스테이크하여 노드를 직접 실행하지 않고 기존 [유효성 검사자](#validator)로 Polygon 네트워크를 보호하게 합니다.

[위임자는 누구인가요](/docs/maintain/polygon-basics/who-is-delegator)도 참조하세요.

## 전체 노드 {#full-node}

전체 노드는 [Heimdall](#heimdall) 및 [Bor](#bor)를 모두 실행하는 완전히 동기화된 [센트리 노드](#sentry) 입니다.

 [전체 노드 배포](/docs/develop/network-details/full-node-deployment)도 참조하세요.

## Heimdall {#heimdall}

Heimdall 노드는 이더리움 메인넷과 병렬로 실행되는 노드로서, 이더리움 메인넷에 배포된 일련의 계약을 모니터링하고 Polygon 네트워크 [체크포인트](#checkpoint-transaction)를 이더리움 메인넷에 커밋합니다.

Heimdall은 [Tendermint](https://tendermint.com/)를 기반으로 합니다.

## 소유자 주소 {#owner-address}

소유자 주소는 이더리움 메인넷에서 스테이크, 재스테이크, 서명자 주소 변경, 보상 인출 및 위임 관련 매개 변수의 관리 등에 사용되는 주소입니다.

 [서명자 키](#signer-address)는 노드에 보관되며 **핫** 지갑으로 간주되지만, 소유자 키는 매우 안전하게 보관되고, 자주 사용되지 않아야 하며, **콜드** 지갑으로 간주됩니다.

[키 관리](validator/core-components/key-management.md)도 참조하세요.

## 제안자 {#proposer}

제안자는 알고리즘이 새 블록을 제안하기 위해 선정한 [유효성 검사자](#validator)입니다.

제안자는 또한 특정 [체크포인트](#checkpoint-transaction)에 대한 모든 서명을 수집하고 체크포인트를 이더리움 메인넷에 커밋할 책임이 있습니다.

## 센트리 {#sentry}

센트리 노드는 [Heimdall ](#heimdall)노드와 [Bor](#bor) 노드를 모두 실행하여 네트워크의 다른 노드에서 데이터를 다운로드하고 [유효성 검사자](#validator) 데이터를 네트워크에 전파하는 노드입니다.

센트리 노드는 네트워크의 다른 모든 센트리 노드에 열려 있습니다.

## 스팬 {#span}

사용 가능한 모든 [유효성 검사자](#validator)중에서 유효성 검사자 세트를 선택하는 논리적으로 정의된 블록 집합

각 스팬별 선택은 스테이킹 파워 관점에서 유효성 검사자의 최소 3분의 2에 의해 결정됩니다.

[Bor 합의: 스팬](/docs/pos/bor/consensus.md#span)도 참조하세요.

## 스테이킹 {#staking}

스테이킹은 토큰을 예치하고 블록체인의 블록 유효성 검사 및 생성권을 얻는 과정입니다. 일반적으로 XIC의 토큰은 Polygon 네트워크의 유효성 검사자 / 스테이커에 의해 잠겨 있습니다. 다른 예에는 이더리움(포스트 머지), 코스모스 등의 ATM 등이 포함됩니다.

[스테이크 증명이란 무엇인가요](polygon-basics/what-is-proof-of-stake.md)도 참조하세요.

## 서명자 주소 {#signer-address}

서명자 주소는 [Heimdall](#heimdall) 유효성 검사자 노드의 이더리움 계정 주소입니다. 서명자 주소는 [체크포인트 트랜잭션](#checkpoint-transaction)을 서명하고 제출합니다.

 서명자 키는 노드에 보관되며** **핫 지갑으로 간주되지만,[ 소유자 ](#owner-address)키는 매우 안전하게 보관되고, 자주 사용되지 않아야 하며,** 콜**드 지갑으로 간주됩니다.

[키 관리](validator/core-components/key-management.md)도 참조하세요.

## 유효성 검사기 {#validator}

유효성 검사기는 이더리움 메인넷에 배포된 스테이킹 계약을 통해 [MATIC 토큰을 지분을 보유하고](/docs/maintain/validate/validator-staking-operations) 있으며, [Heimdall](#heimdall) 노드와 [Bor](#bor) 노드가 모두 실행하여 Eythog 메인넷에 네트워크 체크포인트를 투입하고 네트워크에서 블록을 생성합니다.

유효성 검사 노드는 해당 [센트리](#sentry) 노드에만 열려 있고 네트워크의 나머지 부분에는 닫혀 있습니다.

[유효성 검사자는 무엇인가요](polygon-basics/who-is-validator.md)도 참조하세요.
