---
id: getting-started
title: PoS 브리지
sidebar_label: Introduction
description: Polygon PoS의 유연성과 빠른 출금
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

시작하려면 [PoS에 대한 최신 Matic.js 문서](../matic-js/get-started.md)를 확인하세요.

브리지는 기본적으로 루트 체인에서 하위 체인으로 자산을 이동하도록 돕는 일련의 계약입니다. 이더리움과 Polygon 사이에 자산을 이동하는 두 개의 주요 브리지가 있습니다. 첫 번째는 Plasma 브리지이며, 두 번째는 **PoS 브리지** 또는 **스테이크 브리지의** 증거라고 부릅니다. **플라스마 브리지**는 플라스마 종료 메커니즘 덕분에 향상된 보안을 제공합니다.

하지만 하위 토큰은 특정 제한 사항이 있으며, 플라스마 브리지에는 Polygon에서 이더리움으로의 모든 종료/출금과 관련한 7일간의 출금 기간이 있습니다.

이는 **유연성**과 **빠른 출금**이 필요하며 강력한 외부 검증자로 안전하게 보호되는 Polygon 지분증명 브리지가 제공하는 보안 수준에 만족하는 dApp/사용자에게는 상당히 고통스러운 일입니다.

지분증명 기반의 자산은 체크포인트 간격 한 번으로 PoS 보안 및 신속한 종료가 가능합니다.

## PoS 브리지 사용 단계 {#steps-to-use-the-pos-bridge}

문서의 이 섹션에 들어가기 전에 교량을 사용하려고 하는 동안 그들과 상호 작용할 수 있는 몇 가지 조건에 대한 철저한 이해를 도울 수 있습니다. [Mapping과](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) [스테이트 동기화 메커니즘을 사용하여 매핑과 스테이트 동기화 메커니즘을](https://docs.polygon.technology/docs/pos/state-sync/state-sync/) 사용합니다.

그런 다음 PoS 브리지를 사용하는 첫 번째 단계는 **루트 토큰** 토켄과 **아동** 토큰을 매핑하는 것입니다. 루트 체인에서 토큰 계약이 root 계약을 통해 해당 자산을 자신의 자산을 이전하기 위해 연결 (매핑)를 유지해야 한다는 것을 의미합니다. 매핑 요청을 제출하는 데 관심이 있으시면 [이 가이드를](/docs/develop/ethereum-polygon/submit-mapping-request/) 사용하여 해보세요.

낮은 수준과 자세한 내용은 다음과 같습니다.

### 입금 {#deposit}

  1. 자산 **(ERC20/ERC721/ERC1155)** 토큰의 소유자는 이전할 토큰의 양을 지출하기 위해 PoS 브리지에 대한 특정 계약을 승인해야 합니다. 이 특정 계약을 **조건자 계약**(이더리움 네트워크에 배포)이라고 하며, 실제로 **입금될 토큰의 양을 제한**합니다.
  2. 승인되면 다음 단계는 **자산을 입금**하는 것입니다. `RootChainManager`계약에서 함수 호출을 해야 하며, 차례로 Polygon 체인에서 계약을 트리거하는 경우 kygon 체인에 대한 `ChildChainManager`계약을 트리거합니다.
  3. 이는 상태 동기화 메커니즘을 통해 이루어지며, 자세한 내용은 [여기](/docs/pos/state-sync/state-sync/)에서 확인할 수 있습니다.
  4. `ChildChainManager`내부적으로 아동 토큰의 계약의 `deposit`기능과 해당 자산 토큰의 양이 **사용자의 계정에** 채굴됩니다. 어린이 토큰 계약에서 `deposit`기능에 액세스 할 `ChildChainManager`수 있다는 점에 유의하는 것이 중요합니다.
  5. 사용자가 토큰을 얻으면 **소정의 수수료로 Polygon 체인에서 거의 즉시 토큰을 전송할 수 있습니다**.

### 출금 {#withdrawals}

  1. Eythema로 다시 돌아오면 자산 토큰을 **Polygon 체인에서 먼저 번갈아 내야** 하는 2단계 프로세스인 다음 **이 번 트랜잭션 증명을** Eygon 체인에서 제출해야 합니다.
  2. 소각 트랜택션이 이더리움 체인에 체크포인트로 지정되는 데 약 20분~3시간이 소요됩니다. 이 작업은 지분증명 검증자가 수행합니다.
  3. 트랜잭션을 체크포인트에 추가하면 Eythum의 `RootChainManager`계약에 대한 증거를 제출할 수 `exit`있습니다.
  4. 이 함수 호출은 **체크포인트 포함을 확인**한 후 자산이 처음 입금될 때 자산 토큰을 잠근 조건자 계약을 트리거합니다.
  5. 최종 단계로서 **예측 계약이 잠긴 토큰을** 출시하고 이더리움에서 사용자 계정에 대한 정보를 사용자에게 돌려줍니다.

:::tip

매핑이 완료되면 **matic.js SDK**를 사용하여 계약과 상호작용하거나 SDK 없이 동일한 작업을 수행할 수 있습니다. 그러나 matic.js SDK는 자산 전송 메커니즘을 모든 애플리케이션과 손쉽게 통합할 수 있도록 매우 사용하기 쉬운 방식으로 설계되었습니다.

:::