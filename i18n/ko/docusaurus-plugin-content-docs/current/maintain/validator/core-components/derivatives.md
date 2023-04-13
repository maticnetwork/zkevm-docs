---
id: derivatives
title: 파생상품
description: 유효자 주식을 통해 대표단은 위임
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon은 유효성 검사자 공유를 통한 [위임](/docs/maintain/glossary#delegator)을 지원합니다. 이 디자인을 사용하면 이더리움 메인넷 계약에서 상당 규모의 보상과 슬래시를 복잡한 계산 없이 쉽게 분배할 수 있습니다.

위임자는 유효성 검사자로부터 한정된 풀의 지분을 구입하여 위임합니다. 각 유효성 검사자는 자체 유효성 검사자 지분을 갖고 있습니다.

유효성 검사자 A를 위해 대체 가능한 유효성 검사자 지분을 배틱이라고 부르겠습니다. 사용자가 유효성 검사자 A에 위임하면 사용자에게 매틱-배틱 쌍의 환율에 따라 배틱이 발급됩니다. 사용자가 가치를 창출하면 환율은 사용자가 각 배틱에 대해 더 많은 매틱을 인출할 수 있음을 나타냅니다. 유효성 검사자가 슬래시되면 사용자는 배틱에 대해 매틱을 덜 인출합니다.

매틱은 스테이킹 토큰이라는 점에 유의하세요. 위임자가 위임에 참여하려면 매틱 토큰이 있어야 합니다.

처음에 위임자 D는 환율이 1 배틱당 1 매틱일 때 유효성 검사자 A의 특정 풀에서 토큰을 구매합니다.

유효성 검사자가 더 많은 매틱 토큰으로 보상을 받으면 새 토큰이 풀에 추가됩니다.

현재 100개의 매틱 토큰 풀에서 10개의 매틱 보상이 풀에 추가된다고 가정해 보겠습니다. 환상으로 인해 VATIC 토큰의 총 공급이 바뀌지 않았기 때문에 환율은 0.9 VATIC에 당 1인 매틱이 됩니다. 이제 대표자 D는 주식을 사용하면 동일한 금액에 대해 더 많은 MATIC를 받습니다.

## 계약의 흐름 {#the-flow-in-the-contract}

`buyVoucher`: 이 기능은 유효성 검사자에게 위임 프로세스를 수행할 때 발생합니다. 위임자 `_amount`은(는) 먼저 `stakeManager`에게 전송되며, 확인되면 현재 `exchangeRate`을(를) 사용하여 `Mint`을(를) 통해 위임자 공유 토큰을 생성합니다.

환율은 다음 공식에 따라 계산됩니다:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: 위임자가 유효성 검사자로부터 언본딩할 때 호출되는 기능입니다. 이 기능은 기본적으로 위임 중에 구입한 바우처를 판매하는 프로세스를 시작합니다. 위임자가 토큰을 `claim`하기 전에 고려해야 할 인출 기간이 있습니다.

`withdrawRewards`: 위임자는 `withdrawRewards` 기능을 호출하여 보상을 청구할 수 있습니다.

`reStake`: 재스테이킹은 두 가지 방식으로 작동됩니다: a) 위임자는 `buyVoucher` 또는 `reStake` 보상을 사용하여 더 많은 지분을 구입할 수 있습니다. 유효성 검사자에게 더 많은 토큰을 스테이킹하여 재스테이킹하거나, 위임자로서 누적된 보상을 재스테이킹할 수 있습니다. `reStaking`의 목적은 위임자의 유효성 검사자가 이제 더 많은 적극적인 스테이크를 가지고 있기 때문에, 더 많은 보상을 얻을 것이고 위임자도 그럴 것입니다.

`unStakeClaimTokens`: 인출 기간이 끝나면 주식을 판 위임자는 지분을 청구할 수 있습니다.

`updateCommissionRate`: 유효성 검사자에 대한 수수료 %를 업데이트합니다. [유효성 검사자 수수료 운영](/docs/maintain/validate/validator-commission-operations)도 참조하세요.

`updateRewards`: 유효성 검사자가 [체크포인트](/docs/maintain/glossary#checkpoint-transaction) 제출에 대한 보상을 받으면, 이 기능은 유효성 검사자와 위임자 간의 보상 지급에 대해 호출됩니다.
