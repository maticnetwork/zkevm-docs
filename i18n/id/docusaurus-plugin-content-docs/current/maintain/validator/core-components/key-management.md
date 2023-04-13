---
id: key-management
title: Manajemen Kunci
description: Manajemen dan pemilik manajemen
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Setiap validator menggunakan dua kunci untuk mengelola aktivitas terkait validator di Polygon:

* Kunci penandatangan
* Kunci pemilik

## Kunci penandatangan {#signer-key}

Kunci penandatangan adalah alamat yang digunakan untuk menandatangani blok Heimdall, titik periksa, dan aktivitas terkait penandatanganan lainnya.

Kunci pribadi alamat penandatanganan harus ditempatkan pada mesin yang menjalankan node validasi untuk tujuan penandatanganan.

Kunci penandatanganan tidak dapat mengelola staking, imbalan, atau delegasi.

Validator harus menyimpan ETH pada alamat penandatanganan di Ethereum mainnet untuk mengirim [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction).

## Kunci pemilik {#owner-key}

Kunci pemilik adalah alamat yang digunakan untuk stake, restake, perubahan kunci penandatanganan, menarik imbalan, dan mengelola parameter terkait delegasi di Ethereum mainnet. Kunci privat untuk kunci pemilik harus diamankan sebaik mungkin.

Semua transaksi melalui kunci pemilik dilakukan di Ethereum mainnet.

Kunci penandatangan disimpan di node dan umumnya dianggap sebagai dompet **panas**, sedangkan kunci pemilik seharusnya disimpan dengan sangat aman, jarang digunakan, dan umumnya dianggap sebagai dompet **dingin**. Dana yang di-stake dikendalikan oleh kunci pemilik.

Pemisahan tanggung jawab antara penandatangan dan kunci pemilik dilakukan untuk memastikan pertukaran yang efisien antara keamanan dan kemudahan penggunaan.

Kedua kunci tersebut adalah alamat yang kompatibel dengan Ethereum dan bekerja dengan cara yang sama persis.

## Perubahan penandatangan {#signer-change}

Lihat [Perubahan Alamat Penandatangan Anda](/docs/maintain/validate/change-signer-address).
