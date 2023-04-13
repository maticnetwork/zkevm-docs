---
id: consensys-framework
title: 스케일링 프레임 워크 FAQ
sidebar_label: Scaling Framework FAQ
description: Polygon에서 차세대 블록체인 앱을 구축하세요.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

이 프레임 워크는 Consensy의 [네 가지 질문에서 어떤 스케일링 솔루션을 판단에 제공합니다.](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## 프레임워크를 누가 운영하나요? {#who-operates-it}
메인넷 이더리움의 채굴자 노드는 작업 증명을 해결하고 새 블록을 생성함으로써 네트워크를 가동 또는 "운영"합니다. 레이어2 솔루션은 이더리움 메인넷의 채굴자처럼, 네트워크상에서 레이어2 네트워크를 가동할 수 있는 "운영자" 역할이 필요합니다. 그러나 몇 가지 차이점이 있습니다. 예를 들어, 레이어2 운영자는 채굴자처럼 트랜잭션을 처리하고 승인할 뿐만 아니라, 사용자가 레이어2 자체에 들어가고 나가는 것을 용이하게 할 수도 있습니다.

### - Polygon 스테이크 증명 네트워크를 운영하려면 누가 또는 무엇이 필요합니까? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Polygon PoS 커밋 체인은 유효성 검사자 세트를 이용하여 네트워크를 보호합니다. 유효성 검사자의 역할은 전체 노드를 실행하여 블록을 생성하고, 유효성을 검증하고, 이더리움 메인 체인상에서 합의에 참여하고 체크포인트를 커밋하는 것입니다. 유효성 검사자가 되려면 이더리움 메인 체인에 있는 스테이킹 관리 계약에 따라 자신의 매틱 토큰을 스테이크해야 합니다.

자세한 내용은 [검사기 섹션을](/maintain/validate/getting-started.md) 참조하십시오.

### - 이들은 Polygon PoS 네트워크 내에서 어떻게 운영자가 되나요? 그들은 어떤 규칙을 준수합니까? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

유효성 검사자가 되려면 이더리움 메인 체인에 있는 스테이킹 관리 계약에 따라 자신의 매틱 토큰을 스테이크해야 합니다.

보상은 모든 체크포인트에서 모든 스테이커에게 보유한 스테이트에 따라 분배되며, 제안자의 경우 예외적으로 추가 보너스를 받습니다. 사용자 보상 잔액은 보상을 신청하는 동안 해당되는 계약에서 업데이트됩니다.

유효성 검사 노드가 이중 서명, 유효성 검사자 가동 중지와 같은 악의적인 행위를 할 경우, 스테이크가 슬래시될 수 있으며, 이는 해당 체크포인트에 연결된 위임자에게도 영향을 미칩니다.

자세한 내용은 다음을 참조하십시오. [Polygon 유효성 검사자의 책임에 대한 최종](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator)[](/maintain/validate/validator-responsibilities.md) 흐름.


### - Polygon PoS 사용자는 어떻게 운영자를 믿을 수 있나요? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Polygon PoS 커밋 체인은 유효성 검사자 세트를 이용하여 네트워크를 보호합니다. 유효성 검사자의 역할은 전체 노드를 실행하여 블록을 생성하고, 유효성을 검증하고, 이더리움 메인 체인상에서 합의에 참여하고 체크포인트를 커밋하는 것입니다. 유효성 검사자가 되려면 이더리움 메인 체인에 있는 스테이킹 관리 계약에 따라 자신의 매틱 토큰을 스테이크해야 합니다. 유효성 검사자의 가중 스테이크 중 ⅔가 올바르다면 체인은 정확하게 가동될 것입니다.

### - 운영자는 어떤 역할을 하나요? 그들은 어떤 권한을 갖습니까? {#what-are-the-operators-responsible-for-what-power-do-they-have}

유효성 검사자는 전체 노드 실행, 블록 생성, 유효성 검사, 합의 및 이더리움 메인 체인상의 커밋 체크포인트 참여 등의 역할을 합니다.

유효성 검사자는 가중 유효성 검사자 스테이크의 ⅔가 올바르지 않다고 판단되는 경우, 체인의 진행을 멈추거나 블록을 재정렬하는 등의 권한을 갖습니다. 이들은 상태, 사용자 자산 잔고 등을 변경할 권한이 없습니다.

### - 왜 Polygon PoS 운영자가 되려고 하나요? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

유효성 검사자는 자신의 매틱 토큰을 담보로 하여 네트워크 보안에 기여하고, 이러한 서비스의 대가로 보상을 얻습니다.

자세한 내용은 자세한 내용은 [해당 인센티브를](/maintain/validator/rewards.md#what-is-the-incentive) 참조하십시오.

## 데이터는 어떻습니까? {#how-s-the-data}
정의에 따라, 레이어2 기술은 레이어1(이더리움 메인넷)에 증분 데이터 체크포인트를 생성해야 합니다. 여기서 우리가 우려하는 것은 주기적 레이어1 체크인 사이의 빈 시간입니다. 특히, 레이어1이라는 안전한 도피처에서 멀리 떨어져 있는 동안 레이어2 데이터는 어떻게 생성, 저장, 관리됩니까? 왜냐하면 사용자가 공개 메인넷의 신뢰없는 보안(trustless security)에서 가장 멀리 떨어져 있을 때이기 때문에 우리는 이것을 가장 우려합니다.

### - Polygon PoS의 락업 조건은 무엇인가요? {#what-are-the-lock-up-conditions-for-polygon-pos}

대부분의 토큰 디자인 패턴에서, 토큰은 이더리움에서 발행되며 Polygon PoS로 보낼 수 있습니다. 그러한 토큰을 이더리움에서 Polygon PoS로 이동시키려면 사용자는 이더리움의 계약에 자금을 락업해야 하며, 그런 다음 상응하는 토큰이 Polygon PoS에서 발행됩니다.

이 브리지 릴레이 메커니즘은 Polygon PoS 유효성 검증자에 의해 수행되는데, Polygon PoS에서 상응하는 토큰 금액을 발행하기 위해서는 Ethereum의 잠금 토큰 이벤트에 ⅔ 이상이 동의해야 합니다.

자산을 이더리움으로 다시 출금하는 것은 먼저 자산 토큰을 Polygon PoS 커밋 체인에서 소각한 다음 이 소각 트랜잭션의 증명을 이더리움 체인에 제출하는 2단계 프로세스로 이루어집니다.


자세한 내용은 [PS 브리지를 사용하는 단계를](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge) 참조하십시오.

### - Polygon PoS에서 해당 자금을 얼마나 빨리 사용할 수 있습니까? {#how-soon-are-those-funds-available-on-the-polygon-pos}

약 ~22~30분. 이것은 호출 된 메시지 통과 메커니즘을 통해 `state sync`수행됩니다. 자세한 내용은 [여기에서](/pos/state-sync/state-sync-mechamism.md) 확인할 수 있습니다.

Polygon PoS는 L1 락업 없이 입장하는 사용자를 지원합니까(즉, 사용자가 Polygon에 직접 입장한 후 이더리움 메인넷으로 나가기를 원하는 경우)?

네. 이러한 경우에는 특별한 브리지 메커니즘이 사용됩니다. 사용자가 특별 계약에서 토큰을 잠금 해제하는 일반적인 방법 대신 이더리움으로 나가기를 원할 때 발행됩니다.

[여기에서](/develop/ethereum-polygon/mintable-assets.md) 읽을 수 있습니다.

### - 사용자는 잘못된 Polygon PoS 트랜잭션에 대해 어떻게 이의를 제기할 수 있나요? 유효한 Polygon PoS 트랜잭션을 어떻게 증명합니까? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

현재 잘못된 Polygon PoS 트랜잭션에 대해 체인 상에서 이의를 제기할 수 있는 방법은 없습니다. 그러나 Polygon PoS 체인의 유효한 사람들은 정기 체크포인트를 이더리움에 제출하면 [자세한](/pos/heimdall/modules/checkpoint.md) 내용을 확인할 수 있습니다. Polygon PoS 트랜잭션 및 영수증 Merkle 트리 로트의 이더리움에서 발생하는 정기 체크포인트에 대해 Merkle 트리 증거를 구축하고 확인하여 Eygon에서 Prokle Pason을 확인하여 Prokle의 트랜잭션을 확인할 수 있습니다.

### - Polygon 사용자가 종료하기를 원한다면 L1에서 언제 다시 사용할 수 있습니까? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

[체크포인트의](/pos/heimdall/modules/checkpoint.md) 주파수에 따라 대략 ~ 1-3시간. 이 빈도는 대체로 유효성 검사자가 체크포인트를 제출하기 위해 ETH 가스 수수료로 기꺼이 지출하고자 하는 비용과 함수관계에 있습니다.

### - 기존 Polygon PoS 사용자에게 즉시 상환 가능한 L1 자금을 제공할 의사가 있는 유동성 공급자가 레이어1에 있을 것으로 예상합니까? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

이미 [Connext](https://connext.network/) 및 [Bicony와](https://biconomy.io/) 같은 몇 명의 플레이어가 이미 있습니다. 다른 많은 플레이어들도 곧 활성화될 예정입니다.

## 스택은 어떻습니까? {#how-s-the-stack}
레이어2가 이더리움 메인넷과 비교하여 무엇이 변경되고 무엇이 변경되지 않았는지 강조하기 위하여 스택을 비교하는 것이 중요합니다.

### - Polygon PoS 스택은 이더리움 메인넷 스택과 얼마나 많이 공유합니까? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

이더리움 개발자라면 이미 Polygon PoS의 개발자입니다. Truffle, Remix, Web3js 등 여러분이 익숙한 모든 수많은 도구가 Polygon PoS에서 즉시 지원됩니다.

이더리움에 비해 Polygon PoS의 EVM 인터페이스에는 큰 변화가 없습니다.

### - Polygon PoS가 이더리움 메인넷 스택과 다른 점은 무엇이며 이로 인해 발생하는 위험/보상은 무엇입니까? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

큰 변화는 없습니다.

## 최악의 상황에 대비하기 {#preparing-for-the-worst}
Polygon PoS 시스템은 다음을 어떻게 준비해야 하나요?

### - 사용자의 대량 이탈? {#a-mass-exit-of-users}

유효성 검증자의 ⅔가 정직하다면 체인상의 자금은 안전합니다. 만약 그렇지 않다면, 체인의 가동이 중지되거나 재정렬이 발생할 수 있습니다. 이전 상태에서 체인을 다시 시작하려면 사회적 합의가 필요합니다. 이와 함께 이를 위해 사용할 수 있는 체크포인트를 통해 제출된 Polygon PoS 상태의 스냅샷이 포함됩니다.

### - Polygon 합의에 도전하는 Polygon 참가자 예를 들어, 카르텔을 형성하여? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

이러한 유효성 검사자를 제거하고 새로운 유효성 검사자 세트로 체인을 재구성하여 이전 상태에서 다시 시작하려면, 이 작업을 수행할 수 있는 체크포인트를 통해 제출된 Polygon PoS 상태의 스냅샷을 포함하여 사회적 합의가 필요합니다.  


### - 시스템의 중요 부분에서 발견된 버그 또는 악용? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

시스템 외부 빌드에서 실전테스트를 마친 구성 요소를 재사용하는 데 주의를 기울였습니다. 그러나 시스템의 중요 부분에 버그나 악용이 있는 경우, 주요 해결 방안은 사회적 합의를 통해 체인을 이전 상태로 복원하는 것입니다.
