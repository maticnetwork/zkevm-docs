---
id: ether
title: Panduan Penyetoran dan Penarikan Ether
sidebar_label: Ether
description:  "Fungsi yang tersedia untuk kontrak Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Aliran Tingkat Tinggi {#high-level-flow}

Penyetoran Ether -

- Lakukan panggilan depositEtherFor di **RootChainManager** dan kirim aset ether.

Penarikan Ether -

1. **_Bakar_** token di rantai Polygon.
2. Panggil fungsi **_exit_** di **_RootChainManager_** untuk mengirimkan bukti transaksi bakar. Panggilan ini dapat dilakukan **_setelah titik periksa_** dikirimkan untuk blok yang memiliki transaksi bakar.

## Perincian Langkah {#step-details}

### Melakukan instansiasi kontrak {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### deposit {#deposit}
Panggil `depositEtherFor`fungsi `RootChainManager`kontrak. Fungsi ini membutuhkan 1 argumen `userAddress`- yang merupakan alamat dari pengguna yang akan menerima deposit pada rantai Polygon. Jumlah eter yang harus disimpan harus dikirim sebagai nilai transaksi.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Bakar {#burn}
Karena Eher adalah tanda ERC20 pada rantai Polygon, proses penarikan sama dengan penarikan ERC20. Token dapat dibakar dengan memanggil `withdraw`fungsi pada kontrak token anak. Fungsi ini membutuhkan argumen tunggal, `amount`menunjukkan jumlah token yang akan dibakar. Bukti bakar ini harus dikirimkan pada langkah keluar. Jadi, simpanlah hash transaksinya.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
Fungsi keluar pada `RootChainManager`kontrak harus dipanggil untuk membuka kunci dan menerima token kembali dari .`EtherPredicate` Fungsi ini memerlukan argumen byte tunggal yang membuktikan transaksi bakar. Tunggu titik pemeriksaan yang berisi transaksi bakar yang akan diajukan sebelum memanggil fungsi ini. Proof dihasilkan oleh RLP yang mengkodekan bidang berikut:

1. headerNumber - Nomor blok header titik periksa yang mengandung bakar tx
2. blockProof - Bukti yang memblokir header (dalam rantai anak) adalah leaf dalam root merkle yang dikirimkan
3. blockNumber - Nomor blok yang mengandung bakar tx pada rantai anak
4. blockTime - Waktu blokir bakar tx
5. txRoot - Root transaksi blok
6. receiptRoot - Root penerimaan blok
7. receipt - Tanda terima transaksi bakar
8. receiptProof - Bukti Merkle dari penerimaan bakar
9. branchMask - 32 bit yang menunjukkan jalur penerimaan dalam merkle patricia tree
10. receiptLogIndex - Indeks Log yang akan dibaca dari penerimaan

Menghasilkan bukti secara manual dapat menyulitkan, maka sebaiknya gunakan Polygon Edge. Jika ingin mengirim transaksi secara manual, Anda dapat memberikan **_encodeAbi_** sebagai **_true_** dalam objek opsi untuk mendapatkan data panggilan mentah.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Kirim data panggilan ini ke **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
