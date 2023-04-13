---
id: antehandler
title: Ante handler
description: Ante Handler memeriksa dan memvalidasi transaksi
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Ante handler {#ante-handler}

Ante handler memastikan dan memvalidasi transaksi. Setelah verifikasi, ante handler memastikan apakah biayanya cukup di saldo pengirim dan memotong biaya jika pencantuman transaksi berhasil.

## Batas gas {#gas-limit}

Setiap blok dan transaksi memiliki batas penggunaan gas. Sebuah blok dapat berisi beberapa transaksi, tetapi gas yang digunakan oleh semua transaksi dalam blok harus kurang dari blok batas gas untuk menghindari blok yang lebih besar.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Ingatlah setiap manipulasi kondisi transaksi mengeluarkan gas, termasuk verifikasi tanda tangan untuk transaksi tersebut.

### Batas gas blok {#block-gas-limit}

Batas gas blok maksimum dan byte per blok dilewati saat membuat parameter konsensus aplikasi: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### Batas gas transaksi {#transaction-gas-limit}

Batas gas transaksi ditetapkan dalam parameter di modul `auth`. Batas ini dapat diubah melalui modul `gov`.

### Batas Gas Transaksi Titik Pemeriksaan {#checkpoint-transaction-gas-limit}

Karena blok berisi sejumlah transaksi dan memverifikasi transaksi khusus ini di rantai Ethereum, maka bukti Merkle dibutuhkan. Untuk menghindari verifikasi bukti Merkle ekstra untuk transaksi titik periksa, Heimdall hanya mengizinkan satu transaksi di blok jika jenis transaksinya adalah `MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Verifikasi transaksi dan perlindungan ulang {#transaction-verification-and-replay-protection}

Ante handler menangani dan memverifikasi tanda tangan di transaksi masuk: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Tiap transaksi harus mencantumkan `sequenceNumber` untuk menghindari serangan ulang. Setelah setiap pencantuman transaksi berhasil, Ante handler menaikkan nomor urut untuk akun pengirim TX agar menghindari duplikasi (pengulangan) dari transaksi sebelumnya.