---
id: antehandler
title: アンティハンドラー
description: Anteハンドラーはトランザクションをチェックおよび検証します。
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# アンティハンドラー {#ante-handler}

アンティハンドラーはトランザクションを確認し、検証します。検証後、十分な手数料のために送信者の残高を確認し、トランザクションを含むことに成功した場合、手数料を差し引きます。

## ガス制限 {#gas-limit}

ブロック及びトランザクションには、ガス使用量に制限があります。ブロックには複数のトランザクションが含まれていますが、ブロック内のすべてのトランザクションで使用されるガスは、より大きなブロックを回避するために、ブロックのガス制限を下回る必要があります。

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

トランザクション上の状態操作には、トランザクションの署名検証を含むガスがかかります。

### ブロックガス制限 {#block-gas-limit}

アプリのコンセンサスパラメータを設定する際、ブロックごとの最大ガス制限とバイトが送信されます：[https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### トランザクションのガス制限 {#transaction-gas-limit}

トランザクションのガス制限は、`auth`モジュール内のパラメータで定義されます。Heimdall`gov`モジュールを介して変更できます。

### チェックポイントトランザクションガス制限 {#checkpoint-transaction-gas-limit}

ブロックには複数のトランザクションが含まれ、Ethereumチェーンでこの特定のトランザクションを検証するため、Merkleプルーフが必要です。チェックポイントトランザクションの余分なMerkleプルーフ検証を回避するため、Heimdallは、トランザクションタイプが`MsgCheckpoint`の場合、ブロック内のトランザクション1回のみを可能にします。

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## トランザクション検証とリプレイ対策 {#transaction-verification-and-replay-protection}

アンティハンドラーは、受信トランザクションで署名を処理及び検証します：[https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

トランザクションには、リプレイ攻撃を回避するために、`sequenceNumber`を含む必要があります。トランザクションを含むことに成功した場合、アンティハンドラーは、TX送信者アカウントのシーケンス番号を増加し、前回のトランザクションの重複（リプレイ）を回避します。