---
id: auth
title: Auth
description: Modul untuk menentukan jenis transaksi dan akun-akun
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Modul Auth {#auth-module}

Dokumen ini menjelaskan `auth`modul Heimdall.

Modul `auth` bertanggung jawab untuk menentukan transaksi dasar dan jenis akun untuk suatu aplikasi. Berisi ante handler, tempat semua pemeriksaan validitas transaksi dasar (tanda tangan, nonce, kolom tambahan) dilakukan, dan membuka penjaga akun, yang memungkinkan modul lain membaca, menulis, dan memodifikasi akun.

## Gas dan Biaya {#gas-and-fees}

Biaya memiliki dua tujuan bagi operator jaringan.

Biaya membatasi pertumbuhan kondisi yang disimpan oleh setiap node penuh dan memungkinkan penyensoran tujuan umum atas transaksi dengan nilai ekonomi kecil. Biaya paling cocok sebagai mekanisme antispam di mana validator tidak tertarik dalam penggunaan jaringan dan identitas pengguna.

Karena Heimdall tidak mendukung kontrak atau kode untuk transaksi apapun, ia menggunakan transaksi biaya. Untuk transaksi biaya tetap, validator dapat mengisi ulang akun mereka di rantai Ethereum dan memperoleh token di Heimdall menggunakan modul [Topup](Topup.md).

## Jenis {#types}

Selain akun (ditentukan dalam keadaan ), jenis yang terkena oleh modul auth adalah **Signature**, kombinasi dari kunci publik opsional dan tanda tangan kriptografi sebagai array byte, **ctx**, sebuah struktur yang mengimplementasikan `sdk.Tx`antarmuka menggunakan **Signature,** dan **Doc ,** sebuah struktur pencegahan untuk **Tx** yang transaksi harus tanda tangan.

### StdSignature {#stdsignature}

`StdSignature` adalah jenis susunan byte.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

 `StdTx` adalah struktur yang menerapkan antarmuka `sdk.Tx` , dan kemungkinan cukup lazim untuk melayani tujuan dari banyak jenis transaksi.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

 `StdSignDoc` adalah struktur pencegahan pengulangan untuk ditandatangani, yang memastikan bahwa transaksi apa pun yang dikirimkan (yang semata-mata adalah tanda tangan atas string byte tertentu) hanya akan dilaksanakan setelah berada di Heimdall.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### Akun {#account}

Akun mengelola alamat, koin, dan nonce untuk transaksi. Juga menandatangani dan memvalidasi transaksi.

Sumber: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Parameter {#parameters}

Modul auth berisi parameter berikut:

| Kunci | Jenis | Nilai default |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | string | "1000000000000000" |


## Perintah CLI {#cli-commands}

### Perlihatkan akun {#show-account}

Untuk mencetak akun data yang terkait ke Heimdall;

```bash
heimdalld show-account
```

Hasil yang Diharapkan:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Detail akun dan koin {#account-and-coin-details}

Untuk menampilkan detail akun, koin, urutan dan nomor akun:

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Hasil yang Diharapkan:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### Parameter {#parameters-1}

Untuk mencetak semua parameter;

```go
heimdallcli query auth params
```

Hasil yang Diharapkan:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API {#rest-apis}

| Nama | Endpoint | Deskripsi |
|----------------------|--------|------------------|
| Detail akun | /auth/accounts/{address} | Mengembalikan semua perincian untuk suatu alamat |
| Detail urutan akun | /auth/accounts/{address}/sequence | Mengembalikan hanya perincian yang diperlukan untuk penandatanganan |
| Parameter Auth | /auth/params | Mengembalikan semua parameter yang digunakan modul auth |
