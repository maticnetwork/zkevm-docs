---
id: archive-node-binaries
title: Menyiapkan Node Arsip dengan Biner
sidebar_label: Set up an Archive Node with Binaries
description: Menggunakan binari untuk mengatur node archive
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Untuk menyiapkan Node Arsip, Anda harus mengikuti proses yang sama untuk [<ins>menyebarkan node penuh dengan biner</ins>](/docs/develop/network-details/full-node-binaries). Namun, perlu perubahan konfigurasi kecil. Anda harus memasukkan parameter berikut di file `start.sh`:

```makefile
--gcmode 'archive'
```
