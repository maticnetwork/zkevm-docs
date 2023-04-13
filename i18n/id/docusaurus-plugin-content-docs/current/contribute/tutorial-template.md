---
id: tutorial-template
title: Templat Tutorial Umum
sidebar_label: Tutorial template
description: Ikuti templat tutorial ketika menulis tutorial teknis.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Templat ini harus digunakan ketika berkontribusi tutorial ke Polygon
Wiki. Anda dapat memilih berkontribusi tutorial mengenai topik pilihan Anda.

## Pedoman umum {#general-guidelines}

* Lingkup tutorial harus jelas dalam judul.
* Tutorial harus dapat menggambarkan fitur dan fungsi
produk atau layanan secara jelas.
* Cobalah untuk membuat tutorial tetap ringkas dan jelas, tetapi kembangkan konsep penting
bila perlu. Berikan informasi latar belakang dan konteks lebih lanjut bila memungkinkan.
* Untuk langkah-langkah konfigurasi dan implementasi, uraikan dengan jelas.
* Usahakan menambah gambar pendukung, ikon, atau cuplikan yang
melengkapi isi tulisan.
  > Tim dokumentasi juga akan senang bekerja dengan Anda untuk membuat diagram.
* Ingatlah audiensi tulisan Anda. Jika materi memiliki kesulitan tertentu,
tingkat kesulitannya harus disebutkan dalam tutorial.
  > Jika terdapat langkah yang harus dilakukan oleh pengguna sebelum mempraktikkan melalui tutorial, cantumkan hal tersebut.
* Tim dokumentasi akan senang bekerja sama dalam pembuatan tutorial.
* Ingatlah untuk mempertimbangkan **[panduan Gaya](writing-style.md)**.

:::caution Memperbarui tutorial yang ada

Jika Anda menyadari bahwa tutorial yang ada di Polygon
Wiki tidak mengikuti templat ini, itu karena tim dokumentasi
memutuskan untuk menerapkan standar, sehingga aliran tutorial konsisten
di semua tutorial. Tim sedang berusaha memperbarui tutorial ini
agar menyerupai templat ini. Jika Anda tertarik, Anda juga dapat memperbarui
tutorial untuk menata ulang tutorial.

:::

## Bagian-bagian tutorial {#tutorial-sections}

### Ikhtisar {#overview}

Menjelaskan produk atau layanan yang dibahas dalam tutorial.
Memberikan informasi latar belakang tentang kegunaan tutorial dan tujuan
tutorial disajikan. Tutorial harus selalu didasarkan pada penggunaan
produk Polygon.

### Yang akan Anda pelajari {#what-you-ll-learn}

Meringkas apa yang akan dipelajari pengguna selama tutorial.

:::note Contoh

Anda akan menguraikan cara penggunaan Truffle Suite untuk membangun dApp
Polygon.

:::

#### Hasil pembelajaran {#learning-outcomes}

Menguraikan hasil pembelajaran.

:::note Contoh

1. Anda akan belajar tentang Fauna.
2. Anda akan belajar cara menggunakan ReactJS untuk UI dApp.
3. Anda akan belajar cara mengamankan data dApp.

:::

Menyebutkan prasyarat dan beberapa hal yang harus
sudah diketahui oleh pengguna. Menautkan dokumentasi yang diperlukan terkait bidang
yang harus sudah diketahui oleh pengguna.

:::note Contoh

Sebelum memulai tutorial ini, Anda harus memahami dasar-dasar
pengembangan dApp berbasis EVM. Lihat "dokumen ini" untuk informasi lebih lanjut.

:::

### Yang akan Anda lakukan {#what-you-ll-do}

Menguraikan langkah-langkah dalam tutorial dan alat yang akan digunakan.

:::note Contoh

Anda akan menggunakan Solidity untuk membuat kontrak cerdas di lingkungan ChainIDE.

1. Mengatur dompet
2. Menulis kontrak cerdas ERC-721
3. Mengompilasi Kontrak Cerdas ERC-721
4. Menyebarkan Kontrak Cerdas ERC-721
5. Membuat File Flattened menggunakan Pustaka Flattener
6. Memverifikasi Kontrak Cerdas
7. Melakukan Mint NFT

:::

### Tentang tutorial {#the-tutorial-itself}

Secara umum, tutorial dapat disajikan dalam kategorisasi terbaik yang
dianggap sesuai oleh penulis; hal ini harus tercermin dalam bagian [Yang akan Anda lakukan](#what-youll-do).  Namun, bagian tutorial harus mencerminkan tiga kategori utama ini:

> Pastikan Anda mempertimbangkan kata kunci dan mengingat SEO ketika menulis
> seluruh bagian.

#### Membuat aplikasi {#build-your-application}

Isi tutorial utama. Ini dapat mencakup beberapa bagian, antara lain
"pengaturan", "konfigurasi", dan "implementasi".

#### Mejalankan atau Menyebarkan aplikasi {#run-or-deploy-your-application}

Menjelaskan cara pengguna menjalankan atau menyebarkan aplikasi.

#### Mengetes aplikasi {#test-your-application}

Hal ini mungkin berupa penulisan tes untuk kontrak cerdas, verifikasi kontrak
cerdas, dsb.

### Langkah berikutnya {#next-steps}

Menyimpulkan tutorial dan menguraikan hasil pembelajaran.
Menguraikan langkah berikutnya yang dapat dilakukan pengguna.

:::note Contoh

Selamat atas penyebaran kontrak cerdas Anda. Kini, Anda mengetahui cara menggunakan ChainIDE
untuk membuat dan menyebarkan kontrak cerdas. Pertimbangkan mencoba "tutorial ini".

:::
