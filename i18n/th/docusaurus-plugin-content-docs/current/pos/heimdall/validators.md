---
id: validators
title: ตัวตรวจสอบความถูกต้องแบบ Heimdall
description: โครงสร้าง Heimdall สำหรับตัวตรวจสอบความถูกต้อง
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - validators
image: https://matic.network/banners/matic-network-16x9.png
---

# ตัวตรวจสอบความถูกต้องแบบ Heimdall {#heimdall-validators}

ตัวตรวจสอบความถูกต้องเป็นส่วนสำคัญของ HeimdallHeimdall มีตัวเลือกในการเปลี่ยนตัวตรวจสอบความถูกต้องเมื่อสิ้นสุดแต่ละบล็อก ซึ่งเรียกว่า `EndBlocker`ซึ่งเป็นส่วนหนึ่งของ[ระบบ Cosmos-SDK: https://docs.cosmos.network/master/building-modues/begin-endblock.html](https://docs.cosmos.network/master/building-modules/beginblock-endblock.html)

Heimdall ใช้โครงสร้างต่อไปนี้สำหรับตัวตรวจสอบความถูกต้อง:

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

`StartEpoch` และ `EndEpoch` คือหมายเลขเช็คพอยต์ ซึ่งตัวตรวจสอบความถูกต้องจะใช้งานได้โดยเป็นตัวตรวจสอบความถูกต้อง ระหว่างหมายเลขดังกล่าวใน `EndBlocker` สำหรับแอป Heimdall จะรับตัวตรวจสอบความถูกต้องที่ใช้งานได้ทั้งหมด และอัปเดตชุดตัวตรวจสอบความถูกต้องปัจจุบันในสถานะ

ในที่สุดก็จะส่งกลับการอัปเดตตัวตรวจสอบความถูกต้องสำหรับ Tendermint

ที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L500-L542)

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
