---
id: bank
title: Banca
description: Bilancia degli account per Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Modulo Banca {#bank-module}

Il modulo `bank` gestisce i trasferimenti dei saldi degli account per Heimdall. Questo modulo corrisponde al modulo `bank` di cosmos-sdk.

## Messaggi {#messages}

### MsgSend {#msgsend}

`MsgSend` gestisce le operazioni di trasferimento tra gli account in Heimdall. Ecco un esempio di struttura di un messaggio di transazione:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` gestisce le operazioni di trasferimento multiplo tra gli account per Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Parametri {#parameters}

Il modulo Banca contiene i seguenti parametri:

| Chiave | Tipo | Valore predefinito |
|----------------------|--------|------------------|
| `sendenabled` | bool | vero |

## Comandi CLI {#cli-commands}

### Invia saldo {#send-balance}

A seguito del comando invierà 1000 token di matiche a cui è `address`menzionato.

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
