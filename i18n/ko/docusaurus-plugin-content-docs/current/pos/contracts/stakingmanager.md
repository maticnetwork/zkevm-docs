---
id: stakingmanager
title: 스테이킹 관리자
description: 스테이킹 매니저는 Polygon 네트워크에서 유효한 관련 활동을 처리하기 위한 주요 계약입니다.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon의 보안 기반 영사관 증서, 모든 Reding+1 증명 검증 및 스테이크의 취급을 위한 모든 Redking을 위한 경우 이더리움 스마트 계약에서 보상을 받습니다. 전체적인 디자인은 가급적 메인넷 계약의 부담을 줄이는 방향으로 설계되었습니다. 정보 검증을 수행하고 모든 계산에서 [L2(Heimdall에](https://wiki.polygon.technology/docs/pos/heimdall/overview) 대한 읽음)에 밀어 넣습니다.

**스테이커는** **검사자**, **대표자** 및 **워시더로** 나누어져 있습니다(사기 보고의 경우).

[**스테이크 매니저는**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) `checkPoint`서명 검증, 보상 배포 및 지분 관리와 같은 유효성 주장을 처리하는 주요 계약입니다. 계약이 **NFT** ID를 소유권 소스로 사용하고 있기 때문에 소유권 및 서명자의 변경은 시스템에서 아무것도 영향을 미치지 않습니다.

:::tip

엑서라 주소에서 **스테이커는 단지 유효성 검사자 또는 대표자일 수** 있습니다(이는 단지 디자인 선택, 어려운 이유일 뿐).

:::

## 유효성 검사 / 교체 {#validator-admissions-replacement}

### 입학 {#admissions}
현재 Polygon PoS에서 사용할 수 있는 오픈 유효 검사기 슬롯이 없습니다. 또한 유효한 사람이 될 웨이트리리스트도 있습니다. 앞으로 슬롯을 사용할 수 있다면 유효한 인증자가 대기자 목록에서 고려되고 제거될 수 있습니다.


### 교체 {#replacement}
PIP4는 커뮤니티 시계에 대한 검증 인젝터 성능을 보여주는 개념을 소개했습니다. PIP4에 명시된 장시간 동안 유효한 사람이 건강에 해로운 상태에 있다면 네트워크에서 피스코드를 받을 수 있습니다. 이제 유효한 슬롯은 웨이트리스트의 오고있는 사람들에게 제공됩니다.

:::info

현재 [<ins>PIP4에서 파트 C의 2단계가</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) 구현되고 있습니다. 이것은 커뮤니티가 유효한 ator Prosecutor 평가 기준에 대해 결정하는 곳입니다. 시간이 지남에 따라이 운동은 응용 프로그램과 입학 프로세스를 생성합니다.

:::

## 방법과 변수 {#methods-and-variables}

:::caution 구현 슬래싱

`jail``unJail`현재 슬래싱 구현의 일환으로 기능을 사용하면 `slash`됩니다.

:::

### 유효자 임계값 {#validatorthreshold}

이 시스템이 받아들인 최대 유효숫자를 슬롯이라고 부릅니다.

### AccountStateRoot {#accountstateroot}

- 유효자 및 대표자를 위해 Heimdall에서 수행 된 다양한 회계의 경우 계정 루트가 제출되어 `checkpoint`있습니다.
- accrot는 동안 사용되며 `claimRewards`입니다.`unStakeClaim`

### 지분 / 이해 관계자 {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- 다음 경우 더 적은 경우 (MATIC 토큰에서 `minDeposit``currentValidatorSetSize`사용)를 가진 사람을 허용합니다.`validatorThreshold`
- 이제 전송해야 `amount+heimdallFee`합니다. 경매구간에서 더 많은 경우)에 대한 경매구간에서 유효한 레이터를 입력하세요.
- `updateTimeLine`주어진 에폭시 / 체크 문턱 카운트에 대한 액티브 스테이크를 추적하는 특수 타임 라인 데이터 구조를 업데이트합니다.
- 각 새로운 `stake`또는 `stakeFor`부름에 한 가지 고유 한 `NFT`미니를 채굴하여 누구나 이전 할 수 있지만 1:1 이더리움 주소를 소유 할 수 있습니다.
- `acceptDelegation`유효자가 `ValidatorShare`대표단을 수락하려면 계약이 유효하다는 것을 설정합니다.

### 스테이크 해제 {#unstake}

- 다음 에폭시에 있는 유효성 검사자 중 유효한 것 (현재 검문소에 대한 `unstake`유효한)
- 타임라인 데이터 구조로부터 유효성 검사자의 스테이크를 제거하고, 유효성 검사자의 종료 에포그에 대한 카운트를 업데이트합니다.
- 만약 유효자가 대표단을 작성한 경우 새로운 대표단에 대한 모든 보상 및 잠금 위임 계약을 수집합니다.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- `unstaking`나중에 유효한 사용자가 철수 주기에 넣어 `unstaking`나중에 발견 된 사기가 과거의 사기에 대해 발견된 경우 슬래시될 수 있습니다.
- 일단 `WITHDRAWAL_DELAY`주기(을 사용하면 유효한 사용자가 이 함수를 호출하고 `stakeManager`합의를 할 수 있습니다)

### 재스테이크 {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- 유효성 검사자가 새로운 금액이나 보상 또는 두 가지를 모두 예치해 스테이크를 증가시킬 수 있습니다.
- 액티브 스테이크에 대한 타임 라인을 업데이트해야 합니다.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

이 방법을 통해 유효한 사람은 유효자가 대표단을 수락하면 대표단 계약에서 보상을 받는 것을 고려해야 합니다.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

이 방법을 사용하면 유효자가 Xkygon 블록체인 및 검문서의 블록을 검증하는 데 사용되는 서명자 주소를 업데이트할 수 `stakeManager`있습니다.

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

이 방법을 호출하여 유효성 검사기는 하이밍달 수수료에 대한 잔액을 최고 화할 수 있습니다.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

이 방법은 Heimdall에서 수수료를 인출하는 데 사용됩니다. 각 체크포인트에서 `accountStateRoot`업데이트되어 유효자가 Heimdall에 대한 계정을 위해 이 루트에 포함 증거를 제공할 수 있습니다.

여러 체크 포인트에서 exas를 방지하기 위해 다시 `accountStateRoot`작성된다는 `stakeManager`메모에 유의하십시오. 현재 사용하지 않고 필요하다면 Heimdall에서 슬래시에 사용할 수 `accumSlashedAmount`있습니다.

### NFT 스테이킹 {#stakingnft}

사용자가 하나의 토큰과 같은 제한이 거의 없는 표준 ERC721 계약과 순차 채굴된 계약을 제공합니다.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

이미 실행 경매에서 입찰을 시작하거나 더 높은 입찰을 받으려면 이 기능을 사용하면 됩니다. 경매기간은 같은 사이클에서 `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`실행되므로 **올바른 경매기간을 확인하십시오.**

`perceivedStakeFactor`정확한 factor *오래된 지분을 계산하는 데 사용됩니다(현재 이 것은 기본 1 WIP 이므로 기능을 선택하는 것). **여전히 진행 중인 경우 마지막 경매 피리어드에서 경매에 대해 확인해야** 합니다(다음 경매에서 자본을 얻기 위해 `confirmAuction`호출하지 않을 수 있음). 일반적으로 지속적인 영어 경매는 A에서 진행되고 `auctionPeriod`있습니다.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **이것이 경매인이 아니라는 것을 확인해야 합니다.**
- 마지막 입찰자가 `validatorId`소유자의 경우 동작이 휴식과 유사해야 합니다.
- 두번째 경우에는 `validatorId`를 unStake하고, 다음 체크포인트 부터 새로운 사용자를 유효성 검사자로 추가하는데, 이는 새로운 사용자 행동이 Stake/stakeFor와 유사해야 하기 때문입니다.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- 체크포인트를 제출할 때 RootChain 계약만 작성됩니다.
- `voteHash`는 모든 유효성 검사자 서명 (BFT ⅔+1 계약)
- 이 기능은 고유한 서명 만을 검증하고 ⅔+1 파워가 체크포인트 루트에 사인하였는지 확인합니다(모든 데이터에 대한 RootChain 계약에서의 `voteHash`검증 포함). 는`currentValidatorSetTotalStake` 기존 활성 스테이크를 제공합니다.
- 리워드는 유효자의 지분에 비례적으로 배포됩니다. [Reward](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2) Distribution에서 보상을 더 많이 받으십시오.

### isValidator {#isvalidator}

주어진 검증자가 현재 에폭시에 대해 활성 유효한 검사자라면 체크합니다.

## 타임라인 데이터 구조 {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## 스테이킹 정보 {#stakinginfo}

유효자와 위임 이벤트에 대한 중앙 집중식 로깅 계약에는 단지 기능 만 읽을 수 있는 것이 거의 없습니다. GitHub에서 [스테이킹Info.Sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) 계약의 소스 코드를 확인할 수 있습니다.

## ValidatorShareFactory {#validatorsharefactory}

대표단을 위해 opt-in을 위해 각 검증자에 대한 `ValidatorShare`계약을 배포하는 공장 계약. GitHub에서 [유효성 검사Factory.Sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) 계약의 소스 코드를 확인할 수 있습니다.
