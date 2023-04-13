---
id: custom-tokens
title: Atur Token Custom
description: Mengonfigurasi token kustom di Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Halaman ini menunjukkan proses pengaturan/menambahkan token kustom ke Metamask.

Anda dapat menggunakan proses yang sama untuk menambahkan token kustom ke jaringan manapun di Metamask. Anda dapat merujuk ke [tabel ini](#tokens-and-contract-adresses) untuk memvisualisasikan beberapa contoh token uji dengan alamat kontrak masing-masing.

## Menambahkan tanda kustom ke akun Anda MetaMask {#adding-a-custom-token-to-your-metamask-account}

Pertama, pilih jaringan yang tepat untuk tanda baru pada layar rumah Metamask. Kemudian klik "Import Tokens".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Kemudian akan menavigasi Anda ke layar yang baru. Di layar Token, copy-paste alamat di lapangan Alamat Token.

:::info
Untuk menggambarkan proses ini, kita menggunakan tanda E**RC20-TESTV4 **di **jaringan Goerli.** Cari token uji lainnya dari jaringan lain [<ins>di sini</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Bidang lainnya akan diisi secara otomatis. Klik di Tambahkan Token Custom dan kemudian klik ke Token Import. Sekarang token `TEST` ditampilkan di akun Anda di Metamask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Menambahkan token ERC1155 tes ke akun Metamask**

Meskipun jaringan Polygon mendukung ERC1155, [tetapi Metamask belum mendukung standarnya](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Pembaruan ini diperkirakan akan dirilis pada kuartal keempat tahun 2021.

### Token dan Kontrak Adress {#tokens-and-contract-adresses}

| token | Jaringan | Alamat Kontrak |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |