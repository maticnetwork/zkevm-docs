---
id: consensus
title: Bor 합의
description: 새로운 제작자를 가져오는 Bor 메커니즘
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor 합의 {#bor-consensus}

Bor 컨센서스는 클리크 컨센서스에서 영감을 [받았습니다: https://eips.eegerum.org/EIPS/eip-225를 참조하십시오](https://eips.ethereum.org/EIPS/eip-225). Clique는 여러 사전 정의 제작자와 함께 작동합니다. 모든 프로듀서는 Clique API를 사용하는 새로운 프로듀서에 대해 투표합니다. 그들은 블록을 만듭니다.

Bor는 스팬 및 스프린트 관리 메커니즘을 통해 새로운 프로듀서를 가져옵니다.

## 유효성 검사자 {#validators}

Polygon은 스테이크 증명 시스템입니다. 누구나 매틱 토큰을 이더리움 스마트 계약의 '스테이킹 계약'에서 스테이크 할 수 있으며 시스템에서 유효성 검사자가 될 수 있습니다.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Heimdall에서 유효성 검사자가 활성화되어 있으면 `bor` 모듈을 통해 프로듀서로 선정됩니다.

자세한 내용은 [Bor](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) 개요

## 스팬 {#span}

유효가능한 모든 유효성 검사자 중 일련의 검증자 집합을 선택한 논리적으로 정의 된 블록 세트. Heimdall은 스팬 세부 API를 통해 스팬 세부 정보를 제공합니다.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth(이 경우는 Bor)는 블록 `snapshot`을 이용하여 합의 관련 데이터를 포함한 블록 별 상태 데이터를 저장합니다.

스팬의 각 유효성 검사자는 투표 파워를 가집니다. 유효성 검사자의 파워를 바탕으로 블록 프로듀서로 선정됩니다. 파워가 클수록 블록 프로듀서가 될 확률이 높습니다. Bor는 텐더민트의 알고리즘을 이와 같은 용도로 사용합니다. 출처: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## 스프린트 {#sprint}

단일 블록 프로듀서가 생성한 스팬 내 블록 세트입니다. 스프린트 크기는 스팬 크기의 요소입니다. Bor는 `validatorSet`을 사용해 현재 스프린트에 대한 현재 제안자와 프로듀서를 얻습니다.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

현재 제안자 외에도 Bor는 백업 프로듀서를 선정합니다.

## 블록 승인하기 {#authorizing-a-block}

Bor의 프로듀서는 서명자로도 불리는데, 네트워크에 대한 블록을 승인하려면 프로듀서는 **서명 자체를 제외한 모든 것**을 포함하는 블록의 해시에 서명해야 하기 때문입니다. 즉, 해시는 헤더의 모든 필드와, 65바이트 서명 서픽스를 제외한 `extraData`를 포함하고 있습니다.

이 해시는 표준 `secp256k1` 곡선을 사용하여 서명되고, 결과물인 65바이트 서명은 뒤따르는 65 바이트 서픽스로 `extraData`에 임베드됩니다.

서명된 각각의 블록에는 난이도가 주어져 블록에 가중치를 두게 됩니다. 해당 차례 서명은 차례가 아닌 서명의 (`DIFF_NOTURN`)보다 더 많은 (`DIFF_INTURN`) 가중치를 둡니다.

### 인증 전략 {#authorization-strategies}

프로듀서가 위 스펙에 부합하는 한, 적합하다고 판단되는 블록을 승인하고 배포할 수 있습니다. 다음은 네트워크 트래픽과 소규모 포크를 줄일 수 있도록 제안된 전략으로, 제안 내용은 다음과 같습니다.

- 프로듀서가 블록에 서명하도록 허용된 경우 (승인 목록에 있음)
    - 다음 블록의 최적 서명 시간 계산 (parent +)`Period`
    - 프로듀서가 자기 차례이면 정확한 도착 시간까지 대기한 후 즉시 서명하고 전달
    - 프로듀서가 차례가 아니면, `wiggle`로 서명을 연기

이 단순한 전략을 통해, 차례에 해당되는 프로듀서(블록 가중치가 더 많음)는 차례가 아닌 서명자에 비하여 서명과 전파에 약간의 이점을 갖게 됩니다. 또, 이 방식은 프로듀서 수가 증가함에 따라 조금 더 확장할 수 있습니다.

### 차례가 아닌 경우의 서명 {#out-of-turn-signing}

Bor는 차례에 해당하는 프로듀서가 블록을 생성하지 않을 때를 위한 백업으로 복수의 블록 프로듀서를 선정합니다. 이는 다음과 같은 다양한 이유로 발생할 수 있습니다.

- 블록프로듀서 노드 다운
- 블록프로듀서가 블록을 보유하려고 하는 경우
- 블록프로듀서가 의도적으로 블록 제작 회피

위와 같은 일이 발생하면 Bor의 백업 메커니즘이 시작됩니다.

어느 시점에서든 유효성 검사자 세트는 서명자 주소 기반으로 정렬 된 배열로 저장됩니다. 유효성 검사자 세트가 A, B, C, D 순으로 정렬되고 블록을 생성하는 것이 C의 차례라고 가정해 봅니다. C가 충분한 시간 내에 블록 생성하지 않는 경우 D에게 블록을 생성하는 차례가 주어집니다. D가 생성하지 않으면 차례는 A가 되고, 그 다음은 B입니다.

그러나 C가 블록을 생성하고 전파하기 전까지는 시간이 있을 것이므로 백업 유효성 검사자는 블록 생성을 시작하기 전에 일정 시간동안 대기하게 됩니다. 이와 같은 시간 지연을 Wiggle이라고 합니다.

### Wiggle {#wiggle}

Wiggle은 프로듀서가 블록을 만들기 시작하기 전에 대기 해야 하는 시간입니다.

- 마지막 블록(n-1)이 `t` 시간에 생성되었다고 가정해 봅시다.
- 가변 파라미터 `Period`로 현재와 다음 블록 사이의 최소 시간 지연을 시행합니다.
- 이상적인 조건에서 C는 `Period` 동안 대기하고 그 다음 블록을 생성하고 전파합니다. Polygon 블록 시간은 매우 짧게(2~4초) 설계되어 있기 때문에 전파 지연도 동일한 값인 `Period`로 가정합니다.
- 따라서 D가 `2 * Period` 시간 내에 새로운 블록을 보지 못하면, D는 즉시 블록 생성을 시작합니다. 구체적으로 D의 Wiggle 시간은 `pos(c) = 2`로 정의되며, 유효성 검사자 세트에서 `pos(d) = 3` 이고 `2 * Period * (pos(d) - pos(c))`입니다. `Period = 1`이라고 가정하면 D의 Wiggle 시간은 2초입니다.
- 이제 D 또한 블록을 생성하지 않을 경우, A는 Wiggle 시간 `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s`이 경과되면 블록을 생성하기 시작할 것입니다.
- 동일한 방식으로, C의 Wiggle은 `6s`입니다.

### 포크 해결 {#resolving-forks}

위 메커니즘은 체인을 더욱 튼튼하게 보강하여, 포크를 할 수 있게 됩니다. C가 블록을 생성했으나 전파에 예상보다 더 큰 지연이 발생했고, D 또한 블록을 생성해 최소한 2개의 포크가 발생되는 상황은 실제로 충분히 일어날 수 있습니다.

이 경우 해결은 간단합니다. 더 높은 난이도의 체인을 선택하는 것입니다. 하지만 문제는 설정에서 블록 난이도를 어떻게 정의할 수 있을까요?

### 난이도 {#difficulty}

- 해당 차례의 서명자 (예를 들어 C)가 생성하는 블록 난이도는 최고 = `len(validatorSet)`로 정의됩니다.
- 다음 프로듀서는 D이기 때문에, D가 블록을 생성하는 상황이 발생할 경우 블록의 난이도는 Wiggle과 마찬가지로`len(validatorSet) - (pos(d) - pos(c))`, 즉 `len(validatorSet) - 1`로 정의됩니다.
- 백업으로서 A가 생성하는 블록의 난이도는 `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))`이 되며, `2`입니다.

이제 각 블록의 난이도가 정의되었으며, 포크의 난이도는 간단하게 해당 포크의 블록 난이도의 합이 됩니다. 포크가 선택되어야 할 경우 난이도가 높은 포크가 선택되는데, 이를 통하여 해당 차례의 블록 프로듀서가 블록을 생성했다는 사실이 반영되기 때문입니다. 이는 바로 Bor 사용자에게 최종 완결성을 제공하기 위해서입니다.

## 뷰 변경 {#view-change}

각 스팬 이후 Bor는 뷰를 변경합니다. 이는 다음 스팬에 새로운 프로듀서를 가져오는 것을 의미합니다.

### 스팬 커밋 {#commit-span}

현재 스팬이 종료될 때(구체적으로 스팬의 마지막에서 두 번째 스프린트의 종료), Bor는 Heimdall에서 새로운 스팬을 가져옵니다. 이것은 Heimdall 노드에 대한 간단한 HTTP 호출입니다. 데이터를 가져온 후, 시스템 호출을 통해 BorValidatorSet 제네시스 계약에 `commitSpan` 호출이 이루어집니다.

Bor 또한 프로듀서 바이트를 블록 헤더로 설정합니다. 이것은 Bor를 빠르게 동기화할 때 필요합니다. 빠른 동기화에서 Bor는 벌크 헤더와 동기화되며 블록이 승인된 프로듀서에 의해 생성되었는지 확인합니다.

각 스프린트를 시작할 때, Bor는 다음 프로듀서의 이전 헤더에서 헤더 바이트를 가져오며 `ValidatorSet` 알고리즘을 기반으로 하여 블록 생성을 시작합니다.

다음은 블록의 헤더 모양입니다.

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## 이더리움 체인에서 상태 동기화 {#state-sync-from-ethereum-chain}

Bor는 메인 이더리움 체인의 특정 이벤트가 Bor로 전달되는 메커니즘을 제공합니다. 이는 또한 플라스마 계약에 대한 입금이 처리되는 방법입니다.

1. 이더리움의 모든 계약은 `StateSender.sol`에서 [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33)로 호출할 수 있습니다. 이 호출은 `StateSynced` 이벤트를 내보냅니다. https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. `function proposeState(uint256 stateId)`Heimdall은 이 이벤트 및 호출에 대해 듣고 - `StateReceiver.sol`따라서 보류 중인 상태 변경 ID의 매장으로 작용합니다. `proposeState` 트랜잭션이 현재 유효성 검사자 세트의 유효성 검사자 중 하나에 의해 이루어지는 한, 가스 비용이 0이라 할지라도 처리된다는 점에 유의하세요. https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. 모든 스프린트를 시작할 때, Bor는 Heimdall의 상태를 사용하여 보류중인 상태 변화에 대한 세부 사항을 가져와서 시스템 호출을 사용해 Bor 상태로 커밋합니다 `commitState`에 대한 정보는 다음을 참조하세요. https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
