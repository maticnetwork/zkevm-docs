---
id: submit-mapping-request
title: Token Pemetakan
description:  Panduan tentang cara memetakan token antara Ethereum dan Perampokan Polygon menggunakan Jembatan PoS
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Pemetakan diperlukan untuk memindahkan aset ke dan dari Ethereum dan Polygon PoS. Kami menawarkan dua jembatan untuk melakukan hal yang sama. Lebih banyak rincian tentang jembatan dapat dipahami [di sini](/develop/ethereum-polygon/getting-started.md).

:::tip

Jembatan Polygon PoS tersedia untuk Polygon Mainnet serta Testnet Mumble.

:::

## Langkah-langkah mengirimkan permintaan pemetaan {#steps-to-submit-a-mapping-request}

Untuk memetakan token antara Ethereum dan Polygon PoS, Anda dapat menggunakan [Mapper Polygon Token](https://mapper.polygon.technology/). Buka tautan dan klik tombol **Tanda Baru Token** di sudut kanan atas untuk memulai permintaan pemetakan baru.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Langkah 1 →** Pilih jaringan yang ingin Anda memetakan token Anda. Anda dapat memilih **Goerli-Mumbai** untuk Testnet, dan **PoS** Ethereum-Polygon untuk Mainnet.

Langkah **2 →** Pilih jenis token yang Anda petakan - **ERC20**, **ERC721**, atau **ERC1155**.

**Langkah 3 →** Masukkan alamat token **Ethereum/Goerli** di medan **Alamat** Token. Pastikan kode kontrak token telah diverifikasi pada penjelajah blockchain **Ethereum/Goerli**

Langkah **4 →** Setelah menambahkan **Alamat Token Ethereum**, yaitu bidang-bidang yang terkait. **Nama Token, Simbol, dan Token Decimal** akan dihuni secara otomatis dengan rincian kontrak.

**Langkah 5 →** Sekarang, klik tombol **Pemetakan Awal** untuk memulai proses pemetaan. Karena ini melibatkan transaksi Ethereum, Anda harus menghubungkan dompet Anda untuk melanjutkan.

Langkah **6 →** Anda akan ditampilkan modal ulasan dengan informasi token dan biaya gas yang diperkirakan untuk menyelesaikan pemetaan. Verifikasi detail dan inisiasi transaksi pemetakan dengan memilih **Pay Gas Fee Ke** Tombol Peta

Setelah mengkonfirmasi transaksi dari dompet, Anda harus menunggu transaksi untuk menyelesaikan di Ethereum. Setelah transaksi selesai, Anda akan menunjukkan keberhasilan modal dengan alamat token anak Anda pada jaringan Polygon PoS. Anda dapat terus melakukan memetakan dengan memeriksa alamat token anak yang dihasilkan di [Polygonscan](https://polygonscan.com/).

Untuk pemetaan Mainnet yang sukses, Anda dapat memberikan rincian token di [sini](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) untuk ditambahkan di [**Daftar Token**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

Dalam kasus [<ins>pemetaan token kustom</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-), Anda dapat mengunjungi dokumentasi [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) kami dan menggunakan informasi yang disediakan untuk membangun implementasi FX kustom untuk memetakan token.

:::

## Panduan Video {#video-guide}

Berikut ini tutorial video yang cepat tentang bagaimana memetakan token antara **Ethereum Goerli ↔ Polygon Mumbai Testnet** :

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Browser Anda tidak mendukung elemen video ini.</p>
</video>
