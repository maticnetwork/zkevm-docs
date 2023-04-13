---
id: checkpoint-mechanism
title: Mekanisme Titik Periksa
sidebar_label: Checkpoints
description: Mengecek keadaan sistem ke mainnet Ethereum
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon bukan platform Lapisan 1

Polygon tergantung pada Ethereum Mainnet sebagai Lapis Penyelesaian 1 . Semua mekanisme staking harus sinkron dengan kontrak di Ethereum mainnet.

:::

[Proposal](/docs/maintain/glossary.md#proposer) untuk titik pemeriksaan awalnya dipilih melalui [algoritme robin bertimbang Tendermint](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). Pemeriksaan kustom lebih lanjut diimplementasikan berdasarkan keberhasilan pengiriman titik periksa. Ini memungkinkan sistem Polygon untuk memisahkan diri dengan pilihan pengusul Tendermint dan memberi Polygon dengan kemampuan seperti memilih pengusul hanya ketika transaksi titik periksa pada Ethereum mainnet sukses, atau mengirimkan transaksi titik periksa untuk blok yang masuk dari titik periksa sebelumnya yang gagal.

Sukses mengirimkan titik periksa di Tendermint adalah proses komit 2 fase:

* Pengusul, yang dipilih melalui algoritme round-robin, mengirimkan titik periksa dengan alamat pengusul dan hash Merkle di bidang pengusul.
* Semua pengusul lainnya memvalidasi data di bidang pengusul sebelum menambahkan hash Merkle di kondisi mereka.

Pengusul berikutnya kemudian mengirimkan transaksi pengakuan untuk membuktikan bahwa sebelumnya [transaksi titik periksa](/docs/maintain/glossary.md#checkpoint-transaction) telah berhasil di Ethereum mainnet. Setiap perubahan set validator disampaikan oleh node validasi di [Heimdall](/docs/maintain/glossary.md#heimdall) yang disematkan ke node validasi. Ini memungkinkan Heimdall untuk tetap tersinkronisasi dengan kondisi kontrak Polygon di Ethereum mainnet setiap saat.

Kontrak Polygon yang disebar di Ethereum mainnet dianggap sebagai sumber kebenaran tertinggi, dan oleh karena itu semua validasi dilakukan melalui kueri kontrak Ethereum mainnet.
