---
id: delegation
title: 검사기 주식을 통해 위임
sidebar_label: Delegation
description: 검사기 주식을 통해 위임
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon은 유효성 검사자 공유를 통한 위임을 지원합니다. 이를 통하여 이더리움 계약에서 상당 규모(수 천명의 위임자)의 보상과 슬래시를 복잡한 계산 없이 쉽게 분배할 수 있습니다.

위임자는 유효성 검사자로부터 한정된 풀의 지분을 구입하여 위임합니다. 각 유효성 검사자는 자신의 유효성 검사자 지분 토큰을 가지게 됩니다. 이러한 대체 가능한 토큰을 유효성 검사자 `A`를 위한 `VATIC`이라고 합시다. 사용자가 유효성 검사자 `A`에게 위임하는 즉시 `MATIC/VATIC`의 환율을 기준으로 이`VATIC` 발행될 것입니다. 사용자가 가치를 축적할 수록 환율은 각 `VATIC`당 더 많은 `MATIC`을 인출할 수 있게 되고, 사용자가 슬래시되면 사용자는 `VATIC`당 더 적은 `MATIC`을 인출하게 됩니다.

`MATIC`은 스테이킹 토큰임을 참고하세요. 위임자는 위임에 참여하려면 `MATIC`토큰을 가져야 합니다.

처음에 위임자 `D`는 `1 MATIC per 1 VATIC`일 때 유효성 검사자 `A`의 특정 풀에서 토큰을 구입합니다.

유효성 검사자가 더 많은 `MATIC`토큰으로 보상을 받으면 새로운 토큰이 풀에 추가됩니다. 현재 `100 MATIC`토큰의 수영장과 함께 수영장에 `10 MATIC`보상을 추가한다고 가정해 봅시다. 그러나 `VATIC`토큰의 총 공급은 보상으로 인해 변화되지 않았기 때문에, 환율은 `1 MATIC per 0.9 VATIC`이 됩니다. 이제 대표자는 동일한 주식을 `MATIC`위해 더 많은 것을 `D`받습니다.

`VATIC`: 유효성 검사자에게 특정 발행된 유효성 검사자 지분 토큰 (ERC20 토큰)

## 기술 설명서 {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

환율은 아래와 같이 계산됩니다.

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## 방법과 변수 {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- `_amount`를 stakeManager로 이전하고 활성 스테이크에 대한 타임라인 테이터 구조를 업데이트합니다.
- `updateValidatorState`는 타임라인 DS를 업데이트하는 데 사용됩니다.
-  `Mint`은 `_amount`에 대한 현재 `exchangeRate`을 이용하여 지분을 위임합니다.
- `amountStaked`는 유동 보상을 계산하기 위해 각 위임자의 활성 스테이크를 추적하는데 사용됩니다.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- 현재 `exchangeRate`및 주식 수를 사용하여 총 금액(액티브 지분 + 보상)을 계산합니다.
- `unBond`유효한 지분을 누구에게나 대표자에게 전송하고 보상을 제공합니다.
- stakeManger의 `updateValidatorState`를 사용해 타임라인에서 활성 스테이크를 반드시 제거합니다.
- `delegators` 매핑은 인출 기간에 스테이크 상태를 추적하는 데 사용됩니다.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- 대표자의 경우 보상 및 이전 및 주식 `exchangeRate`화상 카운트에 따라 계산하십시오.
- 예: 대표자가 100개의 주식을 소유하고 환율 비율이 200이라면 보상을 100개의 토큰을 가지고 있는 경우 100개의 토큰을 대표자에게 전송하면 100개의 토큰을 전송합니다. 나머지 지분은 100이므로 환율 200을 사용하여 50주권이 됩니다. 50주를 태우세요. 이제 대표자는 100개의 토큰을 보유한 50주(처음에 긁힌 / 위임됨)를 보유하고 있습니다.

### 재스테이크 {#restake}

Rekhis는 두 가지 방법으로 작동할 수 있습니다. 대표자는 `buyVoucher`더 많은 주식을 구매할 수 있습니다.

```js
function reStake() public;
```

위의 기능은 리스테이크 리워드에 사용됩니다. 지분의 수는 `exchangeRate`이 동일하기 때문에 영향을 받지 않습니다. 그러므로 보상만이 유효성 검증자 지분 계약과 stakeManager 타임라인 모두에 대한 활성 스테이크로 옮겨집니다.

`getLiquidRewards`액수의 경우 100개의 지분을 소유하고 환율 비율이 200이므로 리뷰는 100개의 토큰을 사용하여 누적 보상을 계산합니다. 환율은 여전히 동일한 수의 점유율이 동일하게 유지되므로 100개의 토큰을 액티브 스테이크로 옮깁니다. 오직 차이점만 따르면 현재 200개의 토큰을 액티브 지분을 고려하고 즉시 철회할 수 없습니다 (액체 보상 일부가 아님).

Restaking의 목적은 대표단의 유효자가 이제 더 적극적인 지분을 가지고 있기 때문에 대표단이 더 많은 보상을 받을 것이라는 것입니다.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

일단 철수 기간이 끝나면 주식을 판매하는 대표들은 MATIC 토큰을 청구할 수 있습니다. 토큰은 반드시 사용자에게 이전해야 합니다.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- 유효성 검사자의 커미션 요율을 업데이트합니다.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

검사자가 체크포인트를 제출하는 것에 대한 보상을 받으면 이 기능은 유효한 검사자와 대표자 간에 보상 부담을 불러줍니다.
