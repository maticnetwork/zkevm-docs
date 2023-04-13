---
id: validator-index
title: 유효성 검사자 인덱스
description: Polygon 네트워크에서 유효한 노드를 실행하고 운영하는 방법에 대한 지침의 모음집
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 최신 정보 받기

Polygon [알림에](https://polygon.technology/notifications/) 가입하여 Polygon 팀과 커뮤니티에서 최신 노드 및 유효성 업데이트를 계속 유지합니다.

:::

유효성 검사자는 Polygon 네트워크를 유지하는 데 중요한 역할을 합니다. 유효성 검사자는 전체 노드를 실행하고 매틱을 활용하여 블록을 생성하고, 검증하고, PoS 합의에 참여함으로써 네트워크를 보호합니다.
활용하여 블록을 생성하고 검증하고 PoS 합의에 참여함으로써 네트워크를 보호합니다.

:::info

새로운 유효성 검사자를 수용할 수 있는 공간은 제한되어 있습니다. 현재 활성 상태인 유효성 검사자가 언본드할 때만 새로운 유효성 검사자가 활성 세트에 참여할 수 있습니다.

유효성 검사자 교체를 위한 새로운 경매 프로세스가 실시될 것입니다.

:::

## 개요 {#overview}

Polygon은 다음 세 가지 계층으로 구성됩니다:

* 이더리움 계층 — 이더리움 메인넷에 있는 일련의 계약입니다.
* Heimdall 층 — 이더리움 메인넷과 병렬로 실행되는 인련의 스테이크 증명 Heimdall 노드로서, 이더리움 메인넷에 배포된 스테이킹 계약 세트를 모니터링하고, Polygon 네트워크 체크포인트를 이더리움 메인넷에 제공합니다. Heimdall은 Tendermint를 기반으로 합니다.
* Bor 계층 — Heimdall 노드가 뒤섞인 일련의 블록 생성 Bor 노드입니다. Bor는 Go 이더리움에 기반을 두고 있습니다.

Polygon 네트워크에서 유효성 검사자가 되려면 다음을 실행해야 합니다:

* 센트리 노드 - Heimdall 노드와 Bor 노드를 실행하는 별도의 시스템입니다. 센트리 노드는 Polygon 네트워크의 모든 노드에 열려 있습니다.
* 유효성 검사 노드 - Heimdall 노드와 Bor 노드를 실행하는 별도의 시스템입니다. 유효성 검사 노드는 해당 센트리 노드에만 열려 있고 네트워크의 나머지 부분에는 닫혀 있습니다.
* 이더리움 메인넷에 배포된 스테이킹 계약에 매틱 토큰을 스테이크합니다.

## 구성 요소 {#components}

### Heimdall {#heimdall}

Heimdall은 다음을 수행합니다:

* 이더리움 메인넷에서 스테이킹 계약을 모니터링합니다.
* Bor 체인에서 모든 상태 트랜잭션을 확인합니다.
* 이더리움 메인넷에 Bor 체인 상태 체크포인트를 커밋합니다.

Heimdall은 Tendermint를 기반으로 합니다.

:::info 기타 자료

* GitHub 리포지토리: [Heimdall](https://github.com/maticnetwork/heimdall)
* GitHub 리포지토리: [스테이킹 계약](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* 블로그 게시글: [Heimdall 및 Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor는 다음을 합니다:

* Polygon 네트워크에서 블록을 생성합니다.

Bor는 Polygon 네트워크의 블록 프로듀서 노드 및 레이어입니다. 그것은 Go Eyemum에 기반합니다. Bor에서 생성된 블록은 Heimdall 노드에 의해 검증됩니다.

:::info 기타 자료

* GitHub 리포지토리: [Bor](https://github.com/maticnetwork/bor)
* 블로그 게시글: [Heimdall 및 Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

이 섹션에서는 다음 항목을 안내합니다:

* [유효성 검사자 책임](validator-responsibilities.md)
* 유효성 검사자로 네트워크에 참여:
  * [Ansible로 노드 시작 및 실행](run-validator-ansible.md)
  * [바이너리로 노드 시작 및 실행](run-validator-binaries.md)
  * [유효성 검사자자로 스테이크](validator-staking-operations.md)
* 유효성 검사 노드 유지:
  * [서명자 주소 변경](change-signer-address.md)
  * [수수료 변경](validator-commission-operations.md)

커뮤니티 지원:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
