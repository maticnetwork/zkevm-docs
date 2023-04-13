---
id: staking
title: স্ট্যাক করা
description: যে মডিউল যাচাইকারী সম্পর্কিত লেনদেনের এবং স্টেট পরিচালনা করে
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# স্ট্যাক করা {#staking}


স্ট্যাকিং মডিউল Heimdall-এর জন্য যাচাইকারী সম্পর্কিত লেনদেন এবং স্টেট পরিচালনা করে। উল্লেখ্য যে একটি যাচাইকারী Ethereum চেইনে তাদের টোকেন নিয়ে যায় এবং একটি যাচাইকারী হয়ে ওঠে। সংশ্লিষ্ট যাচাইকারীরা প্রয়োজনীয় প্যারামিটারসমূহ ব্যবহার করে Heimdall-এ লেনদেনগুলি প্রেরণ করে Ethereum স্টেক পরিবর্তন স্বীকার করতে। একবার যাচাইকারীর সংখ্যাগরিষ্ঠরা স্টেকের পরিবর্তনের বিষয়ে সম্মত হলে, এই মডিউলটি Heimdall স্টেটে যাচাইকারীর তথ্য সংরক্ষণ করে।

## মূল ব্যবস্থাপনা {#key-management}

মূল ব্যবস্থাপনার জন্য,অনুগ্রহ করে  [যাচাইকারী মূল ব্যবস্থাপনা দেখুন](/docs/pos/heimdall/validator-key-management)।

## ডেলিগেশন {#delegation}

এই মডিউলটি শুধুমাত্র Hemidall এর যাচাইকারী স্টকিং পরিচালনা করে।
প্রতিনিধিত্ব শুধুমাত্র Ethereum চেইনে স্মার্ট চুক্তিতে উপলব্ধ।
স্মার্ট চুক্তিতে প্রতিনিধিদলের পুরষ্কার গণনাকে আরও ভাল করার জন্য, আমরা যাচাইকারী শেয়ার ব্যবহার করছি (
প্রতি যাচাইকারী ERC20)

এখানে আরও বিস্তারিত: [প্রতিনিধিত্ব (যাচাইকারী শেয়ার)](/docs/pos/contracts/delegation)

## পুরস্কার {#rewards}

সমস্ত পুরস্কার Ethereum চেইনে বিতরণ করা হয়। যাচাইকারী এবং প্রতিনিধিরা কেবলমাত্র `StakeManager.sol`তে লেনদেন পাঠিয়ে তাদের পুরস্কার বা পুনরায় অংশীদারিত্ব দাবি করে

এখানে আরও বিস্তারিত: [পুরস্কার](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## মেসেজ {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

যখন কোনও নতুন যাচাইকরণকারী সিস্টেমে যোগ দেয় তখন  `MsgValidatorJoin`স্টেকিং পরিচালনা করে। একবার যাচাইকারী Ethereum-এ `StakingManager.sol`তে `stake`অথবা  `stakeFor`ডাকে, এবং নতুন`Staked` ঘটনা প্রেরণ হয়।

উৎস: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

`activationEpoch`হল চেকপয়েন্ট সংখ্যা যেখানে একটি যাচাইকারী Heimdall এ সক্রিয় হয়ে উঠবে।

স্লটগুলি অনুপলভ্য থাকলে স্মার্ট চুক্তিতে স্টেক কল করা যায় না। যাচাইকারী স্লট হল সিস্টেমে বেশ কিছু যাচাইকারীকে সীমাবদ্ধ করার উপায়। স্লটগুলি Ethereum স্মার্ট চুক্তিতে পরিচালিত হয়।

Heimdall লেনদেনের জন্য এখানে `ValidatorJoin`মেসেজ রয়েছে:

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

`MsgStakeUpdate`স্টেক আপডেটটি পরিচালনা করে যখন কোনও যাচাইকারী পুনরায় স্টেক করে বা নতুন প্রতিনিধি দল আসে।
উভয় ক্ষেত্রেই, নতুন `StakeUpdate`ঘটনা নির্গত হয়।

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

Heimdall লেনদেনের জন্য এখানে `MsgStakeUpdate`মেসেজ রয়েছে:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### মেসেজ যাচাইকারী এক্সিট {#msgvalidatorexit}

একজন যাচাইকারী Ethereum-এ প্রস্থান প্রক্রিয়া শুরু করার পরে  `MsgValidatorExit`যাচাইকারী প্রস্থান প্রক্রিয়া পরিচালনা করে। এটি `SignerUpdate`ঘটনা নির্গত করে।

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

Heimdall লেনদেনের জন্য এখানে `MsgValidatorExit`মেসেজ রয়েছে:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

যখন কোনও যাচাইকরণকারী Ethereum-এ স্বাক্ষরকারী কী আপডেট করে তখন `MsgSignerUpdate`স্বাক্ষরকারী আপডেটটি পরিচালনা করে। এটি `SignerUpdate`ঘটনা নির্গত করে।

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

Heimdall লেনদেনের জন্য এখানে `MsgSignerUpdate`মেসেজ রয়েছে:

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

## CLI কমান্ড {#cli-commands}

### যাচাইকারীর বিশদ বিবরণ {#validator-details}

**স্বাক্ষরকারীর ঠিকানা দ্বারা**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

এই কমান্ড নিম্নলিখিত আউটপুট প্রদর্শন করা উচিত:

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

**যাচাইকারী ঠিকানা দ্বারা**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

এই কমান্ড নিম্নলিখিত আউটপুট প্রদর্শন করা উচিত:

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

### যাচাইকারী যোগদান {#validator-join}


এই কমান্ডটি CLI এর মাধ্যমে যাচাইকারী যোগদান কমান্ড পাঠায়:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

 `tx-hash` মানটি অবশ্যই Ethereum TX হ্যাশ এর মতো হতে হবে যা  `Staked`ইভেন্ট নির্গত করে এবং`log-index`অবশ্যই সেই একই হতে হবে যেখানে ইভেন্টটি নির্গত হয়।

## REST API {#rest-apis}

| নাম | পদ্ধতি | এন্ডপয়েন্ট |
|----------------------|------|------------------|
| Heimdall যাচাইকারী সেট পান | পেতে | /staking/validator-set |
| যাচাইকারী বিবরণ পান | পেতে | /staking/validator/validator-id |


সমস্ত জিজ্ঞাস্য API এই ফরম্যাট অনুযায়ী হবে:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
