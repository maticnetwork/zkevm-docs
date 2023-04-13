---
id: checkpoint
title: チェックポイント
description: チェックポイント関連の機能を管理するモジュール
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# チェックポイント {#checkpoint}

`checkpoint`モジュールは、Heimdallのチェックポイントに関連する機能性を管理します。チェックポイントルートハッシュを検証するためにHeimdallで新しいチェックポイントを提案する場合、Borチェーンが必要です。

チェックポイントデータに関連するすべての詳細は[こちら](/docs/pos/heimdall/checkpoint)をご覧ください。

## チェックポイントライフサイクル {#checkpoint-life-cycle}

Heimdallは、テンダーミントと同じリーダー選択アルゴリズムを使用して次のプロポーザーを選択します。Ethereumチェーンでチェックポイントを送信する際、ガス制限、Ethereum上のトラフィック、高いガス代などの複数の理由により失敗する可能性があります。そのため、多段階チェックポイントプロセスが必要です。

各チェックポイントには、プロポーザーとしてバリデータが付属しています。Ethereumチェーン上のチェックポイントが失敗または成功した場合、`no-ack`トランザクションはHeimdallで提案者を変更`ack`します。次のフローチャートはチェックポイントのライフサイクルを表しています：

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## メッセージ {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint`は、Heimdallでチェックポイント検証を処理します。Ethereumチェーン上で確認する必要があるため、このメッセージのみがRLPエンコーディングを使用します。

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

このトランザクションがHeimdallで処理されると、`proposer`は、このトランザクションのTendermintから`votes`と`sigs`を取り、Ethereumチェーンでチェックポイントを送信します。

ブロックには複数のトランザクションが含まれ、Ethereumチェーンでこの特定のトランザクションを検証するため、Merkleプルーフが必要です。Ethereumで余分なMerkleプルーフ検証を回避するために、Heimdallは、トランザクションタイプが`MsgCheckpoint`の場合、ブロック内のトランザクション1回のみ可能です。

このメカニズムを可能にするために、Heimdallは、高いガスを消費するトランザクションとして`MsgCheckpoint`トランザクションを設定します。[https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)を確認する

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

このトランザクションは、実際のチェックポイントリストの状態ではなく、`checkpointBuffer`状態で提案されたチェックポイントを保存します。

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck`は、チェックポイント送信を成功に処理します。チェックポイントカウンターを次に`HeaderBlock`示します。

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

チェックポイントを送信するための有効な`TxHash`と`LogIndex` について、このトランザクションは、次のイベントを検証し、`checkpointBuffer`状態でチェックポイントを検証します：[https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

イベント検証が成功すると、チェックポイントが実際に更新され、クリア`ackCount`されます。`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck`は、成功しなかったチェックポイントまたはオフラインプロポーザを処理します。このトランザクションは、`CheckpointBufferTime`が次のイベントから送信された後にだけ有効です：

- 最後の成功した`ack`トランザクション
- 最後の成功した`no-ack`トランザクション

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

このトランザクションは、Heimdallが次のチェックポイント`proposer`で新しいを選択する前に、チェックポイント/ackを送信する現在のプロポーザのタイムアウト期間を提供します。

## パラメータ {#parameters}

チェックポイントモジュールは、次のパラメータを含みます：

| 鍵 | タイプ | デフォルト値 |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## CLIコマンド {#cli-commands}

### Params {#params}

すべてのパラメータを印刷するには：

```go
heimdallcli query checkpoint params --trust-node
```

予測される結果：

```yaml
checkpoint_buffer_time: 16m40s
```

### チェックポイントを送信 {#send-checkpoint}

次のコマンドはHeimdallでチェックポイントトランザクションを送信します：

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### 送信する`ack`

次のコマンドはEthereumでチェックポイントが成功した場合、Heimdallでackトランザクションを送信します：

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### 送信する`no-ack`

次のコマンドは、Heimdallでno-ackトランザクションを送信します：

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| 名前 | メソッド | エンドポイント |
|----------------------|------|------------------|
| 現在のチェックポイントバッファーの状態を取得 | GET（取得） | /checkpoint/buffer |
| チェックポイントカウントを取得 | GET（取得） | /checkpoint/count |
| ブロックインデックスでチェックポイント詳細を取得 | GET（取得） | /checkpoint/headers/<header-block-index\> |
| 最新のチェックポイントを取得 | GET（取得） | /checkpoint/latest-checkpoint |
| 最後のno-ack詳細を取得 | GET（取得） | /checkpoint/last-no-ack |
| 指定された開始と終了ブロックのチェックポイント詳細 | GET（取得） | /checkpoint/<start\>/<end\> |
| 番号でチェックポイント | GET（取得） | /checkpoint/<checkpoint-number\> |
| すべてのチェックポイント | GET（取得） | /checkpoint/list |
| ackカウント、バッファ、バリデータセット、バリデータカウント、最後のno-ack詳細を取得 | GET（取得） | /overview |


すべてのクエリーAPIは、次の形式で結果を提供します：

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
