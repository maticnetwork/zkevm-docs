---
id: what-is-proof-of-stake
title: Apa itu Proof of Stake?
description: Algoritme konsensus yang bergantung pada validator.
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bukti dari Stake (PoS) {#proof-of-stake-pos}

Proof of Stake (PoS) adalah kategori algoritme konsensus untuk blockchain publik yang bergantung pada [stake](/docs/maintain/glossary#staking) ekonomi validator dalam jaringan.

Dalam blockchain publik berbasis proof of work (PoW), algoritme memberi imbalan kepada peserta yang memecahkan teka-teki kriptografi untuk memvalidasi transaksi dan membuat blok baru. Contoh: Bitcoin, sebelumnya Ethereum.

Dalam blockchain publik berbasis PoS, sekumpulan validator bergantian mengusulkan dan memberikan suara pada blok berikutnya. Bobot suara tiap validator tergantung pada jumlah setorannya — [stake](/docs/maintain/glossary#staking). Keuntungan signifikan dari PoS termasuk keamanan, pengurangan risiko sentralisasi, dan efisiensi energi. Contoh blockchain PoS: Eth2, Polygon.

Secara umum, algoritme PoS terlihat sebagai berikut. Blockchain melacak sekumpulan validator, dan siapa pun yang memegang mata uang kripto dasar blockchain (dalam kasus Ethereum, ether) dapat menjadi validator dengan mengirimkan jenis transaksi khusus yang mengunci ether mereka ke dalam setoran. Proses pembuatan dan persetujuan blok baru kemudian dilakukan melalui algoritme konsensus yang dapat diikuti oleh semua validator saat ini.

Ada banyak jenis algoritme konsensus, dan banyak cara untuk memberikan imbalan kepada validator yang berpartisipasi dalam algoritme konsensus tersebut, jadi ada banyak "nuansa" dari proof of stake. Dari perspektif algoritme, ada dua tipe utama: PoS berbasis rantai dan PoS yang bergaya [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Dalam **proof of stake berbasis rantai**, algoritme pseudo-acak memilih validator selama setiap slot waktu (misalnya setiap periode 10 detik bisa merupakan satu slot waktu), dan memberikan validator itu hak untuk membuat blok tunggal, dan blok ini harus mengarah ke beberapa blok sebelumnya (biasanya blok di ujung rantai terpanjang sebelumnya), dan seiring waktu sebagian besar blok menyatu menjadi rantai tunggal yang terus bertumbuh.

Dalam **proof of stake bergaya BFT**, validator **secara acak** diberikan hak untuk *mengusulkan* blok, tetapi *menyetujui blok mana yang kanonik* dilakukan melalui proses multi-putaran di mana setiap validator mengirimkan "suara" untuk beberapa blok tertentu selama setiap putaran, dan pada akhir proses semua validator (yang jujur dan online) secara permanen menyetujui apakah suatu blok tertentu adalah bagian dari rantai tersebut. Perhatikan bahwa blok-blok mungkin saja masih *dirantai bersama*; perbedaan utamanya adalah bahwa konsensus pada sebuah blok dapat datang dalam satu blok, dan tidak bergantung pada panjang atau ukuran rantai setelahnya.

Untuk informasi lebih lanjut, lihat [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Lihat juga:

* [Delegator](/docs/maintain/glossary#delegator)
* [Validator](/docs/maintain/glossary#validator)
