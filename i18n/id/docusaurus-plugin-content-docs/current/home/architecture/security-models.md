---
id: security-models
title: Model Keamanan
description: PoS, Plasma dan Hybrid sekuriti
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Model Keamanan {#security-models}

Polygon menyediakan tiga jenis model keamanan untuk pengembang untuk membangun dApps upon:

1. [Keamanan Proof of Stake](#proof-of-stake-security)
2. [Keamanan Plasma](#plasma-security)
3. [Hibrida (Plasma + PoS)](#hybrid)

Kami telah menjelaskan masing-masing model keamanan yang ditawarkan oleh Polygon dan alur kerja pengembang untuk masing-masing dengan contoh dApp di bawah.

## Keamanan Proof of Stake {#proof-of-stake-security}

Keamanan Proof Stake (PoS) disediakan oleh lapisan Heimdall & Bor yang dibangun di atas Tendermint. Titik periksa dilakukan hanya untuk rootchain saat ⅔ dari validator telah sign on.

Untuk mengaktifkan mekanisme PoS di platform, kami menggunakan serangkaian kontrak manajemen staking di Ethereum, dan juga serangkaian validator insentif yang menjalankan node Heimdall dan Bor. Ini mengimplementasikan fitur:

- Kemampuan bagi siapa pun untuk melakukan staking token MATIC pada kontrak cerdas Ethereum dan bergabung dengan sistem sebagai Validator
- Mendapatkan imbalan staking karena memvalidasi transisi kondisi di Polygon

Mekanisme PoS juga bertindak sebagai mitigasi terhadap masalah ketidaktersediaan data untuk rantai sisi kami terkait Plasma.

Kami juga memiliki lapisan finalitas cepat yang memfinalisasikan kondisi rantai sisi secara berkala melalui titik periksa. Finalitas cepat ini membantu kami mempererat kondisi rantai sisi. Rantai yang kompatibel dengan EVM memiliki sedikit validator dan waktu blok yang lebih cepat dengan throughput yang tinggi. Mekanisme ini memilih skalabilitas daripada tingkat desentralisasi yang tinggi. Heimdall memastikan bahwa komitmen kondisi yang terakhir aman terlindungi dan melewati sekumpulan besar validator dan karenanya desentralisasi tinggi.

**Untuk pengembang**

Sebagai bangunan pengembang dApp di PoS security, prosedur ini sesederhana mengambil kontrak cerdas dan menyebarkannya ke jaringan Polygon PoS. Ini dapat dilakukan karena arsitektur berbasis akun memungkinkan rantai sisi yang kompatibel dengan EVM.

## Keamanan Plasma {#plasma-security}

Polygon menyediakan "Plasma Guarante" yang berkaitan dengan berbagai skenario serangan. Dua kasus utama yang dipertimbangkan adalah:

- Operator parameter (atau dalam Polygon, Lapisan Heimdall) rusak,
- Pengguna melakukan pelanggaran

Dalam kedua kasus, jika aset pengguna pada rantai plasma telah dikompromikan, mereka harus memulai keluar massal. Polygon menyediakan konstruksi pada kontrak cerdas rootchain yang dapat diberdayagunakan. Untuk lebih banyak rincian dan spesifikasi teknis mengenai konstruksi dan vektor serangan yang dipertimbangkan, dibacakan [di sini](https://ethresear.ch/t/account-based-plasma-morevp/5480).

Dalam kenyataannya, keamanan yang ditawarkan oleh kontrak Plasma Polygon menumpang pada keamanan Ethereum. Dana pengguna hanya akan berisiko jika Ethereum mengalami kegagalan. Sederhananya, rantai plasma sama amannya dengan mekanisme konsensus rantai utama. Ini dapat diekstrapolasi untuk mengatakan bahwa rantai plasma dapat menggunakan mekanisme konsensus yang sangat sederhana dan masih aman.

**Untuk pengembang**

Sebagai pengembang dApp, jika Anda ingin membangun di Polygon dengan jaminan keamanan Plasma, Anda diharuskan untuk menulis prediksi kustom untuk kontrak cerdas Anda. Ini pada dasarnya berarti menulis kontrak eksternal yang menangani kondisi sengketa yang ditetapkan oleh konstruksi plasma Polygon.

## Hibrida {#hybrid}

Selain keamanan Plasma murni dan jaminan Proof of Stake yang mungkin dilakukan di dApp di Polygon, ada juga pendekatan Hybrid yang dapat diikuti oleh pengembang - yang hanya berarti memiliki jaminan Plasma dan Proof of Stake pada beberapa aliran tertentu dari dApp.

Pendekatan ini lebih baik dipahami dengan sebuah contoh.

Misalnya saja dApp permainan dengan set kontrak cerdas yang menggambarkan logika permainan. Katakanlah game itu menggunakan token er20 miliknya sendiri untuk memberi imbalan kepada pemain. Sekarang, kontrak cerdas yang menjelaskan logika game dapat ditempatkan di rantai sisi Polygon secara langsung - yang menjamin keamanan Proof of Stake pada kontrak tersebut sedangkan transfer token er20 dapat diamankan dengan jaminan Plasma dan bukti penipuan yang ditanamkan di dalam kontrak rootchain Polygon.
