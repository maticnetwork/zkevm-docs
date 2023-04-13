---
id: staking
title: 스테이킹
sidebar_label: Staking
description: 유효한 레이터로 스테이크, 스테이크, 스테이크 및 레스테이크
keywords:
  - docs
  - matic
  - polygon
  - staking
  - unstake
  - restake
  - validator
slug: staking
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon 네트워크에서는 참여자 누구나 전체 노드를 실행하여 보상을 얻고 트랜잭션 수수료를 징수하면 Polygon의 유효성 검사자가 될 수 있습니다. 유효성 검사자들은 적극적인 참여를 보장하기 위해 자신의 일부 매틱 토큰을 이 생태계의 스테이크로 락업합니다.

Polygon 네트워크의 유효성 검사자는 정기적으로 개최되는 온체인 경매 프로세스를 통해 선정됩니다.

유효성 검사자는 소유자 주소와 서명자 주소라는 두 가지 주소를 갖고 있습니다. 스테이킹은 소유자 주소를 이용해 수행합니다.

[키 관리](key-management.md)도 참조해 주세요.

## 스테이크 {#stake}

:::note

현재는 새로운 유효성 검사자를 수용할 공간이 제한되어 있습니다.

새로운 유효성 검사자는 현재 활성 상태인 유효성 검사자가 언본딩할 때만 활성 세트에 참여할 수 있습니다.

:::

유효성 검사자 세트에 참여하기 위해서는 매틱 토큰을 스테이크하셔야 합니다. [유효성 검사자 스테이킹 작업](/docs/maintain/validate/validator-staking-operations)을 참조해 주세요.

## 스테이크 해제 {#unstake}

스테이크를 해제하면 유효성 검사자가 활성 상태의 유효성 검사자 풀에서 나올 수 있습니다.

적극적인 참여를 보장하기 위해 유효성 검사자 스테이크는 80개 체크포인트만큼 락업 상태를 유지합니다.

## 재스테이크 {#restake}

유효성 검사자는 다음과 같은 목적으로 자신의 스테이크에 매틱 토큰을 더 많이 추가할 수 있습니다.

* 보상을 더 많이 얻기 위해
* 유효성 검사자 세트에서 지위를 유지하기 위해
