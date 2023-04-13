---
id: optimisticoracle
title: Optimistic Oracle dari UMA
sidebar_label: UMA
description: Oracle Optimistic yang dibuat UMA memungkinkan kontrak untuk meminta dengan cepat dan menerima jenis data
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Optimistic Oracle dari UMA memungkinkan kontrak untuk meminta dengan cepat dan menerima jenis data. Sistem orakel UMA terdiri dari dua komponen inti:

1. Optimistic Oracle
2. Mekanisme Verifikasi Data (DVM)

## Optimistic Oracle {#optimistic-oracle}

**Orakel Optimistic** yang dibuat UMA memungkinkan kontrak untuk meminta dengan cepat dan menerima informasi harga. Optimistic Oracle bertindak sebagai eskalasi permainan antara kontrak yang memulai permintaan harga dan sistem resolusi sengketa UMA yang dikenal sebagai Mekanisme Verifikasi Data (DVM).

Harga yang diusulkan oleh Optimistic Oracle tidak akan dikirim ke DVM kecuali jika harga disengketakan. Hal ini memungkinkan kontrak untuk mendapatkan informasi harga dalam panjang waktu yang telah ditentukan tanpa menulis harga dari aset on-chain.

## Mekanisme Verifikasi Data (DVM) {#data-verification-mechanism-dvm}

Jika ada sengketa, permintaan dikirim ke DVM. Semua kontrak yang dibangun di UMA menggunakan DVM sebagai latar belakang untuk menyelesaikan sengketa. Sengketa yang dikirim ke DVM akan diselesaikan dalam waktu 48 jam setelah pemegang token UMA melakukan pemungutan suara dalam waktu yang ditentukan. Kontrak yang ada di UMA tidak perlu menggunakan Optimistic Oracle kecuali kontrak tersebut membutuhkan harga aset dalam waktu kurang dari 48 jam.

Mekanisme Verifikasi Data (DVM) adalah layanan penyelesaian sengketa untuk kontrak yang dibangun di Protokol UMA. DVM sangat berguna karena mencakup elemen penilaian manusia untuk memastikan kontrak sudah dikelola dengan aman dan benar ketika timbul masalah dari pasar yang mudah berubah (dan terkadang dapat dimanipulasi).

## Antarmuka Optimistic Oracle {#optimistic-oracle-interface}

Optimistic Oracle digunakan oleh kontrak keuangan atau pihak ketiga untuk mengambil harga. Setelah harga diminta, siapa pun dapat mengusulkan harga sebagai responsnya. Setelah diusulkan, harga tersebut akan memasuki periode liveness ketika setiap orang dapat menyengketakan harga yang diusulkan dan mengirim harga yang disengketakan ke UMA DVM untuk penyelesaian.

:::info

Bagian ini menjelaskan bagaimana peserta yang berbeda dapat berinteraksi dengan Optimistic Oracle. Untuk melihat mainnet yang terbaru, penyebaran kovan atau L2 dari kontrak Optimistic Oracle, silakan merujuk ke [alamat produksi](https://docs.umaproject.org/dev-ref/addresses).

:::

Ada dua belas metode yang dalam antarmuka Optimistic Oracle.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Meminta harga baru. Ini untuk pengidentifikasi harga terdaftar. Perlu diperhatikan bahwa ini dipanggil secara otomatis oleh sebagian besar kontrak keuangan yang terdaftar dalam sistem UMA, tetapi dapat dipanggil oleh siapa pun untuk pengidentifikasi harga terdaftar. Misalnya, kontrak Expiring Multiparty (EMP) memanggil metode ini ketika metode `expire` dipanggil.

Parameter:
- `identifier`: pengidentifikasi harga yang diminta.
- `timestamp`: stempel waktu harga yang diminta.
- `ancillaryData`: data tambahan yang mewakili argumen tambahan yang diteruskan dengan permintaan harga.
- `currency`: Token ERC20 yang digunakan untuk pembayaran imbalan dan biaya. Harus disetujui untuk digunakan dengan DVM.
- `reward`: imbalan yang ditawarkan kepada pengusul yang sukses. Akan dibayar oleh pemanggil. Catatan: ini bisa bernilai 0.

### proposePrice {#proposeprice}

Mengusulkan nilai harga untuk permintaan harga yang ada.

Parameter:
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.
- `proposedPrice`: harga yang diusulkan.

### disputePrice {#disputeprice}

Menyengketakan nilai harga untuk permintaan harga yang ada dengan proposal aktif.

Parameter:
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### settle {#settle}

Upaya untuk menyelesaikan permintaan harga terutang. Akan kembali jika tidak dapat diselesaikan.

Parameter:
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### hasPrice {#hasprice}

Memeriksa apakah permintaan yang diberikan telah mendapatkan penyelesaian atau diselesaikan (yakni Optimistic Oracle memiliki harga).

Parameter:
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### getRequest {#getrequest}

Mengambil struktur data saat ini yang berisi semua informasi tentang sebuah permintaan harga.

Parameter:
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### settleAndGetPrice {#settleandgetprice}

Mengambil harga yang sebelumnya diminta oleh pemanggil. Kembali jika permintaan tidak diselesaikan atau bisa diselesaikan. Catatan: metode ini tidak meninjau sehingga panggilan ini dapat menyelesaikan permintaan harga jika belum diselesaikan.

Parameter:
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### setBond {#setbond}

Menetapkan ikatan proposal yang terkait dengan permintaan harga.

Parameter:
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.
- `bond`: jumlah ikatan kustom yang akan diatur.

### setCustomLiveness {#setcustomliveness}

Mengatur nilai liveness kustom untuk permintaan tersebut. Liveness adalah jumlah waktu yang harus digunakan proposal untuk menunggu sebelum dilakukan penyelesaian otomatis.

Parameter:
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.
- `customLiveness`: liveness kustom baru.

### setRefundOnDispute {#setrefundondispute}

Mengatur permintaan untuk mengembalikan dana imbalan jika proposal disengketakan. Ini dapat membantu untuk melakukan "lindung nilai" atas pemanggil jika terjadi penundaan karena sengketa. Catatan: jika terjadi sengketa, pemenang masih menerima jaminan yang lain, jadi masih ada keuntungan yang akan didapatkan meskipun imbalan tersebut dikembalikan dananya.

Parameter:
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### disputePriceFor {#disputepricefor}

Menyengketakan permintaan harga dengan proposal aktif mewakili alamat lain. Catatan: alamat ini akan menerima imbalan apa pun yang dihasilkan dari sengketa ini. Namun, setiap jaminan ditarik dari pemanggil.

Parameter:
- `disputer`: alamat yang akan diatur sebagai pemohon sengketa.
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.

### proposePriceFor {#proposepricefor}

Mengajukan nilai harga dengan atas nama alamat lain. Catatan: alamat ini akan menerima imbalan apa pun yang berasal dari proposal ini. Namun, setiap jaminan ditarik dari pemanggil.

Parameter:
- `proposer`: alamat yang akan diatur sebagai pengusul.
- `requester`: pengirim permintaan harga awal.
- `identifier`: pengidentifikasi harga untuk mengidentifikasi permintaan yang ada.
- `timestamp`: stempel waktu untuk mengidentifikasi permintaan yang ada.
- `ancillaryData`: data tambahan dari harga yang diminta.
- `proposedPrice`: harga yang diusulkan.

## Mengintegrasikan Optimistic Oracle {#integrating-the-optimistic-oracle}

Demo ini akan mengatur kontrak `OptimisticDepositBox` yang menyimpan saldo token ERC-20 pengguna.

Pada blockchain testnet lokal, pengguna akan menyetor wETH (Wrapped Ether) ke dalam kontrak dan menarik wETH yang didenominasi dalam USD. Misalnya, jika pengguna ingin menarik 2.000 $10,000 USD of wETH, and the ETH/USD exchange rate is $, mereka akan menarik 5 wETH.

* Pengguna menghubungkan `OptimisticDepositBox` dengan salah satu pengidentifikasi harga yang diaktifkan di DVM.

* Pengguna menyetorkan wETH ke `OptimisticDepositBox` dan mendaftarkannya kepada pengidentifikasi harga `ETH/USD`.

* Kini pengguna dapat menarik sejumlah wETH yang berdenominasi USD dari via panggilan kontrak cerdas `DepositBox` dengan menggunakan Optimistic Oracle yang memungkinkan penentuan harga on-chain optimistis.

Dalam contoh ini, pengguna tidak akan mampu melakukan transfer jumlah wETH yang berdenominasi USD tanpa mengacu pada masukan harga `ETH/USD` off-chain. Oleh karena itu, Optimistic Oracle memungkinkan pengguna untuk "menarik" harga referensi.

Tidak seperti permintaan harga ke DVM, permintaan harga ke Optimistic Oracle dapat diselesaikan di dalam jendela liveness yang ditentukan jika tidak ada sengketa, yang dapat jauh lebih singkat dari periode pemungutan suara DVM. Jendela liveness dapat diatur, tetapi biasanya selama dua jam, dibandingkan dengan 2-3 hari melalui DVM.

Pengirim permintaan harga saat ini tidak diharuskan membayar biaya ke DVM. Pengirim permintaan dapat menawarkan hadiah untuk pengusul yang memberikan respons atas permintaan harga, tetapi nilai imbalan diatur ke `0` dalam contoh ini.

Pengusul harga mengepos jaminan dan harganya yang akan dikembalikan dananya jika harga tersebut tidak dipersengketakan atau jika sengketa dituntaskan dengan kemenangan di tangan pengusul. Jika tidak, jaminan ini akan digunakan untuk membayar biaya akhir ke DVM dan membayar imbalan kepada pemohon sengketa yang berhasil menang.

Dalam demo ini, pengirim permintaan tidak memerlukan jaminan tambahan dari pengusul harga, sehingga total jaminan yang diposkan sama dengan biaya akhir wETH saat ini, yakni 0,2 wETH. Lihat fungsi `proposePriceFor` dalam `OptimisticOracle`[kontrak](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) untuk detail implementasinya.

## Menjalankan Demo {#running-the-demo}

1. Pastikan Anda telah mengikuti semua langkah pengaturan prasyarat [di sini](https://docs.umaproject.org/developers/setup).
2. Jalankan instans Ganache lokal (yaitu bukan Kovan/Ropsten/Rinkeby/Mainnet) dengan `yarn ganache-cli --port 9545`
3. Di jendela lain, lakukan migrasi kontrak dengan menjalankan perintah berikut:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Untuk menyebarkan `OptimisticDepositBox`[kontrak](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) dan mengikuti alur panduan pengguna sederhana, jalankan skrip demo berikut dari root repo:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Anda akan melihat keluaran berikut:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Menjelaskan Fungsi kontrak {#explaining-the-contract-functions}

[Kode kontrak](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)`OptimisticDepositBox` menunjukkan cara berinteraksi dengan Oracle.

`constructor`Fungsi menyertakan argumen `_finderAddress` untuk kontrak `Finder` UMA, yang mempertahankan registri alamat `OptimisticOracle`, jaminan yang disetujui, dan daftar putih pengidentifikasi harga dan alamat kontrak penting lainnya.

Ini memungkinkan `constructor` untuk memeriksa apakah jenis jaminan dan pengidentifikasi harga sudah valid, serta memungkinkan `OptimisticDepositBox` untuk menemukan dan berinteraksi dengan `OptimisticOracle` nanti.

Fungsi `requestWithdrawal` mencakup panggilan internal ke `OptimisticOracle` yang meminta harga `ETH/USD`. Setelah dibalas, pengguna dapat memanggil `executeWithdrawal` untuk menyelesaikan penarikan.

Ada lebih banyak informasi dan penjelasan dalam komentar kode, jadi lihat apakah Anda tertarik untuk belajar lebih lanjut.

## Sumber Daya Tambahan {#additional-resources}

Berikut ini beberapa sumber daya tambahan mengenai UMA DVM:

- [Arsitektur Teknis](https://docs.umaproject.org/oracle/tech-architecture)
- [Arsitektur Ekonomi](https://docs.umaproject.org/oracle/econ-architecture)
- [Pos blog](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) tentang desain DVM UMA
- [Laporan resmi](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) tentang desain DVM UMA
- [Repositori penelitian](https://github.com/UMAprotocol/research) untuk kebijakan biaya optimal
- [Repositori UMIP](https://github.com/UMAprotocol/UMIPs) untuk proposal tata kelola
