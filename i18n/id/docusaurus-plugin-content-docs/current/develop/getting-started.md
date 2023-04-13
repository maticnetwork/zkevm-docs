---
id: getting-started
title: Pengantar tentang Polygon PoS
sidebar_label: Quick Start
description: Bangun aplikasi blockchain selanjutnya di Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Memperbarui Dokumen Pengembangan

Dokumen sedang diperbarui, ditingkatkan, dan diperbaiki. Dokumen dapat berubah.
Silakan sampaikan masalah atau permintaan penggabungan kode jika Anda memiliki pertanyaan atau saran apa pun.

:::

Selamat datang di **Polygon (sebelumnya Matic Network)**! Platform yang paling inovatif dan menarik untuk mengembangkan aplikasi blockchain Anda. Teknologi blockchain siap merevolusi cara mengelola data dan melakukan bisnis di dunia digital. Anda dapat bergabung dalam revolusi ini dengan memanfaatkan keunggulan dari pengembangan aplikasi terdesentralisasi (dApp) milik Polygon.

Panduan ini akan memperkenalkan ekosistem Polygon kepada Anda. Anda akan menemukan tautan ke sumber daya dan situs web bermanfaat yang dapat mempercepat pembangunan, tidak hanya di Polygon, tetapi juga pengembangan aplikasi blockchain secara umum.

:::tip Terus ikuti kabar terbaru

Selalu pantau kabar builder terbaru dari tim dukungan
dan komunitas Polygon dengan berlangganan
[<ins>Kelompok pemberitahuan Polygon</ins>](https://polygon.technology/notifications/).

:::

## Fitur Penting di Polygon {#key-features-of-polygon}

- **Speed**: The Polygon Network menggunakan blockchain high-throughput dengan konsensus yang disediakan oleh sekelompok Block Producers yang dipilih oleh pemangku kepentingan di setiap titik pemeriksaan. Lapisan proof of stake digunakan untuk melakukan validasi blok dan secara berkala mengirimkan bukti Produsen Blok ke Ethereum mainnet. Ini akan memungkinkan tingkat konfirmasi blok yang cepat dalam waktu sekitar 2 detik sekaligus tetap menjaga desentralisasi dalam jumlah yang tinggi, sehingga throughput jaringan menjadi sangat baik.
- **Scalability**: Polygon Network mencapai kecepatan transaksi hipotetis kurang dari 2 detik pada satu sisi trainer. Dengan menggunakan beberapa rantai sisi, jaringan dapat menangani jutaan transaksi per detik. Mekanisme ini (sudah ditunjukkan di rantai sisi Matic pertama) akan memungkinkan jaringan Polygon untuk meningkat dengan mudah.
- **Keamanan**: Kontrak cerdas Polygon, bergantung pada keamanan Ethereum. Untuk mengamankan jaringan, kontrak menggunakan tiga model keamanan kritis. Yaitu **kontrak manajemen staking** Ethereum dan sekelompok validator berinsentif yang menjalankan node **Heimdall** dan **Bor**. Pengembang juga dapat menerapkan kedua model itu (Hibrida) pada dApp mereka.

## Membangun di Polygon {#building-on-polygon}

Jika Anda adalah pengembang Ethereum, maka Anda sudah menjadi pengembang Polygon. Cukup beralih ke [Polygon RPC](https://polygon-rpc.com/) dan memulai. Semua alat yang Anda kenal di blockchain Ethereum secara default didukung di Polygon, seperti Truffle, Remix, dan Web3js.

Anda dapat menyebarkan aplikasi terdesentralisasi ke Testnet Polygon Mumbai atau Mainnet. Testnet Polygon Mumbai terhubung dengan Testnet Goërli Ethereum yang bertindak sebagai ParentChain. Anda dapat menemukan semua perincian terkait jaringan dalam [dokumentasi jaringan](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md).

### Dompet {#wallets}

Untuk berinteraksi dengan Jaringan Polygon, Anda harus memiliki dompet berbasis Ethereum, karena Polygon menjalankan Mesin Virtual Ethereum (EVM). Anda dapat memilih untuk menyiapkan Dompet [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) atau [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md). Lebih banyak informasi terkait dompet dan mengapa Anda perlu seseorang dapat ditemukan dalam [dokumentasi dompet](https://docs.polygon.technology/docs/develop/wallets/getting-started).

### Kontrak Cerdas {#smart-contracts}

Polygon mendukung banyak layanan yang dapat Anda gunakan untuk melakukan tes, mengompilasi, melakukan debug, dan menyebarkan aplikasi terdesentralisasi ke Jaringan Polygon. Ini mencakup penyebaran menggunakan [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md), dan [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Terhubung ke Polygon {#connecting-to-polygon}

Anda dapat menambahkan Polygon ke Metamask atau menggunakan Arkane secara langsung yang memungkinkan Anda terhubung ke Polygon menggunakan [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/).

Untuk menghubungkan dengan jaringan Polygon untuk membaca informasi blockchain dan menyarankan penggunaan SDK.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Membangun dApp baru di Polygon {#building-a-new-dapp-on-polygon}

Aplikasi terdesentralisasi (dApp) bertindak sebagai jembatan antara pengguna dan privasi data mereka di blockchain. Makin banyak jumlah dApp yang membuktikan betapa bermanfaatnya dApp dalam ekosistem blockchain, memecahkan tantangan seperti mengeksekusi transaksi antara dua peserta tanpa memerlukan otoritas pusat melalui kontrak cerdas.

Anggaplah Anda tidak memiliki pengalaman sebelumnya dalam membangun aplikasi terdesentralisasi (dApp). Dalam keadaan seperti itu, sumber daya yang disebutkan di bawah ini akan memberikan keunggulan ketika memulai dengan alat-alat yang diperlukan untuk membangun, melakukan debug, dan menyebarkan dApp di Jaringan Polygon.

- [dApp Tumpukan Penuh: Seri Tutorial](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Mengembangkan dApp menggunakan Fauna, Polygon, dan React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Sudah memiliki dApp? {#already-have-a-dapp}

Jika Anda sudah memiliki aplikasi terdesentralisasi (dApp) dan mencari platform untuk membantu melakukan penskalaan secara efisien, maka Anda berada di tempat yang tepat karena Polygon memungkinkan Anda untuk:

1. **Melakukan migrasi dengan mudah dari rantai berbasis Mesin Virtual Ethereum (EVM)**: Polygon dengan bangga menjadi solusi penskalaan Lapisan-2 paling tinggi untuk Ethereum. Anda tidak perlu khawatir tentang arsitektur yang mendasari saat memindahkan atau menyebarkan dApp ke Jaringan Polygon selama dApp kompatibel dengan EVM.
2. **Gunakan Polygon sebagai lapisan transaksi yang lebih cepat**: Menyebarkan dApp ke Mainnet Polygon memungkinkan Anda untuk memanfaatkan Polygon sebagai lapisan transaksi yang lebih cepat untuk dApp. Selain itu, kami bisa memetakan token Anda. Anda dapat bergabung dengan [kelompok diskusi teknis](http://bit.ly/matic-technical-group) kami di Telegram untuk mempelajari lebih lanjut.

## Catatan Samping {#side-note}

Jika ini terlalu sulit, tidak apa-apa! Anda bisa langsung beraksi dan mulai beraksi. Berikut adalah beberapa catatan sebelum Anda mulai menyelami ke sumber daya, repositori, dan dokumen:

1. **Waspadalah terhadap biaya produk atau layanan yang tidak menentu**: Seperti pemrograman umum, pengembangan dApp dan blockchain bergerak dengan sangat cepat. Ketika melakukan penelitian, Anda mungkin menemukan repositori kode yang kompleks, kode kesalahan 404 di situs dokumentasi, atau bahkan tanpa dokumentasi. Gunakan kesempatan itu untuk menghubungi kami melalui saluran media sosial.
2. **Kurva pembelajaran tersebut mungkin menakutkan, tetapi kendala masuknya rendah**: Komunitas ini sangat terbuka dan ramah! Proyek menyambut permintaan penggabungan kode dari pihak luar dan menyelesaikan semua penghalang secara aktif. Kami sedang berusaha menciptakan dunia yang lebih baik dan menghargai kontribusi dalam bentuk apa pun. Kami akan sangat senang untuk menggabungkan Anda ke ekosistem web3 yang menakjubkan ini.

:::info Ikuti Terus Informasinya

Pengembangan aplikasi terdesentralisasi mendorong desentralisasi jaringan. Ikuti media sosial kami untuk mendapatkan lebih banyak wawasan dan kabar terbaru tentang ekosistem Polygon. Anda dapat menemukan tautan ke semua komunitas Polygon [di sini](https://polygon.technology/community/).

:::
