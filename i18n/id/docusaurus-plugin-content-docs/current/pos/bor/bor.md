---
id: bor
title: Arsitektur Bor
description: Peran Bor dalam arsitektur Polygon
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Arsitektur Bor {#bor-architecture}

Polygon adalah platform **Plasma + Proof-of-Stake (PoS)**. Kami menggunakan arsitektur dengan konsensus ganda di Jaringan Polygon untuk mengoptimalkan kecepatan dan desentralisasi. Kami dengan sadar merancang sistem untuk mendukung transisi kondisi arbitrer di rantai sisi kami, yang didukung EVM.

## Arsitektur {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Blockchain adalah sekumpulan klien jaringan yang berinteraksi dan bekerja sama. Klien adalah sebuah perangkat lunak yang dapat membangun saluran komunikasi p2p dengan klien lain, menandatangani dan menyiarkan transaksi, menempatkan dan berinteraksi dengan kontrak cerdas, dll. Klien sering disebut sebagai node.

Untuk Polygon, node dirancang dengan implementasi dua lapisan Heimdall (Validator Layer) dan Bor(Block Producer).

1. Heimdall
    - Verifikasi Proof of Stake
    - Blok-blok titik periksa di rantai utama Ethereum
    - Manajemen Validator dan Imbalan
    - Memastikan sinkronisasi dengan rantai utama Ethereum
    - Jembatan Terdesentralisasi
2. Bor
    - Rantai Polygon
    - VM yang Kompatibel dengan EVM
    - Seleksi kumpulan Pengusul dan Produsen
    - SystemCall
    - Model Biaya

## Heimdall (Lapisan Validator) {#heimdall-validator-layer}

Heimdall (All-Protector) adalah purveyor dari semua yang terjadi dalam sistem Polygon Proof-of-Stake - baik atau buruk.

Heimdall adalah lapisan Pemverifikasi Proof-of-Stake kami, yang bertanggung jawab untuk memeriksa titik pada perwakilan blok Plasma hingga rantai utama dalam arsitektur kami. Kami telah mengimplementasikan ini dengan membangun di atas mesin konsensus Tendermint perubahan-perubahan pada skema tanda tangan dan berbagai struktur data.

Untuk informasi lebih lanjut, baca [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

## Bor (Lapisan Produsen Blok) {#bor-block-producer-layer}

Implementasi node bor pada dasarnya adalah operator rantai sisi. VM rantai sisinya kompatibel dengan EVM. Saat ini, ini adalah implementasi Geth dasar dengan perubahan kustom yang dilakukan pada algoritma konsensusnya. Namun demikian, ini akan dibangun dari dasar hingga menjadikannya ringan dan fokus.

Bor adalah lapisan produsen blok kami, yang bersinkronisasi dengan Heimdall memilih produsen dan pemverifikasi untuk setiap span dan sprint. Interaksi untuk pengguna Polygon berlangsung di rantai sisi ini, yang kompatibel dengan EVM untuk memanfaatkan fungsionalitas dan kompatibilitas peralatan dan aplikasi pengembang Ethereum.

### Rantai Polygon {#polygon-chain}

Rantai ini adalah blockchain terpisah yang disematkan ke Ethereum menggunakan pasak dua arah. Pasak dua arah ini memungkinkan pertukaran aset antara Ethereum dan Polygon.

### VM yang Kompatibel dengan EVM {#evm-compatible-vm}

Ethereum Virtual Machine (EVM) adalah tumpukan virtual sandbox yang kuat dan disematkan di dalam setiap node Polygon penuh, yang bertanggung jawab untuk mengeksekusi bytecode kontrak. Kontrak biasanya ditulis dalam bahasa tingkat tinggi, seperti Solidity, kemudian dikompilasi ke bytecode EVM.

### Seleksi Pengusul dan Produsen {#proposers-and-producers-selection}

Produsen Blok untuk lapisan Bor adalah komite yang dipilih dari kelompok Validator berdasarkan stake mereka, yang berlangsung dalam rentang waktu reguler dan diacak secara berkala. Interval ini ditentukan oleh tata kelola validator terkait dinasti dan jaringan.

Kekuatan perbandingan Stake/Staking menentukan probabilitas untuk dipilih sebagai anggota komite produsen blok.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Proses Seleksi {#selection-process}

- Misalkan kita memiliki 3 validator di kelompok, dan mereka adalah Alice, Bill, dan Clara.
- Alice melakukan staking 100 token Matic sedangkan Bill dan Clara staking 40 token Matic.
- Validator diberikan slot sesuai dengan jumlah stakenya, dan karena Alice memiliki 100 token Matic yang dilakukan staking, dia akan mendapatkan slot secara proporsional. Alice akan mendapatkan total 5 slot. Demikian pula, Bill dan Clara mendapatkan total 2 slot.
- Semua validator diberikan slot ini [A, A, A, A, A, B, B, C, C]
- Dengan menggunakan data blok Ethereum historis sebagai seed, kami mengacak susunan ini.
- Setelah mengacak slot menggunakan seed, katakanlah diperoleh susunan ini [A, B, A, A, C, B, A, A, C]
- Sekarang tergantung pada jumlah Produsen*(dirawat oleh tata kelola validator)*, kami memunculkan validator dari yang paling atas. Misalnya, jika kita ingin memilih 5 produsen kita mendapatkan kumpulan produsen [A, B, A, A, C]
- Oleh sebab itu, kumpulan produsen untuk span berikutnya ditetapkan sebagai [A:3, B:1, C:1].
- Dengan menggunakan kumpulan validator ini dan algoritme seleksi pengusul tendermint, kami memilih produsen untuk setiap sprint di BOR.

### Antarmuka SystemCall {#systemcall-interface}

Panggilan sistem adalah alamat operator internal yang berada di bawah EVM. Ini membantu menjaga kondisi Produsen Blok untuk setiap sprint. Panggilan sistem dipicu menjelang akhir sprint dan permintaan daftar baru Produsen Blok dibuat. Setelah kondisi diperbarui, perubahan akan diterima setelah pembuatan blok di Bor kepada semua Validatornya.

### fungsi {#functions}

#### proposeState {#proposestate}

- Panggilan hanya diperbolehkan kepada validator.
- Memeriksa `stateId` apakah sudah diusulkan atau dijalankan.
- Mengusulkan `stateId` dan memperbarui bendera menjadi `true`.

#### komitmen {#commitstate}

- Panggilan hanya diperbolehkan kepada sistem.
- Memeriksa `stateId` apakah sudah diusulkan atau dijalankan.
- Memberitahukan Kontrak `StateReceiver` dengan `stateId` baru.
- Memperbarui bendera `state` menjadi `true`, dan `remove` `proposedState`.

#### proposeSpan {#proposespan}

- Panggilan hanya diperbolehkan kepada validator.
- Memeriksa apakah usulan Span `pending`.
- Memperbarui Usulan Span menjadi `true`

#### proposeCommit {#proposecommit}

- Panggilan hanya diperbolehkan kepada sistem.
- Mengatur `initial validators` jika span saat ini nol.
- Memeriksa Persyaratan untuk `spanId` dan `time_period` Sprint dan Span.
- Memperbarui `span` dan `time_period` yang baru.
- Mengatur `validators` dan `blockProducers` untuk `sprint`.
- Memperbarui bendera untuk `spanProposal` menjadi `true`.

### Model Biaya Bor {#bor-fee-model}

Untuk transaksi biasa, biaya token Matic dikumpulkan dan didistribusikan ke produsen blok , mirip dengan transaksi Ethereum.

Seperti blockchain lainnya, Polygon memiliki token asli yang disebut Matic (MATIC). MATIC adalah token ERC20 yang terutama digunakan untuk membayar gas (biaya transaksi) di Polygon dan staking.

:::info

Yang perlu diperhatikan adalah bahwa di rantai Polygon, token MATIC tidak hanya bekerja sebagai token ERC20, tetapi juga sebagai token asli secara bersamaan. Oleh karena itu, ini berarti bahwa pengguna dapat membayar gas dengan MATIC dan juga mengirim MATIC ke akun lainnya.

:::

Untuk kontrak genesis, `gasPrice`dan `gasLimit`bekerja sama dengan Ethereum, tetapi selama eksekusi tidak akan mengurangi biaya dari akun pengirim.

Transaksi Genesis dari validator saat ini dilaksanakan dengan `gasPrice = 0`.

Juga, validator harus mengirim jenis transaksi seperti proposal negara seperti deposit & Span proposal di Bor.

## Wawasan Teknis {#technical-insight}

### Kontrak Genesis {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Kontrak ini mengelola kumpulan validator untuk setiap span dan sprint.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Kontrak ini mengelola transfer data kontrak arbitrer dari kontrak Ethereum ke kontrak Polygon

MaticChildERC20(0x1010) ⇒ Kontrak Anak untuk token Rantai Utama yang memungkinkan untuk memindahkan aset dari Ethereum ke Polygon.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Protokol Bor

## Glosarium {#glossary}

- StartEpoch - Pos nomor titik periksa yang validatornya diaktifkan dan akan mengikuti konsensus.
- EndEpoch - Pos nomor titik periksa yang validatornya dianggap nonaktif dan tidak akan mengikuti konsensus.
- Sprint - Sprint adalah kumpulan blok berkesinambungan yang dibuat oleh satu validator.
- Span -  span adalah kumpulan blok besar dengan kumpulan validator tetap tetapi terdiri dari berbagai sprint. Misalnya, untuk span dengan panjang 6400 blok akan terdiri dari 100 sprint dengan 64 blok.
- Dynasty: waktu di antara akhir lelang terakhir dengan waktu mulai lelang berikutnya.

## Sumber daya {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [Bagaimana EVM Bekerja?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Seleksi Proposal Tendermint](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
