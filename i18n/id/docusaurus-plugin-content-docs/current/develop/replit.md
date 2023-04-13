---
id: replit
title: Menyebarkan Kontrak Cerdas Memakai Ular
sidebar_label: Using Replit
description: Menyebarkan Kontrak Cerdas menggunakan ReplitIDE pada Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Ikhtisar {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) adalah platform pengodean yang memungkinkan Anda menulis kode dan mengehos aplikasi. Replit mendukung [bahasa pemrograman Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1) sehingga menyediakan semua fitur dan fungsionalitas untuk membuat dan menyebarkan kontrak cerdas bagi pengembang Web3.

Artikel ini memandu Anda untuk membangun dan menyebarkan kontrak soliditas cerdas di Polygon menggunakan [templat pengembangan Solidity (Solidity starter beta)](https://replit.com/@replit/Solidity-starter-beta?v=1)[](https://replit.com/signup).

## Yang Anda akan lakukan {#what-you-will-do}

- Membuat akun Replit
- Membuat lingkungan Repl
- Menyebarkan projek sampel pada jaringan Polygon Mumbai
- Memverifikasi kontrak
- Memublikasikan proyek ke profil Replit personal.

:::tip

Untuk contoh tambahan tentang Solidity dengan Replit, Anda dapat membaca artikel <ins>**[Get dimulai dengan Replit](https://blog.replit.com/solidity)**</ins> atau memeriksa <ins>**[dokumentasi Solidity dan tutorial kontrak Escrow](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>.
:::

## Prasyarat {#prerequisites}

Anda tidak perlu pengaturan lingkungan lokal untuk menyebarkan kontrak cerdas solidity Anda di Polygon menggunakan Replit.

Anda membutuhkan dompet web3 berbasis browser untuk berinteraksi dengan Testnet Mumbai Polygon dan kontrak-kontrak yang disebarkan. Jika Anda telah menggunakan MetaMask, sebaiknya buat akun baru untuk pengujian dengan Replit. Anda dapat melakukan ini dari menu akun yang muncul ketika mengklik avatar akun di sudut kanan atas antarmuka MetaMask.

Anda harus mengatur semua Prasyarat berikut agar dapat menyebarkan kontrak cerdas Solidity di Polygon:

1. [Membuat akun Replit](https://replit.com/signup)
2. [Unduh dompet Metamask](/docs/develop/metamask/hello)
3. [Mengonfigurasi Polygon di MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [Mendapatkan token testnet](https://faucet.polygon.technology)

## Bekerja dengan Repl {#working-with-a-repl}

Setiap Repl yang Anda buat adalah lingkungan pengembangan dan produksi yang sepenuhnya fungsional. Ikuti langkah-langkah berikut untuk membuat starter solidity Replit:

1. [Masuk](https://replit.com/login) atau [buat akun](https://replit.com/signup). Setelah membuat [akun Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) Anda, layar rumah akan memasukkan dashboard dimana dapat Anda lihat, membuat proyek, dan mengelola akun Anda.

![img](/img/replit/dashboard.png)

2. Setelah log in, membuat Solidity starter repl, Pilih **+ Buat Repl** dari panel kiri atau **+** di sudut kanan atas layar.

![img](/img/replit/solidity.png)

3. Pilih templat [**starter Solidity (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) dan berikan projek sebuah judul.

4. Klik pada **+ Buat Repl** untuk membuat projek Anda.

:::note

Repl starter Solidity datang dengan antarmuka yang bersahabat, dibangun menggunakan <ins>**[API API Web3 Ethereum JavaScript](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> yang dapat Anda gunakan untuk menyebarkan dan berinteraksi dengan kontrak kami. Kami akan menyebarkan testnet Replit, versi khusus dari blockchain Ethereum yang dikelola oleh Replit dan dioptimalkan untuk pengujian.

:::

## Menyebarkan di Polygon {#deploy-on-polygon}

Pastikan bahwa Anda telah mengikuti daftar **Prerequisites** di atas sehingga Anda siap untuk menyebarkan dan berinteraksi dengan kontrak cerdas Anda.

1. Klik pada **Run** (di Top) untuk memasang semua paket yang relevan dan memulai penyebaran kontrak UI.

2. Sambungkan dompet MetaMask ke antarmuka web dan beralih ke [Testnet Mumbai](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Klik di **dompet Konect**, pilih akun Anda, kemudian pilih **Connect**.

![img](/img/replit/deploy-list.png)

4. Dari daftar dropdown, pilih kontrak yang ingin Anda disebarkan. Klik pada **Deploy**.

5. Anda akan menerima jendela popup MetaMask yang meminta konfirmasi Anda. Menuntut transaksi dari dompet Anda untuk menyebarkan kontrak.

## Memverifikasi dan menguji kontrak {#verifying-and-testing-your-contract}

Ketika kontrak sudah disebarkan, [Navigasikan ke Polyganscan](https://mumbai.polygonscan.com/) untuk mencari akun Anda, melihat kontrak yang telah disebarkan, dan menyalin alamat akun Anda.

Setelah kontrak Anda telah disebarkan, akan muncul sebagai kotak yang dapat diperluas di bawah kotak dropdown. Perluas kotak tersebut dan perhatikan semua fungsi yang ada di dalamnya. Sekarang Anda dapat berinteraksi dengan kontrak menggunakan antarmuka pengguna yang disediakan atau dari URL yang ditampilkan di antarmuka.

## Menerbitkan ke Replit​ {#publish-to-replit}

Replit memungkinkan Anda menerbitkan proyek ke profil personal. Setelah publikasi, proyek akan ditampilkan di halaman sorotan agar bisa dijelajahi, berinteraksi, mengklona, dan berkolaborasi dengan orang lain.

Ikuti langkah di bawah untuk mempublikasikan proyek Anda ke Replit:

1. Pilih judul proyek di bagian atas layar.
2. Lengkapi nama dan deskripsi proyek dan **Publikasi** klik.
