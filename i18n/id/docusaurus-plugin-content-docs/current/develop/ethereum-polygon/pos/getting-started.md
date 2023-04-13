---
id: getting-started
title: Jembatan PoS
sidebar_label: Introduction
description: Penarikan yang lebih fleksibel dan lebih cepat dengan Polygon POS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Lihat [dokumentasi Matic.js terbaru di PoS](../matic-js/get-started.md) untuk memulai.

Pada dasarnya, jembatan merupakan serangkaian kontrak yang membantu memindahkan aset dari rantai root ke rantai anak. Terdapat dua jembatan utama untuk memindahkan aset antara Ethereum dan Polygon. Yang pertama adalah jembatan Plasma dan yang kedua disebut **Jembatan PoS** atau **Jembatan Proof dari Stake**. **Jembatan Plasma** menyediakan jaminan keamanan yang sudah ditingkatkan karena mekanisme keluar Plasma.

Namun, ada pembatasan tertentu pada token anak dan ada periode penarikan selama 7 hari yang terkait dengan semua proses keluar/penarikan dari Polygon ke Ethereum di jembatan Plasma.

Hal ini akan menyulitkan bagi DApp/pengguna yang membutuhkan **fleksibilitas** dan **penarikan yang lebih cepat**, serta yang menyukai tingkat keamanan yang disediakan oleh jembatan Proof-of-Stake Polygon, yang diamankan oleh serangkaian validator eksternal yang kuat.

Aset berbasis proof of stake menyediakan keamanan PoS dan proses keluar yang lebih cepat dengan satu interval titik periksa.

## Langkah-langkah untuk menggunakan Jembatan PoS {#steps-to-use-the-pos-bridge}

Sebelum kita masuk ke bagian dok, mungkin membantu memiliki pemahaman menyeluruh tentang beberapa istilah karena Anda akan berinteraksi dengan mereka sambil mencoba menggunakan jembatan: [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) dan [State Sync Mechanism](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Kemudian, langkah pertama untuk menggunakan PoS bridge adalah memetakan **Token Root** dan **Token Anak**. Artinya kontrak token pada rantai root dan kontrak token pada rantai anak harus mempertahankan koneksi (disebut pemetaan) untuk transfer aset antara mereka sendiri. Jika Anda tertarik untuk mengajukan permintaan pemetaan, silakan lakukan itu menggunakan [panduan ini](/docs/develop/ethereum-polygon/submit-mapping-request/).

Pada tingkat yang lebih rendah dan dengan lebih rinci, ini yang terjadi:

### deposit {#deposit}

  1. Pemilik token aset **(ERC20/ERC721/ERC1155)** harus menyetujui kontrak tertentu di jembatan PoS untuk membelanjakan jumlah token yang akan ditransfer. Kontrak ini disebut **Kontrak Predikat** (disebarkan di jaringan Ethereum) yang benar-benar **mengunci jumlah token yang akan disetorkan**.
  2. Setelah persetujuan diberikan, langkah berikutnya adalah **menyetorkan aset**. Sebuah panggilan fungsi harus dilakukan pada `RootChainManager`kontrak yang mana pada gilirannya memicu `ChildChainManager`kontrak pada rantai Polygon.
  3. Ini terjadi melalui mekanisme sinkronisasi kondisi yang dapat dipahami secara terperinci [di sini](/docs/pos/state-sync/state-sync/).
  4. Secara `ChildChainManager`internal memanggil `deposit`fungsi kontrak token anak dan jumlah token aset **yang disesuaikan akan ke akun pengguna.** Penting untuk dicatat bahwa hanya `ChildChainManager`dapat mengakses `deposit`fungsi pada kontrak token anak.
  5. Setelah pengguna mendapatkan token, token itu dapat **ditransfer hampir dalam sekejap dengan biaya yang sangat rendah di rantai Polygon**.

### Penarikan {#withdrawals}

  1. Menampilkan aset ke Ethereum adalah proses 2 langkah dimana tanda asset harus dibakar **pertama pada rantai Polygon** dan kemudian **bukti transaksi bakar ini harus diajukan** pada rantai Ethereum.
  2. Butuh waktu sekitar 20 menit sampai 3 jam untuk memeriksa transaksi bakar dalam titik periksa di rantai Ethereum. Ini dilakukan oleh validator Proof of Stake.
  3. Setelah transaksi telah ditambahkan ke pos pemeriksaan, bukti transaksi bakar dapat diajukan pada `RootChainManager`kontrak di Ethereum dengan memanggil `exit`fungsi.
  4. Panggilan fungsi ini **memverifikasi penyertaan titik periksa**, kemudian memicu Kontrak Predikat yang telah mengunci token aset saat aset disetorkan awalnya.
  5. Sebagai langkah terakhir, **kontrak predikat merilis token yang terkunci** dan membukanya ke akun pengguna di Ethereum.

:::tip

Setelah pemetaan dilakukan, Anda dapat menggunakan **SDK matic.js** untuk berinteraksi dengan kontrak atau Anda dapat melakukan hal yang sama tanpa SDK. Namun, SDK matic.js dirancang dengan cara yang ramah pengguna agar mekanisme transfer aset mudah diintegrasikan dengan aplikasi apa pun.

:::