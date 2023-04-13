---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain adalah Blockchain kinerja tinggi Dibangun untuk Data Oracle untuk query data dari API web tradisional
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Protokol Band memungkinkan Anda melakukan kueri data dari API web tradisional dan menggunakannya di blockchain. Pengembang dapat melakukan query melalui **BandChain, blockchain berbasis kosmos** untuk memfasilitasi permintaan dan pembayaran ke orakel dan kemudian menggunakan data pada dApp melalui komunikasi antar-rantai . Mengintegrasikan data oracle dapat dilakukan dengan 3 langkah sederhana:

1. **Memilih skrip oracle**

    Skrip oracle adalah hash yang secara unik mengidentifikasi jenis data yang akan diminta dari band-chain. Skrip ini dapat ditemukan [**di sini**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Skrip ini digunakan sebagai salah satu parameter saat membuat permintaan oracle.

2. **Meminta Data dari BandChain**

Ini dapat dilakukan dalam dua cara:

    - **Menggunakan penjelajah BandChain**

    Anda dapat mengklik pada skrip oracle dari pilihan Anda, dan kemudian dari tab **Eksekutif** yang dapat Anda lewati dalam parameter dan mendapatkan respon dari BandChain. Respons akan berisi hasil dan juga bukti evm. Bukti ini harus disalin dan akan digunakan di langkah akhir. BandChain docs untuk melakukan pertanyaan oracle menggunakan penjelajah tersedia [**di sini**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Diberikan di atas adalah contoh membuat permintaan orakel untuk mendapatkan nilai bilangan acak. Nilai 100 diberikan ke `max_range`parameter dari permintaan oracle Kita akan mendapatkan respons berupa hash. Dengan mengklik hash ini akan menampilkan detail lengkap responnya.

    - **Menggunakan Perpustakaan JS BandChain-Devnet**

    Anda dapat melakukan query BandChain secara langsung menggunakan perpustakaan BandChain-Devnet. Ketika dilakukan kueri, ini akan memberikan **bukti evm** dalam respons. Bukti ini dapat digunakan untuk langkah akhir integrasi BandChain. BandChain docs untuk melakukan querying oracle menggunakan Perpustakaan JS BandChain-Devnet tersedia [**di sini**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). Payload permintaan untuk oracle nomor acak akan terlihat seperti ini. Pastikan isi permintaan diberikan dalam format aplikasi/json.

3. **Menggunakan data dalam kontrak cerdas**

  Langkah terakhir adalah menyebarkan kontrak validasi dan menyimpan respons dari permintaan oracle ke dalam variabel kondisi kontrak validasi. Setelah variabel kondisi ini ditetapkan, itu dapat diakses bila dan ketika diperlukan oleh dapp. Selain itu, variabel kondisi ini dapat diperbarui menggunakan nilai baru dengan melakukan kueri skrip oracle lagi dari dApp. Di bawah ini adalah kontrak validasi yang menyimpan nilai angka acak menggunakan skrip oracle angka acak.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Ketika menyebar, 3 parameter harus dilewati. **Parameter pertama** `codeHash`adalah hash skrip oracle **Parameter kedua** adalah parameter permintaan skrip oracle Ini harus dilewati dalam format byte. BandChain menyediakan REST API untuk mengubah parameter objek JSON ke format byte. Perincian API dapat ditemukan [**di sini**](https://docs.bandchain.org/references/encoding-params). 0x harus ditambahkan pada respons yang diterima dari API ini. **Parameter ketiga** adalah alamat kontrak dari kontrak BandChain yang telah disebarkan di jaringan Polygon. Protokol Band Mendukung Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Hal lain yang perlu diperhatikan adalah bahwa kontrak validasi harus mengimpor perpustakaan dan antarmuka yang masing-masing disebut `BandChainLib.sol`dan `IBridge.sol`. Mereka dapat ditemukan dalam tautan berikut: Perpustakaan [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) dan antarmuka [**IBridge**](https://docs.bandchain.org/references/ibridge-interface).

  Setelah kontrak validasi disebarkan, variabel kondisi dapat diakses dengan melakukan kueri dari dApp. Demikian pula beberapa kontrak validasi dapat dibuat untuk skrip oracle yang dibangun di dalam yang berbeda. IBridge interface memiliki metode yang disebut `relayAndVerify()`yang memverifikasi nilai yang diperbarui setiap kali dalam kontrak validasi. `update()`Metode dalam kontrak validasi memiliki logika untuk memperbarui variabel keadaan. Bukti EVM yang diperoleh dari melakukan query skrip harus dilewatkan ke `update()`metode. Setiap kali nilai diperbarui, kontrak BandChain yang dikerahkan di Polygon memverifikasi data sebelum menyimpannya dalam variabel keadaan kontrak.

BandChain menyediakan jaringan terdesentralisasi dari orakel yang dapat digunakan oleh dApps untuk meningkatkan logika kontrak cerdas mereka. BandChain docs dalam penyebaran kontrak, menyimpan nilai, dan memperbarui mereka dapat ditemukan [**di sini**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).