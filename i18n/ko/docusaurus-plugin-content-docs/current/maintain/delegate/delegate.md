---
id: delegate
title: 위임 방법
description: Polygon 네트워크에서 위임자가 되는 방법을 살펴보세요.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# 위임 방법 {#how-to-delegate}

Polygon 네트워크에서 [위임자](/docs/maintain/glossary.md#delegator) 가 될 수 있도록 도와주는 단계별 가이드입니다.

유일한 전제 조건은 이더리움 메인넷 주소에 매틱 토큰과 ETH가 있어야 합니다.

## 대시보드 액세스 {#access-the-dashboard}

1. 지갑(예: 메타 마스크)에서 이더리움 메인넷을 선택하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. [Polygon](https://staking.polygon.technology/) 스테이킹에 로그인하십시오.
3. 로그인하면 유효한 개발자 목록과 함께 전체 통계를 볼 수 있습니다.

![img](/img/staking/home.png)

:::note

유효한 경우 다른 비검증 주소를 사용하여 대표자로 로그인하십시오.

:::

## 유효성 검사자에게 위임 {#delegate-to-a-validator}

1. **위임자 되기**를 클릭하거나 특정 유효성 검사자로 스크롤한 다음  **위임**을 클릭하세요.

![img](/img/staking/home.png)

2. 위임할 매틱의 양을 입력하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. 위임 트랜잭션을 승인하고 **위임**을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

위임 트랜잭션이 완료되면, **위임 완료** 메시지가 표시됩니다.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## 내 위임 보기 {#view-your-delegations}

위임을 보려면, [내 계정](https://staking.polygon.technology/account)을 클릭하세요.

![img](/img/staking/myAccount.png)

## 보상 인출 {#withdraw-rewards}

1. [내 계정](https://staking.polygon.technology/account)을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. 위임된 유효성 검사자에서, **보상 인출**을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

그러면 당신의 이더리움 주소로 매틱 토큰 보상이 인출됩니다.

## 재스테이크 보상 {#restake-rewards}

1. [내 계정](https://staking.polygon.technology/account)을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. 위임된 유효성 검사자에서, **재스테이크 보상**을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

이를 사용하면 유효한 자에게 MATIC 토큰의 보상을 다시 확인하고 대표단 지분을 늘릴 수 있습니다.

## 유효성 검사자로 부터 연결 해제 {#unbond-from-a-validator}

1. [내 계정](https://staking.polygon.technology/account)을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. 위임된 유효성 검사자에서, **연결 해제**를 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

이 경우 유효자의 보상을 철회할 수 있습니다.

귀하의 철회 된 보상은 이더리움 계정에 즉시 표시됩니다.

인출된 스테이크 자금은 80개의 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction)로 락업됩니다.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

네트워크에 악의적인 행위가 없도록 보증하기 위해 연결 해제 기간 동안 스테이크 잠금이 시행됩니다.

:::

## 노드에서 노드로 스테이크 이동 {#move-stake-from-one-node-to-another-node}

노드에서 노드로 스테이크 이동하는 것은 단일 트랜잭션입니다. 이 이벤트 중에는 지연 또는 연결 해제 기간이 없습니다.

1. 스테이킹 대시보드에서 [내 계정](https://wallet.polygon.technology/staking/my-account)에 로그인하세요.
1. 위임된 유효성 검사자에서 **스테이크 이동**을 클릭하세요.
1. 외부 유효성 검사자를 선택하고 **여기에 스테이크**를 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. 스테이크 금액을 입력하고 **스테이크 이동**을 클릭하세요.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

그러면 스테이크가 이동됩니다. 12개의 블록 확인 후 대시보드가 업데이트됩니다.

:::info

모든 노드 사이에 이동 지분을 허용합니다. 유일한 예외는 한 재단 노드에서 허용되지 않는 다른 재단 노드로 지분을 옮기는 것입니다.

:::
