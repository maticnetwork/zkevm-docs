---
id: bank
title: Bank
description: Modul penanganan akun penyeimbangan transfer untuk Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Modul Bank {#bank-module}

Modul `bank` menangani transfer saldo akun untuk Heimdall. Modul ini bertalian dengan modul `bank` dari cosmos-sdk.

## Pesan {#messages}

### MsgSend {#msgsend}

`MsgSend` menangani transfer antar akun di Heimdall. Berikut adalah struktur untuk pesan transaksi:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` menangani multitransfer antar akun untuk Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Parameter {#parameters}

Modul bank berisi parameter berikut:

| Kunci | Jenis | Nilai default |
|----------------------|--------|------------------|
| `sendenabled` | bool | benar |

## Perintah CLI {#cli-commands}

### Kirim saldo {#send-balance}

Setelah perintah akan mengirim 1000 token matis untuk `address`disebutkan;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
