---
id: what-is-proof-of-stake
title: Apa itu Proof of Stake?
description: Belajar apa yang disebut Proof of of Stake konsensus
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

# Apa itu Proof of Stake? {#what-is-proof-of-stake}

Proof of Stake (PoS) adalah kategori algoritme konsensus untuk blockchain publik yang bergantung pada [stake](/docs/maintain/glossary.md#staking) ekonomi validator dalam jaringan.

Dalam blockchain publik berbasis proof of work (PoW), algoritme memberi imbalan kepada peserta yang memecahkan teka-teki kriptografi untuk memvalidasi transaksi dan membuat blok baru. Contoh: Bitcoin, Ethereum (sebelum merge).

Dalam blockchain publik berbasis PoS, sekumpulan validator bergantian mengusulkan dan memberikan suara pada blok berikutnya. Bobot suara tiap validator tergantung pada jumlah setorannya — [stake](/docs/maintain/glossary.md#staking). Keuntungan signifikan dari PoS termasuk keamanan, pengurangan risiko sentralisasi, dan efisiensi energi. Contoh: Ethereum 2.0, Polygon.

Secara umum, algoritme PoS terlihat sebagai berikut. blockchain melacak satu set validator, dan siapa pun yang memegang basis cryptocurrency (dalam kasus Ethereum, ETH) dapat menjadi validator dengan mengirim jenis transaksi yang mengunci ETH ke dalam deposit. Proses pembuatan dan persetujuan blok baru kemudian dilakukan melalui algoritme konsensus yang dapat diikuti oleh semua validator saat ini.

Ada banyak jenis algoritme konsensus, dan banyak cara untuk memberikan imbalan kepada validator yang berpartisipasi dalam algoritme konsensus tersebut, jadi ada banyak "nuansa" dari proof of stake. Dari perspektif algoritmik, ada dua jenis utama: PoS berbasis rantai dan [PoS bergaya BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Dalam **proof of stake berbasis rantai**, algoritme pseudo-acak memilih validator selama setiap slot waktu (misalnya setiap periode 10 detik bisa merupakan satu slot waktu), dan memberikan validator itu hak untuk membuat blok tunggal, dan blok ini harus mengarah ke beberapa blok sebelumnya (biasanya blok di ujung rantai terpanjang sebelumnya), dan seiring waktu sebagian besar blok menyatu menjadi rantai tunggal yang terus bertumbuh.

Dalam **Proof of Stake bergaya BFT**, validator secara **acak** ditugaskan hak untuk **mengusulkan** blok. Agreement on the block **is** dilakukan melalui proses multi-round di mana setiap validator mengirimkan **Vote** untuk beberapa blok tertentu selama setiap bulannya, dan pada akhir proses, validator secara permanen setuju tentang apakah blok yang diberikan adalah bagian dari rantai. Perhatikan bahwa blok mungkin masih **dirantai bersama**. Perbedaan utama adalah bahwa konsensus pada sebuah blok dapat datang dalam satu blok, dan tidak bergantung pada panjang atau ukuran rantai setelah itu.

Untuk rincian lebih lanjut, merujuk ke [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

## Lihat juga {#see-also}

* [Delegator](/docs/maintain/glossary.md#delegator)
* [Validator](/docs/maintain/glossary.md#validator)
