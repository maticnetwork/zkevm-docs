---
id: adding-a-custom-token
title: Menambah Token Kustom
sidebar_label: Adding a Custom Token
description: Bangun aplikasi blockchain Anda selanjutnya di Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Fitur **Tambah Token Kustom** memungkinkan Anda menambah token apa pun secara eksplisit dan menggunakannya dengan Polygon Wallet Suite. Anda hanya perlu mencari token itu dengan alamat kontraknya, baik root atau child:

* **Root** adalah kontrak token di Ethereum
* **child** adalah kontrak di Polygon

### Bagaimana menemukan kontrak token? {#how-do-i-find-the-token-contract}

Anda bisa mencari token itu dengan namanya baik di [Coingecko](http://coingecko.com) atau [Coinmarketcap](https://coinmarketcap.com/) tempat Anda dapat melihat alamatnya di rantai Ethereum (untuk token ERC 20) dan rantai berurutan yang didukung lainnya seperti Polygon. Alamat token di rantai lain mungkin belum diperbarui tetapi Anda tentunya dapat menggunakan alamat root untuk semua tujuan.

Jadi, saat memilih token, Anda dapat mencarinya menurut:
* simbol token
* nama token
* kontrak

Berikut ini cara kerjanya:

1. Dengan mudah tambahkan token apa pun ke daftar Anda dengan menambahkan alamat kontrak sebagai token kustom (kami mendukung

alamat kontrak di Polygon atau Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Setelah informasi token diambil, Anda akan melihat layar konfirmasi yang berisi semua informasi token itu. Anda kemudian dapat menambahkannya sebagai token kustom yang akan disimpan secara lokal di sistem Anda, kami menyarankan Anda memverifikasi ulang kontrak token itu dua kali karena ada banyak klona atau token penipuan:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Token yang Anda tambahkan sekarang diperlihatkan ketika akan memilih token:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Anda juga dapat menambahkan tanda langsung dari tab token dari layar **Aturan:**

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>