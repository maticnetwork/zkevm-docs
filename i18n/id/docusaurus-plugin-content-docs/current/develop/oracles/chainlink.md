---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink adalah jaringan orakel terdesentralisasi yang dibangun di Ethereum.
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** memungkinkan kontrak Anda untuk **mengakses sumber data eksternal manapun**, melalui jaringan orakel yang decentralized Apakah kontrak Anda membutuhkan hasil olahraga, cuaca terbaru, atau data yang tersedia secara umum lainnya, Chainlink menyediakan alat yang diperlukan oleh kontrak untuk menggunakannya.

## Data Terdesentralisasi  {#decentralized-data}

Salah satu fitur yang paling kuat dari Chainlink, sudah terdesentralisasi, teragregasi, dan siap untuk dicerna pada sebagian besar dari cryptocurrency. Ini dikenal sebagai [**Chainlink Data Feeds**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Berikut contoh kerja kontrak yang menggabungkan harga terbaru MATIC dalam USD di Testnet Mumbai.

Yang perlu kau lakukan adalah menukar alamat [dengan alamat dari sebuah umpan data](https://docs.chain.link/docs/matic-addresses#config) yang ingin kau kenakan, dan mulai melakukan pencernaan.

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## Siklus Meminta dan Menerima {#request-and-receive-cycle}

Siklus Meminta dan Menerima Chainlink, memungkinkan kontrak cerdas untuk membuat permintaan ke API eksternal mana pun dan menggunakan responsnya. Untuk mengimplementasikannya, kontrak Anda perlu menentukan dua fungsi:

1. Satu untuk **meminta data**, dan
2. Yang lain untuk **menerima tanggapan**.

Untuk meminta data, kontrak Anda membangun sebuah `request`objek yang menyediakan ke sebuah oracle. Setelah oracle menjangkau API dan menguraikan respons, ia akan berupaya mengirim kembali data ke kontrak Anda menggunakan fungsi callback yang ditentukan dalam kontrak cerdas.

## Penggunaan {#uses}

1. **Chainlink Data Feeds**

Ini adalah poin referensi data yang terdesentralisasi sudah teragregasi di rantai dan cara tercepat, termudah, dan termurah untuk mendapatkan data dari dunia nyata. Saat ini mendukung beberapa pasangan mata uang kripto dan mata uang fiat yang paling populer.

Untuk bekerja dengan Data Feeds, gunakan [**Polygon Data Feeds dari**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) dokumentasi Chainlink.

2. **Chainlink Fungsi Randomness Verifiable**

Dapatkan nomor acak yang dapat dipastikan dan nomor acak dijamin secara kriptografi.

Untuk bekerja dengan Chainlink VRF, gunakan [**alamat VRF Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks) dari [dokumentasi Chainlink](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)

3. **Chainlink API Calls**

Cara mengatur kontrak cerdas Anda untuk bekerja dengan API tradisional, dan menyesuaikan untuk mendapatkan data apapun, mengirim permintaan atas internet, dan lebih.

## Contoh Kode {#code-example}

Untuk berinteraksi dengan API eksternal, kontrak cerdas harus mewarisi dari [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), yaitu kontrak yang dirancang untuk memudahkan permintaan pemrosesan. Ini akan mengekspos struktur yang disebut `Chainlink.Request`, yang harus digunakan kontrak Anda untuk membangun permintaan API.

Permintaan harus menentukan alamat orakel, id, pie, parameter adapter, dan tanda fungsi callback. Dalam contoh ini, permintaan dibangun dalam fungsi `requestEthereumPrice`.

`fulfill` didefinisikan sebagai fungsi callback.

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## Token LINK Mainnet Polygon. {#mainnet-polygon-link-token}

Untuk mendapatkan token Polygon LINK dari Ethereum Mainnet, Anda harus mengikuti proses 2 langkah.

1. Buat jembatan untuk LINK menggunakan Plasma atau [jembatan PoS](https://wallet.polygon.technology/bridge).
2. Tukar LINK untuk versi ERC677 melalui [Pegswap, yang disebarkan oleh Chainlink](https://pegswap.chain.link/).

Jembatan Polygon membawa LINK versi ERC20 dan LINK adalah ERC677, jadi, kita hanya perlu memperbaruinya dengan pertukaran ini.

## Alamat {#addresses}

Saat ini, hanya ada beberapa oracle Chainlink yang beroperasi di Testnet Mumbai Polygon. Anda juga selalu dapat menjalankannya sendiri dan mencantumkannya di Marketplace Chainlink.

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Untuk mendapatkan LINK di Mumbai Testnet, ke [faucet Polygon di sini](https://faucet.polygon.technology/).

## API yang didukung {#supported-apis}

Siklus Meminta dan Menerima Chainlink cukup fleksibel untuk memanggil API publik apa pun, selama parameter permintaannya benar dan format responsnya diketahui. Misalnya, jika objek respons dari URL yang ingin kita ambil terformat seperti ini: `{"USD":243.33}`, jalurnya sederhana: `"USD"`.

Jika API merespon dengan objek JSON yang kompleks, parameter **jalur** akan perlu menentukan tempat untuk mengambil data yang diinginkan, menggunakan string yang delimited untuk objek yang bersarang. Misalnya, mempertimbangkan respon berikut:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Ini akan membutuhkan jalur berikut: `"Prices.USD"`. Jika ada ruang dalam string, atau string cukup panjang, kita dapat menggunakan sintaks yang ditunjukkan dalam contoh di atas, di mana kita menyalakannya semua sebagai array string.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## Untuk Apa ID Pekerjaan? {#what-are-job-ids-for}

Anda mungkin telah melihat bahwa [contoh](#code-example) kami menggunakan `jobId`parameter ketika membangun permintaan. Pekerjaan terdiri dari serangkaian instruksi berurutan yang dikonfigurasi untuk dijalankan oleh oracle. Dalam [contoh kode](#code-example) di atas, kontrak membuat permintaan ke oracle dengan ID pekerjaan: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Pekerjaan ini dikonfigurasi untuk melakukan hal berikut:

* Membuat permintaan GET
* Menguraikan respons JSON
* Mengalikan nilai dengan *x*
* Mengubah nilai ke `uint`
* Mengirim ke rantai

Inilah alasan kontrak kita ditambahkan ke dalam URL jalur untuk menemukan data yang diinginkan dalam respons JSON dan jumlah waktu yang dibutuhkan untuk permintaan; menggunakan pernyataan `request.add`. Instruksi ini difasilitasi oleh apa yang dikenal sebagai Adapters, dalam oracle.

**Setiap permintaan ke oracle harus memasukkan id pekerjaan tertentu.**

Berikut adalah daftar pekerjaan yang dikonfigurasi untuk dijalankan oleh oracle.

| Nama | Tipe Hasil | ID | Adapters |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Referensi API Chainlink selengkapnya dapat ditemukan [di sini](https://docs.chain.link/any-api/api-reference).
