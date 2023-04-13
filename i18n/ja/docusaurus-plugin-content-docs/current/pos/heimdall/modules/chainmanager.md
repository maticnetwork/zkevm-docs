---
id: chainmanager
title: チェーンマネージャ
description: 必要なすべての依存関係を提供するモジュール
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# チェーンマネージャ {#chain-manager}

本文書では、Heimdallのチェーンマネージャーモジュールの概要を示しています。

**チェーン**マネージャモジュールには`contract-addresses`、必要なすべての依存関係`bor_chain_id,`が用意されています。`tx_confirmation_time`他のパラメータは後でこれに追加することができます。

パラメータは`gov`モジュールを介して更新されます。

## タイプ {#types}

Heimdallのチェーンマネージャ構造は、次のようになります：

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

## CLIコマンド {#cli-commands}

### パラメータ {#parameters}

すべてのパラメータを印刷する；

```go
heimdallcli query chainmanager params --trust-node
```

### 予想される結果 {#expected-result}

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

| 名前 | メソッド | URL |
|----------------------|------|------------------|
| パラメータ | GET（取得） | チェーンマネージャ/パラメータ |

すべてのクエリーAPIは、次の形式で応答を提供します：

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
