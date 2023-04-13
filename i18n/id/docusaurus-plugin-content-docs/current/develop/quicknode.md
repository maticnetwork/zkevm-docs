---
id: quicknode
title: Menyebarkan Kontrak Cerdas Menggunakan QuickNode
sidebar_label: Using QuickNode
description:  Menyebarkan Kontrak Cerdas pada Polygon menggunakan Brownie dan Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Ikhtisar {#overview}

Python adalah salah satu bahasa pemrograman yang paling serbaguna; dari peneliti menjalankan model tes mereka ke pengembang menggunakannya dalam lingkungan produksi yang berat, telah menggunakan kasus di setiap medan teknis.

Dalam tutorial ini, Anda akan belajar bagaimana menggunakan kerangka [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) untuk menulis dan menyebarkan kontrak cerdas dengan menggunakan node testnet [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) untuk Polygon.

:::tip

Untuk menghubungi tim dukungan Quicknode, kirim pesan atau tandai mereka di Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Prasyarat {#prerequisites}

- Python3 telah dipasang
- Sebuah node Polygon
- Penyunting Kode
- Antarmuka baris perintah

## Yang Anda akan lakukan {#what-you-will-do}

1. Menyiapkan Brownie
2. Mendapatkan akses ke node tes Quicknode
3. Mengompilasi dan menyebarkan kontrak cerdas
4. Periksa data kontrak yang dikerahkan

## Apa itu Brownie? {#what-is-brownie}

Pengembangan kontrak cerdas umumnya didominasi oleh pustaka berbasis JavaScript seperti [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/), dan [Hardhat](https://hardhat.org/). Python adalah bahasa yang sangat digunakan dan juga dapat digunakan untuk kontrak cerdas / pengembangan Web3; [web3.py](https://web3py.readthedocs.io/en/stable/) adalah perpustakaan Python yang memenuhi kebutuhan Web3. Framework dibuat di atas `web3.py`.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) adalah kerangka kerja berbasis Python untuk mengembangkan dan menguji kontrak cerdas. Brownie mempunyai dukungan untuk kontrak Solidity dan Vyper, bahkan menyediakan pengetesan kontrak melalui [pytest](https://github.com/pytest-dev/pytest).

Untuk menunjukkan proses penulisan dan penyebaran kontrak cerdas dengan Brownie, kita akan menggunakan [Brownie-mixes](https://github.com/brownie-mix) yang merupakan proyek templat. Secara khusus, kita akan menggunakan [campuran token](https://github.com/brownie-mix/token-mix) yang merupakan templat dari implementasi ERC-20.

## Instal dependensi {#install-dependencies}

Brownie dibangun di atas python3, sehingga perlu diinstal untuk bekerja dengan Brownie. Mari kita periksa apakah ada python3 yang terpasang di sistem kami. Untuk melakukannya, ketik berikut dalam alat baris perintah Anda:

```bash
python3 -V
```

Ini akan menampilkan versi python3 yang diinstal. Jika belum diinstal, unduh dan instal dari [situs python](https://www.python.org/downloads/) resmi.

Mari kita buat direktori proyek sebelum menginstal Brownie dan membuat direktori proyek menjadi direktori kerja saat ini:

```bash
mkdir brownieDemo
cd brownieDemo
```

Anda telah menginstal python3 di sistem, sekarang mari kita instal Brownie menggunakan pip, alat untuk mengelola paket Python. Pip mirip npm untuk JavaScript. Ketikkan berikut dalam baris perintah:

```bash
pip3 install eth-brownie
```

:::tip

Jika install gagal, Anda dapat menggunakan perintah berikut:`sudo pip3 install eth-brownie`

:::

Untuk memeriksa apakah Brownie diinstal dengan benar, tipe `brownie`dalam baris perintah Anda, dan itu harus memberikan keluaran berikut:

![img](/img/quicknode/brownie-commands.png)

Untuk mendapatkan mix token, hanya mengetik berikut dalam baris perintah:

```
brownie bake token
```

Ini akan membuat direktori baru `token/`di direktori `brownieDemo`kami.

### Struktur file {#file-structure}

Pertama, menavigasi ke `token`direktori:

```bash
cd token
```

Sekarang, buka `token`direktori dalam editor teks Anda. Di bawah `contracts/`folder yang akan Anda temukan, `Token.sol`yang merupakan kontrak utama kami. Anda dapat menulis kontrak Anda sendiri atau memodifikasi `Token.sol`file.

Di bawah `scripts/`folder, Anda akan menemukan skrip `token.py`Python. Skrip ini akan digunakan untuk menyebarkan kontrak, dan modifikasi diperlukan berdasarkan kontrak.

![img](/img/quicknode/token-sol.png)

Kontrak adalah kontrak ERC-20. Anda dapat mempelajari lebih lanjut tentang standar ERC-20 dan kontrak dalam panduan ini [pada token ERC-20](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token).

## Menampilkan node Polygon {#booting-your-polygon-node}

QuickNode memiliki jaringan global dari node testnet Polygon Mainnet dan Mumbai Mereka juga menjalankan [Polygon RPC yang bebas](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) tetapi jika Anda mendapatkan rate terbatas, Anda dapat mendaftar untuk [node pengadilan gratis dari QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Salin **URL HTTP**, yang akan berguna nanti dalam tutorial.

## Setup Network dan Account {#network-and-account-setup}

Kita harus mengatur titik akhir QuickNode dengan Brownie. Untuk melakukannya, ketik berikut dalam baris perintah:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Gantikan `YOUR_QUICKNODE_URL`dengan **URL HTTP Mumbai** yang baru saja kami terima ketika menaikkan titik Polygon kami.

Dalam perintah di atas, `Ethereum` adalah nama lingkungan dan `matic_mumbai` adalah nama kustom dari jaringan tersebut; Anda dapat memberikan nama apa pun ke jaringan kustom.

Hal berikutnya yang harus kita lakukan di sini adalah membuat dompet baru menggunakan Brownie, untuk melakukan hal berikut dalam baris perintah:

```
brownie accounts generate testac
```

Anda akan diminta untuk mengatur sandi untuk akun Anda! Setelah menyelesaikan langkah, ini akan menghasilkan akun bersama dengan frasa mnemonic, simpan offline. Nama `testac`ini adalah nama untuk akun kami (Anda dapat memilih nama apa pun yang Anda suka).

![img](/img/quicknode/new-account.png)

:::note

Frasa Mnemonic dapat digunakan untuk memulihkan akun atau mengimpor akun ke [<ins>dompet non-custodial</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) lainnya. Akun yang Anda lihat dalam gambar di atas baru dibuat untuk panduan ini.

:::

Salin alamat akun sehingga kita dapat mendapatkan beberapa MATIC, yang akan diperlukan untuk menyebarkan kontrak kami.

## Mendapatkan MATIK Testnet {#getting-testnet-matic}

Kita akan membutuhkan beberapa token MATIC untuk membayar biaya gas untuk menyebarkan kontrak cerdas kami.

Salin alamat akun Anda yang dihasilkan dalam tutorial ini, masukkan ke dalam bidang alamat [faucet, Polygon](https://faucet.polygon.technology/), dan klik pada **Submit**. Faucet akan mengirimkan MATIC tes 0.2.

![img](/img/quicknode/faucet.png)

## Menyebarkan Kontrak Cerdas Anda {#deploying-your-smart-contract}

Sebelum menyebarkan kontrak, Anda perlu mengkompilasi yang digunakan:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Sekarang buka `scripts/token.py`di editor teks Anda, dan buat perubahan berikut:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Penjelasan

Menggunakan kode di atas, kami memiliki `testac`akun yang telah kami buat sebelumnya, dan menyimpannya dalam `acct`variabel. Juga, dalam baris berikutnya, kami telah menyunting `'from':`bagian untuk menerima data dari `acct`variabel.

:::

Akhirnya, kami akan menyebarkan kontrak yang cerdas kami.

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`adalah nama jaringan ubahan yang kita buat sebelumnya. Prompt akan meminta Anda untuk **kata sandi** yang kita atur lebih awal ketika membuat akun.

Setelah menjalankan perintah di atas, Anda harus mendapatkan hash transaksi dan Brownie akan menunggu transaksi dikonfirmasi. Setelah itu, Brownie akan menampilkan alamat kontrak kita disebarkan di testnet Mumbai Polygon.

![img](/img/quicknode/brownie-run.png)

Anda dapat memeriksa kontrak yang disebarkan dengan menyalin dan menempel alamat kontrak di [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Menguji Kontrak {#testing-the-contract}

Brownie juga menawarkan opsi untuk menguji fungsi kontrak cerdas. Brownie menggunakan kerangka kerja `pytest` untuk menghasilkan tes unit dengan mudah. Anda dapat menemukan informasi lebih lanjut tentang penulisan tes di Bronwnie [di dokumentasi Brownie](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Beginilah kontrak disebarkan di Polygon menggunakan Brownie dan QuickNode.**

QuickNode, seperti Polygon, selalu memiliki pendekatan pendidikan yang menyediakan [panduan](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) pengembang, [dokumen](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [video tutorial](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) dan [komunitas pengembang Web3](https://discord.gg/DkdgEqE) yang ingin saling membantu.
