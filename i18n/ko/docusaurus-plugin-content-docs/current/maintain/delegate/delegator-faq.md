---
id: delegator-faq
title: 위임자 FAQ
sidebar_label: Delegator FAQ
description: Polygon 네트워크에서 대표단과 관련된 FAQ
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### 스테이킹 대시보드의 URL은 무엇인가요? {#what-is-the-staking-dashboard-url}

스테이킹 대시보드 URL은 https://staking.polygon.technology/를 제공합니다.

### 최소 스테이크 금액은 얼마인가요? {#what-is-the-minimum-stake-amount}

위임하는데 필요한 최소 스테이크 금액은 없습니다. 그러나 1인 MATIC 토큰으로 항상 시작할 수 있습니다.

### 위임하는 경우 받게 되는 보상은 얼마나 될까요? {#how-many-rewards-will-i-get-if-i-delegate}

[스테이킹 Reward 계산기를](https://staking.polygon.technology/rewards-calculator) 사용하여 견적을 확인하십시오.

### 왜 제 트랜잭션이 오래 걸리나요? {#why-does-my-transaction-take-so-long}

Polygon의 모든 스테이킹 트랜잭션은 보안상의 이유로 이더리움에서 발생합니다.

트랜잭션을 완료하는 데 걸리는 시간은 귀하가 허용한 가스 요금과 해당 시점에 이더리움 메인넷의 네트워크 혼잡에 따라 달라집니다. 항상 "속도 업"옵션을 사용하여 가스 수수료를 늘려 곧 트랜잭션을 완료 할 수 있습니다.

### 현재 어떤 지갑이 지원되나요? {#which-wallets-are-currently-supported}

현재는 데스크톱 브라우저의 메타 마스크 확장 기능과 코인베이스 지갑만 지원됩니다. 또한 지원되는 모바일 지갑에서 WalletConnect와 Wallet링크를 사용하여 데스크톱 / 노트북에서 스테이킹 UI 대시보드와 상호 작용할 수 있습니다. 조만간 다른 지갑에 대한 지원도 지속적으로 추가할 예정입니다.

### 하드웨어 지갑은 지원되나요? {#are-hardware-wallets-supported}

예, 하드웨어 지갑은 지원됩니다. 메타 마스크에서 "하드웨어 지갑 연결" 옵션을 사용하여 하드웨어 지갑을 연결한 후 위임 프로세스를 계속할 수 있습니다.

### Binance에서 직접 스테이크할 수 없는 이유는 무엇인가요? {#why-can-t-i-stake-directly-from-binance}

Binance를 통한 스테이킹은 아직 지원되지 않습니다. Binance가 지원하기 시작할 때 공지될 예정입니다.

### 위임을 완료했는데, 어디에서 세부 사항을 확인할 수 있습니까? {#i-have-completed-my-delegation-where-can-i-check-details}

일단 대표단을 완료하면 이더리움(약 3~5분)에서 12개의 블록 확인을 기다릴 수 **있습니다**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### 보상을 어디에서 확인할 수 있나요? {#where-can-i-check-my-rewards}

Dashboard에서 왼쪽의 **My Account** 옵션을 클릭하시면 가능합니다.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### 가스 요금을 지불하려면 ETH가 필요한가요? {#do-i-need-eth-to-pay-for-gas-fees}

예. 안전하게 0.05-0.1 ETH 정도 준비해야 합니다.

### 스테이킹을 위해 Polygon 메인넷 네트워크에 매틱 토큰을 입금해야 하나요? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

아니요, 모든 자금은 메인 이더리움 네트워크에 있어야 합니다.

### 트랜잭션을 하려고 하면 확인 버튼이 비활성화되는데, 왜 그럴까요? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

가스 요금을 지불하기 위한 ETH가 충분한지 확인하세요.

### 보상은 언제 분배되나요? {#when-does-reward-get-distributed}

보상은 체크포인트가 제출될 때마다 분배됩니다.

현재 20188년 MATIC 토큰을 각 성공적인 검문소 제출에 비례하여 모든 유효성 검사자 및 대표자의 전체 스테이킹 풀에 대한 지분을 기반으로 각 대표단에 배포됩니다. 또한 각 위임자에게 분배되는 보상의 비율은 위임자, 유효성 검사자 및 전체 스테이크의 상대적 지분에 따라 각 체크포인트마다 달라집니다.

(체크포인트를 제출한 유효성 검사자에게 발생하는 10% 제안자 보너스가 있으나, 시간이 지남에 따라 추가 보너스의 효과는 다른 유효성 검사자들의 여러 체크포인트로 인해 없어질 수 있으니 유의하세요)

체크포인트 제출은 약 34분마다 유효성 검사자 가운데 하나가 수행합니다. 이 시간은 대략적인 것으로 Polygon Heimdall 계층의 유효성 검사자 합의에 따라 달라질 수 있습니다. 이것은 또한 이더리움 네트워크에 따라 달라질 수 있습니다. 네트워크의 혼잡도가 높으면 체크포인트가 지연될 수 있습니다.

[여기에서](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287) 스테이킹 계약을 통해 체크 포인트를 확인할 수 있습니다.

### 왜 체크포인트마다 보상이 계속 줄어드는 걸까요? {#why-does-reward-keep-getting-decreased-every-checkpoint}

획득한 실제 보상은 각 체크포인트에서 네트워크상의 실제 총 잠긴 공급량에 따라 달라집니다. 더 많은 매틱 토큰이 스테이킹 계약에 잠길수록 이 변동은 더 커질 것으로 예상됩니다.

처음에는 상대적으로 높은 보상이 주어지나, 이후 잠긴 공급량 비율이 증가할수록 계속 감소할 것입니다. 이러한 잠긴 공급량의 변화는 모든 체크포인트에서 포착되며, 이를 바탕으로 보상이 계산됩니다.

### 보상은 어떻게 청구하나요? {#how-can-i-claim-my-rewards}

**Arthur Reward** 버튼을 클릭하여 즉시 보상을 청구할 수 있습니다. 이렇게 하면 적립된 보상이 메타 마스크의 위임된 계정으로 이전됩니다.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### 언본딩 기간이란 무엇인가요? {#what-is-the-unbonding-period}

Polygon의 언본딩 기간은 현재 약 9일입니다. 전에는 19일 이었습니다. 이 기간은 원래 위임 된 금액과 다시 위임 된 금액에 적용되며, 다시 위임되지 않은 보상에 대해서는 적용되지 않습니다.

### 언본딩한 후에도 보상을 계속 받게 됩니까? {#will-i-keep-receiving-rewards-after-i-unbond}

아니오. 일단 채권하면 보상을 받지 않을 것입니다.

### 위임에 필요한 트랜잭션은 몇 개인가요? {#how-many-transactions-does-the-delegation-require}

대표단은 다른 후 2 개의 트랜잭션을 요구합니다. 한 명은 요청과 다른 하나를 **예금으로** **승인합니다.**

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### 재위임 보상은 무엇을 의미하나요? {#what-does-redelegate-rewards-mean}

보상을 다시 사용하면 누적된 보상을 다시 해결하여 지분을 늘리고 싶다고 의미합니다.

### 유효성 검사자에게 스테이크할 수 있나요? {#can-i-stake-to-any-validator}

예. 모든 유효성 검사자는 현재 Polygon 파운데이션 노드입니다.

Polygon 메인넷의 단계적 롤아웃을 수행하고 있습니다. 나중에 외부 유효성 검사자가 점차 합류됩니다. 자세한 정보는 https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/를 참조하십시오.

### 스테이킹 대시보드와 호환되는 브라우저는 어떤 것입니까? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox, Brave

### 메타 마스크가 로그인 후 확인 과정에서 멈추었는데 어떻게 해야 하나요? 또는 로그인을 시도했는데 아무 일도 일어나지 않으면 어떻게 하나요? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

다음을 확인하세요:

- 브레이브를 사용하고 있다면 설정 패널에서 **Crypto Wallet을 사용할** 수 있는 옵션을 끄십시오.
- 메타 마스크에 로그인되었는지 확인하세요.
- Trezor/Ledger로 메타 마스크에 로그인했는지 확인합니다. 아직 활성화되지 않은 경우 Ledger 장치에서 계약을 호출할 수 있는 권한을 추가로 설정해야 합니다.
- 시스템 타임스탬프를 확인합니다. 시스템 시간이 올바르지 않으면 수정해야 합니다.

### 바이낸스나 다른 거래소에서 Polygon 지갑으로 자금을 보내려면 어떻게 해야 하나요? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

기술적으로 Polygon 지갑 스위트/스테이킹 인터페이스는 웹 애플리케이션일 뿐입니다. 현재 다음 지갑을 지원합니다. 메타마스크, WalletConnect, WalletLink를 지원합니다.

첫째, Binance에서 자금을 인출해야 하거나 메타마스크에서 Eygium 주소를 통해 다른 교환에서 자금을 인출해야 합니다. 메타 마스크 사용법을 모르면 구글에서 검색해보세요. 참고할 수 있는 비디오와 블로그가 많이 있습니다.

### 언제 유효자가 될 수 있으며 몇 개의 토큰을 사용할 수 있습니까? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

사용자는 다음 조건을 충족하는 경우에만 유효성 검사자 자리를 차지할 수 있습니다:
1. 유효한 사람이 네트워크에서 압축을 풀기로 결정하면
2. 경매 메커니즘을 기다렸다가 비활성 유효성 검사자를 교체합니다.

최소 스테이크는 사용자들이 경매 과정에서 얼마나 치열하게 경쟁하는지 여부에 따라 달라집니다.

### 위임하는 동안 보상을 획득한 경우, 동일한 유효성 검사 노드에 추가 자금을 투입하면 어떻게 됩니까? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

동일한 유효성 검사 노드에 보상을 다시 위임하지 않은 채로 추가 자금을 위임할 경우 보상이 자동으로 인출됩니다.

그런 일이 일어나지 않기를 원하면 추가 자금을 위임하기 전에 보상을 다시 위임하십시오.

### 스테이킹 대시보드의 메타 마스크를 통해 토큰을 위임했습니다. 시스템 또는 장치를 계속 켜놓아야 합니까? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

아니요. 대표단 거래가 확정되면 **Total** Stake와 **New Reward** 섹션에서 반영된 토큰을 볼 수 있습니다. 시스템이나 장치를 계속 켤 필요가 없습니다.

### Unbond에 얼마나 오래 걸릴까요? {#i-have-unbonded-how-long-will-it-take-to-unbond}

언본딩 기간은 현재 82개의 체크포인트로 설정되어 있습니다. 대략 9일입니다. 모든 체크포인트는 약 34분이 걸립니다. 그러나 일부 체크포인트는 이더리움의 혼잡으로 인해 최대 1시간까지 지연될 수 있습니다.

### 나는 유대감이 없으며 이제 청구 스테이크 버튼을 참조하십시오. {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

스테이크 청구 버튼은 언본딩 기간이 완료된 경우에만 활성화됩니다. 언본딩 기간은 현재 82개의 체크포인트로 설정되어 있습니다.

### 스테이크 청구 버튼이 언제 활성화되는지 알 수 있습니까? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

예, 스테이크 청구 버튼 아래에 스테이크 청구 버튼이 활성화될 때 까지 얼마나 많은 체크포인트가 보류 중인지에  대한 메모가 표시됩니다. 모든 체크포인트는 약 30분이 걸립니다. 그러나 일부 체크포인트는 이더리움의 혼잡으로 인해 최대 1시간까지 지연될 수 있습니다.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### 파운데이션 노드에서 외부 노드로 위임을 전환하려면 어떻게 해야 합니까? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

스테이킹 UI의 **스테이크 이동** 옵션을 사용하여 위임을 전환할 수 있습니다. 이렇게 하면 위임이 파운데이션 노드에서 선택한 다른 외부 노드로 전환됩니다.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

다른 유효성 검사자의 목록을 볼 수 있습니다.

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### 위임을 파운데이션 노드에서 외부 노드로 전환할 때 언본딩 기간이 있습니까? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

위임을 파운데이션 노드에서 외부 노드로 전환할 때 언본딩 기간이 없습니다. 지체 없이 바로 전환이 됩니다. 그러나 파운데이션 노드 또는 외부 노드에서 언본딩하는 경우에는 언본딩 기간이 있습니다.

### 위임을 전환하는 동안에 외부 노드를 선택할 때 고려해야 할 특이 사항이 있습니까? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

아니요. 원하는 노드를 선택할 수 있습니다.

### 파운데이션에서 외부 노드로 위임을 전환하면 누적되는 보상은 어떻게 됩니까? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

위임을 전환하기 전에 보상을 아직 청구하지 않은 경우, 위임을 파운데이션에서 외부로 성공적으로 전환하면 그때까지 누적된 보상이 귀하의 계정으로 다시 전송됩니다.

### 외부 노드에 위임해도 파운데이션 노드와 동일하게 작동하나요? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

예, 재단 노드와 동일한 작업을 할 것입니다.

### 외부 노드에 위임한 후에도 보상을 받을 수 있습니까? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

예, 보상은 파운데이션 노드를 사용하여 이전과 동일하게 배포됩니다. 체크포인트를 성공적으로 제출할 때마다 보상이 지급됩니다. 보상은 현재 시행 중인 스테이크 비율에 따라 모든 체크포인트에 분배되고 계산됩니다.

### 외부 노드에서 연결 해제할 경우 언본딩 기간이 있습니까? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

예, 언본딩 기간은 현재 구현된 그대로 유지될 것입니다. 82 체크포인트.

### 위임을 파운데이션에서 외부 노드로 전환한 후 잠금 기간이 있습니까? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

아니요. 위임을 전환한 후에는 잠금 기간이 없습니다.

### 파운데이션에서 외부 노드로 위임을 부분적으로 전환할 수 있습니까? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

예, 파운데이션 노드에서 외부 노드로 스테이크를 부분적으로 이동할 수 있는 옵션이 제공됩니다. 나머지 일부 스테이크는 파운데이션 노드에 남아 있습니다. 그런 다음 이를 원하는 다른 노드 또는 동일한 노드로 이동할 수 있습니다.

### 외부 노드에서 다른 외부 노드로 위임을 전환할 수 있습니까? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

아니요, **스테이크 이동** 옵션은 파운데이션 노드에서만 사용할 수 있습니다. 외부 노드에서 다른 외부 노드로 위임을 전환하려면 먼저 연결을 해제한 다음 다른 외부 노드로 위임을 해야 합니다.

### 파운데이션 노드는 언제 종료되나요? {#when-will-the-foundations-node-be-turned-off}

재단 노드가 2021년 1월 말까지 꺼질 것입니다.

### 미래에도 파운데이션 노드가 있을까요? {#will-there-be-any-foundation-nodes-in-the-future}

아니요, 앞으로는 파운데이션 노드가 없을 것입니다.

### 스테이크 이동을 할 때 가스 비용을 얼마나 지불해야 합니까? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

스테이크 이동은 단일 트랜잭션일 뿐입니다. 모든 거래는 이더리움 블록체인으로 이루어지므로 스테이크 이동 트랜잭션을 수행하면서 ETH를 사용해야 합니다.
