---
id: responsibilities
title: 책임
description: Polygon 네트워크에서 유효한 책임
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 최신 정보 받기

Polygon [알림 그룹에](https://polygon.technology/notifications/) 가입하여 Polygon 팀과 커뮤니티에서 최신 노드 및 유효 업데이트 업데이트를 유지합니다.

:::

블록체인 유효성 검사자는 블록체인 내에서 트랜잭션 유효성 검사를 담당하는 사람입니다. Polygon 네트워크에서 어떤 참가자는 보상을 받고 트랜잭션 수수료를 징수하기 위해 **유효성 검사자 노드(Sentry + Palator)를** 실행하여 Polygon의 유효성 검사를 받을 수 있습니다. 유효성 검사자의 적극적인 참여를 보장하기 위해 생태계에 스테이크로 최소 1개의 매틱 토큰을 락업합니다.

:::info

현재 한 번에 100명의 활성 유효성 검사자가 제한되어 있습니다. 유효한 것에 대한 자세한 설명은 [유효성](/maintain/validator/architecture) 검사기를 참조하십시오.

또한 계약 수준에서 [<ins>PIP4 거버넌스 제안이</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) 구현된 후, 최소 스테이킹 금액이 10,000인 MATIC로 증가할 것입니다.

:::

Polygon 네트워크의 모든 [유효성 검사자](/maintain/glossary.md#validator)에게는 다음과 같은 책임이 있습니다.

* 기술 노드 작업(노드가 자동으로 완료)
* 작업
  * 가동 시간을 높게 유지
  * 매일 노드 관련 서비스 및 프로세스 확인
  * 노드 모니터링 실행
  * 서명자 주소에 ETH의 밸런스를 유지하십시오 (0.5에서 1)
* 위임
  * 대표단에 열려 있습니다.
  * 수수료율 알리기
* 소통
  * 문제에 대해 소통하기
  * 피드백과 제안 사항 제공
* 블록체인에 대한 유효성 검사 블록에 대한 Earn 스테킹 보상

## 기술적인 노드 작업 {#technical-node-operations}

다음 기술 노드 작업은 **노드가 자동으로 수행됩니다.**

* 블록프로듀서 선택:
  * 각 [스팬](/docs/maintain/glossary.md#span)에 대해 블록프로듀서 세트에 대한 유효성 검사자 하위 세트를 선택합니다.
  * 각 스팬에 대해 [Heimdall](/maintain/glossary.md#heimdall)에서 다시 블록프로듀서 세트를 선택하고 정기적으로 이러한 선택 정보를 [Bor](/maintain/glossary.md#bor)에 전송합니다.
* Bor에서 블록 유효성 검사:
  * Bor 사이드체인 블록 세트의 경우, 각 유효성 검사자는 독립적으로 이러한 블록의 블록 데이터를 읽고 Heimdall에서 데이터 유효성을 검사합니다.
* 체크포인트 제출:
  * 각 Heimdall 블록에 대한 유효성 검사자 중에서 [제안자](/maintain/glossary.md#proposer)가 선택됩니다. 이 [체크포인트](/maintain/glossary.md#checkpoint-transaction) 제안자가 Bor 블록 데이터의 체크포인트를 생성하고, 유효성을 검사하며, 다른 유효성 검사자들이 동의하도록 서명된 트랜잭션을 브로드캐스트합니다.
  * 활성 상태인 유효성 검사자의 2/3를 초과하는 수가 체크포인트에 대한 합의에 도달하면 이 체크포인트는 이더리움 메인넷에 제출됩니다.
* 이더리움에서 Polygon 스테이킹 계약에 대한 변경 내용 동기화:
  * 체크포인트 제출 스텝부터 계속하는데, 이 단계는 외부 네트워크 콜이므로 이더리움의 체크포인트 트랜잭션은 확인이 되거나 안 될 수도 있고 이더리움 혼잡 문제로 인해 보류될 수도 있습니다.
  * 이런 경우 다음 체크포인트에 이전 Bor 블록의 스냅숏도 포함되도록 `ack/no-ack` 프로세스가 이어집니다. 예를 들어, 체크포인트 1이 Bor 블록 1~256에 대한 것이고 어떤 이유로 실패했다면 그 다음 체크포인트 2는 Bor 블록 1~512에 대한 것이 됩니다. [Heimdall 아키텍쳐: 체크포인트](/pos/heimdall/checkpoint)도 참조하세요.
* 이더리움 메인넷에서 Bor 사이드체인으로 상태 동기화:
  * 계약 상태는 [Bor](/maintain/glossary.md#bor)를 통해서 이더리움과 Polygon 간에 이동할 수 있습니다.
  * 이더리움의 DApp 계약은 이더리움의 특수한 Polygon 계약 기능을 필요로 합니다.
  * 해당되는 이벤트는 Heimdall에 이어 Bor에 차례로 전달됩니다.
  * 상태 동기화 트랜잭션이 Polygon 스마트 계약에서 호출되고 DApp은 Bor 자체의 기능 콜을 통해 Bor에 대한 값을 얻을 수 있습니다.
  * Polygon에서 이더리움으로 상태를 보내는 데도 비슷한 메커니즘이 사용됩니다. [상태 동기화 메커니즘](/docs/pos/state-sync/state-sync)도 참조하세요.

## 작업 {#operations}

### 가동 시간을 높게 유지 {#maintain-high-uptime}

Polygon 네트워크의 노드 가동 시간은 유효성 검사 노드가 서명한 [체크포인트 트랜잭션](/docs/maintain/glossary.md#checkpoint-transaction)의 수를 기반으로 합니다.

대략 34분마다 제안자는 이더리움 메인넷에 체크포인트 트랜잭션을 제출합니다. Polygon 네트워크의 모든 [유효한 검사자가](/maintain/glossary.md#validator) 검문트랜잭션을 서명해야 합니다. **검사자 노드 성능의 저하를 초래합니다**.

체크포인트 트랜잭션에 서명하는 프로세스는 자동화되어 있습니다. 유효성 검사 노드가 유효한 모든 체크포인트 트랜잭션에 서명하도록 하려면 노드 상태를 모니터하고 유지 관리해야 합니다.

### 노드 서비스와 프로세스를 매일 확인 {#check-node-services-and-processes-daily}

[Heimdall](/maintain/glossary.md#heimdall) 및 [Bor와](/maintain/glossary.md#bor) 관련된 서비스와 프로세스를 매일 확인해야 합니다. 또한, 디스크 사용을 줄이기 위해 노드의 자갈을 정기적으로 수행해야 합니다.

### 노드 모니터링 실행 {#run-node-monitoring}

다음 중 하나를 실행해야 합니다.

* Polygon이 제공하는 Grafana 대시보드를 실행합니다. GitHub 저장소를 참조하십시오. [matic-Jagar 설정을](https://github.com/vitwit/matic-jagar) 확인하십시오.
* 또는, [유효성 검사자](/maintain/glossary.md#validator) 및 [엔트리](/maintain/glossary.md#sentry) 노드에 대한 자신의 모니터링 도구를 사용하십시오
* 노드가 요청 한도 내에 있는지 확인하기 위해 노드에서 사용되는 이더리움 끝점 를 모니터링해야 합니다

### ETH 잔액 유지 {#keep-an-eth-balance}

Ethere Mainnet에서 유효한 개발자 [표지자](/maintain/glossary.md#signer-address) 주소에서 EthH (항상 임계 값 즉, 0.5에서 1)를 유지해야 합니다.

다음과 같은 작업을 위해 ETH가 필요합니다.

* 이더리움 메인넷에서 제안된 [체크포인트 트랜잭션](/maintain/glossary.md#checkpoint-transaction)에 서명할 때
* 이더리움 메인넷에서 체크포인트 트랜잭션을 제안하고 보낼 때

서명자 주소에 적절한 금액의 ETH를 유지하지 않으면 다음과 같은 결과가 나타납니다.

* 체크포인트 제출이 지연됩니다. 이더리움 네트워크에서 트랜잭션 가스 가격은 변동하며 급격히 오를 수도 있으니 주의하세요.
* 체크포인트에 포함된 트랜잭션의 최종 결과가 지연됩니다.
* 이후의 체크포인트 트랜잭션이 지연됩니다.

## 위임 {#delegation}

### 위임에 대해 개방적일 것 {#be-open-for-delegation}

모든 유효한 사람은 커뮤니티의 대표단을 위해 열려 있어야합니다. 각 유효성 검사자는 수수료율을 직접 설정할 수 있습니다. 수수료율에 정해진 상한선은 없습니다.

### 수수료율 알리기 {#communicate-commission-rates}

인증자의 도덕적 의무이며, 커미션율 변경을 지역 사회에 알리는 것은 유효하다. 수수료율을 알리는데 선호되는 플랫폼은 다음과 같습니다.

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## 소통 {#communication}

### 문제에 대해 소통하기 {#communicate-issues}

가능한 한 빨리 문제를 전달하면 커뮤니티와 Polygon 팀이 가능한 한 빨리 문제를 수정할 수 있습니다. 수수료율을 알리는데 선호되는 플랫폼은 다음과 같습니다.

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### 피드백과 제안 사항 제공 {#provide-feedback-and-suggestions}

Polygon에서 유효자 생태계의 어떤 측면에 대한 귀하의 피드백과 제안을 소중히 생각합니다. [Forum](https://forum.polygon.technology/)에서 자유롭게 피드백과 제안 사항을 알려주시기 바랍니다.
