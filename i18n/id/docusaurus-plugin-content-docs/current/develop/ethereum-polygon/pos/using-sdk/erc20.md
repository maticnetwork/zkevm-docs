---
id: erc20
title: Panduan Penyetoran dan Penarikan ERC20
sidebar_label: ERC20
description: "Token penyetoran dan penarikan ERC20 pada jaringan Polygon."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Lihat [Dokumentasi Matic.js terbaru tentang ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

Tutorial ini menggunakan Testnet Polygon (Mumbai) yang dipetakan ke Jaringan Goerli untuk memeragakan transfer aset ke dan dari dua blockchain. Satu **hal penting yang perlu diperhatikan** saat mengikuti tutorial ini adalah Anda harus selalu menggunakan alamat Proxy bila tersedia. Misalnya, alamat **RootChainManagerProxy** harus digunakan untuk interaksi dan bukan alamat **RootChainManager.** **Alamat kontrak PoS, ABI, Alamat Token Tes**, dan perincian penyebaran lainnya dari kontrak jembatan PoS dapat dilihat [di sini](/docs/develop/ethereum-polygon/pos/deployment).

**Pemetaan aset** perlu dilakukan untuk mengintegrasikan jembatan PoS pada aplikasi. Anda dapat mengirim permintaan pemetaan [di sini](/docs/develop/ethereum-polygon/submit-mapping-request). Namun untuk tujuan tutorial ini, kami telah mengerahkan **token Uji** dan memetakan mereka di jembatan PoS. Anda mungkin membutuhkannya untuk mencoba tutorial. Anda dapat meminta Aset yang diinginkan dari [faucet](https://faucet.polygon.technology/). Jika token uji tidak tersedia di faucet, lakukan ke kami di [diskord](https://discord.com/invite/0xPolygonn).

Dalam tutorial berikut ini, setiap langkah akan dijelaskan secara terperinci serta sedikit cuplikan kode. Namun, Anda selalu dapat merujuk ke [repositori](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) ini yang memiliki semua **kode sumber contoh** yang dapat membantu Anda mengintegrasi dan memahami cara kerja jembatan PoS.

## Aliran Tingkat Tinggi {#high-level-flow}

Penyetoran ERC20 -

1. **_Setujui_** kontrak **_ERC20Predicate_** untuk membelanjakan token yang harus disetorkan.
2. Panggil **_depositFor_** di **_RootChainManager_**.

Penarikan ERC20 -

1. Burn token pada rantai Polygon.
2. Panggil `exit()`fungsi `RootChainManager`untuk mengajukan bukti transaksi burn. Panggilan ini dapat dibuat setelah titik pemeriksaan diajukan untuk blok yang berisi transaksi burn.

## Detail langkah {#steps-details}

### Setujui {#approve}

Ini adalah persetujuan ERC20 yang normal sehingga **_ERC20Predicate_** dapat melakukan panggilan fungsi **_transferFrom_**. Klien Polygon POS mengekspos metode **_approve_** untuk melakukan panggilan ini.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### deposit {#deposit}

Perlu diperhatikan bahwa tanda harus dipetakan dan disetujui untuk transfer sebelumnya. Klien Polygon PoS mengekspos `deposit()`metode untuk membuat panggilan ini.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Deposit dari Ethereum ke Polygon terjadi dengan menggunakan mekanisme **Sinkronisasi** dan memakan waktu sekitar 22-30 menit. Setelah menunggu interval waktu ini, dianjurkan untuk memeriksa keseimbangan menggunakan perpustakaan web3.js/matic.js atau menggunakan Metamask. Penjelajah akan menampilkan saldo hanya bila ada paling tidak satu transfer aset pada rantai anak. [<ins>Hubungan</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) ini menjelaskan bagaimana untuk melacak peristiwa deposit.
:::

### Metode WithdrawStart untuk Pembakaran {#withdrawstart-method-to-burn}

`withdrawStart()`Metode ini dapat digunakan untuk memulai proses penarikan yang akan membakar jumlah yang ditentukan pada rantai Polygon.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Simpan hash transaksi untuk panggilan ini dan gunakan saat membuat bukti bakar.

### Exit {#exit}

Setelah titik pemeriksaan telah diajukan untuk blok yang berisi transaksi burn, pengguna harus memanggil `exit()`fungsi `RootChainManager`kontrak dan mengirimkan bukti burn. Setelah mengajukan bukti yang valid, token ditransfer ke pengguna. Klien Polygon PoS mengekspos `withdrawExit`metode untuk membuat panggilan ini. Fungsi ini dapat digunakan hanya setelah titik periksa disertakan dalam rantai utama. Inklusi titik pemeriksaan dapat dilacak dengan mengikuti [panduan ini](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

Metode *withdrawExit* dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode *withdrawStart*.

:::note
Transaksi Mulai harus diperiksa untuk keluar dari penarik.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
