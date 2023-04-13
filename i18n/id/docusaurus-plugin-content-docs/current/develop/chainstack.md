---
id: chainstack
title: Menyebarkan Kontrak Cerdas Menggunakan Chainstack dan Chainstack
sidebar_label: Using Chainstack
description:  Gunakan Chainstack dan Foundry untuk mengembangkan Kontrak Cerdas pada Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Ikhtisar {#overview}

Bagian ini membimbing Anda melalui penyebaran kontrak Hello World menggunakan [Chainstack](https://chainstack.com/build-better-with-polygon/) dan [Foundry](https://github.com/gakonst/foundry/) di testnet Mumbai.

Chainstack menyediakan infrastruktur untuk aplikasi berbasis Ethereum dan blockchain lainnya. Mereka mempertahankan node dan menjamin hubungan mereka ke jaringan dan juga menawarkan antarmuka untuk berinteraksi dengan mainnet dan testnet.

Foundry adalah kit peralatan cepat untuk pengembangan aplikasi Ethereum yang ditulis dalam Rust. Ini menyediakan pengujian, interaksi dengan kontrak cerdas EVM, mengirim transaksi, dan pengambilan data blockchain.

:::tip

Jika Anda memiliki pertanyaan, hubungi dalam server [<ins>Discord</ins>](https://discord.com/invite/Cymtg2f7pX) Chainstack.

:::

## Yang akan Anda pelajari {#what-you-will-learn}

Membuat kontrak Hello World, menggunakan Chainstack untuk menyebarkan node Polygon dan Foundry untuk menyebarkan kontrak tersebut.

## Yang Anda akan lakukan {#what-you-will-do}

1. Menyebarkan node Polygon menggunakan Chainstack
2. Mengatur Foundry
3. Menbuat kontrak cerdas
4. Menyebarkan kontrak cerdas.

## Menyebarkan Node Polygon Mumbai {#deploy-a-polygon-mumbai-node}

Anda perlu node untuk menyebarkan kontrak cerdas ke jaringan blockchain. Ikuti langkah di bawah untuk mendapatkan node up dan berjalan:

**Langkah 1 →** Menandatangani dengan [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Langkah 2 →** Ikuti instruksi tentang cara [menyebarkan node Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

Langkah **3 →** [Dapatkan titik akhir HTTPS yang disebarkan](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Menginstal Foundry {#install-foundry}

Foundry adalah kit peralatan pengembangan untuk bekerja dengan kontrak cerdas. Untuk mulai bekerja dengannya, Anda harus menginstal bahasa pemrograman Rust terlebih dahulu.

1. [Menginstal Rust](https://www.rust-lang.org/tools/install).
1. [Menginstal Foundry](https://github.com/gakonst/foundry/).

## Menginisiasi dengan Foundry {#initialize-with-foundry}

Untuk membuat proyek boilerplate, bernavigasilah ke direktori kerja Anda dan jalankan:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Danai Akun Anda {#fund-your-account}

Anda akan memerlukan akun dompet untuk menyebarkan kontrak cerdas. Anda dapat menggunakan [Metamask](https://metamask.io/) untuk itu. Anda juga harus membayar gas di jaringan untuk menyebarkan kontrak. Salin saja alamat dompet Anda dan mendapatkan tanda MATIK Mumbai [melalui faucet](https://faucet.polygon.technology/).

## Membuat kontrak Hello World {#create-the-hello-world-contract}

Dalam proyek Foundry yang diinisiasi dalam `src/`, buat `HelloWorld.sol`:

```
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

## Menyebarkan Kontrak {#deploy-the-contract}

Saat ini, Anda siap menyebarkan kontrak:

* Anda memiliki node di jaringan Polygon Mumbai untuk menyebarkan kontrak.
* Anda memiliki Foundry yang akan digunakan untuk menyebarkan kontrak.
* Anda memiliki akun yang sudah didanai untuk menyebarkan kontrak.

Untuk menyebarkan kontrak, jalankan:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Di sini,

* CONTRACT_PATH — jalur ke file `HelloWorld.sol` Anda.
* PRIVATE_KEY — kunci privat dari akun Anda.
* HTTPS_ENDPOINT — [titik akhir node Anda](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Contoh:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Anda selalu dapat memeriksa penyebaran kontrak di [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) menggunakan hash yang baru dihasilkan dari langkah terakhir.

:::

## Menguji Kontrak {#test-the-contract}

Ada perintah `forge test` seandainya Anda harus memeriksa apakah kontraknya bekerja dengan baik. Foundry menyediakan banyak [opsi](https://book.getfoundry.sh/reference/forge/forge-test) (bendera) untuk pengujian yang lebih spesifik. Pelajari lebih lanjut tentang ujian penulisan, ujian tingkat lanjut, dan fitur lainnya di [dokumentasi Foundry](https://book.getfoundry.sh/forge/tests).

**Selamat! Anda telah menyebarkan kontrak pintar Dunia Hello di Polygon.**

Lihat juga dokumen Chainstack untuk [<ins>tutorial</ins>](https://docs.chainstack.com/tutorials/polygon/) dan [<ins>peralatan</ins>](https://docs.chainstack.com/operations/polygon/tools) terkait Polygon lainnya.
