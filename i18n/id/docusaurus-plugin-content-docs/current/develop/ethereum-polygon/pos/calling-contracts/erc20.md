---
id: erc20
title: Panduan Penyetoran dan Penarikan ERC20
sidebar_label: ERC20
description: "Fungsi yang tersedia untuk kontrak ERC20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Aliran Tingkat Tinggi {#high-level-flow}

Penyetoran ERC20 -

1. **_Setujui_** kontrak **_ERC20Predicate_** untuk membelanjakan token yang harus disetorkan.
2. Lakukan panggilan **_depositFor_** di **_RootChainManager_**.

Penarikan ERC20 -

1. **_Bakar_** token di rantai Polygon.
2. Panggil fungsi **_exit_** di **_RootChainManager_** untuk mengirimkan bukti transaksi bakar. Panggilan ini dapat dilakukan **_setelah titik periksa_** dikirimkan untuk blok yang memiliki transaksi bakar.

## Perincian Pengaturan {#setup-details}

### Lakukan instansiasi kontrak {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Setujui {#approve}
Setujui **_ERC20Predicate_** untuk membelanjakan token dengan memanggil fungsi **_approve_** kontrak token. Fungsi ini memerlukan dua argumen, yaitu spender dan amount. **_spender_** adalah alamat yang disetujui untuk membelanjakan token pengguna. **_amount_** adalah jumlah token yang dapat dibelanjakan. Biarkan jumlah setara dengan jumlah setoran untuk satu kali persetujuan atau berikan jumlah yang lebih besar agar tidak perlu memberikan persetujuan berkali-kali.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Penyetoran {#deposit}
Perhatikan bahwa token harus dipetakan dan jumlah harus disetujui untuk penyetoran sebelum melakukan panggilan ini.  
Panggil `depositFor()`fungsi `RootChainManager`kontrak. Fungsi ini membutuhkan 3 argumen: `userAddress``rootToken`, dan `depositData``userAddress`. adalah alamat dari pengguna yang akan menerima deposit pada rantai Polygon. `rootToken`adalah alamat tanda pada rantai utama. `depositData`adalah jumlah yang dikodekan.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Bakar {#burn}
Token dapat dikurangi di rantai Polygon dengan memanggil fungsi **_withdraw_** pada kontrak token anak. Fungsi ini memerlukan argumen tunggal, yaitu **_amount_** yang menunjukkan jumlah token yang akan dibakar. Bukti bakar ini harus dikirimkan pada langkah keluar. Jadi, simpanlah hash transaksinya.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
Fungsi keluar pada `RootChainManager`kontrak harus dipanggil untuk membuka kunci dan menerima token kembali dari .`ERC20Predicate` Fungsi ini memerlukan argumen byte tunggal yang membuktikan transaksi bakar. Tunggu titik pemeriksaan yang berisi transaksi bakar yang akan diajukan sebelum memanggil fungsi ini. Proof dihasilkan oleh pengkodean RLP berikut--

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
