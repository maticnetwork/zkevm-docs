---
id: clerk
title: Clerk
description: EthereumからBorへの一般的なステート同期を管理するモジュール
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerkは、EthereumチェーンからBorチェーンへの汎用的なstate-sync（状態同期）を管理します。Heimdallは、Clerkモジュールを使用してEthereumチェーン上で開始されるステート同期に同意します。

詳細は[ステート同期メカニズム](/docs/pos/bor/core_concepts.md#state-management-state-sync)でご覧いただけます。

## メッセージ {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord`トランザクションは、`StateSender.sol`からのイベントを検証し、状態をHeimdallで、Borが使用するために保存する責任を負います。

このトランザクションのハンドラは、与えられたいかなる`msg.TxHash`と`msg.LogIndex`に対しても検証を行います。トランザクションを2回以上処理しようとすると、`Older invalid tx found`エラーを投げます。

以下は、トランザクションメッセージの構造です：

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## CLIコマンド {#cli-commands}

### 状態記録トランザクションの送信 {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### すでに検証済みの状態イベント記録にクエリをする {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## その他のAPI {#rest-apis}

| 名前 | メソッド | エンドポイント |
|----------------------|------|------------------|
| Event record details | GET | /clerk/event-record/<record-id\> |
| All event records | GET | /clerk/event-record/list |
