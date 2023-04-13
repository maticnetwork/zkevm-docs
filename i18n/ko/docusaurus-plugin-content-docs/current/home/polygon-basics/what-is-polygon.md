---
id: what-is-polygon
title: Polygon은 무엇인가요?
description: Polygon 스케일링 솔루션에 대해 자세히 알아보십시오
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/)은 오프 체인 연산 및 PoS(스테이크 증명) 유효성 검사자의 분산형 네트워크를 위한 사이드체인을 활용하여 확장을 달성하는 레이어 2 스케일링 솔루션입니다.

Polygon은 분산화를 손상시키지 않고 기존 개발자 커뮤니티와 생태계를 활용하면서 확장성과 유용성 문제를 해결하기 위해 노력합니다. dapps와 사용자 기능성에 대한 확장 및 우수한 사용자 경험을 제공함으로써 기존 플랫폼을 개선하는 것을 목표로 합니다.

이는 공개 블록 체인을 위한 스케일링 솔루션입니다. Polygon PoS는 더욱 빠르고 저렴한 트랜잭션과 함께 모든 기존 이더리움 도구를 지원합니다.

## 주요 기능 및 하이라이트 {#key-features-highlights}

- **확장성**: 최초로 호환 가능한 레이어 1 기본 체인으로 메인 체인 및 이더리움에 성공한 완결성을 갖춘 Polygon 사이드체인에 대한 빠르고 저렴하며 안전한 트랜잭션.
- **높은 처리량**: 내부 테스트넷에서 단일 사이드체인에 대해 최대 10,000TPS 달성, 수평 스케일링을 위해 추가할 복수 체인.
- **사용자 경험**: 메인 체인에서 Polygon 체인까지 부드러운 UX 및 개발자 추상화, 네이티브 모바일 앱 및 WalletConnect를 지원하는 SDK.
- **보안**: Polygon 체인 운영자들은 스스로 PoS 시스템 내에서 스테이커입니다.
- **공개 사이드체인**: Polygon 사이드체인은 본질적으로 공개(개별 DApp 체인과 달리)되어 있으며, 허가가 필요 없고 복수 프로토콜을 지원할 수 있는 능력이 있습니다.

Polygon 시스템은 Polygon 사이드체인에 대한 임의 상태 전환을 지원하도록 의도적으로 설계되었으며, EVM을 기반으로 합니다.

## 위임자 및 유효성 검사자 역할 {#delegator-and-validator-roles}

귀하는 위임자 또는 유효성 검사자로 Polygon 네트워크에 참여할 수 있습니다. 참조:

* [유효성 검사자란?](/docs/maintain/polygon-basics/who-is-validator)
* [위임자란?](/docs/maintain/polygon-basics/who-is-delegator)

## 아키텍쳐 {#architecture}

유효성 검사자를 목표로 한다면, Polygon 아키텍쳐를 이해하는 것은 필수입니다.

자세한 정보는 [Polygon 아키텍쳐](/docs/maintain/validator/architecture)를 확인하세요.

### 구성 요소 {#components}

Polygon의 아키텍쳐를 세부적으로 이해하려면 다음의 핵심 구성 요소를 확인하세요.

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

유효성 검사자 및 위임자 프로필에 대해 스테이킹 프로세스가 수행되는 방법을 확인하시기 바랍니다.

* [유효성 검사자 스테이킹 운영](docs/maintain/validate/validator-staking-operations)
* [위임](/docs/maintain/delegate/delegate)
