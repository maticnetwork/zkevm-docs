---
id: proposer-bonus
title: 제안자 보너스
description: 검증자가 되는 추가 인센티브
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 제안자 보너스 {#proposer-bonus}

Polygon에서는 이더리움 메인넷에 주기적으로 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction)를 제공하는 추가 요소가 있습니다. 이는 유효성 검사자의 책임에서 주요한 부분을 차지하며 이 작업을 수행하도록 장려하는 인센티브가 제공됩니다. 이로 인해 유효성 검사자에게 비용이 발생하게 되며 이것은 Polygon과 같은 레이어 2 솔루션만이 갖고 있는 특징이기도 합니다. 우리는 유효성 검사자 스테이킹 보상 지불 메카니즘에서 체크포인트 제공 책임이 있는 [제안자](/docs/maintain/glossary.md#proposer)에게 지불하는 보너스 형태로 이러한 비용을 기꺼이 제공합니다. 보너스를 뺀 보상은 모든 스테이커, 제안자 및 [서명자](/docs/maintain/glossary.md#signer-address) 사이에 비율에 따라 분배됩니다.

보너스를 완전히 받기 위해서는 제안자가 체크포인트에서 모든 서명을 포함해야 합니다. 프로토콜은 총 스테이크의 ⅔ +1 가중치를 원하기 때문에 80% 투표로도 체크포인트는 수락됩니다. 그러나 이 경우 제안자는 계산된 보너스의 80%만 받게 됩니다.
