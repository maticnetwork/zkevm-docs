---
id: hardhat
title: Menyebarkan Kontrak Cerdas Menggunakan Hardhat
sidebar_label: Using Hardhat
description: Gunakan Hardhat untuk menyebarkan Kontrak Cerdas pada Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Ikhtisar {#overview}

Hardhat adalah lingkungan pengembangan Ethereum yang menyediakan cara mudah untuk menyebarkan kontrak pintar, menjalankan tes dan kode Soliditas secara lokal.

Dalam tutorial ini, Anda akan belajar cara menyiapkan Hardhat dan menggunakannya untuk membangun, melakukan tes, dan menyebarkan kontrak cerdas sederhana.

### Yang Anda akan lakukan {#what-you-will-do}

- Menyiapkan Hardhat
- Membuat kontrak cerdas sederhana
- Mengompilasi kontrak
- Melakukan tes atas kontrak
- Menyebarkan kontrak

## Menyiapkan lingkungan pengembangan {#setting-up-the-development-environment}

Ada beberapa persyaratan teknis sebelum kita memulai. Instal berikut ini:

- [Node.js v10+ LTS dan npm](https://nodejs.org/en/) (tersedia dengan Node)
- [Git](https://git-scm.com/)

Setelah kita menginstal itu semua, Anda harus membuat proyek npm dengan membuka sebuah folder kosong, yang menjalankan `npm init`, dan mengikuti instruksi untuk menginstal Hardhat. Setelah proyek siap, Anda harus menjalankan:

```bash
npm install --save-dev hardhat
```

Untuk membuat proyek Hardhat, jalankan `npx hardhat` di folder proyek.
Mari kita buat proyek contoh dan melakukan langkah-langkah ini untuk mencoba melakukan tugas sampel dan mengompilasi, menguji, dan menyebarkan kontrak sampel.

:::note

Proyek sampel yang digunakan di sini berasal dari [<ins>panduan Hardhat Quickstart</ins>](https://hardhat.org/getting-started/#quick-start), begitu juga dengan instruksinya.

:::

## Membuat proyek {#creating-a-project}

Untuk membuat proyek sampel, jalankan `npx hardhat` di folder proyek Anda. Anda harus melihat prompt berikut:

![img](/img/hardhat/quickstart.png)

Pilih proyek JavaScript dan lakukan langkah-langkah ini untuk mengompilasi, menguji, dan menyebarkan kontrak sampel.

### Memeriksa kontrak {#checking-the-contract}

Folder `contracts` berisi `Lock.sol`, yang merupakan kontrak sampel yang terdiri dari kunci digital sederhana, yaitu pengguna hanya dapat menarik dana setelah periode waktu tertentu.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Menyiapkan kontrak {#setting-up-the-contract}

- Buka `hardhat.config.js`
- Perbarui `hardhat-config` dengan kredensial-jaringan-matic
- Buat file `.env` di root untuk menyimpan kunci privat
- Tambahkan kunci API Polygonscan ke file `.env` untuk memverifikasi kontrak di Polygonscan. Anda dapat menghasilkan kunci API dengan [membuat akun](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Perlu diperhatikan bahwa file di atas membutuhkan DOTENV untuk mengelola variabel lingkungan dan juga ether dan etherscan. Pastikan Anda menginstal semua paket itu.

Temukan instruksi lebih lanjut tentang cara menggunakan DOTENV di [<ins>halaman ini</ins>](https://www.npmjs.com/package/dotenv).

Anda dapat menyebarkan pada MATIC(Polygon mainnet) jika Anda mengubah polygon_mumbai berdasarkan MATIC.

:::

### Mengompilasi kontrak {#compiling-the-contract}

Untuk mengompilasi kontrak, Anda harus menginstal Hardhat Toolbox terlebih dahulu:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Kemudian, jalankan untuk mengompilasi:

```bash
npx hardhat compile
```

### Menguji Kontrak {#testing-the-contract}

Untuk menjalankan tes dengan Hardhat, Anda hanya perlu mengetikkan hal berikut:

```bash
npx hardhat test
```

Ini adalah hasil yang diharapkan:

![img](/img/hardhat/test.png)

### Menyebarkan di Jaringan Polygon {#deploying-on-polygon-network}

Jalankan perintah ini di root dari direktori proyek:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Kontrak akan disebarkan di Testnet Mumbai Matic dan Anda dapat memeriksa status penyebarannya di sini: https://mumbai.polygonscan.com/

**Selamat! Anda telah berhasil menyebarkan Kontrak Cerdas Greeter. Sekarang Anda bisa berinteraksi dengan Kontrak Cerdas.**

:::tip Verifikasi kontrak dengan cepat di Polygonscan

Jalankan perintah berikut untuk melakukan verifikasi kontrak dengan cepat di Polygonscan. Ini akan memudahkan siapa pun untuk melihat kode sumber dari kontrak Anda yang telah disebarkan. Untuk kontrak yang memiliki konstruktor dengan daftar argumen yang kompleks, lihat [di sini](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
