---
id: api-architecture
title: Arsitektur API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: API Baca dan Tulis serta pengaturan transaksi.
---

Pustaka mengikuti arsitektur api umum secara menyeluruh dan API dibagi menjadi dua jenis -

1. API Baca
2. API Tulis

## API Baca {#read-api}

API Baca tidak menerbitkan apa pun di blockchain, sehingga ini tidak mengonsumsi gas apa pun. Contoh API baca adalah - `getBalance`, `isWithdrawExited`, dll.

Mari kita lihat contoh API baca -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

API baca sangat sederhana dan memberikan hasil secara langsung.

## 2. API Tulis {#2-write-api}

API Tulis menerbitkan beberapa data di blockchain, sehingga ini mengonsumsi gas. Contoh API tulis adalah - `approve`, `deposit`, dll.

Ketika memanggil API tulis - Anda perlu dua data dari hasilnya.

1. TransactionHash
2. TransactionReceipt

Mari kita lihat contoh API tulis dan mendapatkan transactionhash serta tanda terima -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Opsi transaksi {#transaction-option}

Ada beberapa opsi yang dapat dikonfigurasi dan tersedia untuk semua API ini. Konfigurasi ini dapat diteruskan dalam parameter.

Konfigurasi yang tersedia adalah -

- from?: string | number - Alamat asal transaksi.
- to?: string - Alamat tujuan transaksi yang dibuat.
- value?: number | string | BN - Nilai yang ditransfer untuk transaksi dalam wei.
- gasLimit?: number | string - Gas maksimum yang disediakan untuk transaksi (batas gas).
- gasPrice?: number | string | BN - Harga gas dalam wei untuk transaksi.
- data?: string - Kode byte dari kontrak..
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - memastikan ini benar akan menampilkan objek transaksi yang dapat digunakan untuk mengirim transaksi secara manual.

Mari kita lihat contoh dengan mengonfigurasi gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
