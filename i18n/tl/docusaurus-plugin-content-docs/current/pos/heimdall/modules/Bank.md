---
id: bank
title: Bangko
description: Module na humahawak ng mga paglilipat ng balanse ng account para sa Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Bank Module {#bank-module}

Pinangangasiwaan ng `bank`module ang mga paglilipat ng balanse ng account para sa Heimdall. Ang modyul na ito ay tumutugon sa `bank`modyul mula sa cosmos-sdk.

## Mga mensahe {#messages}

### MsgSend {#msgsend}

`MsgSend`pinangangasiwaan ang paglipat sa pagitan ng mga account sa Heimdall. Narito ang isang istraktura para sa mga mensahe ng transaksyon:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend`humahawak ng multi-transfer sa pagitan ng mga account para sa Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Mga Parameter {#parameters}

Ang module ng bangko ay naglalaman ng mga sumusunod na parameter:

| Susi | Uri | Default na halaga |
|----------------------|--------|------------------|
| `sendenabled` | bool | totoo |

## Mga CLI Command {#cli-commands}

### Ipadala ang balanse {#send-balance}

Sumunod na command ay magpapadala ng 1000 matic token sa nabanggit `address`;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
