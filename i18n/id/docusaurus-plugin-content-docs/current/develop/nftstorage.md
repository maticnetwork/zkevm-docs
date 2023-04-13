---
id: nftstorage
title: Melakukan Mint NFT
description: Melakukan Mint dengan NFT.storage dan Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Tutorial ini akan mengajarkan cara melakukan mint NFT menggunakan blockchain Polygon dan penyimpanan IPFS/Filecoin via NFT.Storage. Polygon, solusi penskalaan lapisan 2 untuk Ethereum, kerap dipilih oleh pengembang karena kecepatannya dan biaya transaksi yang lebih rendah sekaligus menjaga kompatibilitas penuh dengan EVM Ethereum. Tutorial akan memandu Anda tentang cara membuat dan menyebarkan kontrak cerdas standar, menyimpan metadata dan aset di IPFS dan Filecoin melalui API NFT.Storage, dan mencetak NFT ke dompet Anda di Polygon.

## Pengantar {#introduction}

Dalam tutorial ini, kita bertujuan untuk memenuhi tiga karakteristik dalam proses mint:

1. *Skalabilitas* proses mint dalam hal biaya dan throughput. Jika kasus penggunaan bertujuan untuk membuat NFT dengan cepat, teknologi yang mendasarinya harus menangani semua permintaan pencetakan dan pencetakan seharusnya murah.
2. *Daya tahan* NFT, karena aset dapat bertahan lama, maka harus bisa digunakan selama seluruh masa pakainya.
3. *Imutabilitas* NFT dan aset yang direpresentasikannya untuk mencegah perubahan yang tidak diinginkan dan aktor berbahaya agar tidak mengubah aset digital yang direpresentasikan NFT.

[Polygon](https://polygon.technology) mengatasi karakteristik *skalabilitas* dengan protokol dan kerangka kerjanya. Polygon kompatibel dengan Ethereum dan mesin virtualnya, yang memungkinkan pengembang untuk memindahkan kode secara bebas di antara dua blockchain. Demikian juga, [NFT.Storage](https://nft.storage) menjamin *durabilitas* dengan kekuatan jaringan [Filecoin](https://filecoin.io) yang mendasari dan *imutabilitas* dengan menggunakan [pengalamatan konten](https://nftschool.dev/concepts/content-addressing/) IPFS.

Dalam tutorial ini, Anda akan mendapatkan gambaran umum proses pencetakan NFT, belajar cara menyimpan aset digital dengan NFT.Storage dan menggunakan aset digital ini untuk mencetak NFT di Polygon.

## Prasyarat {#prerequisites}

Pengetahuan umum tentang NFT akan memberikan latar belakang dan konteks. [NFT School mencakup dasar-dasar NFT](https://nftschool.dev/concepts/non-fungible-tokens/), topik lanjutan, dan memiliki tutorial yang lebih banyak.

Untuk menguji dan menjalankan kode yang ditemukan di tutorial ini, Anda akan membutuhkan [instalasi Node.js](https://nodejs.org/en/download/package-manager/) yang masih berfungsi.

Anda juga akan membutuhkan dompet Polygon di testnet Mumbai dengan sedikit token MATIC. ikuti instruksi di bawah ini untuk memulai:

1. **Unduh dan instal [Metamask](https://metamask.io/)**. Metamask adalah dompet kripto dan gerbang untuk aplikasi blockchain. Sangat mudah digunakan dan menyederhanakan banyak langkah, misalnya menyiapkan dompet Polygon.
2. **Hubungkan Metamask ke [testnet Mumbai](https://docs.polygon.technology/docs/develop/metamask/overview) Polygon**, dan pilih di menu tarik-turun. Kita akan menggunakan testnet Polygon untuk mencetak NFT karena bebas biaya.
3. **Terima token** MATIC di dompet Anda dengan menggunakan [faucet](https://faucet.polygon.technology/). Pilih testnet Mumbai dan tempel alamat dompet Anda dari Metamask ke dalam formulir ini. Untuk mencetak NFT, kita harus membayar sejumlah kecil MATIC, yang merupakan biaya yang dikenakan oleh penambang untuk operasi menambahkan transaksi baru ke blockchain, misalnya mencetak NFT atau membuat kontrak cerdas baru.
4. **Salin kunci privat** dari Metamask dengan mengklik tiga titik di sudut kanan atas dan pilih 'Detail akun'. Di bawah, Anda dapat menemukan tombol untuk mengekspor kunci privat. Klik dan masukkan kata sandi Anda ketika diminta. Anda dapat menyalin dan menempelkan kunci privat di file teks sekarang. Kita akan menggunakannya nanti dalam tutorial ketika berinteraksi dengan blockchain.

Terakhir, Anda akan membutuhkan editor teks atau kode. Agar lebih nyaman, pilih editor yang mendukung bahasa JavaScript dan Solidity. [Visual Studio Code](https://code.visualstudio.com) dengan ekstensi [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) yang diaktifkan bisa menjadi pilihan yang baik.

## Persiapan {#preparation}

### Mendapatkan kunci API untuk NFT.storage {#get-an-api-key-for-nft-storage}

Untuk menggunakan NFT.Storage, Anda membutuhkan kunci API. Pertama, [pergilah ke NFT.Storage dan masuk dengan alamat surel](https://nft.storage/login/). Anda akan menerima surel dengan tautan yang secara otomatis memasukkan Anda -- tanpa perlu kata sandi. Setelah Anda masuk, buka Kunci API melalui bilah navigasi. Anda akan menemukan tombol untuk membuat **Kunci Baru**. Ketika diminta nama kunci API, Anda bebas memilih atau menggunakan "polygon + NFT.Storage". Anda dapat menyalin isi kolom kunci sekarang atau merujuk ke NFT.Storage nanti di tutorial.

### Menyiapkan ruang kerja Anda {#set-up-your-workspace}

Buat folder kosong baru yang dapat kita gunakan sebagai ruang kerja untuk tutorial ini. Pilih nama dan lokasi apa pun di sistem file. Buka terminal dan navigasikan ke folder yang baru saja dibuat.

Selanjutnya, kita akan menginstal dependensi Node.js berikut:

- **Hardhat dan Hardhat-Ethers**, sebuah lingkungan pengembangan untuk Ethereum (dan blockchain yang kompatibel dengan Ethereum seperti Polygon).
- **OpenZeppelin**, koleksi kontrak cerdas yang dilengkapi dengan kontrak dasar NFT terstandardisasi.
- **NFT.Storage**, pustaka untuk terhubung ke API NFT.Storage.
- **Dotenv**, pustaka untuk menangani file lingkungan untuk konfigurasi (misalnya, memasukkan kunci privat  ke dalam skrip ini).

Gunakan perintah berikut untuk menginstal semua dependensi sekaligus:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat harus diinisialisasi di folder sekarang. Untuk memulai inisialisasi, jalankan:

```bash
npx hardhat
```

Ketika disiapkan, pilih **Buat hardhat.config.js**. Keluaran konsol Anda seharusnya terlihat seperti ini:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Kita akan melakukan beberapa modifikasi pada file konfigurasi hardhat `hardhat.config.js`untuk mendukung jaringan tes Polygon Mumbai. Buka `hardhat.config.js` yang dibuat di langkah terakhir. Perlu diperhatikan bahwa kita memuat kunci privat dompet Polygon Anda dari file lingkungan dan file lingkungan ini harus disimpan dengan baik. Anda bahkan dapat menggunakan [tautan](https://docs.polygon.technology/docs/develop/network-details/network) rpc lainnya, sesuai kebutuhan.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Buat file baru yang disebut `.env`yang akan menyimpan kunci API untuk NFT.Storage dan kunci pribadi walet Polygon. Isi dari `.env`file harus terlihat seperti:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Ganti placeholder dengan kunci API yang Anda buat selama persiapan dan kunci privat dompet Polygon Anda.

Agar proyek kita terorganisir, buat tiga folder baru:

1. `contracts`, untuk kontrak Polygon yang ditulis di Solidity.
2. `assets`, berisi aset digital yang akan kita cetak menjadi NFT.
3. `scripts`, sebagai pembantu untuk mendorong proses persiapan dan pencetakan.

Jalankan perintah berikut:

```bash
mkdir contracts assets scripts
```

Terakhir, tambah citra ke folder `assets`. Gambar ini akan menjadi karya seni kita yang akan diunggah ke NFT.Storage dan dicetak di Polygon. Kita akan menamainya `MyExampleNFT.png` sekarang. Jika tidak memiliki karya seni yang bagus saat ini, Anda bisa [mengunduh pola sederhana](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Mencetak NFT {#minting-your-nft}

### Menyimpan data aset dengan NFT.Storage {#storing-asset-data-with-nft-storage}

Kita akan menggunakan NFT.Storage untuk menyimpan aset digital dan metadatanya. NFT.Storage menjamin imutabilitas dan durabilitas dengan mengunggah aset digital Anda ke Filecoin dan IPFS secara otomatis. IPFS dan Filecoin beroperasi pada content identifiers (CID) untuk pereferensian yang tidak dapat diubah. IPFS akan menyediakan pengambilan yang cepat dengan penyimpanan cache geo-replikasi dan durabilitas jaminan Filecoin dengan penyedia penyimpanan berinsentif.

Buat skrip yang disebut `store-asset.mjs` di direktori `scripts`. Isinya tercantum di bawah ini:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Bagian utama dari skrip adalah fungsi `storeAsset`. Ini menciptakan klien baru yang terhubung ke NFT.Storage menggunakan kunci API yang Anda buat sebelumnya. Selanjutnya, perkenalkan metadata yang terdiri dari nama, deskripsi, dan gambar. Perhatikan bahwa kita sedang membaca aset NFT langsung dari sistem file di direktori `assets`. Pada bagian akhir fungsi, kita akan mencetak URL metadata seperti yang akan kita gunakan nanti ketika membuat NFT Polygon.

Setelah menyiapkan skrip, Anda dapat mengeksekusinya dengan menjalankan:

```bash
node scripts/store-asset.mjs
```

Keluaran yang Anda lihat akan tampak seperti daftar di bawah ini, di mana `HASH` adalah CID untuk seni yang baru Anda simpan.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Membuat NFT di Polygon {#creating-your-nft-on-polygon}

#### Membuat kontrak cerdas untuk mencetak {#create-the-smart-contract-for-minting}

Pertama, kita buat kontrak cerdas yang akan digunakan untuk mencetak NFT. Karena Polygon kompatibel dengan Ethereum, kita akan menulis kontrak cerdas di [Solidity](https://soliditylang.org). Buat file baru untuk kontrak cerdas NFT kita yang disebut `ExampleNFT.sol` di dalam direktori `contracts` Anda dapat menyalin kode dari daftar di bawah ini:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Agar NFT valid, kontrak cerdas harus mengimplementasikan semua metode [standar ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Kita menggunakan implementasi pustaka [OpenZeppelin](https://openzeppelin.com), yang sudah menyediakan serangkaian fungsionalitas dasar dan mematuhi standar.

Pada kontrak cerdas, impor tiga kelas kontrak cerdas OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` berisi implementasi metode dasar standar ERC-721, yang akan diwarisi oleh kontrak cerdas NFT kita. Kita mengunakan `ERC721URIStorage,` yang merupakan sebuah ekstensi untuk menyimpan tidak hanya aset tetapi juga metadata dalam bentuk file JSON off-chain. Seperti kontrak ini, file JSON ini harus mematuhi ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` menyediakan penghitung yang hanya dapat ditingkatkan atau dikurangi satu demi satu. Kontrak cerdas kita menggunakan penghitung untuk melacak jumlah total NFT yang dicetak dan untuk menetapkan ID unik di NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` mengatur kontrol akses pada kontrak cerdas, jadi, hanya pemilik kontrak cerdas (Anda) yang dapat mencetak NFT.

Setelah pernyataan impor, kini kita memiliki kontrak cerdas NFT kustom, yang berisi penghitung, konstruktor, dan metode untuk mencetak NFT. Sebagian besar kerja keras dilakukan oleh kontrak dasar yang diwariskan dari OpenZeppelin, yang mengimplementasikan sebagian besar metode yang dibutuhkan untuk membuat NFT yang mematuhi standar ERC-721.

Penghitung melacak jumlah total NFT yang dicetak, yang digunakan dalam metode pencetakan sebagai identifikasi unik untuk NFT.

Dalam konstruktor, kita memasukkan argumen dua string untuk nama kontrak cerdas dan simbol (direpresentasikan dalam dompet). Anda dapat mengubahnya sesuka Anda.

Terakhir, kita memiliki metode `mintNFT` yang memungkinkan kita untuk benar-benar mencetak NFT. Metode diatur ke `onlyOwner` untuk memastikan metode ini hanya dapat dieksekusi oleh pemilik kontrak cerdas.

`address recipient`Menspesifikasikan alamat yang akan menerima NFT pada awalnya.

`string memory tokenURI` adalah URL yang akan mengubah dokumen JSON yang menjelaskan metadata. NFT. Dalam kasus kita, ini sudah disimpan di NFT.Storage. Kita dapat menggunakan tautan IPFS yang dikembalikan ke file JSON metadata selama eksekusi metode tersebut.

Di dalam metode ini, kita meningkatkan penghitung untuk menerima identifikasi unik baru untuk NFT. Kemudian kita memanggil metode yang disediakan oleh kontrak dasar dari OpenZeppelin untuk mencetak NFT ke penerima dengan pengidentifikasi yang baru dibuat dan menetapkan URI metadata. Metode ini menghasilkan pengidentifikasi unik setelah eksekusi.

#### Menyebarkan kontrak cerdas ke Polygon. {#deploy-the-smart-contract-to-polygon}

Sekarang, inilah saatnya untuk menyebarkan kontrak cerdas ke Polygon. Buat file baru yang disebut `deploy-contract.mjs` dalam direktori `scripts`. Salin isi daftar di bawah ini ke file itu dan simpan.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

Menyebarkan kontrak dilakukan dengan fungsi pembantu yang disediakan oleh pustaka hardhat. Pertama, kita ambil kontrak cerdas yang dibuat di langkah sebelumnya dengan produsen yang telah ditetapkan. Kemudian, sebarkan kontrak cerdas tersebut dengan memanggil metode dan tunggu penyebaran selesai. Ada beberapa baris lagi di bawah kode yang dijelaskan untuk mendapatkan alamat yang benar di lingkungan testnet. Simpan `mjs`file.

Menjalankan skrip dengan perintah berikut:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Jika semuanya benar, Anda akan melihat keluaran berikut:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Perhatikan bahwa Anda akan membutuhkan alamat kontrak yang sudah dicetak pada langkah melakukan mint. Anda dapat menyalin dan menempelkannya ke file teks terpisah dan menyimpannya untuk digunakan nanti. Ini diperlukan sehingga skrip pencetakan dapat memanggil metode pencetakan kontrak itu.

#### Mencetak NFT di Polygon {#minting-the-nft-on-polygon}

Kini, mncetak NFT hanya dengan memanggil kontrak yang baru disebarkan ke Polygon. Buat file baru yang disebut di `mint-nft.mjs` dalam direktori `scripts` dan salin kode ini dari daftar di bawah ini:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Edit dua baris pertama untuk memasukkan **alamat kontrak** dari penyebaran sebelumnya dan **URL metadata** yang dihasilkan ketika menyimpan aset dengan NFT.Storage. Sisa skrip menyiapkan panggilan ke kontrak cerdas dengan Anda sebagai calon pemilik NFT dan penunjuk ke metadata yang disimpan di IPFS.

Selanjutnya, jalankan skrip:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Anda akan melihat keluaran berikut:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Anda mencari kode sampel dari tutorial ini? Anda dapat menemukannya di [tautan](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) polygon-nft.storage-demo Github repo.

## Kesimpulan {#conclusion}

Dalam tutorial ini, kita belajar cara mencetak NFT secara menyeluruh dengan Polygon dan NFT.Storage. Kombinasi teknologi ini menghasilkan desentralisasi dan jaminan *skalabilitas* yang tepat, *durabilitas*, dan *imutabilitas*.

Kita menyebarkan kontrak cerdas kustom untuk mencetak NFT tertentu sesuai kebutuhan kita. Untuk tutorial ini, kita menggunakan contoh sederhana berdasarkan standar ERC-721. Namun, Anda juga dapat menentukan logika kompleks yang mengatur siklus kehidupan NFT Anda. Untuk kasus penggunaan yang lebih kompleks, penggantinya, yaitu standar [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) yang merupakan tempat yang baik untuk memulai. OpenZeppelin, pustaka yang kita gunakan di tutorial ini menyajikan [panduan kontrak](https://docs.openzeppelin.com/contracts/4.x/wizard) yang membantu kita membuat kontrak NFT.

Pencetakan yang sukses dapat dilihat sebagai awal dari fase berharga NFT. Kemudian, NFT dapat digunakan untuk membuktikan kepemilikan dan dapat ditransfer ke pengguna lain. Alasan melakukan transfer NFT mungkin termasuk berhasilnya penjualan di salah satu pasar NFT seperti [OpenSea](https://opensea.io), atau jenis acara yang berbeda seperti mengakuisisi item di permainan berbasis NFT. Menjelajahi kemungkinan NFT yang begitu beragam adalah langkah berikutnya yang menarik.

Jika Anda ingin membantu membangun proyek NFT Anda dengan NFT.storage, kami mendorong Anda untuk bergabung ke `#nft-storage`saluran di D[iscord ](https://discord.gg/Z4H6tdECb9)dan S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
