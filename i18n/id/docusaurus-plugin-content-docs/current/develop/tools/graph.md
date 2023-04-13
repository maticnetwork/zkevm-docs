---
id: graph
title: Menyiapkan proyek yang dihos dengan The Graph dan Polygon
description: Pelajari cara mengatur proyek yang dihos oleh The Graph dan Polygon.
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph, suatu protokol terdesentralisasi untuk pengindeksan dan melakukan kueri data rantai, mendukung rantai Polygon. Data yang didefinisikan melalui subgraph mudah dilakukan kueri dan dijelajahi. Subgraph dapat dibuat secara lokal atau menggunakan penjelajah yang dihos gratis untuk pengindeksan dan tampilan data.

> Catatan: Lihat https://thegraph.com/docs/quick-start untuk perincian lebih lanjut, instalasi lokal, dan banyak lagi. Dokumen ini mencakup contoh untuk mempelajari cara kerja subgraph dan video ini merupakan pengantar yang bagus.

## Langkah-Langkah {#steps}

1. Kunjungi Graph Explorer (https://thegraph.com/explorer) dan buat akun. Anda akan memerlukan akun GitHub untuk autentikasi.

2. Buka dashboard dan klik Add Subgraph. Isi Nama, Akun, dan Subjudul subgraph Anda, lalu perbarui gambar serta info lainnya (Anda dapat memperbaruinya nanti) jika diinginkan.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Instal Graph CLI di komputer Anda (menggunakan npm atau yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Perintah berikut membuat subgraph yang mengindeks semua peristiwa dari kontrak yang ada. Perintah ini mencoba mengambil ABI kontrak dari BlockScout dan kembali untuk meminta jalur file lokal. Jika ada argumen opsional yang hilang, Anda akan diarahkan ke formulir interaktif.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Catatan: Detail lebih lanjut di sini: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Autentikasi dengan layanan yang dihos

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Anda dapat menemukan token akses dengan pergi ke dashboard di situs web The Graph.

6. cd ke direktori yang Anda buat dan mulai definisikan subgraph. Informasi tentang pembuatan subgraph tersedia di Dokumen The Graph di sini. https://thegraph.com/docs/define-a-subgraphsubgrafik

7. Ketika Anda siap, sebarkan subgraph. Anda selalu dapat menguji dan menyebar ulang jika diperlukan.

> Jika subgraph yang sebelumnya disebarkan masih dalam status Syncing, ini akan segera digantikan dengan versi yang baru disebarkan. Jika subgraph yang sebelumnya disebarkan sudah sepenuhnya tersinkronisasi, Graph Node akan menandai versi yang baru disebarkan sebagai Pending Version, sinkronkan ini di latar belakang dan hanya ganti versi yang sedang disebarkan dengan versi baru setelah penyinkronan versi baru selesai. Ini memastikan subgraph yang bekerja dengannya saat versi baru melakukan sinkronisasi.

```bash
yarn deploy
```

Subgraph akan disebarkan dan dapat diakses dari dashboard Anda.

Anda dapat belajar tentang melakukan kueri subgraph di sini: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Jika ingin membuat subgraph menjadi publik, Anda dapat melakukannya dengan mengakses subgraph dari dashboard dan mengklik tombol edit. Anda akan melihat penggeser di bagian bawah halaman edit.
