---
id: bank
title: Bank
description: Heimdall için modül taşıma hesabı bakiyesi transferleri
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Banka Modülü {#bank-module}

`bank` modülü, Heimdall için hesap bakiyesi aktarımlarıyla ilgilenir. Bu modül, cosmos-sdk’daki `bank` modülüne karşılık gelir.

## Mesajlar {#messages}

### MsgSend {#msgsend}

`MsgSend`, Heimdall’daki hesaplar arasındaki aktarımlarla ilgilenir. İşlem mesajının yapısı şöyledir:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend`, Heimdall için hesaplar arasındaki çoklu aktarımlarla ilgilenir.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Parametreler {#parameters}

Bank modulü şu parametreleri içerir:

| Anahtar | Tip | Varsayılan değer |
|----------------------|--------|------------------|
| `sendenabled` | bool | true |

## CLI Komutları {#cli-commands}

### Bakiye gönderme {#send-balance}

Aşağıdaki komut, belirtilen 1000 matic token `address`gönderecektir;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
