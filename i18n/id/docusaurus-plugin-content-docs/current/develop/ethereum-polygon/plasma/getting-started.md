---
id: getting-started
title: Jembatan Plasma
sidebar_label: Introduction
description: Berinteraksi dengan Jembatan Plasma dan Jaringan Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Lihat [dokumentasi Matic.js terbaru tentang Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) untuk memulai.

Pada dasarnya, jembatan adalah serangkaian kontrak yang membantu memindahkan aset dari rantai root ke rantai anak. Terdapat dua jembatan utama untuk memindahkan aset antara Ethereum dan Polygon. Yang pertama adalah Jembatan Plasma dan yang kedua disebut **Jembatan PoS** atau Jembatan **Proof of Stake**. **Jembatan** Plasma menyediakan jaminan keamanan yang meningkat karena mekanisme keluaran Plasma.

Namun, ada pembatasan tertentu pada token anak dan ada periode penarikan selama 7 hari yang terkait dengan semua proses keluar/penarikan dari Polygon ke Ethereum di jembatan Plasma. [Jembatan PoS](/docs/develop/ethereum-polygon/pos/getting-started) adalah jembatan yang lebih fleksibel dan dilengkapi dengan fitur penarikan yang lebih cepat.

Tutorial ini akan bertindak sebagai panduan langkah untuk memahami dan menggunakan jembatan Plasma menggunakan [Matic JS](https://github.com/maticnetwork/matic.js), yang merupakan cara termudah untuk berinteraksi dengan Jembatan Plasma di Jaringan Polygon.

## Aliran aset di Jembatan Plasma {#assets-flow-in-plasma-bridge}

Kami akan menampilkan aliran transfer aset di Polygon dalam tutorial ini dan cara melakukan hal yang sama dengan menggunakan Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Deposit pengguna aset crypto dalam kontrak Polygon pada rantai utama
2. Setelah token yang disimpan dikonfirmasi pada rantai utama, token yang sesuai akan tercermin di rantai Polygon
   - Kini pengguna dapat mentransfer token kepada siapa pun yang mereka inginkan secara langsung dengan biaya yang sangat kecil. Rantai Polygon memiliki blok yang lebih cepat (sekitar 1 detik). Dengan begitu, transfer akan dilakukan hampir dalam sekejap.
3. Setelah pengguna siap, mereka dapat menarik token yang tersisa dari rantai utama. Penarikan dana dimulai dari Rantai Sisi Plasma. Titik periksa dengan interval 5 menit telah ditetapkan, yakni ketika semua blok pada lapisan blok Polygon divalidasi sejak titik periksa terakhir.
4. Setelah titik pemeriksaan diserahkan ke kontrak utama Ethereum, tanda keluar NFT (ERC721) dibuat dari nilai yang setara.
5. Dana yang ditarik dapat diklaim kembali ke acccount Ethereum dari kontrak rantai utama menggunakan prosedur keluar.
   - Pengguna juga dapat melakukan proses keluar dengan cepat via 0x atau Dharma (segera hadir!)

### Prasyarat: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

Untuk melakukan transaksi apa pun, Anda juga perlu beberapa Ether dalam akun tes yang akan digunakan saat mengikuti tutorial. Jika Anda tidak memiliki ETH pada Görli, Anda dapat menggunakan tautan faucet yang diberikan di sini — https://goerli-faucet.slock.it/.

### Polygon Faucet {#polygon-faucet}

Sepanjang tutorial ini, kita akan menggunakan `TEST` token ERC20 pada jaringan Görli sebagai contoh. Ini token TEST. Pada DApp, Anda dapat menggantinya dengan token ERC20 apa pun. Untuk mendapatkan token `TEST` Test pada Jaringan Polygon, Anda dapat mengakses [Polygon Faucet](https://faucet.polygon.technology/).

:::note

Untuk menggunakan token sendiri untuk deposit dan penarikan, Anda harus mendapatkan tanda 'memetakan 'peta', yang pada dasarnya berarti membuat kontrak pada rantai utama dan sidechain 'aware' dari token gubahan Anda.

:::

### Pengaturan dasar untuk Dompet Metamask (Opsional) {#basic-setup-for-the-metamask-wallet-optional}

1. [Buat dompet](/docs/develop/metamask/hello): Jika Anda adalah yang baru untuk dompet, maka mengatur Akun MetaMask.
2. [Atur testnet Polygon](/docs/develop/metamask/config-polygon-on-metamask): Untuk dengan mudah memvisualisasikan aliran dana di Polygon, akan dianjurkan jika Anda mengatur testnet Polygon pada Metamask. Perhatikan bahwa kita menggunakan Metamask di sini hanya demi visualisasi. Sama sekali tidak ada ketentuan untuk menggunakan Metamask dalam penggunaan Polygon.
3. [Buat Beberapa Akun](/docs/develop/metamask/multiple-accounts): Sebelum memulai dengan tutorial, siapkan 3 akun tes Ethereum.
4. [Konfigurasi token di Polygon](/docs/develop/metamask/custom-tokens): Untuk melihat aliran dana dengan mudah pada Polygon menggunakan Matic.js, Anda dapat mengonfigurasi token di Metamask.
`TEST`Token yang diambil sebagai contoh untuk tutorial ini, dapat dikonfigurasi dalam MetaMask sehingga untuk dengan mudah memvisualisasikan keseimbangan akun. Sekali lagi perlu diperhatikan ini **adalah opsi**. Anda dapat dengan mudah mengkueri keseimbangan tanda dan variabel lainnya menggunakan [web3.js](https://web3js.readthedocs.io/en/1.0/)
