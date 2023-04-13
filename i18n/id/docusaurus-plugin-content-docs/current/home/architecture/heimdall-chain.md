---
id: heimdall-chain
title: Apa itu Rantai Heimdall?
sidebar_label: Heimdall Chain
description: Bangun aplikasi blockchain berikutnya di Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Rantai Heimdall {#heimdall-chain}

Heimdall adalah lapisan Pemverifikasi Proof-of-Stake Polygon, yang bertanggung jawab untuk melakukan checkpointing pada representasi blok Plasma ke rantai utama dalam arsitektur kami. Kami telah mengimplementasikan ini dengan membangun di atas mesin konsensus Tendermint perubahan-perubahan pada skema tanda tangan dan berbagai struktur data.

Kontrak rantai utama Stake Manager bekerja bersamaan dengan node Heimdall untuk bertindak sebagai mekanisme manajemen saham yang tidak terpercaya untuk mesin PoS, termasuk memilih set validator, validator, dan lain-lain. Karena staking dilakukan pada kontrak pintar Ethereum, kita tidak hanya mengandalkan validator highton highton dan alih-alih mewarisi keamanan Ethereum untuk bagian kunci ini.

Lapisan Heimdall menangani agregasi blok yang dihasilkan oleh Bor ke dalam pohon Merkle dan menerbitkan root Merkle secara berkala ke rantai root. Penerbitan periodik ini disebut **"checkpoint"**. Untuk setiap beberapa blok di Bor, validator (pada lapisan Heimdall):

1. Memvalidasi semua blok sejak titik periksa terakhir
2. Membuat pohon merkle dari hash blok
3. Menerbitkan root merkle ke rantai utama

Titik periksa penting untuk dua alasan:

1. Menyediakan finalitas pada Rantai Root
2. Menyediakan proof of burn dalam penarikan aset

Gambaran umum dari proses ini dapat dijelaskan sebagai berikut:

- Sebagian validator aktif dari kelompok ini dipilih untuk bertindak sebagai produsen blok untuk suatu rentang. Pemilihan dari setiap rentang juga akan disetujui oleh sekurang-kurangnya 2/3 dari yang berkuasa. Produser blok ini bertanggung jawab untuk membuat blok dan menyiarkannya ke jaringan yang tersisa.
- Sebuah titik periksa mencakup root dari semua blok yang dibuat selama interval tertentu. Semua node memvalidasi dan melampirkan tanda tangan ke dalamnya.
- Sebuah proposal yang dipilih dari set validator bertanggung jawab untuk mengumpulkan semua tanda tangan untuk titik pemeriksaan tertentu dan melakukan hal yang sama pada rantai utama.
- Tanggung jawab untuk membuat blok dan juga mengusulkan titik periksa secara berubah-ubah tergantung pada rasio stake dari validator di kelompok secara keseluruhan.