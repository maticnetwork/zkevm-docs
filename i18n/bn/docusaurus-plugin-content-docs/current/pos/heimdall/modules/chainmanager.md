---
id: chainmanager
title: চেইন ম্যানেজার
description: মডিউল যা সমস্ত প্রয়োজনীয় dependencies  সরবরাহ করে
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# চেইন ম্যানেজার {#chain-manager}

এই ডকুমেন্ট Heimdall-এর চেইন ম্যানেজার মডিউলের একটি ওভারভিউ নির্দিষ্ট করে।

**চেইন ম্যানেজার** মডিউল মত সব প্রয়োজনীয় ডিপ্রেসেন্ট উপলব্ধ করা `contract-addresses`হয়, `bor_chain_id,`এবং ।`tx_confirmation_time` অন্যান্য প্যারামিটার পরে এটিতে যোগ করা যেতে পারে।


প্যারামগুলি `gov` মডিউলের মাধ্যমে আপডেট করা হয়।

## প্রকার {#types}

Heimdall-এ চেইন ম্যানেজারের কাঠামো নিম্নলিখিত বিষয়গুলির মতো দেখাচ্ছে:

```go
type ChainParams struct {
	// BorChainID is valid bor chainId
	BorChainID            string                  `json:"bor_chain_id" yaml:"bor_chain_id"`

	// MaticTokenAddress is valid matic token address
	MaticTokenAddress     hmTypes.HeimdallAddress `json:"matic_token_address" yaml:"matic_token_address"`

	// StakingManagerAddress is valid contract address
	StakingManagerAddress hmTypes.HeimdallAddress `json:"staking_manager_address" yaml:"staking_manager_address"`

	// RootChainAddress is valid contract address
	RootChainAddress      hmTypes.HeimdallAddress `json:"root_chain_address" yaml:"root_chain_address"`

	// StakingInfoAddress is valid contract address
	StakingInfoAddress    hmTypes.HeimdallAddress `json:"staking_info_address" yaml:"staking_info_address"`

	// StateSendedAddress is valid contract address
	StateSenderAddress    hmTypes.HeimdallAddress `json:"state_sender_address" yaml:"state_sender_address"`

	// Bor Chain Contracts
	// StateReceiveAddress is valid contract address
	StateReceiverAddress hmTypes.HeimdallAddress `json:"state_receiver_address" yaml:"state_receiver_address"`

	// ValidatorSetAddress is valid contract address
	ValidatorSetAddress  hmTypes.HeimdallAddress `json:"validator_set_address" yaml:"validator_set_address"`
}
```

## CLI কমান্ড {#cli-commands}

### প্যারামিটার {#parameters}

সমস্ত প্যারাম মুদ্রণ করতে;

```go
heimdallcli query chainmanager params --trust-node
```

### প্রত্যাশিত ফলাফল {#expected-result}

```yaml
tx_confirmation_time: 12s
chain_params:
  bor_chain_id: "15001"
  matic_token_address: "0x0000000000000000000000000000000000000000"
  staking_manager_address: "0x0000000000000000000000000000000000000000"
  root_chain_address: "0x0000000000000000000000000000000000000000"
  staking_info_address: "0x0000000000000000000000000000000000000000"
  state_sender_address: "0x0000000000000000000000000000000000000000"
  state_receiver_address: "0x0000000000000000000000000000000000000000"
  validator_set_address: "0x0000000000000000000000000000000000000000"
```

### REST API {#rest-apis}

| নাম | পদ্ধতি | URL |
|----------------------|------|------------------|
| প্যারাম | পান | চেইন ম্যানেজার/প্যারাম |

সমস্ত query ার API-এর নিম্নলিখিত ফর্ম্যাটে প্রতিক্রিয়া প্রদান করবে:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
