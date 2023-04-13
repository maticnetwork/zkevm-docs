---
id: eth
title: Panduan Penyetiran dan Penarikan ETH
sidebar_label: ETH
description: "Penyetoran dan penarikan token ETH pada jaringan Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Lihat [dokumentasi Matic.js terbaru tentang ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Ringkasan Singkat {#quick-summary}

Bagian dokumen ini membahas tentang cara melakukan penyetoran dan penarikan token ERC20 di jaringan Polygon. Fungsi-fungsi umum ada di antara bagian dokumentasi ETH, ERC20, ERC721, dan ERC1155 dengan perbedaan dalam pola penamaan dan implementasi sesuai dengan standar. Prasyarat terpenting untuk menggunakan bagian dokumen ini adalah memetakan aset, jadi, silakan kirim permintaan pemetaan Anda [di sini](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Pengantar {#introduction}

Panduan ini menggunakan Testnet Polygon (Mumbai) yang memetakan dirinya sendiri ke Jaringan Goerli untuk menunjukkan transfer aset antara dua blockchain. Perhatikan bahwa untuk tutorial ini, Anda harus menggunakan alamat proxy kapan pun memungkinkan. Ini karena ketika alamat kontrak implementasi harus mengalami perubahan ketika ada pemutakhiran baru yang ditambahkan ke kode kontrak, alamat proxy tidak pernah berubah dan akan mengarahkan semua panggilan masuk ke implementasi terbaru. Pada dasarnya, jika menggunakan alamat proxy, Anda tidak perlu mengkhawatirkan perubahan apa pun yang terjadi pada kontrak implementasi sebelum Anda siap.

Misalnya, tolong gunakan `RootChainManagerProxy`alamat untuk interaksi dan bukan `RootChainManager`alamat. Detail Deployment seperti alamat kontrak PoS, ABI, dan Alamat Token dapat ditemukan [di sini](/docs/develop/ethereum-polygon/pos/deployment/).

Pemetaan aset menjadi langkah yang perlu dilakukan untuk mengintegrasikan jembatan PoS pada aplikasi sehingga jika Anda belum melakukannya, silakan kirim permintaan pemetaan [di sini](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Untuk tutorial ini, tim dukungan telah menerapkan token tes dan memetakannya ke jembatan PoS. Minta aset yang ingin Anda gunakan pada [faucet](https://faucet.polygon.technology/) dan jika token tes tidak tersedia, hubungi tim dukungan di [Discord](https://discord.com/invite/0xPolygon). Kami pasti akan membalas secepatnya.

Dalam tutorial berikut ini, setiap langkah akan dijelaskan secara terperinci serta sedikit cuplikan kode. Namun, Anda selalu dapat merujuk ke [repositori](https://github.com/maticnetwork/matic.js/tree/master/examples) ini yang memiliki semua **kode sumber contoh** yang dapat membantu Anda mengintegrasi dan memahami cara kerja jembatan PoS.

## Aliran Tingkat Tinggi {#high-level-flow}

Penyetoran ETH -

1. Buat panggilan **_depositEtherFor_** di **_RootChainManager_** dan **kirim** ether yang diperlukan.

Penarikan ETH -

1. **_Bakar_** token di rantai Polygon.
2. Panggil fungsi **_exit_** di **_RootChainManager_** untuk mengirimkan bukti transaksi bakar. Panggilan ini dapat dilakukan **_setelah titik periksa_** dikirimkan untuk blok yang memiliki transaksi bakar.

## Langkah-Langkah {#steps}

### Penyetoran {#deposit}

ETH dapat disetorkan ke rantai Polygon dengan memanggil **depositEtherFor** pada kontrak **RootChainManager**. Klien Polygon PoS mengekspos metode **depositEther** untuk melakukan panggilan ini.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Deposit dari Ethereum ke Polygon terjadi menggunakan Mekanisme **Sinkronisasi** dan ini membutuhkan waktu sekitar 22-30 menit. Setelah menunggu interval waktu ini, dianjurkan untuk memeriksa keseimbangan menggunakan perpustakaan web3.js/matic.js atau menggunakan Metamask. Penjelajah akan menampilkan saldo hanya bila ada paling tidak satu transfer aset pada rantai anak. [<ins>Hubungan</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) ini menjelaskan bagaimana untuk melacak peristiwa deposit.
:::

### Bakar {#burn}

ETH disimpan sebagai tanda ERC20 pada rantai Polygon. With drawing mengikuti proses yang sama seperti penarikan token ERC20.

Untuk membakar token dan melakukan proses penarikan , panggil fungsi menarik kontrak MaticWETH. Karena Eher adalah tanda ERC20 pada rantai Polygon, Anda perlu memulai token **ERC20** dari klien Polygon PoS dan kemudian memanggil `withdrawStart()`metode untuk memulai proses pembakaran.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Simpan hash transaksi untuk panggilan ini dan gunakan saat membuat bukti bakar.

### Exit {#exit}


Setelah **titik pemeriksaan** telah diajukan untuk blok yang berisi transaksi burn, pengguna harus memanggil fungsi **keluar** `RootChainManager`kontrak dan mengajukan bukti burn. Setelah mengirimkan bukti yang valid, token akan ditransfer ke pengguna. Klien Polygon POS `erc20` mengekspos metode `withdrawExit` untuk melakukan panggilan ini. Fungsi ini dapat digunakan hanya setelah titik periksa disertakan dalam rantai utama. Penyertaan titik periksa ini dapat dilacak dengan mengikuti [panduan](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) ini.


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
