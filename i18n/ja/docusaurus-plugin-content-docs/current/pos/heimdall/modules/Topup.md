---
id: topup
title: Topup（トップアップ（金額の追加））
description: Heimdallチェーンで手数料を支払うために使用される金額
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup（トップアップ（金額の追加）） {#topup}

Heimdall Topupは、Heimdallチェーンで手数料を支払うのに使用する金額です。

アカウントをトップアップするには2つの方法があります：

1. 新しいバリデータが参加すると、ステークされた金額に加えて、トップアップとしての`topup`量を言及することができます。これはHeimdallチェーン上の残高として移動してHeimdallに手数料を支払うことができます。
2. ユーザーはEthereum上のステーキングスマートコントラクトでトップアップ機能を直接呼び出して、Heimdall上のトップアップバランスを増やすことができます。

## メッセージ {#messages}

### MsgTopup（メッセージトップアップ） {#msgtopup}

`MsgTopup`トランザクションは、ステーキングマネージャコントラクトでEthereumチェーンの`TopUpEvent`に基づき、Heimdallのアドレスに残高をミントする責任を負います。

このトランザクションのハンドラは、トップアップを処理し、与えられたあらゆる`msg.TxHash`と`msg.LogIndex`に一度だけ残高を増やします。2度以上トップアップを処理しようとすると`Older invalid tx found`エラーを投げます。

以下は、トップアップトランザクションメッセージの構造です：

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee（メッセージ取り消し手数料） {#msgwithdrawfee}

`MsgWithdrawFee`トランザクションは、HeimdallからEthereumチェーンに残高を引き出す責任を負います。バリデータは、Heimdallからいくらでも引き出すことができます。

ハンドラは、当該バリデータから残高を差し引くことにより引き出しを処理し、状態を次のチェックポイントに送信する準備をします。次の可能なチェックポイントは、特定のバリデータの引き出し関連状態を含みます。

ハンドラは、`ValidatorAddress`に基づきバリデータ情報を取得し、引き出しを処理します。

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## CLIコマンド {#cli-commands}

### Topup Fee {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### 引き出し手数料 {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

アカウントにトップアップが反映されているか確認するには、次のコマンドを実行してください

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## その他のAPI {#rest-apis}

| 名前 | メソッド | URL | ボディパラメータ |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Topup Fee | POST | /topup/fee | `id`バリデータID、`tx_hash`Ethereumチェーン上で成功したトップアップイベントのトランザクションハッシュ、`log_index`Ethereumチェーンで出力されたトップアップイベントのログインデックス |
| Withdraw Fee | POST | /topup/withdraw | `amount`引き出し額 |
