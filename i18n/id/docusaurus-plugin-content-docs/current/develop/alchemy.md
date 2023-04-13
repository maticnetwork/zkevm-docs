---
id: alchemy
title: Menyebarkan Kontrak Cerdas Menggunakan Alchemy
sidebar_label: Using Alchemy
description: Panduan untuk menyebarkan kontrak cerdas menggunakan Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Ikhtisar {#overview}

Tutorial ini untuk pengembang yang baru dalam pengembangan blockchain Ethereum atau ingin memahami dasar-dasar penyebaran dan berinteraksi dengan kontrak cerdas. Ini akan berjalan Anda melalui pembuatan dan menyebarkan kontrak cerdas di jaringan uji Polygon Mumbai menggunakan walet cryptocurrency ([Metamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), dan [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Jika Anda memiliki pertanyaan atau kepedulian, silakan hubungi ke tim Alchemy melalui server [<ins>Discord resmi</ins>](https://discord.gg/gWuC7zB) mereka.

:::

## Yang akan Anda pelajari {#what-you-will-learn}

Untuk membuat kontrak cerdas dalam tutorial ini, Anda akan belajar cara menggunakan platform Alchemy untuk:
- Membuat aplikasi kontrak yang cerdas
- Periksa keseimbangan dompet.
- Verifikasi panggilan kontrak dalam sebuah penjelajah blockchain

## Yang Anda akan lakukan {#what-you-will-do}

Dengan mengikuti tutorial ini, Anda akan:
1. Mulai membuat aplikasi di Alchemy
2. Membuat alamat dompet dengan Metamask
3. Tambahkan keseimbangan ke dompet (menggunakan token uji)
4. Menggunakan Hardhat dan Ethers.js untuk mengompilasi dan menyebarkan proyek
5. Periksa status kontrak pada platform Alchemy

## Buat dan Sebarkan Kontrak Cerdas Anda {#create-and-deploy-your-smart-contract}

### Menyambung ke jaringan Polygon {#connect-to-the-polygon-network}

Ada beberapa cara untuk membuat permintaan ke rantai Polygon PoS. Alih-alih menjalankan node, Anda akan menggunakan akun gratis di platform pengembang Alchemy dan berinteraksi dengan Alchemy Polygon PoS API untuk berkomunikasi dengan rantai Polygon PoS. Platform terdiri dari suite penuh pengembang perkakas - ini termasuk kemampuan untuk memantau permintaan, analisis data yang menunjukkan apa yang terjadi di bawah tudung selama penyebaran kontrak pintar, API yang ditingkatkan (Transact, NFTs, dll), dan an SDK.

Jika Anda tidak sudah memiliki akun Alchemy, mulai dengan mendaftar untuk akun gratis [di sini](https://www.alchemy.com/polygon/?a=polygon-docs). Setelah membuat akun, Anda memiliki opsi untuk segera membuat aplikasi pertama sebelum mencapai dashboard.

![img](/img/alchemy/alchemy-dashboard.png)

### Buat App (dan tombol API) {#create-your-app-and-api-key}

Setelah berhasil membuat akun Alchemy, Anda harus menghasilkan kunci API dengan membuat aplikasi. Ini mengotentikasi permintaan yang dibuat ke testnet Polygon Mumbai. Jika Anda belum familier dengan testnet, lihat [panduan testnet ini](https://docs.alchemyapi.io/guides/choosing-a-network).

**Untuk menghasilkan** kunci API baru, menavigasi ke tab **Apps** pada batang navigasi dashboard Alchemy dan memilih sub-tab.

![img](/img/alchemy/create-app.png)

Sebutkan aplikasi baru Anda **Hello World**, menawarkan deskripsi singkat, pilih **Polygon** untuk rantai tersebut, dan pilih **Polygon Mumbai** untuk jaringan Anda.

Akhirnya, klik pada **Buat aplikasi**. Aplikasi baru harus muncul di tabel di bawah ini.

### Membuat alamat Wallet {#create-a-wallet-address}

Polygon PoS adalah larutan skala 2 untuk Ethereum. Oleh karena itu, kita perlu dompet Ethereum dan menambahkan URL Polygon yang kustom untuk mengirim dan menerima transaksi pada testnet Mumbai Polygon. Untuk tutorial ini, kami akan menggunakan MetaMask, dompet yang kompatibel dengan browser yang digunakan untuk mengelola alamat dompet. Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, lihat [panduan transaksi ini](https://ethereum.org/en/developers/docs/transactions/) oleh Ethereum Foundation.

Untuk mendapatkan urL Polygon RPC dari Alchemy, pergi ke aplikasi **Hello World** Anda di dashboard Alchemy dan klik **Lihat Kunci** di sudut kanan atas. Kemudian salin kunci API HTTP Alchemy.

![img](/img/alchemy/view-key.png)

Anda dapat mengunduh dan membuat akun Metamask secara gratis [di sini](https://metamask.io/download.html). Setelah Anda membuat sebuah akun, ikuti langkah-langkah ini untuk mengatur jaringan Polygon PoS di dompet.

1. Pilih **Pengaturan** dari menu drop-down di sudut kanan atas dompet MetaMask.
2. Pilih **Jaringan** dari menu ke kiri.
3. Sambungkan dompet Anda ke Testnet Mumbai menggunakan parameter berikut:

**Nama Jaringan:** Polygon Mumbai Testnet

**URL RPC baru:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**ChainID:** 80001

**Simbol:** MATICE

**Block Explorer URL:** https://mumbai.polygonscan.com/


### Tambahkan MATIK Tes Mumbai Polygon {#add-polygon-mumbai-test-matic}

Anda akan membutuhkan beberapa token testnet untuk menyebarkan kontrak cerdas Anda ke testnet Mumbai. Untuk mendapatkan token testnet (testnet token) pergi ke [Perhimpunan Mumbai Polygon](https://faucet.polygon.technology/)**** Mumbai, pilih Mumbai, pilih **Token MATIC**, dan masukkan alamat walet Polygon, kemudian **klik**. Karena lalu lintas jaringan, mungkin butuh waktu untuk menerima token testnet Anda.

Anda juga dapat menggunakan [faucet. Mumbai bebas](https://mumbaifaucet.com/?a=polygon-docs) Alchemy.

![img](/img/alchemy/faucet.png)

Anda akan melihat token testnet di akun MetaMask Anda beberapa saat kemudian.

### Periksa Balasan Wallet-mu. {#check-your-wallet-balance}

Untuk memastikan saldo kita ada di sana, mari lakukan permintaan [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) menggunakan [alat komposer Alchemy](https://composer.alchemyapi.io/). Pilih **Polygon** sebagai rantai tersebut, **Polygon Mumbai** sebagai jaringan, `eth_getBalance`sebagai metode dan masukan alamat Anda. Ini akan menampilkan jumlah MATIC di dompet kita. Lihat [video ini](https://youtu.be/r6sjRxBZJuU) untuk instruksi tentang cara menggunakan alat komposer.

![img](/img/alchemy/get-balance.png)

Setelah Anda memasukkan alamat akun MetaMask dan klik **Kirim Permintaan Pengiriman**, Anda harus melihat respon yang terlihat seperti ini:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Hasil ini dalam Wei, bukan ETH. Wei adalah denominasi terkecil dari Ether. Konversi dari Wei ke Ether adalah: 1 Ether = 10^18 Wei. Jadi, jika kita mengonversi "0xde0b6b3a7640000" ke desimal, kita mendapatkan 1\*10^18, yang sama dengan 1 ETH. Ini dapat dipetakan ke 1 MATIC berdasarkan denominasi.

:::

### Inisialisasi proyek {#initialize-your-project}

Pertama, kita akan perlu membuat folder untuk proyek. Bernavigasi ke [baris perintah](https://www.computerhope.com/jargon/c/commandi.htm) Anda dan ketikkan:

```bash
mkdir hello-world
cd hello-world
```

Karena kita ada di dalam folder proyek, kita akan menggunakan `npm init` untuk menginisiasi proyek. Jika Anda belum menginstal npm, ikuti [instruksi ini](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kita juga akan membutuhkan Node.js, maka unduh itu juga!).

```bash
npm init # (or npm init --yes)
```

Tidak terlalu penting bagaimana Anda menjawab pertanyaan instalasi, berikut cara melakukannya sebagai referensi:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Setujui package.json dan kita siap melanjutkan!

### Unduh [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat adalah lingkungan pengembangan untuk mengompilasi, menyebarkan, menguji, dan melakukan debug perangkat lunak Ethereum. Ini membantu pengembang ketika membangun kontrak cerdas dan dApp secara lokal sebelum menyebarkannya ke rantai aktif.

Di dalam proyek `hello-world`kami, jalan:

```bash
npm install --save-dev hardhat
```

Periksa halaman ini untuk perincian lebih lanjut tentang [instruksi instalasi](https://hardhat.org/getting-started/#overview).

### Buat proyek Hardhat {#create-hardhat-project}

Di dalam folder proyek `hello-world`, jalankan:

```bash
npx hardhat
```

Anda harus melihat pesan dan opsi untuk memilih apa yang ingin Anda lakukan. Pilih **membuat hardhat.config.js**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Ini akan menghasilkan `hardhat.config.js`file untuk kita, yang mana kita akan menentukan semua set untuk proyek kami.

### Menambahkan folder projek {#add-project-folders}

Untuk menjaga proyek terorganisir, kita akan membuat dua folder baru. Bernavigasilah ke direktori root dari proyek `hello-world` di baris perintah dan ketikkan:

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` adalah tempat menyimpan file kode kontrak cerdas hello world
* `scripts/` adalah tempat menyimpan skrip untuk disebarkan dan berinteraksi dengan kontrak

### Tulis kontrak {#write-the-contract}

Buka proyek **hello-world** di editor favorit, seperti [VSCode](https://code.visualstudio.com). Kontrak cerdas ditulis dalam bahasa yang disebut Solidity yang akan digunakan untuk menulis kontrak `HelloWorld.sol`cerdas kami..

1. Navigasi ke `contracts`folder dan membuat file baru yang disebut`HelloWorld.sol`
2. Di bawah ini adalah sampel kontrak cerdas Hello World dari [Ethereum Foundation](https://ethereum.org/en/) yang akan kita gunakan untuk tutorial ini. Salin dan tempel konten di bawah ini ke file `HelloWorld.sol` dan pastikan membaca komentar untuk memahami apa kegunaan kontrak ini:

```solidity
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Ini adalah kontrak cerdas super sederhana yang menyimpan pesan setelah pembuatan dan dapat diperbarui dengan memanggil fungsi `update`.

### Berhubungan dengan MetaMask & Alchemy {#connect-with-metamask-alchemy}

Kita telah membuat dompet Metamask, akun Alchemy, dan menulis kontrak cerdas, sekarang waktunya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual memerlukan tanda tangan yang menggunakan kunci privat yang unik. Untuk memberikan izin ini pada program, kita dapat menyimpan kunci privat (dan kunci API Alchemy) dengan aman dalam suatu file lingkungan.

Pertama, instal paket dotenv di direktori proyek:

```bash
npm install dotenv --save
```

Kemudian, buat file `.env` dalam direktori root proyek dan tambahkan kunci privat Metamask serta HTTP Alchemy API URL ke sana.

:::warning Peringatan:

File lingkungan Anda harus diberi nama `.env`atau tidak akan diakui sebagai file lingkungan. Jangan memberinya nama `process.env`, `.env-custom`, atau yang lainnya.

Juga, jika Anda menggunakan sistem kontrol versi seperti git untuk mengelola proyek Anda, harap **jangan** lacak `.env`file. `.env`Tambahkan ke `.gitignore`file Anda untuk menghindari penerbitan data rahasia.

:::

* Ikuti [instruksi ini](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) untuk mengekspor kunci privat
* Untuk mendapatkan kunci Alchemy HTTP API (URL), menavigasi ke aplikasi **Hello World** Anda di dashboard dan klik **View Key** di sudut kanan atas.

`.env` akan terlihat seperti ini:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Untuk benar-benar menghubungkan ini ke kode kami, kami akan merujuk variabel ini dalam `hardhat.config.js`file kami nanti dalam tutorial ini.

### Pasang Ethers.js {#install-ethers-js}

Ethers.js adalah pustaka yang memudahkan untuk berinteraksi dan membuat permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) menggunakan metode yang lebih ramah pengguna.

Hardhat mempermudah integrasi [plugin](https://hardhat.org/plugins/) untuk peralatan tambahan dan perluasan fungsi. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) untuk penyebaran kontrak. [Ethers.js](https://github.com/ethers-io/ethers.js/) memiliki metode penyebaran kontrak yang berguna.

Dalam direktori projek Anda, jenis:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Kita juga akan memerlukan ethers di `hardhat.config.js` pada langkah berikutnya.

### Mutakhirkan hardhat.config.js {#update-hardhat-config-js}

Kami telah menambahkan beberapa dependensi dan plugin sejauh ini. Sekarang kita perlu memperbarui `hardhat.config.js`sehingga proyek kita mengakui dependensi tersebut.

Perbarui `hardhat.config.js` agar terlihat seperti ini:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Kompile Kontrak Cerdas kami {#compile-our-smart-contract}

Untuk memastikan semuanya berfungsi sejauh ini, mari kita kompilasi kontrak. Tugas `compile` adalah salah satu tugas hardhat bawaan.

Dari baris perintah, jalankan:

```bash
npx hardhat compile
```

Anda mungkin mendapatkan peringatan `SPDX license identifier not provided in source file`tentang tetapi aplikasi mungkin masih bekerja. Jika tidak, Anda selalu dapat menulis pesan di [Discord Alchemy](https://discord.gg/u72VCg3).

### Tulis skrip kita {#write-our-deploy-script}

Setelah kontrak tertulis dan file konfigurasi siap, waktunya menulis skrip penyebaran kontrak.

Bernavigasilah ke folder `scripts/` dan buat file baru yang disebut `deploy.js`, dengan menambahkan konten berikut ke dalamnya:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Kita telah mengadopsi penjelasan tim Hardhat tentang kegunaan setiap baris kode ini dari [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) di sini.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Suatu `ContractFactory` di ethers.js adalah abstraksi untuk menyebarkan kontrak cerdas yang baru, sehingga `HelloWorld` di sini adalah [pabrik](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) untuk instans kontrak hello world kita. Ketika menggunakan `ContractFactory` plugin `hardhat-ethers` dan `Contract`, instans terhubung ke penandatangan pertama (pemilik) secara default.

```javascript
const hello_world = await HelloWorld.deploy();
```

Memanggil `deploy()` pada suatu `ContractFactory` akan memulai penyebaran dan memberikan `Promise` yang memutuskan suatu objek `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak cerdas.

### Menyebarkan Kontrak Cerdas kami {#deploy-our-smart-contract}

Bernavigasi ke baris perintah dan jalankan:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Anda harus melihat sesuatu seperti ini:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Jika kita pergi ke [Penjelajah Mumbai Polygon](https://mumbai.polygonscan.com/) dan mencari alamat kontrak kami, kita harus dapat melihat bahwa itu telah dikerahkan dengan sukses.

`From`Alamat harus cocok dengan alamat akun MetaMask dan `To`alamat akan mengatakan **Creation Kontrak.** Tapi jika kita klik ke transaksi, kita akan lihat alamat kontrak di `To`lapangan.

![img](/img/alchemy/polygon-scan.png)

### Memverifikasi kontrak {#verify-the-contract}

Alchemy menyediakan [seorang penjelajah](https://dashboard.alchemyapi.io/explorer) di mana Anda dapat menemukan informasi tentang metode yang disebarkan bersama dengan kontrak yang cerdas, seperti waktu respon, status HTTP, kode kesalahan antara lain. Ini adalah lingkungan yang baik untuk memverifikasi kontrak dan memeriksa apakah transaksi berhasil.

![img](/img/alchemy/calls.png)

**Selamat! Anda baru saja menyebarkan kontrak yang cerdas ke jaringan Polygon Mumbai.**

## Sumber Daya Tambahan {#additional-resources}

- [Bagaimana untuk Mengembangkan Sebuah NFT Smart Contract](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) - Alchemy memiliki tutorial tertulis dengan video Youtube pada topik ini. Ini adalah minggu 1 dari seri bebas 10 minggu **Jalan ke Web3**
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) - Panduan pengembang Alchemy untuk bangun dan berjalan dengan Polygon
