---
id: archive-node-ansible
title: Menyiapkan Node Arsip dengan Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Menggunakan Ansible untuk mengatur node archive
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Untuk mengatur Node Archive, Anda harus mengikuti proses yang sama untuk [<ins>penyebaran node yang penuh menggunakan Ansible</ins>](/docs/develop/network-details/full-node-deployment). Namun, perlu perubahan konfigurasi kecil. Anda harus memasukkan parameter berikut dalam `start.sh`file:

```makefile
--gcmode 'archive'
```
