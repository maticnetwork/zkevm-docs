---
id: auth
title: Auth
description: ベーストランザクションとアカウントの種類を指定するためのモジュール
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Authモジュール {#auth-module}

このドキュメントでは、Heimdallの`auth`モジュールについて説明しています。

この`auth`モジュールは、アプリケーションのベーストランザクションおよびアカウントタイプを指定する責任を負っています。これには、すべての基本トランザクションの有効性チェック（署名、ノンス、補助フィールド）が実行されるアンティハンドラーを含んでおり、アカウントキーパーを公開しています。これにより他のモジュールがアカウントを読み取り、書き込み、変更できるようになります。

## ガスと手数料 {#gas-and-fees}

手数料はネットワークのオペレータに二つの目的で必要です。

手数料は、各フルノードに保存された状態の拡大を制限し、安い経済的価値のトランザクションの一般的な目的の検閲を可能にします。手数料は、対スパムメカニズムとして最適です。これによりバリデータはネットワークの使用やユーザーのIDに興味を失います。

Heimdallはいかなるトランザクションに対してもカスタムコントラクトやコードをサポートしていないため、固定コストトランザクションを使用します。固定コストのトランザクションでは、[Topup](Topup.md)モジュールを使用してバリデータはEthereumチェーンのアカウントにトップアップし、Hiemdallにトークンを獲得することができます。

## タイプ {#types}

アカウント（ステートで指定）のほかに、authモジュールによって公開されるタイプは、オプションの公開鍵と暗号署名をバイト配列として組み合わせ**た**StdSignature、**StdSignature**を使用したインター`sdk.Tx`フェースを実装するstdTx**、**トランザクション送信者がサインする必要がある**StdTx**のための再生防止構造である**StdSignDoc**などです。

### StdSignature（標準署名） {#stdsignature}

`StdSignature`はバイト配列のタイプです。

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

`StdTx`は、`sdk.Tx`インターフェースを実装する構造であり、多くのタイプのトランザクション用に利用できる十分に一般的なものです。

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

`StdSignDoc`はその上に署名が必要な再生防止構造であり、これにより、提出されたいかなるトランザクション（これは単に特定のバイト文字列への署名です）もHeimdallで一度だけ実行可能になるのです。

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### アカウント {#account}

これはトランザクション用のアドレス、コイン、ノンスを管理します。これはトランザクションに署名、検証も行います。

出典：[https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## パラメータ {#parameters}

authモジュールは次のパラメータを含みます：

| 鍵 | タイプ | デフォルト値 |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | 文字列 | "1000000000000000" |


## CLIコマンド {#cli-commands}

### Show account（アカウントの表示） {#show-account}

アカウント関連データをHeimdallに印刷するため。

```bash
heimdalld show-account
```

予測される結果：

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Account and coin details（アカウントとコインの詳細） {#account-and-coin-details}

アカウントの詳細、コイン、順番、アカウント番号を表示するため。

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

予測される結果：

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### パラメータ {#parameters-1}

すべてのパラメータを印刷する；

```go
heimdallcli query auth params
```

予測される結果：

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## 他のAPI {#rest-apis}

| 名前 | エンドポイント | 説明 |
|----------------------|--------|------------------|
| Account details（アカウント詳細） | /auth/accounts/{address} | アドレスのすべての詳細を返します。 |
| Account sequence details（アカウントシーケンス詳細） | /auth/accounts/{address}/sequence | 署名に必要な詳細のみを返します |
| Auth params（Authパラメータ） | /auth/params | Authモジュールが使用する全てのパラメータを返します |
