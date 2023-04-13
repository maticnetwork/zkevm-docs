---
id: consensys-framework
title: Menampilkan FAQ Framework
sidebar_label: Scaling Framework FAQ
description: Bangun aplikasi blockchain berikutnya di Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Kerangka ini diturunkan dari [Empat pertanyaan Consensys untuk Menilai solusi skaling.](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## Siapa Yang Mengoperasikannya? {#who-operates-it}
Node penambang di mainnet Ethereum menggerakkan atau "mengoperasikan" jaringan ke depan dengan menyelesaikan Proof of Work dan membuat blok-blok baru. Solusi L2 membutuhkan peran "operator" serupa di jaringannya, yang merupakan ekuivalen penambang mainnet Ethereum yang dapat menggerakkan jaringan L2 ke depan. Meskipun demikian, ada beberapa perbedaan. Misalnya, selain pemrosesan dan pengesahan transaksi seperti penambang, operator L2 bisa juga memfasilitasi pengguna yang masuk dan keluar dari lapisan L2 itu sendiri.

### - Siapa atau apa yang diperlukan untuk mengoperasikan jaringan Proof of Stake Polygon? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Rantai komitmen PoS Polygon mengandalkan sekumpulan validator untuk mengamankan jaringan. Peran validator adalah untuk menjalankan node penuh; menghasilkan blok, memvalidasi dan berpartisipasi dalam konsensus dan melakukan titik periksa pada rantai utama Ethereum. Untuk menjadi validator, seseorang perlu mengunci token MATIC mereka dengan kontrak manajemen staking yang berada di rantai utama Ethereum.

Untuk rincian lebih lanjut, tolong merujuk ke [bagian Validator](/maintain/validate/getting-started.md).

### - Bagaimana mereka menjadi operator di jaringan PoS Polygon? Aturan apa yang mereka patuhi? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Untuk menjadi validator, seseorang perlu mengunci token MATIC mereka dengan kontrak
manajemen staking yang berada di rantai utama Ethereum.

Imbalan didistribusikan kepada semua staker sebanding dengan stake mereka di setiap titik periksa dengan pengecualian jika menjadi pengusul, maka akan mendapatkan bonus tambahan. Saldo imbalan pengguna diperbarui di kontrak yang dirujuk ketika
mengklaim imbalan.

Stake berisiko dipangkas jika node validator melakukan
tindakan jahat seperti penandatanganan ganda, waktu tidak aktif validator yang juga memengaruhi
delegator terkait di titik periksa itu.

Untuk rincian lebih lanjut yang perlu dimaksud [Aliran akhir ke validator](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) dan [Tanggung Jawab validator](/maintain/validate/validator-responsibilities.md)


### - Asumsi kepercayaan apa yang harus dimiliki pengguna PoS Polygon terhadap operatornya? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Rantai komitmen PoS Polygon mengandalkan sekumpulan validator untuk mengamankan jaringan. Peran validator adalah menjalankan node penuh; menghasilkan blok, memvalidasi dan berpartisipasi dalam konsensus dan melakukan titik periksa pada rantai utama. Untuk menjadi validator, seseorang perlu mengunci token MATIC mereka dengan kontrak manajemen staking yang berada di rantai utama.
Asalkan ⅔ stake bobot dari validatornya jujur, rantai akan berkembang secara akurat.

### - Apa tanggung jawab operator? Kekuatan apa yang mereka miliki? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Peran validator adalah menjalankan node penuh; menghasilkan blok, memvalidasi, dan berpartisipasi dalam konsensus serta melakukan titik periksa pada rantai utama.

Validator memiliki kekuatan untuk menghentikan perkembangan rantai, mengatur ulang blok, dll. dengan asumsi ⅔ validator stake bobot tidak jujur. Mereka tidak memiliki kekuatan untuk mengubah kondisi, saldo aset pengguna, dll.

### - Apa dorongan untuk menjadi operator PoS Polygon? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Validator mengunci token MATIC mereka sebagai jaminan untuk bekerja demi keamanan jaringan dan sebagai balasan atas layanan mereka, mendapatkan imbalan.

Silakan merujuk [ke Apa insentif](/maintain/validator/rewards.md#what-is-the-incentive) untuk rincian lebih lanjut.

## Bagaimana Datanya? {#how-s-the-data}
Berdasarkan definisi, teknologi Lapisan 2 harus membuat titik periksa data inkremental pada Lapisan 1 (Ethereum mainnet). Lalu, keprihatinan kami adalah dengan waktu sela antara check-in Lapisan 1 berkala tersebut. Secara spesifik, bagaimana data Lapisan 2 dihasilkan, disimpan, dan dikelola saat berada jauh dari pelabuhan Lapisan 1 yang aman? Kami sangat prihatin dengan hal ini karena inilah saatnya pengguna berada paling jauh dari keamanan mainnet publik yang tidak bisa dipercaya.

### - Apa saja ketentuan penguncian PoS Polygon? {#what-are-the-lock-up-conditions-for-polygon-pos}

Dalam sebagian besar pola desain token, token dicetak di Ethereum dan dapat dikirim ke PoS Polygon. Untuk memindahkan token semacam itu dari Ethereum ke PoS Polygon, pengguna perlu mengunci dana dalam kontrak di Ethereum, dan token yang sesuai kemudian dicetak di PoS Polygon.

Mekanisme relai jembatan ini dijalankan oleh validator PoS Polygon dengan ⅔ menyetujui peristiwa token terkunci di Ethereum untuk mencetak jumlah token yang sesuai di PoS Polygon.

Penarikan aset kembali ke ethereum adalah proses 2 langkah di mana token aset harus dibakar terlebih dahulu pada rantai komitmen PoS Polygon dan kemudian bukti transaksi pembakaran ini harus diserahkan pada rantai Ethereum.


Untuk rincian lebih lanjut, merujuk ke [Langkah untuk menggunakan jembatan PoS](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge).

### - Seberapa cepat dana tersebut tersedia di PoS Polygon? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Sekitar ~22-30 menit. Hal ini dilakukan melalui mekanisme yang melewati pesan yang disebut `state sync`. Rincian lebih lanjut dapat ditemukan [di sini](/pos/state-sync/state-sync-mechamism.md).

Apakah PoS Polygon memberikan dukungan untuk pengguna yang masuk tanpa penguncian L1 (yaitu pada saat penerimaan pengguna langsung ke Polygon, kemudian pengguna ingin keluar ke Ethereum mainnet)?

Ya, mekanisme jembatan khusus digunakan untuk menyelesaikan situasi ini. Ketika pengguna ingin keluar ke Ethereum, sebaliknya dari melakukan metode biasanya untuk membuka kunci token dari kontrak khusus, token tersebut justru dicetak.

Anda dapat membaca tentang mereka [di sini](/develop/ethereum-polygon/mintable-assets.md).

### - Bagaimana cara pengguna menyanggah transaksi PoS Polygon yang tidak valid? Membuktikan transaksi PoS Polygon yang valid? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Saat ini tidak ada cara pada rantai untuk membantah transaksi PoS Polygon yang tidak valid. Namun, validator rantai Polygon PoS menyerahkan poin checkpoint periodik ke Ethereum - Anda dapat melihat lebih banyak rincian [di sini](/pos/heimdall/modules/checkpoint.md). Terdapat kemungkinan untuk memverifikasi transaksi pada rantai Polygon PoS di Ethereum dengan membangun bukti pohon Merkle dan memverifikasikannya melawan titik pemeriksaan periodik yang terjadi pada Ethereum dari transaksi PoS Polygon dan batang pohon Merkl.

### Setelah pengguna Polygon ingin keluar, seberapa cepat dana Layer 1 (ditambah atau minus keuntungan atau kerugian) yang tersedia di L1? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Sekitar ~1-3 jam tergantung pada frekuensi [pos pemeriksaan](/pos/heimdall/modules/checkpoint.md). Frekuensi ini terutama merupakan suatu fungsi dari biaya yang bersedia dikeluarkan oleh validator terkait biaya gas ETH untuk mengirimkan titik periksa.

### - Apakah Anda mengantisipasi adanya Penyedia Likuiditas pada Lapisan 1 yang bersedia menyediakan dana L1 yang dapat segera ditukarkan ke pengguna PoS Polygon yang ada? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Sudah ada beberapa pemain seperti [Connext](https://connext.network/) dan [Biconomy](https://biconomy.io/) yang akan menyediakan layanan ini. Ada sejumlah pemain lain yang juga akan segera live.

## Bagaimana dengan Stack? {#how-s-the-stack}
Perbandingan stack penting untuk menyoroti apa yang telah atau belum diubah oleh Lapisan 2 dari Ethereum mainnet.

### - Berapa banyak stack PoS Polygon berbagi dengan stack Ethereum mainnet? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Jika Anda seorang Pengembang Ethereum, Anda sudah menjadi pengembang PoS Polygon. Semua alat yang Anda kenal didukung pada PoS Polygon siap dipakai: Truffle, Remix, Web3js dan masih banyak lagi.

Tidak ada perubahan besar pada antarmuka EVM untuk PoS Polygon dibandingkan dengan Ethereum.

### -  Apa saja perbedaan PoS Polygon dengan stack Ethereum mainnet dan risiko / imbalan apa yang diperkenalkan? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Tidak ada perubahan besar.

## Mengantisipasi yang Terburuk {#preparing-for-the-worst}
Bagaimana sistem PoS Polygon mengantisipasi:

### - Keluarnya pengguna secara massal? {#a-mass-exit-of-users}

Asalkan ⅔ validator jujur, dana pada rantai aman. Jika asumsi ini tidak valid, dalam skenario seperti itu, rantai bisa berhenti atau pengaturan ulang bisa terjadi. Konsensus sosial akan diperlukan untuk kemudian memulai kembali rantai dari kondisi sebelumnya - termasuk snapshot kondisi PoS Polygon yang dikirimkan melalui titik periksa dapat digunakan untuk melakukan ini.

### - Peserta Polygon mencoba untuk mengakali konsensus Polygon. Misalnya, dengan membentuk kartel? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Konsensus sosial akan diperlukan untuk kemudian memulai kembali rantai dari kondisi sebelumnya dengan mengeluarkan semua validator tersebut dan memulai kembali dengan sekumpulan validator baru - termasuk snapshot kondisi PoS Polygon yang dikirimkan melalui titik periksa dapat digunakan untuk melakukan ini.


### - Bug atau eksploitasi yang ditemukan pada bagian penting sistem? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Ketelitian telah dilakukan untuk menggunakan kembali komponen yang tahan uji dalam pembangunan sistem. Namun, jika ada bug atau eksploitasi pada bagian penting sistem, maka akan dilakukan jalur solusi utama dengan memulihkan rantai ke kondisi sebelumnya melalui konsensus sosial.
