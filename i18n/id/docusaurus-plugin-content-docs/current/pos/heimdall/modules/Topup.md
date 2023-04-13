---
id: topup
title: Isi ulang
description: Sebuah jumlah yang akan digunakan untuk membayar biaya pada rantai Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Isi ulang {#topup}

Isi ulang Heimdall adalah jumlah yang akan digunakan untuk membayar biaya di rantai Heimdall.

Ada dua cara untuk membuka akun Anda:

1. Ketika validator join yang baru, mereka dapat menyebutkan `topup`jumlah sebagai top-up selain jumlah yang ditampilkan, yang akan dipindahkan sebagai keseimbangan pada rantai Heimdall untuk membayar biaya pada Heimdall.
2. Pengguna dapat langsung memanggil fungsi top-up pada kontrak cerdas staking di Ethereum untuk meningkatkan keseimbangan atas di Heimdall.

## Pesan {#messages}

### MsgTopup {#msgtopup}

Transaksi `MsgTopup` bertanggung jawab untuk mencetak saldo ke suatu alamat di Heimdall berdasarkan `TopUpEvent` rantai Ethereum pada kontrak manajer staking.

Handler untuk transaksi ini memproses isi ulang dan menambah saldo hanya sekali untuk `msg.TxHash` dan `msg.LogIndex` tertentu apa pun. Handler melemparkan error `Older invalid tx found`, jika mencoba memproses isi ulang lebih dari sekali.

Berikut adalah struktur untuk pesan transaksi isi ulang:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

Transaksi `MsgWithdrawFee` bertanggung jawab untuk menarik saldo dari Heimdall ke rantai Ethereum. Validator dapat menarik jumlah berapa pun dari Heimdall.

Handler memproses penarikan ini dengan mengurangi saldo dari validator tersebut dan menyiapkan kondisi untuk mengirimkan titik periksa berikutnya. Kemungkinan titik periksa berikutnya akan berisi kondisi terkait penarikan ini untuk validator tertentu itu.

Handler memperoleh informasi validator berdasarkan `ValidatorAddress` dan memproses penarikannya.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Perintah CLI {#cli-commands}

### Biaya Isi Ulang {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Biaya penarikan {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Untuk memeriksa isi ulang yang tercermin pada akun, jalankan perintah berikut

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| Nama | Metode | URL | Parameter Isi |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Biaya Isi Ulang | POST | /topup/fee | `id` ID validator, `tx_hash` Hash transaksi dari peristiwa isi ulang yang berhasil di rantai Ethereum, `log_index` Indeks log dari peristiwa isi ulang yang dihasilkan di rantai Ethereum |
| Biaya Penarikan | POST | /topup/withdraw | `amount` Jumlah penarikan |
