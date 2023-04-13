---
title: Tellor
description: "Panduan untuk mengintegrasikan orakel Tellor ke dalam kontrak Polygon Anda."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor adalah oracle yang menyediakan data resistan sensor yang dijamin dengan insentif kripto-ekonomi sederhana. Data dapat disediakan oleh siapa saja dan diperiksa oleh semua orang. Struktur fleksibel Tellor dapat menyediakan data apa pun pada interval waktu apa pun untuk memungkinkan eksperimen/inovasi yang mudah.

## Prasyarat (Lunak) {#soft-prerequisites}

Kami mengasumsikan berikut ini tentang tingkat keterampilan pengodean Anda untuk berfokus pada aspek oracle.

Asumsi:

- Anda dapat menavigasi terminal
- Anda telah menginstal npm
- Anda tahu cara menggunakan npm untuk mengelola dependensi

Tellor adalah oracle sumber terbuka dan aktif yang siap untuk implementasi. Panduan pemula ini ada di sini untuk menampilkan kemudahan yang dapat dirasakan dan berjalan dengan Tellor, menyediakan projekmu dengan orakel yang sepenuhnya terdesentralisasi dan resistan.

## Ikhtisar {#overview}

Tellor adalah sistem oracle di mana para pihak dapat meminta nilai titik data off-chain (misalnya BTC/USD) dan pelapor bersaing untuk menambahkan nilai ini ke bank data on-chain yang dapat diakses oleh semua kontrak cerdas Polygon. Input untuk bank data ini dijamin oleh jaringan pelapor yang dilakukan stake. Tellor memanfaatkan mekanisme insentif kripto-ekonomi. Pengajuan data yang jujur oleh para pelapor diberi imbalan dengan menerbitkan token Tellor. Setiap aktor buruk segera dihukum dan dihapus dari jaringan melalui mekanisme sengketa.

Dalam tutorial ini, kita akan membahas:

- Penyiapan toolkit awal yang harus dibangun dan dijalankan.
- Penjelasan contoh sederhana.
- Pembuatan daftar alamat testnet dari jaringan yang saat ini dapat diuji dengan Tellor.

## UsingTellor {#usingtellor}

Hal pertama yang Anda ingin lakukan adalah menginstal alat dasar yang diperlukan untuk menggunakan Tellor sebagai oracle. Gunakan [paket ini](https://github.com/tellor-io/usingtellor) untuk menginstal Kontrak Pengguna Tellor:

`npm install usingtellor`

Setelah itu, ini akan memungkinkan kontrak Anda untuk mewarisi fungsi dari kontrak 'UsingTellor'.

Bagus! Sekarang Anda telah menyiapkan alatnya, mari kita bahas latihan sederhana untuk mengambil harga bitcoin:

### Contoh BTC/USD {#btc-usd-example}

Wariskan kontrak UsingTellor, yang memberikan alamat Tellor sebagai argumen konstruktor:

Berikut contohnya:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Alamat: {#addresses}

Tellor Tributes: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle:[`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Ingin melakukan beberapa tes terlebih dahulu?: {#looking-to-do-some-testing-first}

Testnet Mumbai Polygon:[`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Uji Tribute:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Butuh beberapa token Tweet kami di ['@trbfaucet'](https://twitter.com/trbfaucet)

Untuk memudahkan penggunaan, repo UsingTellor datang dengan versi [kontrak Playground Tellor](https://github.com/tellor-io/TellorPlayground) untuk integrasi yang lebih mudah. Lihat [di sini](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) untuk daftar fungsi yang membantu.

#### Untuk implementasi yang lebih kuat dari oracle Tellor, lihat daftar fungsi selengkapnya yang tersedia [di sini.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### Masih punya pertanyaan? Bergabunglah dengan komunitas [di sini!](https://discord.gg/tellor)
