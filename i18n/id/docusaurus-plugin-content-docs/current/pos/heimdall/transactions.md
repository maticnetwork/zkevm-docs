---
id: transactions
title: Transaksi
description: Apa yang transaksi dan ketika digunakan
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transaksi {#transactions}

Transaksi terdiri dari metadata yang diadakan dalam [konteks](https://docs.cosmos.network/main/core/context.html) dan [pesan](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) yang memicu perubahan keadaan dalam modul, melalui Handler modul.

Ketika pengguna ingin berinteraksi dengan aplikasi dan mengubah kondisi (misalnya, mengirim koin), mereka membuat transaksi. Setiap `message` transaksi harus ditandatangani menggunakan kunci pribadi yang terhubung dengan akun yang tepat sebelum transaksi ini disiarkan ke jaringan. Transaksi kemudian harus dimasukkan di blok, divalidasi, lalu disetujui oleh jaringan melalui proses konsensus. Untuk membaca lebih lanjut tentang siklus hidup transaksi, klik [di sini](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Definisi Jenis {#type-definition}

Objek transaksi adalah jenis SDK yang mengimplementasikan `Tx`antarmuka.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Detail lebih lanjut tentang Transaction: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
