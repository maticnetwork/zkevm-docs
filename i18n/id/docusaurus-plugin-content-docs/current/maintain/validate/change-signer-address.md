---
id: change-signer-address
title: Mengubah Alamat Penandatangan
description: Mengubah alamat penandatangan validator
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Untuk informasi tentang apa itu [alamat penandatangan](/docs/maintain/glossary.md#signer-address), lihat
[Manajemen Kunci](/docs/maintain/validator/core-components/key-management).

## Prasyarat {#prerequisites}

Pastikan node validator baru Anda sepenuhnya disinkronkan dan berjalan dengan alamat penandatangan baru.

## Mengubah alamat penandatangan {#change-the-signer-address}

Panduan ini mengacu pada node validator sebagai Node 1 dan node validator baru sebagai Node 2.

1. Masuk ke [dashboard staking](https://staking.polygon.technology/) dengan alamat 1.
2. Di profil Anda, klik **Edit Profil**.
3. Di bidang **Alamat penandatangan**, masukkan alamat Node 2.
4. Di bidang **Kunci publik penandatangan**, masukkan kunci publik Node 2.

   Untuk mendapatkan kunci publik, jalankan perintah berikut di node validator:

   ```sh
   heimdalld show-account
   ```

Klik **Simpan** untuk menyimpan detail baru node Anda. Pada dasarnya, ini berarti bahwa Node 1 akan menjadi alamat Anda yang mengontrol stake, di mana imbalannya akan dikirim ke alamat tersebut, dll. Node 2 sekarang akan melakukan aktivitas seperti menandatangani blok, menandatangani titik periksa, dll.
