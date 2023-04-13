---
id: staking
title: การ Stake
description: โมดูลที่จัดการธุรกรรมที่เกี่ยวกับตัวจัดการที่เกี่ยวกับตัวตรวจสอบความถูกต้องและสถานะของตัวมันเอง
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# การ Stake {#staking}

โมดูลการเดิมพันจัดการธุรกรรมเกี่ยวกับตัวตรวจสอบความถูกต้องและสถานะสำหรับ Heimdallโปรดทราบว่าตัวตรวจสอบความถูกต้องจะเดิมพันโทเค็นของตนบนเชน Ethereum และกลายเป็นตัวตรวจสอบความถูกต้อง ตัวตรวจสอบความถูกต้องที่เกี่ยวข้องจะส่งธุรกรรมบน Heimdall โดยใช้พารามิเตอร์ที่จำเป็น เพื่อรับทราบการเปลี่ยนเดิมพันบน Ethereumเมื่อเสียงส่วนใหญ่ของตัวตรวจสอบความถูกต้องตกลงยอมรับการเปลี่ยนแปลงเดิมพัน โมดูลนี้จะบันทึกข้อมูลตัวตรวจสอบความถูกต้องในสถานะของ Heimdall

## การจัดการคีย์ {#key-management}

โปรดดูการจัดการคีย์ได้ใน[การจัดการคีย์ของตัวตรวจสอบความถูกต้อง](/docs/pos/heimdall/validator-key-management)

## การมอบหมายสิทธิ์ {#delegation}

โมดูลนี้จัดการเฉพาะตัวตรวจสอบความถูกต้องที่เดิมพันบน Heimdallการมอบหมายสิทธิ์ใช้งานได้กับสัญญาอัจฉริยะบนเชน Ethereum เท่านั้นเพื่อปรับการคำนวณผลตอบแทนของการมอบหมายสิทธิ์ให้เหมาะกับสัญญาอัจฉริยะ เราใช้ส่วนแบ่งของตัวตรวจสอบความถูกต้อง (ERC20 ต่อตัวตรวจสอบความถูกต้อง)

โปรดดูรายละเอียดเพิ่มเติมที่นี่: [การมอบหมายสิทธิ์ (ส่วนแบ่งของตัวตรวจสอบความถูกต้อง)](/docs/pos/contracts/delegation)

## ผลตอบแทน {#rewards}

ผลตอบแทนทั้งหมดถูกแจกจ่ายบนเชน Ethereumตัวตรวจสอบความถูกต้องและตัวมอบหมายสิทธิ์เรียกร้องผลตอบแทนของตนหรือเดิมพันใหม่ โดยเพียงแค่ส่งธุรกรรมบน `StakeManager.sol`

โปรดดูรายละเอียดเพิ่มเติมที่นี่: [ผลตอบแทน](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## ข้อความ {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` จัดการการเดิมพัน เมื่อตัวตรวจสอบความถูกต้องใหม่เข้าร่วมระบบ เมื่อตัวตรวจสอบความถูกต้องเรียก `stake` หรือ `stakeFor`ใน `StakingManager.sol` บน Ethereum และส่งเหตุการณ์ `Staked` ใหม่

ที่มา: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch` คือจำนวนเช็คพอยต์จากตำแหน่งที่ตัวตรวจสอบความถูกต้องเริ่มใช้งานบน Heimdall

หากสล็อตใช้งานไม่ได้ การเรียกเดิมพันบนสัญญาอัจฉริยะจะทำงานไม่ได้สล็อตตัวตรวจสอบความถูกต้องเป็นวิธีในการจำกัดจำนวนตัวตรวจสอบความถูกต้องในระบบสล็อตมีการจัดการบนสัญญาอัจฉริยะ Ethereum

นี่คือข้อความ `ValidatorJoin` สำหรับธุรกรรมของ Heimdall:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate` จัดการการอัปเดตเดิมพัน เมื่อตัวตรวจสอบความถูกต้องทำการเดิมพันใหม่ หรือมีการมอบหมายสิทธิ์ใหม่เข้ามา ในกรณีใดก็ตาม จะมีการส่งเหตุการณ์ `StakeUpdate` ใหม่

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

นี่คือข้อความ `MsgStakeUpdate` สำหรับธุรกรรมของ Heimdall:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

`MsgValidatorExit` จัดการกระบวนการออกของตัวตรวจสอบความถูกต้อง หลังจากที่ตัวตรวจสอบความถูกต้องเริ่มกระบวนการออกบน Ethereumโดยจะส่งเหตุการณ์ `SignerUpdate`

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

นี่คือข้อความ `MsgValidatorExit` สำหรับธุรกรรมของ Heimdall:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` จัดการการอัปเดตผู้ลงนาม เมื่อตัวตรวจสอบความถูกต้องอัปเดตคีย์ผู้ลงนามบน Ethereumโดยจะส่งเหตุการณ์ `SignerUpdate`

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

นี่คือข้อความ `MsgSignerUpdate` สำหรับธุรกรรมของ Heimdall:

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## คำสั่ง CLI {#cli-commands}

### รายละเอียดตัวตรวจสอบความถูกต้อง {#validator-details}

**ตามที่อยู่ผู้ลงนาม**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

คำสั่งนี้ควรแสดงเอาต์พุตต่อไปนี้:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**ตามที่อยู่ตัวตรวจสอบความถูกต้อง**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

คำสั่งนี้ควรแสดงเอาต์พุตต่อไปนี้:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### Validator join {#validator-join}

คำสั่งนี้ส่งคำสั่ง validator join ผ่านทาง CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

ค่า `tx-hash` ต้องเหมือนกับแฮช Ethereum TX ซึ่งส่งเหตุการณ์ `Staked` และ `log-index` ต้องเหมือนกับดัชนีที่ส่งเหตุการณ์นั้น

## REST API {#rest-apis}

| ชื่อ | เมธอด | ตำแหน่งข้อมูล |
|----------------------|------|------------------|
| รับชุดตัวตรวจสอบความถูกต้องของ Heimdall | GET | /staking/validator-set |
| รับรายละเอียดตัวตรวจสอบความถูกต้อง | GET | /staking/validator/validator-id |


API การสืบค้นทั้งหมดจะแสดงในรูปแบบต่อไปนี้:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
