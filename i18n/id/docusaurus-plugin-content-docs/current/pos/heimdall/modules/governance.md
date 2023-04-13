---
id: governance
title: Governance
sidebar_label: Governance
description: Sistem dengan satu tanda 1 token - 1 suara
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governance {#governance}

Pemerintahan Heimdall bekerja sama persis dengan [modul `x/gov`Cosmos-sdk.](https://docs.cosmos.network/master/modules/gov/)

Dalam sistem ini, pemegang token staking asli rantai ini dapat memberikan suara pada usulan atas dasar `1 token = 1 vote`. Berikut ini adalah daftar fitur modul yang saat ini didukung:

- **Pengiriman usulan:** Validator dapat mengirimkan usulan dengan setoran. Setelah setoran minimum tercapai, usulan memasuki periode pemberian suara. Validator yang menyetor untuk usulan dapat memperoleh setoran mereka setelah proposal itu ditolak atau diterima.
- **Vote:** Validator dapat memberikan suara pada proposal yang mencapai MinDeposit.

Ada periode setoran dan periode pemberian suara sebagaimana parameter dalam modul `gov`. Deposit Minimum harus dicapai sebelum akhir periode deposit, jika tidak proposal akan ditolak.

Setelah setoran minimum terpenuhi dalam periode setoran, periode pemberian suara dimulai. Dalam periode pemberian suara, semua validator harus memberikan suara atas pilihan mereka untuk usulan tersebut. Setelah periode pemberian suara berakhir, `gov/Endblocker.go` melakukan fungsi `tally` dan menerima atau menolak usulan berdasarkan `tally_params` — `quorum`, `threshold`, and `veto`.

Sumber: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Ada berbagai jenis proposal yang dapat diimplementasikan di Heimdall. Hingga saat ini, hanya mendukung **proposal perubahan Param**.

### Usulan perubahan parameter {#param-change-proposal}

Menggunakan proposal ini, validator dapat mengubah apa pun `params``module`dalam Heimdall.

Contoh: mengubah `tx_fees` minimum untuk transaksi di modul `auth`. Ketika usulan diterima, usulan ini secara otomatis akan mengubah `params` pada kondisi Heimdall. Tidak diperlukan TX tambahan.

## Perintah CLI {#cli-commands}

### Meminta parameter tata kelola {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Ini memperlihatkan semua parameter untuk modul tata kelola.

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

### Mengirimkan usulan {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` adalah file yang memasukkan usulan dalam format json.

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

### Meminta usulan {#query-proposal}

Untuk melakukan query semua proposal:

```go
heimdallcli query gov proposals --trust-node
```

Untuk melakukan query proposal tertentu:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Memberikan suara atas usulan {#vote-on-proposal}

Untuk memilih pada proposal tertentu:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

Usulan akan dihitung secara otomatis setelah periode pemberian suara.

## REST API {#rest-apis}

| Nama | Metode | Endpoint |
|----------------------|------|------------------|
| Dapatkan semua usulan | GET | /gov/proposals |
| Dapatkan detail usulan | GET | /gov/proposals/`proposal-id` |
| Dapatkan semua suara untuk usulan tersebut | GET | /gov/proposals/`proposal-id`/votes |
