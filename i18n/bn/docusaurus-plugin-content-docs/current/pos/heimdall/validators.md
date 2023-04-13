---
id: validators
title: Heimdall Validators
description: যাচাইকারীর জন্য Heimdall এর গঠন
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - validators
image: https://matic.network/banners/matic-network-16x9.png
---

# Heimdall Validators {#heimdall-validators}

যাচাইকারীরা Heimdall-এর একটি অপরিহার্য অংশ।  Heimdall-এর প্রতিটি ব্লকের শেষে যাচাইকারী পরিবর্তন করার একটি বিকল্প আছে। এটি বলা হয় `EndBlocker`যা Cosmos-SDK একটি অংশ: [https://docs.cosmos.network/master/building-modules/beginblock-endblock.html](https://docs.cosmos.network/master/building-modules/beginblock-endblock.html)

Heimdall the জন্য নিম্নলিখিত কাঠামো ব্যবহার করে:

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

এখানে
`StartEpoch`এবং `EndEpoch`চেকপয়েন্ট নম্বরগুলি যাচাইকারীর মধ্যে একটি বৈধকারী হিসাবে সক্রিয় হবে। `EndBlocker` এর
মধ্যে অ্যাপের জন্য, Heimdall সমস্ত সক্রিয় যাচাইকারী পায় এবং রাজ্যে বর্তমান যাচাইকারী সেটকে
আধুনিক রূপ দেয়।

শেষে এটি Tendermint-এর জন্য যাচাইকারী আপডেট প্রদান করে।

সোর্স: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542)

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
