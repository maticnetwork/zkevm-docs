---
id: who-is-validator
title: 유효성 검사자란 무엇인가요?
sidebar_label: Who is a Validator
description: "Heimdall 및 Bor 노드를 실행하는 네트워크 참여자입니다."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

유효성 검사기는 시스템에서 MATIC 토큰을 잠그고 Heimdall 유효성 검사자 및 Bor 블록 프로듀서 노드를 실행하는 네트워크의 참가자입니다. 유효성 검사자는 자신의 매틱 토큰을 담보로 하여 네트워크 보안에 기여하고, 이러한 서비스의 대가로 보상을 얻습니다.

보상은 모든 체크포인트에서 보유한 스테이크 비율에 따라 모든 스테이커에게 분배되며 제안자의 경우 예외적으로 추가 보너스를 받습니다. 사용자 보상 잔액은 보상 청구 시 참조되는 계약에서 업데이트됩니다.

유효성 검사 노드가 이중 서명과 같이 악의적인 행위를 한 경우에는 스테이크가 슬래싱될 위험이 있으며 해당 체크포인트에서 연결된 위임자 또한 영향을 받게 됩니다.

:::tip

네트워크를 확보하고 있지만 전체 노드를 실행하는 데 관심이 있는 사람들은 [대표단으로](/docs/maintain/glossary.md#delegator) 참여할 수 있습니다.

:::

## 개요 {#overview}

Polygon 네트워크의 유효성 검사자는 정기적으로 개최되는 온체인 경매 프로세스를 통해 선정됩니다. 이렇게 선정된 유효성 검사자들은 블록프로듀서 및 확인자로 참여하게 됩니다. 참여자가 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction)의 유효성을 검사하고 나면 상위 체인인 이더리움 메인넷에 업데이트 정보가 입력되고 그 결과 네트워크에서 보유하고 있는 스테이크에 따라 유효성 검사자들에게 보상이 제공됩니다.

Polygon은 일련의 [유효성 검사자들](/docs/maintain/glossary.md#validator)에 의지하여 네트워크 보안을 유지합니다. 유효성 검사자의 역할은 전체 노드 실행, [블록 생성](/docs/maintain/glossary.md#block-producer), 유효성을 검사하고 합의에 참여, 이더리움 메인넷에서 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction) 제공 등입니다. 유효성 검사자가 되려면 이더리움 메인넷에 있는 스테이킹 관리 계약에 따라 자신의 매틱 토큰을 [스테이크](/docs/maintain/glossary.md#staking)해야 합니다.

## 핵심 구성 요소 {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall)은 스테이킹 계약에 명시된 이벤트를 읽고 업데이트된 스테이크 비율에 따라 현재 세트를 위한 유효성 검사자를 선택합니다. 업데이트된 스테이크 비율은 [Bor](/docs/maintain/glossary.md#bor)가 블록을 생성할 때도 사용됩니다.

스테이킹 계약에는 [위임](/docs/maintain/glossary.md#delegator)도 기록되며 유효성 검사자 권한이나 노드 [서명자 주소](/docs/maintain/glossary.md#signer-address) 또는 언본딩 요청에 업데이트가 있을 경우에는 다음 체크포인트가 제공될 때 효력을 발휘하게 됩니다.


## Polygon 유효성 검사자 역할의 전체 흐름 {#end-to-end-flow-for-a-polygon-validator}

유효성 검사자는 서명 노드를 설정하고 데이터를 동기화한 다음 현재 세트에서 유효성 검사자로 수락되기 위해 이더리움 메인넷 스테이킹 계약에 자신의 토큰을 스테이크합니다. 자리가 비어 있으면 유효성 검사자로 즉시 수락됩니다. 그렇지 않으면 대체 메커니즘을 통해 자리를 확보해야 합니다.

:::warning

새로운 유효성 검사자를 수용할 수 있는 공간은 제한되어 있습니다. 현재 활성 상태인 유효성 검사자가 언본드할 때만 새로운 유효성 검사자가 활성 세트에 참여할 수 있습니다. 유효성 검사자 교체를 위한 새로운 경매 프로세스가 실시될 것입니다.

:::

유효성 검사자 세트 중에서 블록프로듀서가 선정되며, 이렇게 선정된 유효성 검사자는 특정 [범위](/docs/maintain/glossary.md#span)에 대해 블록을 생성할 책임이 있습니다.

Heimdall의 노드는 생성되는 블록의 유효성을 검사하고, 합의에 참여하며, 지정된 주기마다 이더리움 메인넷에서 체크포인트를 제공합니다.

유효성 검사자가 블록프로듀서나 체크포인트 [제안자](/docs/maintain/glossary.md#proposer)로 선정될 가능성은 전체 풀에서의 위임을 포함하여 보유한 스테이크 비율에 달려 있습니다.

유효성 검사자는 모든 체크포인트에서 보유한 스테이크 비율에 따라 보상을 받는데, 이때 체크포인트 제안자에게 지불되는 제안자 보너스는 차감하고 받게 됩니다.

유효성 검사자는 언제든지 시스템에서 나갈 수 있고 언본딩 기간이 끝나면 토큰을 인출할 수 있습니다.

## 경제적 측면 {#economics}

[보상](/docs/maintain/validator/rewards)을 참조해 주세요.

## 유효성 검사 노드 설정 {#setting-up-a-validator-node}

[유효성 검사](/docs/maintain/validate/validator-index)를 참조해 주세요.

## 기타 참조 자료 {#see-also}

* [유효성 검사자 책임](/docs/maintain/validate/validator-responsibilities)
* [유효성 검사](/docs/maintain/validate/validator-index)
* [유효성 검사자 FAQ](/docs/maintain/validate/faq/validator-faq)
