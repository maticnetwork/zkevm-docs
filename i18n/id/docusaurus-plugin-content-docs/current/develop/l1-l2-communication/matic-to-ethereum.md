---
id: matic-to-ethereum
title: Transfer data dari Polygon ke Ethereum
description: Transfer kondisi atau data dari Polygon ke Ethereum melalui Kontrak
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mekanisme untuk mentransfer data dari Polygon ke Ethereum sedikit berbeda dari melakukan transfer data dari Ethereum ke Polygon. Transaksi **titik periksa** yang dibuat oleh Validator di rantai Ethereum digunakan untuk melaksanakan hal ini. Pada dasarnya, transaksi awalnya dibuat di Polygon. Saat membuat transaksi ini, harus dipastikan bahwa **acara dikeluarkan** dan **log acara memuat data yang ingin kita transfer** dari Polygon ke Ethereum.

Dalam periode waktu (sekitar 10-30 menit), transaksi ini adalah check-point pada rantai Ethereum oleh validator. Setelah pemeriksaan di titik periksa selesai, hash transaksi yang dibuat di rantai Polygon dapat dikirimkan sebagai bukti kontrak **RootChainManager** di rantai Ethereum. Kontrak ini, memvalidasi transaksi, memverifikasi bahwa transaksi ini dimasukkan di titik periksa dan terakhir, melakukan decode log peristiwa dari transaksi ini.

Setelah fase ini berakhir, kita dapat menggunakan **data log peristiwa yang sudah diuraikan untuk melakukan perubahan** di kontrak root yang disebarkan di rantai Ethereum. Untuk ini, kita juga perlu memastikan bahwa perubahan kondisi di Ethereum hanya dilakukan dengan cara aman. Oleh karena itu, kita menggunakan kontrak **Predicate** yang merupakan jenis kontrak khusus yang hanya dapat dipicu oleh kontrak **RootChainManager**. Arsitektur ini memastikan perubahan kondisi di Ethereum terjadi hanya ketika transaksi di Polygon diperiksa dan diverifikasi di rantai Ethereum oleh kontrak **RootChainManager**.

# Ikhtisar {#overview}

- Sebuah transaksi dieksekusi di kontrak anak yang disebarkan di rantai Polygon.
- Peristiwa juga dikeluarkan dalam transaksi ini. Parameter **peristiwa ini termasuk data yang harus ditransfer** dari Polygon ke Ethereum.
- Validator di jaringan Polygon mengambil transaksi ini dalam interval waktu tertentu (mungkin 10-30 menit), memvalidasinya dan **menambahkannya ke titik periksa** di Ethereum.
- Sebuah transaksi titik periksa dibuat di kontrak **RootChain** dan penyertaan titik periksa dapat diperiksa dengan menggunakan [skrip](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) ini
- Setelah penambahan titik periksa selesai, pustaka **matic.js** dapat digunakan untuk memanggil fungsi **exit** kontrak **RootChainManager**. Fungsi **exit** dapat dipanggil menggunakan pustaka matic.js seperti yang ditunjukkan dalam [contoh](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js) ini.

- Dengan menjalankan skrip, akan memverifikasi penyertaan hash transaksi Polygon di rantai Ethereum, dan kemudian memanggil fungsi **exitToken** dari kontrak [predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Ini memastikan bahwa **perubahan kondisi di kontrak rantai root** selalu dilakukan dengan cara **aman** dan **hanya melalui kontrak predicate**.
- Hal penting yang perlu diperhatikan adalah **verifikasi hash transaksi** dari Polygon dan **pemicuan kontrak predikat** terjadi dalam **satu transaksi** demi menjamin keamanan dari setiap perubahan kondisi pada kontrak root.

# Implementasi {#implementation}

Ini adalah demonstrasi sederhana tentang bagaimana data dapat ditransfer dari Polygon ke Ethereum. Tutorial ini menunjukkan contoh mentransfer nilai uint256 di seluruh rantai. Anda dapat mentransfer tipe data. Namun, Anda perlu melakukan encoding data dalam byte, kemudian mengeluarkannya dari kontrak anak. Pada akhirnya, data tersebut dapat diuraikan di kontrak root.

1. Pertama, buatlah kontrak rantai root dan rantai anak. Pastikan bahwa fungsi yang melakukan perubahan kondisi juga mengeluarkan peristiwa. Peristiwa ini harus memasukkan data yang akan ditransfer sebagai salah satu parameternya. Format sampel tentang bagaimana seharusnya tampilan kontrak Anak dan Root bisa dilihat di bawah ini. Ini adalah kontrak sederhana yang memiliki variabel data dan nilainya diatur dengan menggunakan fungsi setData. Memanggil fungsi setData akan mengeluarkan peristiwa Data. Hal-hal lain terkait kontrak akan dijelaskan dalam bagian tutorial berikutnya.

A. Kontrak Anak

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Kontrak Root

Berikan `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` ini sebagai nilai untuk `_predicate` dalam konstruktor kontrak root.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Setelah kontrak anak dan root disebarkan di rantai Polygon dan Ethereum, kontrak tersebut harus dipetakan menggunakan jembatan PoS. Pemetaan ini memastikan koneksi akan dipertahankan antara dua kontrak ini di seluruh rantai. Untuk melakukan pemetaan ini, tim dukungan Polygon dapat dihubungi di [discord](https://discord.com/invite/0xPolygon).

3. Satu hal penting yang perlu dicatat yaitu, dalam kontrak root, ada pengubah onlyPredicate. Sebaiknya, selalu gunakan pengubah ini karena pengubah itu akan memastikan bahwa hanya kontrak predikat yang dapat membuat perubahan kondisi pada kontrak root. Kontrak predikat adalah sebuah kontrak khusus yang akan memicu kontrak root hanya ketika transaksi yang terjadi di rantai Polygon telah diverifikasi oleh RootChainManager di rantai Ethereum. Ini akan memastikan perubahan kondisi yang aman di kontrak root.

Untuk menguji implementasi di atas, kita dapat membuat sebuah transaksi di rantai Polygon dengan memanggil fungsi **setData** dari kontrak anak. Pada titik ini, kita perlu menunggu hingga titik periksa selesai. Penyertaan titik periksa ini dapat diperiksa dengan menggunakan [skrip](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) ini. Setelah titik periksa selesai, panggil fungsi keluar RootChainManager menggunakan SDK matic.js.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Seperti yang ditunjukkan pada tangkapan layar di atas, **txHash** adalah hash transaksi yang terjadi di kontrak anak yang disebarkan di rantai Polygon.

**LogEventSignature** adalah hash keccack-256 dari peristiwa Data. Ini adalah hash sama yang telah kita masukkan dalam kontrak Predicate. Semua kode kontrak yang digunakan untuk tutorial ini dan skrip keluar dapat Anda lihat [di sini](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Setelah skrip keluar selesai, kontrak root di rantai Ethereum dapat dilakukan kueri untuk memverifikasi apakah nilai **data** variabel yang telah diatur dalam kontrak anak juga telah tercermin dalam variabel **data** dari kontrak root.
