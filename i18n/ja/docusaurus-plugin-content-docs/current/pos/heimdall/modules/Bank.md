---
id: bank
title: バンク
description: Heimdallのためのアカウント残高の振込をモジュールで行うことができます。
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# バンクモジュール {#bank-module}

`bank`のモジュールはHeimdallのアカウント残高転送を処理します。このモジュールはcosmos-sdkからの`bank`モジュールに対応します。

## メッセージ {#messages}

### MsgSend {#msgsend}

`MsgSend`は、Heimdall内でアカウント間の転送を処理します。ここではトランザクションメッセージの構造を示します：

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend`は、Heimdallのアカウント間で複数の転送を処理します。

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## パラメータ {#parameters}

バンクモジュールは、次のパラメータを含みます：

| 鍵 | タイプ | デフォルト値 |
|----------------------|--------|------------------|
| `sendenabled` | bool | true |

## CLIコマンド {#cli-commands}

### 残高送信 {#send-balance}

次のコマンドは、前述の1000のmaticトークンを送信します`address`。

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
