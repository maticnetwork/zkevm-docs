---
id: validators
title: Heimdall 검사기
description: 검증자용 Heimdall의 구조
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - validators
image: https://matic.network/banners/matic-network-16x9.png
---

# Heimdall 검사기 {#heimdall-validators}

유효성 검사자는 Heimdall의 필수적인 부분입니다. Heimdall에는 각 블록이 끝날 때 유효성 검사자를 변경할 수 있는 옵션이 있습니다. Cosmos-SDK의 일부인 것이 `EndBlocker`["Cosmosis://docs.cosmos.network/master/master/installed block-endblock.html](https://docs.cosmos.network/master/building-modules/beginblock-endblock.html)

Heimdall은 검증자에게 다음 구조를 사용합니다.

```go
// Validator for Heimdall
type Validator struct {
	ID          ValidatorID     `json:"ID"`
	StartEpoch  uint64          `json:"startEpoch"`
	EndEpoch    uint64          `json:"endEpoch"`
	VotingPower int64           `json:"power"`
	PubKey      PubKey          `json:"pubKey"`
	Signer      HeimdallAddress `json:"signer"`
	LastUpdated string          `json:"last_updated"`

	ProposerPriority int64 `json:"accum"`
}

// ValidatorID  validator ID and helper functions
type ValidatorID uint64
```

여기에서 `StartEpoch`와 `EndEpoch`는 체크포인트 번호로, 이 사이에 유효성 검사자들이 활성화됩니다.  앱용 `EndBlocker`에서 Heimdall은 모든 활성 유효성 검사자를 가져온 다음 상태에 설정된 현재 유효성 검사자를 업데이트합니다.

마지막으로, 텐더민트의 유효성 검사자 업데이트를 반환합니다.

출처: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542)

```go
// --- Start update to new validators
currentValidatorSet := app.StakingKeeper.GetValidatorSet(ctx)
allValidators := app.StakingKeeper.GetAllValidators(ctx)
ackCount := app.CheckpointKeeper.GetACKCount(ctx)

// get validator updates
setUpdates := helper.GetUpdatedValidators(
	&currentValidatorSet, // pointer to current validator set -- UpdateValidators will modify it
	allValidators,        // All validators
	ackCount,             // ack count
)

if len(setUpdates) > 0 {
	// create new validator set
	if err := currentValidatorSet.UpdateWithChangeSet(setUpdates); err != nil {
		// return with nothing
		logger.Error("Unable to update current validator set", "Error", err)
		return abci.ResponseEndBlock{}
	}

	// increment proposer priority
	currentValidatorSet.IncrementProposerPriority(1)

	// save set in store
	if err := app.StakingKeeper.UpdateValidatorSetInStore(ctx, currentValidatorSet); err != nil {
		// return with nothing
		logger.Error("Unable to update current validator set in state", "Error", err)
		return abci.ResponseEndBlock{}
	}

	// convert updates from map to array
	for _, v := range setUpdates {
		tmValUpdates = append(tmValUpdates, abci.ValidatorUpdate{
			Power:  int64(v.VotingPower),
			PubKey: v.PubKey.ABCIPubKey(),
		})
	}
}

// send validator updates to peppermint
return abci.ResponseEndBlock{
	ValidatorUpdates: tmValUpdates,
}
```
