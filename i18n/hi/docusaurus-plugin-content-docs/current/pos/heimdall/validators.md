---
id: validators
title: हेम्डल वैलिडेटर
description: वैलिडेटर्स के लिए Heimdall's की संरचना
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - validators
image: https://matic.network/banners/matic-network-16x9.png
---

# हेम्डल वैलिडेटर {#heimdall-validators}

वैलिडेटर्स, हेम्डल का एक अनिवार्य हिस्सा हैं. हेम्डल के पास प्रत्येक ब्लॉक के अंत में वैलिडेटर्स को बदलने का विकल्प होता है. इसे Cosmos-SDK: [https://docs.cosmos.network/master/building-modules/beginblock-endblock.html](https://docs.cosmos.network/master/building-modules/beginblock-endblock.html) का एक हिस्सा `EndBlocker`कहते हैं.

हेम्डल वैलिडेटर्स के लिए निम्नलिखित संरचना का इस्तेमाल करता है:

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

यहाँ  `StartEpoch`और `EndEpoch` चेकपॉइंट नम्बर्स हैं जिनके बीच में वैलिडेटर एक वैलिडेटर के रूप में एक्टिव होगा. ऐप के लिए `EndBlocker`में, हेम्डल सभी एक्टिव वैलिडेटर्स को प्राप्त करता है और स्टेट में वर्तमान वैलिडेटर सेट को अपडेट करता है.

अंत में, यह टेंडरमिंट के लिए वैलिडेटर अपडेट देता है.

स्रोत: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542)

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
