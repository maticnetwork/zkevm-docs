---
id: ipfs
title: IPFS
description: "IPFS - sistem terdistribusi untuk menyimpan dan mengakses data."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Konteks {#context}

Blockchain Polygon mengurangi biaya transaksi untuk menyimpan data dibandingkan Ethereum mainnet; tetapi biaya yang lebih rendah ini akan bertambah dengan cepat ketika menyimpan file yang cukup besar. Pengembang juga harus mempertimbangkan batasan ukuran blok dan batasan kecepatan transaksi ketika menyimpan data onchain. Satu solusi yang membahas semua masalah ini adalah IPFS, Sistem File InterPlanetary

#### Apa itu IPFS? {#what-is-ipfs}

IPFS adalah sebuah sistem terdistribusi untuk menyimpan dan mengakses file, situs web, aplikasi, dan data. IPFS menggunakan jaringan terdesentralisasi, pengalamatan konten, dan jaringan peer-to-peer partisipan aktif yang kuat untuk memungkinkan pengguna menyimpan, mengirim permintaan, dan mentransfer data yang bisa diverifikasi dengan satu sama lain.

Desentralisasi memungkinkan untuk mengunduh file dari banyak lokasi yang tidak dikelola oleh satu organisasi, yang menyediakan ketahanan dan resistensi sensor yang siap pakai.

Pengalamatan konten menggunakan kriptografi untuk membuat hash yang dapat diverifikasi secara unik berdasarkan apa yang ada dalam file, bukan berdasarkan lokasi file. Pengidentifikasi konten yang dihasilkan (CID) menyediakan jaminan bahwa sebuah data identik di mana pun data disimpan.

Terakhir, komunitas aktif pengguna yang terus bertambah membuat berbagi konten secara peer-to-peer ini bisa dilakukan. Pengembang upload dan pin konten ke IPFS sementara penyedia penyimpanan Filecoin atau Crust membantu memastikan penyimpanan konten yang tetap.


Penyimpanan berbasis IPFS memungkinkan Anda menyimpan CID untuk konten Anda alih-alih memuat seluruh file ke blockchain Polygon; yang memungkinkan mengurangi biaya, ukuran file yang lebih besar, dan penyimpanan persisten yang telah terbukti. Untuk lebih banyak rincian merujuk [Doc IPF](https://docs.ipfs.io/).

### Proyek Contoh {#example-projects}

1. Tutorial dalam stempel yang menunjukkan bagaimana untuk menayangkan NFT di Polygon dengan IPFS - [link](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Membangun aplikasi web 3 stack dengan Next.js, Polygon, Solidity, Graph, IPFS, dan Hardhat - [link](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
