---
id: truffle
title: Menyebarkan Kontrak Cerdas Menggunakan Truffle
sidebar_label: Using Truffle
description:  Gunakan Truffle untuk menyebarkan Kontrak Cerdas pada Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Ikhtisar {#overview}

[Truffle](https://trufflesuite.com/) adalah lingkungan pengembangan blockchain, yang dapat Anda gunakan untuk membuat dan menguji kontrak cerdas dengan memanfaatkan Mesin Virtual Ethereum. Panduan ini bertujuan untuk mengajarkan cara membuat kontrak yang cerdas menggunakan Truffle dan menyebarkannya di Jaringan Polygon yang kompatibel.

:::note

Tutorial ini adalah versi yang diadaptasi dari artikel [<ins>panduan</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) Truffle.

:::

## Yang Anda akan lakukan {#what-you-will-do}

- Menginstal dan menyiapkan Truffle
- Menyebarkan kontrak di Jaringan Polygon
- Periksa status penyebaran pada Polygonscan

## Prasyarat {#prerequisites}

Ada beberapa persyaratan teknis sebelum kita memulai. Instal berikut ini:

- [Node.js v8+ LTS dan npm](https://nodejs.org/en/) (dikemas dengan Node)
- [Git](https://git-scm.com/)

Setelah semua itu dipasang, kita hanya perlu satu perintah untuk menginstal Truffle:

```
npm install -g truffle
```

Untuk memverifikasi bahwa Truffle terpasang dengan baik, tipe `truffle version`pada sebuah terminal. Jika Anda melihat sebuah kesalahan, pastikan bahwa modul npm ditambahkan ke jalur Anda.

## Membuat proyek {#creating-a-project}

### Proyek MetaCoin {#metacoin-project}

Kita akan menggunakan salah satu boilerplate Truffle yang dapat ditemukan di halaman [Truffle Box](https://trufflesuite.com/boxes/). [MetaCoin box](https://trufflesuite.com/boxes/metacoin/) membuat token yang dapat ditransfer antara beberapa akun.

1. Mulai dengan membuat direktori baru untuk proyek Truffle:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Unduh MetaCoin box:

  ```bash
  truffle unbox metacoin
  ```

Dengan langkah terakhir itu, Anda telah membuat proyek Truffle yang melengkapi folder dengan kontrak, pengerahan, pengujian, dan file konfigurasi.

Ini adalah data kontrak cerdas dari file `metacoin.sol`:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

Perhatikan bahwa ConvertLib akan diimpor tepat setelah pernyataan `pragma`. Dalam proyek ini, sebenarnya ada dua kontrak cerdas yang akan disebarkan di akhir: yang pertama adalah Metacoin yang berisi semua logika kirim dan saldo; yang kedua adalah ConvertLib, pustaka yang digunakan untuk mengubah nilai.

:::

### Menguji Kontrak {#testing-the-contract}

Anda dapat menjalankan tes Solidity dan Javascript.

1. Dalam terminal, jalankan tes Solidity:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Anda harus melihat keluaran berikut:

![img](/img/truffle/test1.png)

2. Jalankan tes JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Anda harus melihat keluaran berikut:

![img](/img/truffle/test2.png)

### Mengompilasi kontrak {#compiling-the-contract}

Kompilasi kontrak cerdas menggunakan perintah berikut:

```bash
truffle compile
```

Anda akan melihat keluaran berikut:

![img](/img/truffle/compile.png)

### Mengonfigurasi kontrak cerdas {#configuring-the-smart-contract}

Sebelum benar-benar menyebarkan kontrak, Anda harus menyiapkan file `truffle-config.js`, yang memasukkan data jaringan dan pengompilasi.

Pergi ke `truffle-config.js`dan perbarui file dengan rincian jaringan Polygon Mumbai.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Perlu diperhatikan bahwa mnemonic akan diteruskan untuk `maticProvider`. Ini adalah frasa benih (atau kunci pribadi) untuk akun yang ingin Anda hasilkan dari. Buat file `.secret` baru di direktori root dan masukkan seed phrase mnemonik 12 kata untuk memulai. Untuk mendapatkan kata-kata benih dari dompet MetaMask, Anda dapat pergi ke pengaturan MetaMask, kemudian dari menu, pilih **Security and Privacy** dimana Anda akan melihat tombol yang mengatakan **mengungkapkan kata-kata benih**.

### Menyebarkan di Jaringan Polygon {#deploying-on-polygon-network}

Tambahkan MATIC ke dompet Anda menggunakan [Faucet](https://faucet.polygon.technology/). Selanjutnya, jalankan perintah ini dalam folder root dari direktori projek:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Ingat `address`Anda `transaction_hash`dan rincian lain yang disediakan akan berbeda. Contoh di atas hanya untuk memberikan gagasan struktur.

:::

**Selamat!  Anda telah berhasil melakukan Kontrak Cerdas menggunakan Truffle.** Sekarang Anda dapat berinteraksi dengan kontrak dan juga memeriksa status penyebaran di [Polygonscan](https://mumbai.polygonscan.com/).
