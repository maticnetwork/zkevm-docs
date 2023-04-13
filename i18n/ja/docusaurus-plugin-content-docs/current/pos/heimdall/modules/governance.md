---
id: governance
title: ガバナンス
sidebar_label: Governance
description: 1トークン付きシステム - 1票ベース
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# ガバナンス {#governance}

Heimdallガバナンスは[`x/gov`、Cosmos-](https://docs.cosmos.network/master/modules/gov/)sdkモジュールとまったく同じように機能します。

このシステムでは、チェーンのネイティブステーキングトークンを持つ保持者は、`1 token = 1 vote`基準に基づいて提案に投票できます。モジュールが現在サポートしている機能の一覧は次のとおりです：

- **提案提出：**バリデータは、デポジットと提案を提出できます。デポジットが最低限に達すると、提案は投票する期間に入ります。提案に寄託されたバリデータは、提案が拒否または受け入れられると、預金を回収できます。
- **投票：**バリデータは、MinDepositに達した提案に投票することができます。

`gov`モジュールには、入金期間と投票期間がパラメータとしてあります。入金期限が終了する前に最低限の入金を達成する必要があります。そうでない場合は、自動的にご提案を拒否します。

入金期間内で入金が最低限に達すると、投票期間が始まります。投票期間中、すべてのバリデータは、提案に自分の選択肢を投票する必要があります。投票期間が終了すると、`gov/Endblocker.go`は、`tally`関数を実行し、`quorum`、`threshold`、`veto`の`tally_params`に基づく提案を受け入れるか、または拒否します。

出典：[https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Heimdallで実装できるさまざまなタイプの提案があります。現在、**Param変更提案**のみをサポートしています。

### Param変更提案 {#param-change-proposal}

このタイプの提案を使用すると、バリデータはHeimdall`params``module`で変更することができます。

例：`auth`モジュールでトランザクションの最小限の`tx_fees`を変更します。提案が受け入れられると、Heimdall状態の`params`を自動的に変更します。余分なTXは必要ありません。

## CLIコマンド {#cli-commands}

### govパラメータクエリ {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

これは、ガバナンスモジュールのためのすべてのパラメータを示します。

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### 提案を送信 {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json`は、JSONフォーマットの提案が含まれているファイルです。

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### クエリ提案 {#query-proposal}

すべての提案をクエリする：

```go
heimdallcli query gov proposals --trust-node
```

特定の提案をクエリする：

```go
heimdallcli query gov proposals 1 --trust-node
```

### 提案に投票する {#vote-on-proposal}

特定の提案に投票する：

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

提案は投票期間後に自動的に集計されます。

## REST API {#rest-apis}

| 名前 | メソッド | エンドポイント |
|----------------------|------|------------------|
| すべての提案を取得する | GET（取得） | /gov/proposals |
| 提案詳細を取得する | GET（取得） | /gov/proposals/`proposal-id` |
| 提案のすべての投票を取得する | GET（取得） | /gov/proposals/`proposal-id`/votes |
