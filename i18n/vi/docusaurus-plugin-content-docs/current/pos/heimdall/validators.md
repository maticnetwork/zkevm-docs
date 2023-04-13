---
id: validators
title: Giá trị Heimdall
description: Cấu trúc của Heimdall cho trình xác thựcs
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - validators
image: https://matic.network/banners/matic-network-16x9.png
---

#
Giá trị Heimdall {#heimdall-validators}

Người xác thực là một phần quan trọng của Heimdall. Heimdall có một tùy chọn để thay đổi người xác thực ở cuối mỗi khối. Nó được `EndBlocker`gọi là một phần của Cosmos-SDK: [https://docs.cos.nets/master/built-modules/beginblock.html](https://docs.cosmos.network/master/building-modules/beginblock-endblock.html)

Heimdall sử dụng cấu trúc sau cho người xác thực:

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

Ở đây `StartEpoch`và `EndEpoch`là số điểm kiểm duyệt ở giữa người xác thực sẽ hoạt động như một người xác thực. Trong `EndBlocker`cho ứng dụng, Heimdall nhận tất cả người xác thực đang hoạt động và cập nhật tập hợp người xác thực hiện tại trong trạng thái.

Cuối cùng, nó trả về các bản cập nhật người xác thực cho Tendermint.

Nguồn: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542)

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
