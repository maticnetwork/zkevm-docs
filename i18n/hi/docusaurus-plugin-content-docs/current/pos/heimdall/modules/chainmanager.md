---
id: chainmanager
title: चेन मैनेजर
description: मॉड्यूल जो सभी आवश्यक डिपेंडेंसी प्रदान करता है
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# चेन मैनेजर {#chain-manager}

यह दस्तावेज Heimdall. की चेन मैनेजर मॉड्यूल का एक अवलोकन निर्दिष्ट करता है.

**चेन मैनेजर** मॉड्यूल जैसे सभी आवश्यक डिपेंडेंसी प्रदान करता है `contract-addresses`, `bor_chain_id,`और`tx_confirmation_time` बाद में इस पर अन्य पैरामीटर जोड़े जा सकते हैं.

`gov` मॉड्यूल के ज़रिए पैरामीटर अपडेट किए जाते हैं.

## प्रकार {#types}

हेम्डल पर चेन मैनेजर स्ट्रक्चर इनकी तरह दिखता है:

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

## CLI कमांड्स {#cli-commands}

### पैरामीटर {#parameters}

सभी params; को छापने के लिए

```go
heimdallcli query chainmanager params --trust-node
```

### उम्मीद के मुताबिक नतीजा {#expected-result}

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

| नाम | तरीका | URL |
|----------------------|------|------------------|
| परम | पाएं | चेन मैनेजर/परम |

सभी क्वेरी API निम्नलिखित प्रारूप में प्रतिक्रिया प्रदान करेगा:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
