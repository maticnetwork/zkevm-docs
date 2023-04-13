---
id: validators
title: Validateurs Heimdall
description: Structure Heimdall pour les validateurs
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - validators
image: https://matic.network/banners/matic-network-16x9.png
---

# Validateurs Heimdall {#heimdall-validators}

Les validateurs sont une partie essentielle de Heimdall. Heimdall a la possibilitde changer les validateurs à la fin de bloc Il est appelé `EndBlocker`qui fait partie de Cosmos-SDK: [https://docs.cosmos.network/master/building-modules/beginblock-endblock.html](https://docs.cosmos.network/master/building-modules/beginblock-endblock.html)

Heimdall utilise la structure suivante pour les validateurs:

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

Ici `StartEpoch` et `EndEpoch` sont des nombres de point de contrôle entre le validateur qui sera actif.  Dans `EndBlocker`pour l'application, Heimdall reçoit tous les validateurs actifs et met à jour l'ensemble de validateur actuel dans l'état.

En fin de compte, cela retourne les mis à jour du validateur pour le Tendermint.

Source: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542)

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
