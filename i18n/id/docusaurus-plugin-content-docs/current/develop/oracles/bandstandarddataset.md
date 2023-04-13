---
id: bandstandarddataset
title: Dataset Standar Band
sidebar_label: Standard Dataset
description: Band Stardard Dataset menawarkan informasi harga waktu nyata untuk lebih dari 196 + simbol yang mencakup aset crypto, pertukaran dan komoditas
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Pembangunan pengembang di Polygon sekarang dapat memanfaatkan infrastruktur orakel yang desentralisasi . Dengan orakel Band Protocol, mereka sekarang memiliki akses ke berbagai data harga cryptocurrency untuk diintegrasikan ke dalam aplikasi mereka.

## Token yang Didukung {#supported-tokens}

Saat ini, daftar simbol yang didukung dapat ditemukan di [data.bandprotocol.com](http://data.bandprotcool.com). Nantinya, daftar ini akan terus berkembang sesuai kebutuhan pengembang dan umpan balik komunitas.

## Pasangan Harga {#price-pairs}

Metode berikut dapat digunakan dengan kombinasi apa pun dari token dasar/kuotasi asalkan simbol dasar dan kuotasi itu didukung oleh dataset.

### Melakukan Kueri Harga {#querying-prices}

Saat ini, ada dua metode untuk pengembang untuk melakukan query dari orakel Band Protocol: melalui kontrak `StdReference`cerdas Band di Polygon dan melalui perpustakaan bantuan [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript.

### Kontrak Cerdas Solidity {#solidity-smart-contract}

Untuk melakukan query dari orakel Band Protocol, kontrak cerdas harus mengacu kontrak `StdReference`Band, khususnya `getReferenceData`dan `getReferenceDatabulk`metode

`getReferenceData`membutuhkan dua string sebagai input, `base`dan `quote`simbol, masing-masing. Kemudian melakukan kueri kontrak `StdReference` terkait tarif terbaru untuk dua token tersebut dan memberikan struktur `ReferenceData` seperti yang ditunjukkan di bawah ini.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

Sebaliknya, `getReferenceDataBulk` membutuhkan dua daftar, satu daftar token `base` dan satu `quotes`. Kemudian dilanjutkan untuk memperkecil harga untuk setiap pasangan dasar/quote pada setiap indeks, dan mengembalikan array `ReferenceData`struktur.

Misalnya, jika kita panggil `getReferenceDataBulk` dengan `['BTC','BTC','ETH']` dan `['USD','ETH','BNB']`, maka array `ReferenceData` yang dihasilkan akan berisi informasi mengenai pasangan:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Alamat Kontrak {#contract-addresses}

| Blockchain | Alamat Kontrak |
| -------------------- | :------------------------------------------: |
| Polygon (Tes) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Pustaka pembantu node Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) juga mendukung fungsi `getReferenceData` yang sama. Fungsi ini membutuhkan satu argumen, daftar pasangan tanda untuk query hasilnya. Kemudian akan dihasilkan daftar nilai tarif yang sesuai.


### Contoh Penggunaan {#example-usage}

Kode di bawah menunjukkan penggunaan contoh dari fungsi:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

Hasilnya akan sama dengan:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

Untuk setiap pasangan, akan ditampilkan informasi berikut:

- `pair`: String pasangan simbol dasar/kuotasi
- `rate`: Tarif yang dihasilkan dari pasangan yang ditentukan
- `updated`: Stempel waktu ketika simbol dasar dan kuotasi diperbarui terakhir di BandChain. Untuk `USD`, ini akan menjadi perangko waktu saat ini.
- `rawRate`: Objek ini terdiri dari dua bagian.
  - `value` adalah nilai `BigInt` dari tarif sebenarnya, dikalikan dengan `10^decimals`
  - Jadi, `decimals` adalah eksponen yang dikalikan dengan `rate` untuk mendapatkan `rawRate`

## Contoh Penggunaan {#example-usage-1}

[Kontrak](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) ini menunjukkan contoh penggunaan kontrak `StdReference` Band dan fungsi  `getReferenceData`.