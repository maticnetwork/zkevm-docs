---
id: new-to-polygon
title: Polygon에 오신 것을 환영합니다.
description: Polygon에서 다음 블록체인 앱을 구축하십시오.
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Polygon에 오신 것을 환영합니다. {#welcome-to-polygon}

Polygon은 공개 블록 체인을 위한 스케일링 솔루션입니다. Polygon PoS는 더욱 빠르고 저렴한 트랜잭션과 함께 모든 기존 이더리움 도구를 지원합니다.

## Polygon 상의 상호 작용 유형 {#types-of-interaction-on-polygon}

* [Polygon PoS 체인](/docs/develop/getting-started)
* [PoS 브릿지를 이용한 이더리움 + Polygon](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [플라스마 브릿지를 이용한 이더리움 + Polygon](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## 블록체인에 쿼리 {#query-the-blockchain}

대부분의 블록체인 상호 작용에는 상태를 읽는 것을 포함합니다.

Alchemy는 blockches에 기본 요청을 하는 방법에 대한 참조 가이드를 제공합니다. [Polygon을 질의하는 방법에](https://docs.alchemy.com/reference/polygon-sdk-examples) 대한 가이드를 확인하십시오.

## 스마트 계약 배포 {#deploy-smart-contracts}

* 귀하의 계약을 Polygon 상에서 배포하세요
    - [Alchemy 사용하기](/docs/develop/alchemy)
    - [Chinstack 사용하기](/docs/develop/chainstack)
    - [QuickNode 사용하기](/docs/develop/quicknode)
    - [Remix 사용하기](/docs/develop/remix)
    - [트러플 사용하기](/docs/develop/truffle)
    - [Hardhat 사용하기](/docs/develop/hardhat)

:::note

"https://rpc-mumbai.matic."에 웹3 RPC-URL을 설정하기 위해 다른 모든 것이 동일하게 유지됩니다.

:::

## 블록체인이란? {#what-is-a-blockchain}

간단히 말해서, 블록체인은 트랜잭션 기록, 자산 추적, 신뢰 구축을 위한 투명한 불변의 공유 원장입니다. 더 읽으시려면 [블록체인 기본](blockchain-basics/basics-blockchain.md)으로 이동하십시오.

## 사이드체인이란? {#what-is-a-sidechain}

사이드체인은 '상위' 블록체인의 클론으로 메인 체인과의 자산 전송을 지원하는 것으로 생각하면 됩니다. 이것은 단순히 자체 블록 생성 메커니즘(합의 메커니즘)으로 새로운 블록체인을 생성하는 상위 체인의 대안일 뿐입니다. 사이드체인을 상위 체인에 연결하는 데에는 체인 간의 자산 이동 방법의 설정이 포함됩니다.

## 유효성 검사자와 위임자 역할 {#validator-and-delegator-roles}

Polygon 네트워크에서, 귀하는 유효성 검사자 또는 위임자가 될 수 있습니다. 참조:

* [유효성 검사자란](/docs/maintain/polygon-basics/who-is-validator)
* [위임자란](/docs/maintain/polygon-basics/who-is-delegator)

## 아키텍쳐 {#architecture}

유효성 검사자를 목표로 한다면, Polygon 아키텍쳐를 이해하는 것은 필수입니다.

[Polygon 아키텍쳐](/docs/maintain/validator/architecture)를 참조하세요.

### 구성 요소 {#components}

Polygon 아키텍쳐를 세부적으로 이해하려면 다음 핵심 구성 요소를 확인하세요.

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contracts](/docs/pos/contracts/stakingmanager)

#### 코드베이스 {#codebases}

핵심 구성 요소를 세부적으로 이해하려면 다음 코드베이스를 확인하세요.

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contracts](https://github.com/maticnetwork/contracts)

## 시행 방법 {#how-tos}

### 노드 설정 {#node-setup}

Polygon 메인넷 또는 Mumbai 테스트넷에서 전체 노드를 실행하고 싶다면 다음을 따라 볼 수 있습니다. [Problem 노드](/maintain/validate/run-validator.md) 가이드를 실행합니다.

### 스테이킹 운영 {#staking-operations}

* [유효성 검사자 스테이킹 운영](/docs/maintain/validate/validator-staking-operations)
* [위임](/docs/maintain/delegate/delegate)

### 외부 리소스 {#external-resources}
- [첫 번째 dApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [Sidechain과 Childches인](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)