---
id: responsibilities
title: Tanggung Jawab
description: Tanggung jawab menjadi validator di Jaringan Polygon
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Terus ikuti kabar terbaru

Terus dengan update node dan validator terbaru dari tim Polygon dan komunitas dengan berlangganan ke [grup pemberitahuan Polygon](https://polygon.technology/notifications/).

:::

Validator blockchain adalah seseorang yang bertanggung jawab untuk memvalidasi transaksi dalam blockchain. Di Jaringan Polygon, peserta dapat memenuhi syarat untuk menjadi validator Polygon dengan menjalankan **Node Validator (entri + Validator)** untuk mendapatkan imbalan dan mengumpulkan biaya transaksi. Untuk memastikan partisipasi yang baik dari validator, mereka mengunci setidaknya 1 token MATIC sebagai stake dalam ekosistem.

:::info

Saat ini, ada batas 100 validator aktif pada suatu waktu. Untuk deskripsi rinci tentang apa yang validator, lihat [Validator](/maintain/validator/architecture).

Juga, setelah [<ins>proposal tata kelola PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) diimplementasikan pada tingkat kontrak, jumlah minimum staking akan meningkat menjadi 10.000 MATIC.

:::

Setiap [validator](/maintain/glossary.md#validator) di Jaringan Polygon memiliki tanggung jawab sebagai berikut:

* Operasi node teknis (dilakukan secara otomatis oleh node)
* Operasi
  * Mempertahankan waktu aktif yang tinggi
  * Periksa layanan yang berhubungan node dan proses sehari-hari
  * Menjalankan node pemantauan
  * Jauhkan keseimbangan ETH (antara 0,5 hingga 1) pada alamat penandatangan.
* Delegasi
  * Jadilah terbuka untuk delegasi.
  * Mengomunikasikan tarif komisi
* Komunikasi
  * Mengomunikasikan masalah
  * Menyediakan umpan balik dan saran
* Menampilkan imbalan untuk validasi blok di blockchain

## Operasi node teknis {#technical-node-operations}

Operasi node teknis berikut **dilakukan secara otomatis oleh node:**

* Seleksi produsen blok:
  * Pilih bagian validator untuk set produser blok untuk setiap [rentang](/docs/maintain/glossary.md#span)
  * Untuk setiap rentang, pilih set produsen blok lagi di [Heimdall](/maintain/glossary.md#heimdall) dan kirim informasi seleksi ke [Bor](/maintain/glossary.md#bor) secara berkala.
* Memvalidasi blok di Bor:
  * Untuk satu set blok bor rantai sisi Bor, setiap validator secara independen membaca data blok untuk blok ini dan memvalidasi data Heimdall.
* Pengajuan titik periksa:
  * Seorang [pengusul](/maintain/glossary.md#proposer) dipilih di antara validator untuk tiap blok Heimdall. Pengusul [titik periksa](/maintain/glossary.md#checkpoint-transaction) membuat titik periksa data blok Bor, memvalidasi, dan menyiarkan transaksi yang ditandatangani untuk disetujui oleh validator lain.
  * Jika lebih dari 2/3 validator aktif mencapai konsensus di titik periksa, titik periksa dikirimkan ke Ethereum mainnet.
* Menyinkronkan perubahan pada kontrak staking Polygon di Ethereum:
  * Melanjutkan dari langkah pengajuan titik periksa karena ini adalah panggilan jaringan eksternal, transaksi titik periksa di Ethereum dapat atau tidak dapat dikonfirmasi, atau dapat ditunda karena masalah kongesti Ethereum.
  * Dalam hal ini, ada proses `ack/no-ack` yang diikuti untuk memastikan bahwa titik periksa berikutnya juga berisi snapshot dari blok Bor sebelumnya. Misalnya, titik periksa 1 adalah untuk blok Bor 1-256, dan hal ini gagal untuk beberapa sebab, titik periksa 2 selanjutnya akan digunakan untuk blok Bor 1-512. Lihat juga [arsitektur Heimdall: Titik periksa](/pos/heimdall/checkpoint).
* Sinkronisasi kondisi dari mainnet Ethereum mainnet ke rantai sisi Bor:
  * Kondisi kontrak dapat dipindahkan antara Ethereum dan Polygon, khususnya melalui [Bor](/maintain/glossary.md#bor):
  * Kontrak DApp di Ethereum memanggil fungsi di kontrak Polygon khusus di Ethereum.
  * Acara yang sesuai diteruskan ke Heimdall dan kemudian Bor.
  * Transaksi sinkronisasi kondisi dipanggil pada kontrak cerdas Polygon dan DApp bisa mendapatkan nilai di Bor via panggilan fungsi di Bor itu sendiri.
  * Mekanisme serupa digunakan untuk mengirim kondisi Polygon ke Ethereum. Lihat juga [Mekanisme Sinkronisasi Kondisi](/docs/pos/state-sync/state-sync).

## Operasi {#operations}

### Mempertahankan waktu aktif yang tinggi {#maintain-high-uptime}

Waktu aktif node di Jaringan Polygon didasarkan pada jumlah [transaksi titik periksa](/docs/maintain/glossary.md#checkpoint-transaction) bahwa node validator telah ditandatangani.

Sekitar setiap 34 menit, pengusul mengirimkan transaksi titik periksa ke Ethereum mainnet. Transaksi pos pemeriksaan harus ditandatangani oleh setiap [validator](/maintain/glossary.md#validator) di Jaringan Polygon. **Gagal menandatangani transendensi titik pemeriksaan menghasilkan penurunan kinerja node validator**.

Proses penandatanganan transaksi titik periksa otomatis. Untuk memastikan node validasi Anda menandatangani semua transaksi titik periksa yang valid, Anda harus menjaga dan memantau kesehatan node.

### Memeriksa layanan node dan proses setiap hari {#check-node-services-and-processes-daily}

Anda harus memeriksa setiap hari layanan dan proses yang terkait dengan [Heimdall](/maintain/glossary.md#heimdall) dan [Bor](/maintain/glossary.md#bor). Juga, pruning node harus dilakukan secara teratur untuk mengurangi penggunaan disk.

### Menjalankan node pemantauan {#run-node-monitoring}

Anda harus menjalankan salah satunya:

* Dasbor Grafana yang disediakan oleh Polygon. Lihat repositori GitHub : [Setup Matic-Jagar](https://github.com/vitwit/matic-jagar)
* Atau, gunakan alat pemantauan sendiri untuk [validator](/maintain/glossary.md#validator) dan node [sentry](/maintain/glossary.md#sentry)
* Titik akhir Ethereum yang digunakan pada node harus dipantau untuk memastikan node berada dalam batas permintaannya

### Mempertahankan saldo ETH {#keep-an-eth-balance}

Anda harus mempertahankan jumlah ETH yang cukup (harus selalu di sekitar nilai ambang batas, yaitu 0,5 hingga 1) pada [alamat penanda](/maintain/glossary.md#signer-address) validator Anda di Ethereum Mainnet.

Anda membutuhkan ETH untuk:

* Menandatangani yang diusulkan [transaksi titik periksa](/maintain/glossary.md#checkpoint-transaction) di Ethereum mainnet.
* Mengusulkan dan kirim transaksi titik periksa di ethereum mainnet.

Tidak mempertahankan jumlah ETH yang memadai di alamat penandatangan akan mengakibatkan:

* Penundaan di pengajuan titik periksa. Perhatikan bahwa transaksi harga gas di jaringan Ethereum dapat berfluktuasi dan melonjak.
* Penundaan di finalitas transaksi yang dimasukkan di titik periksa.
* Penundaan dalam transaksi titik periksa berikutnya.

## Delegasi {#delegation}

### Terbuka untuk delegasi {#be-open-for-delegation}

Semua validator harus terbuka untuk delegasi dari komunitas. Setiap validator memiliki pilihan untuk menetapkan tarif komisi mereka sendiri. Tidak ada batas atas untuk tarif komisi.

### Mengomunikasikan tarif komisi {#communicate-commission-rates}

Ini adalah tugas moral dari validator untuk mengkomunikasikan tingkat komisi dan tingkat komisi berubah ke masyarakat. Platform yang disukai untuk mengomunikasikan tarif komisi adalah:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## Komunikasi {#communication}

### Mengomunikasikan masalah {#communicate-issues}

Mengkomunikasi masalah seawal mungkin memastikan bahwa komunitas dan tim Polygon dapat memperbaiki masalah sesegera mungkin. Platform yang disukai untuk mengomunikasikan tarif komisi adalah:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Menyediakan umpan balik dan saran {#provide-feedback-and-suggestions}

Di Polygon, kami menghargai umpan balik dan saran pada aspek apapun dari ekosistem validator. [Forum](https://forum.polygon.technology/) adalah platform pilihan untuk memberikan umpan balik dan saran.
