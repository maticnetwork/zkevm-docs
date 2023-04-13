---
id: consensus-mechanism
title: Mekanisme Konsensus
description: "PoW, PoS, DPoS, PoSpace, dan PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mekanisme Konsensus {#consensus-mechanism}

Mekanisme konsensus adalah mekanisme toleran kesalahan yang digunakan dalam sistem komputer dan blockchain untuk mencapai kesepakatan yang diperlukan pada nilai data tunggal atau state tunggal dari jaringan tersebut di antara berbagai proses yang disalurkan atau berbagai sistem multi-agen, seperti dengan mata uang kripto.

## Berbagai tipe Mekanisme Konsensus {#types-of-consensus-mechanism}

### Bukti dari Pekerjaan {#proof-of-work}
Proof of work mendeskripsikan suatu sistem yang membutuhkan jumlah usaha yang tidak signifikan tetapi memadai untuk mencegah serangan dos(denial-of-service) dan serangan berbahaya lainnya. Ini membutuhkan untuk memecahkan teka-teki komputasi yang menantang untuk membuat blok baru di Blockchain.

### Proof of Stake {#proof-of-stake}
Mekanisme Proof-of-Stake mencapai konsensus dengan mengharuskan pengguna untuk mempertaruhkan sejumlah token mereka sehingga memiliki kesempatan untuk dipilih untuk memvalidasi blok transaksi, dan mendapatkan upah untuk melakukannya. Prioritas diberikan kepada para penambang yang telah membeli stake terbanyak di sistem blockchain.

### Proof Stake {#delegated-proof-of-stake}
Bentuk konsensus ini mencerminkan pemilihan anggota dalam kelompok pimpinan. Alih-alih melakukan staking aset sendiri, pemangku kepentingan dapat mendelegasikan aktivitas ini ke pihak ketiga, saksi atau delegasi, yang akan mengambil bagian dalam proses konsensus. Saksi, mereka yang memvalidasi transaksi, biasanya menyajikan proposal, meminta suara dan dipilih oleh pemangku kepentingan. Penghargaan yang diperoleh oleh entitas tersebut biasanya dibagi dengan peserta jaringan.

### Bukti dari Space {#proof-of-space}
Jenis mekanisme konsensus ini berguna dalam aplikasi penyimpanan file desentralisasi seperti di Storj.io, Filecoin, dan Crust, di mana node membuktikan bahwa mereka memiliki kapasitas yang sah dalam perangkat keras mereka. Namun, alih-alih menggunakan komputasi berat seperti dalam mekanisme PoW, itu mempengaruhi kapasitas penyimpanan setiap node. Terkadang juga disebut sebagai PoStorage atau PoCapacity.

### Bukti dari Elapsed {#proof-of-elapsed-time}
Alternatif PoW yang lebih baik, menghabiskan sumber daya komputasi yang lebih rendah. Setiap node yang berpartisipasi harus menunggu untuk jumlah waktu dan node yang sangat pertama untuk bangun dari tidur mendapatkan kesempatan untuk membuat blok baru, yang kemudian disebarkan melalui network. Hal ini membutuhkan Trusted Executions (TEE ) seperti Intel SGX, yang merupakan bagian terisolasi dari memori dan hanya dapat diakses menggunakan satu set instruksi tertentu.

## **Sumber Daya**

- [Toleransi Fault Fault Bizantium](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Jenis Mekanisme Konsensus](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Overview dan History of Consensus Sistem Development](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Understanding Distributed Consensus](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Masalah Umum Bizantium](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)