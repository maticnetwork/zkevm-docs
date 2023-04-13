---
id: proposers-producers-selection
title: 제안자 및 생산자 선택
sidebar_label: Proposers & Producers
description: Polygon에서 Proposer 및 Block 사용자 선택 차단 제안 및 Block
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

BOR 레이어의 블록프로듀서는 정기적으로 발생하는 스테이크를 기준으로 유효성 검사자 풀에서 선정된 집단입니다. 선정 간격은 다이너스티 및 네트워크와 관련하여 유효성 검사자의 거버넌스에 의해 결정됩니다.

[블록프로듀서](/docs/maintain/glossary.md#block-producer) 집단의 구성원으로 선택될 확률은 [스테이크](/docs/maintain/glossary.md#staking) 의 비율에 따라 결정됩니다.

## 선택 프로세스 {#selection-process}

풀에 Alice, Bill 및 Clara라는 세 명의 유효성 검사자가 있다고 가정해 봅시다:

* Alice는 100 매틱 토큰을 스테이킹합니다.
* Bill은 40 매틱 토큰을 스테이킹합니다.
* Clara는 40 매틱 토큰을 스테이킹합니다.

유효성 검사자에게는 스테이크에 따라 슬롯이 제공됩니다.

Alice는 100개의 매틱 토큰을 보유하고 있으며, 슬롯당 비용은 유효성 검사자의 거버넌스에 의해 유지되는 10개의 매틱 토큰이기 때문에 Alice는 총 5개의 슬롯을 얻게 됩니다. 마찬가지로, Bill과 Clara는 총 2개의 슬롯을 얻습니다.

Alice, Bill 및 Clara 유효성 검사자에게는 다음 슬롯이 제공됩니다:

* [A, A, A, A, A, B, B, C, C]

그런 다음 Polygon은 이더리움 블록 해시를 시드로 사용하여 Alice, Bill 및 Clara 슬롯의 배열을 섞습니다.

셔플의 결과는 다음과 같은 슬롯 배열입니다:

* [A, B, A, A, C, B, A, A, C]

이제 유효성 검사자의 거버넌스에 의해 유지되는 총 블록프로듀서 수에 따라 Polygon은 위에서부터 유효성 검사자를 선택합니다. 5명의 프로듀서 세트에 대한 슬롯의 배열은 [A, B, A, A, C]입니다.

다음 범위에 대한 프로듀서 세트는 [A: 3, B:1, C:1]입니다.

선장된 검증기 세트와 Tendermint의 [제안자 선택 알고리즘](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)을 사용하여 Polygon은 Bor에서 모든 스프린트에 대한 프로듀서를 선택합니다.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**전설:**

* 다이너스티: 마지막 경매가 끝나고 다음 경매가 시작될 때까지의 시간입니다.
* 스프린트: 블록 프로듀서 집단이 선택되는 시간 간격입니다.
* 스팬: 단일 프로듀서가 생성한 블록 수입니다.
