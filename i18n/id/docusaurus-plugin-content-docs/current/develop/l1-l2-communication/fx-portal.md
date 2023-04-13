---
id: fx-portal
title: FxPortal
description: Keadaan transfer atau data dari Ethereum ke Polygon tanpa pemetakan menggunakan FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mekanisme yang biasa untuk membaca data Ethereum dari Polygon adalah menggunakan **Sink Negara**. Ini memungkinkan transfer data sebarang dari Ethereum ke Polygon. Namun, pendekatan ini juga memerlukan pemetaan kontrak root dan anak jika antarmuka default tidak dapat digunakan. FxPortal menawarkan alternatif yakni token yang distandarisasi ERC dapat disebarkan tanpa pemetaan apa pun, cukup hanya menggunakan kontrak FxPortal dasar yang disebarkan.

## Apa itu FxPortal? {#what-is-fxportal}

Ini adalah implementasi yang kuat namun sederhana dari mekanisme [sinkronisasi keadaan](../../pos/state-sync/state-sync-mechanism.md) Polygon. Jembatan Polygon PoS dibangun pada arsitektur yang sama. Kode dalam folder [contohnya](https://github.com/fx-portal/contracts/tree/main/contracts/examples) adalah beberapa contoh penggunaan. Anda dapat dengan mudah menggunakan contoh ini untuk membangun implementasi atau jembatan kustom sendiri yang memungkinkan setiap state-sync tanpa pemetaan.

Anda dapat memeriksa [repositori GitHub](https://github.com/fx-portal/contracts) untuk kontrak dan contoh.

## Bagaimana cara kerjanya? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) dan [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) adalah kontrak utama yang dilakukan oleh FxPortal. Ini memanggil dan melewati data ke metode yang didefinisikan pengguna pada rantai lain tanpa memetakan menggunakan mekanisme sinkronisasi keadaan. Untuk menggunakan kontrak utama yang disebarkan, Anda dapat mengimplementasikan kontrak dasar FxPortal di kontrak cerdas yang Anda sebarkan - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) dan [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Dengan membangun kontrak ini, kontrak yang Anda sebarkan akan dapat berkomunikasi satu sama lain menggunakan mekanisme terowongan data.

Jika tidak, Anda dapat memilih untuk memetakan token dengan kontrak terowongan yang sudah disebarkan. Rincian penyebaran FxTunnel untuk Polygon Mainnet dan Mumbai Testnet sebagai berikut:

- [Mainnet Polygon](https://static.matic.network/network/mainnet/v1/index.json)
- [Testnet Mumbai](https://static.matic.network/network/testnet/mumbai/index.json)

Cari kata kunci `FxPortalContracts`dalam tautan di atas untuk menemukan semua kontrak terowongan default dan penyebaran kontrak penting FxPortal lainnya.

## Apakah saya perlu Implementasi FxTunnel? {#do-i-need-a-custom-fxtunnel-implementation}

Anda harus pergi untuk **pelaksanaan FxTunnel kustom** hanya jika implementasi terowongan default tidak sesuai dengan kasus pengguna. Ketika Anda menggunakan terowongan FxPortal default, Anda tidak dapat memodifikasi kode kontrak anak. bytecode untuk kontrak token anak selalu diperbaiki dan selalu tetap sama untuk [penyebaran FxTunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples). Jika Anda membutuhkan token anak kustom, Anda harus pergi untuk FxTunnel, dan membaca bagian berikutnya akan memandu Anda lebih banyak dalam menyebarkan FxTunnels kustom sendiri.

Ini sangat direkomendasikan untuk membaca dan memahami [Transfer Negara FxPortal](state-transfer.md) sebelum Anda membaca bagian yang akan datang. Setiap bagian yang akan datang akan memiliki contoh link kontrak terpasang ke dalamnya. Contoh-contoh ini dapat diambil sebagai referensi ketika membangun terowongan fx-tunnels.

## Transfer ERC20 {#erc20-transfer}

[Kontrak terowongan anak](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) dan root memungkinkan deposit token pada rantai root dan penarikan pada rantai anak.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Anda dapat memanggil fungsi pada kontrak yang disebarkan untuk memetakan token ERC20 dan membuat tanda anak yang sesuai pada rantai anak.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: call `deposit()`method dengan alamat token yang dipetakan , alamat yang dapat menarik dengan jumlah yang sesuai (bersama dengan data jika diperlukan). Anda harus menyetujui kontrak menggunakan fungsi `approve` ERC20 standar untuk membelanjakan token terlebih dahulu.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: Alamat yang ditugaskan dalam `deposit()`dapat menarik semua jumlah token anak menggunakan fungsi ini. Alamat akan menerima token anak yang dibuat ketika dipetakan pertama kali.
- `rootToChildToken`: Variabel publik ini berisi token root ke pemetaan token anak. Anda dapat meminta pemetaan dengan alamat token root untuk mengetahui alamat token anak yang telah disebarkan.

### Dari Ethereum → Polygon {#polygon}

1. Sebarkan token ERC20 di rantai root. Anda akan membutuhkan alamat ini nanti.
2. Setujui token untuk transfer dengan memanggil fungsi `approve()` token root dengan alamat terowongan root dan jumlah sebagai argumen.
3. Lanjutkan dengan memanggil `deposit()` pada alamat penerima dan jumlah di rantai root untuk menerima token anak yang setara di rantai anak. Ini juga akan memetakan token secara otomatis. Atau, Anda dapat memanggil `mapToken()` terlebih dahulu sebelum melakukan penyetoran.
4. Setelah pemetaan, Anda sekarang dapat melakukan transfer lintas rantai menggunakan `deposit`dan `withdraw`fungsi terowongan.

:::note

Setelah Anda telah melakukan `deposit()`pada rantai root, akan memakan waktu 22-30 menit untuk sinkronisasi dilakukan. Setelah sinkronisasi terjadi, Anda akan mendapatkan token yang disimpan di alamat yang diberikan.

:::

### Dari Polygon → Ethereum {#ethereum}

1. Lanjutkan untuk memanggil `withdraw()` dengan alamat token yang sesuai dan jumlah sebagai argumen di kontrak anak untuk memindahkan token anak kembali ke penerima yang ditunjuk di rantai root. **Catat hash tx**, karena itu akan digunakan untuk membuat bukti bakar.

2. Anda dapat menemukan langkah untuk menyelesaikan penarikan [di sini](#withdraw-tokens-on-the-root-chain).

## ERC721 Transfer {#erc721-transfer}

Dalam kasus Anda perlu contoh, silakan lihat pemandu [Perut dan Tunnels ERC721](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) ini.

### Dari Ethereum → Polygon {#polygon-1}

1. Sebarkan token ERC721 di rantai root. Anda akan membutuhkan alamat ini nanti.
2. Setujui token untuk transfer dengan memanggil fungsi `approve()` token root pada alamat terowongan root dan Token ID sebagai argumen.
3. Lanjutkan memanggil `deposit()` dengan alamat penerima dan ID token di rantai root untuk menerima token anak yang setara di rantai anak. Ini juga akan memetakan token secara otomatis. Atau, Anda dapat memanggil `mapToken()` terlebih dahulu sebelum melakukan penyetoran.

:::note

Setelah Anda telah melakukan `deposit()`pada rantai root, akan memakan waktu 22-30 menit untuk sinkronisasi dilakukan. Setelah sinkronisasi terjadi, Anda akan mendapatkan token yang disimpan di alamat yang diberikan.

:::

### Dari Polygon → Ethereum {#ethereum-1}

1. Lanjutkan memanggil `withdraw()` dengan alamat token yang sesuai dan token ID sebagai argumen di kontrak anak untuk memindahkan token anak kembali ke penerima yang ditunjuk di rantai root. **Perhatikan hash tx** akan digunakan untuk menghasilkan pembakaran pembakaran.

2. Anda dapat menemukan langkah untuk menyelesaikan penarikan [di sini](#withdraw-tokens-on-the-root-chain).

## Transfer ERC1155 {#erc1155-transfer}

Dalam kasus Anda perlu contoh, silakan lihat pemandu [Terowongan Root dan Child](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) ERC1155.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Digunakan untuk memetakan token ERC1155 root ke rantai anak
- `deposit(rootToken, user, id, amount, data)`: Fungsi yang digunakan untuk menyetorkan token root ke rantai anak
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: Digunakan untuk beberapa token Id dan jumlah token yang sesuai
- `receiveMessage(inputData)`: Akan dipanggil setelah bukti bakar telah dibuat dengan payload sebagai `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Digunakan untuk menarik token dari Polygon ke Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: Sama dengan penarikan tetapi untuk menarik beberapa token Id

### Dari Ethereum → Polygon {#polygon-2}

1. Sebarkan token ERC1155 di rantai root. Anda akan membutuhkan alamat ini nanti.
2. `setApprovalForAll(operator, approved)`Panggil token yang disebarkan dengan `FxERC1155RootTunnel`alamat untuk `operator`memungkinkan `FxERC1155RootTunnel`transfer token ke `FxERC1155ChildTunnel`Polygon.
3. Panggilan `mapToken()``FxERC1155RootTunnel`dengan alamat token yang disebarkan sebagai`rootToken` Ini akan mengirim pesan untuk `FxERC1155ChildTunnel`menginstruksikan dan memetakan token ERC1155 di Polygon. Untuk menguaskan alamat token anak Anda, `rootToChildToken`panggil.`FxERC1155ChildTunnel`
4. `deposit()`Panggil `FxERC1155RootTunnel`dengan alamat tanda di Ethereum sebagai `rootToken`penerima sebagai `user`tanda tanda id `id`dan jumlah seperti .`amount` Atau, Anda dapat juga memanggil `depositBatch()` untuk beberapa Id token.

:::note

Setelah Anda telah melakukan `deposit()`pada rantai root, akan memakan waktu 22-30 menit untuk sinkronisasi dilakukan. Setelah sinkronisasi terjadi, Anda akan mendapatkan token yang disimpan di alamat yang diberikan.

:::

### Dari Polygon → Ethereum {#ethereum-2}

1. Panggilan `withdraw()``FxERC1155ChildTunnel`dengan alamat token anak yang disebarkan di Polygon sebagai `childToken`dan tanda id seperti `id`(alamat token dapat dikueri dari `rootToChildToken`pemetaan). Atau, Anda juga dapat memanggil `withdrawBatch()` untuk beberapa Id token dan jumlah yang sesuai. **Perhatikan hash tx** akan digunakan untuk menghasilkan pembakaran pembakaran.

2. Anda dapat menemukan langkah untuk menyelesaikan penarikan [di sini](#withdraw-tokens-on-the-root-chain).

## Menarik Token pada Root Chain {#withdraw-tokens-on-the-root-chain}

:::info

Setelah Anda telah melakukan `withdraw()`pada rantai anak akan memakan waktu 30-90 menit untuk titik pemeriksaan terjadi. Setelah pos pemeriksaan berikutnya termasuk transaksi burn, Anda dapat menarik token pada rantai root.

:::

1. Buat pembakaran pembakaran menggunakan **hash tx** dan **MESSAGE_SENT_EVENT_SIG**. Untuk menghasilkan bukti, Anda dapat menggunakan API generasi bukti yang diselenggarakan oleh Polygon atau Anda juga dapat memutar API pembuktian Anda sendiri dengan mengikuti instruksi [di sini](https://github.com/maticnetwork/proof-generation-api).

Titik akhir pembuka yang dibawakan oleh Polygon tersedia [di sini.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`adalah hash transaksi dari `withdraw()`transaksi yang Anda inisiasi pada Polygon.
  - `eventSignature`adalah tanda tangan peristiwa yang dipancarkan oleh `withdraw()`fungsi. Tanda tangan peristiwa untuk MESSAGE_SENT_EVENT_SIG adalah `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Pembuka penggunaan API untuk Mainnet dan Testnet adalah sebagai berikut:

→ [Polygon Mainnet Proof Generasi](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Pembuka Proof Mumbai Testnet Proof Generation](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Memberi makan payload yang dihasilkan sebagai argumen untuk `receiveMessage()`dalam kontrak terowongan root masing-masing di Goerli atau Ethereum.

## Transfer ERC-20 yang Dapat Dicetak {#mintable-erc-20-transfer}

Dalam kasus Anda perlu contoh, silakan lihat Panduan [Root ERC20 dan Tunnels Mintable](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) ini.

:::info

Dalam kasus Mintable Token FxTunnels, token anak akan disebarkan terlebih dahulu dan token root digunakan hanya ketika proses penarikan / keluar selesai. Alamat kontrak token root dapat ditentukan tepat setelah kontrak anak dikerahkan, tetapi pemetaan secara teknis akan ada ketika penarikan/keluar selesai.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Untuk menyetor token dari Ethereum ke Polygon
- `receiveMessage(bytes memory inputData)`: Bukti bakar yang akan dimasukkan sebagai `inputData` untuk menerima token di rantai root

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Untuk menyebarkan tanda ERC20 di jaringan Polygon
- `mintToken(address childToken, uint256 amount)`: Mencetak token dalam jumlah tertentu di Polygon
- `withdraw(address childToken, uint256 amount)`: Untuk membakar token di rantai anak guna melakukan penarikan di rantai root

### Menampilkan Token di Polygon {#minting-tokens-on-polygon}

1. Panggil `deployChildToken()` di `FxMintableERC20ChildTunnel` dan berikan informasi token yang diperlukan sebagai parameter. Ini akan menghasilkan peristiwa `TokenMapped` yang berisi alamat `rootToken` dan alamat `childToken`. Catat alamat-alamat tersebut.
2. Panggil `mintToken()` pada `FxMintableERC20ChildTunnel` untuk mencetak token di rantai anak.
3. Panggil `withdraw()` pada `FxMintableERC20ChildTunnel` untuk menarik token dari Polygon. Perhatikan hash transaksi karena ini akan berguna untuk menghasilkan pembakaran pembakaran.
4. Anda dapat menemukan langkah untuk menyelesaikan penarikan [di sini](#withdraw-tokens-on-the-root-chain).

### Menarik gambar Token di Ethereum {#withdrawing-tokens-on-ethereum}

Masukkan bukti bakar yang dihasilkan sebagai argumen untuk `receiveMessage()` di `FxMintableERC20RootTunnel`. Setelah ini, saldo token akan tercermin di rantai root.

### Deposit Tokens kembali ke Polygon {#deposit-tokens-back-to-polygon}

1. Pastikan Anda menyetujui `FxMintableERC20RootTunnel` untuk mentransfer token.
2. Panggil `deposit()` di `FxMintableERC20RootTunnel` dengan `rootToken` sebagai alamat token root dan `user` sebagai penerima.
3. Tunggu event sinkronisasi (22-30 min). Setelah ini, Anda dapat melakukan kueri saldo penerima target di rantai anak.

Contoh **ERC721** dan **ERC1155** Mintable FxTunnel adalah sebagai berikut:

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Contoh penyebaran {#example-deployments}

### Goerli {#goerli}

- Checkpoint Manager: [0x2890bA17EfE978848080615e30ecB6533b80928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 token: [0xe9c7873f81c815d64c71c2233462cb175e4765bb3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- [FxERC20RootTunnel:](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961) 0x3658cFDE5e9629b0805EB06ACFc42416850961
- [FxMintableERC20RootTunnel: 0xA2000766a76a7D64E54611E22A6c1f870aCb63ccc](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- [Dummy](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA) ERC721 token: 0x73594a053cb5ddDE558268d28a7437C4E23dA
- [FxERC721RootTunnel:](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de) 0xF9bc4a80464E483636930319645e876C7D972
- [Dummy](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E) ERC1155 Token: 0x1906d395752FE0c930f8d061DFeb785eBE6f0B4E
- [FxERC1155RootTunnel](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48) : 0x48DE78597070ca6eD289315036B6d18788cF9Df44

### Mumbai {#mumbai}

- [FxERC20: 0xDDE69724AEFBdb08413719fE745aB6e3b05C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- [FxERC20ChildTunnel:](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767) 0x9C37aEbdd337E0215BC40152d6689DaF9c767
- [FxMintableERC20ChildTunnel:](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9) 0xA2C7eBEf68B444056b4A39C2384275C56e9
- Token Anak ERC20 Contoh: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- [FxERC721:](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726) 0xf2720920920927E0487267C0221ffA41A885048726
- [FxERC721ChildTunnel:](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961) 0x3658cFDE5e9629b0805EB06ACFc4241685091
- [FxERC1155:](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C) 0x80be8Cf927047A40d3f5791BF7436D85b3Ae5C
- [FxERC11555ChildTunnel:](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc) 0x3A0f900d39005005005000500050150050500505550250250250050505005005050050505

Penempatan Mainnet yang sesuai dapat ditemukan [di sini](https://static.matic.network/network/mainnet/v1/index.json). Cari kata kunci `FxPortalContracts`untuk menemukan semua kontrak terowongan default dan penyebaran kontrak penting lainnya. Anda dapat menggunakan [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)paket untuk mengakses alamat kontrak dan ABIs.

## Alamat Kontrak {#contract-addresses}

### Mumbai Testnet {#mumbai-testnet}

| Kontrak | Alamat yang disebarkan  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Mainnet Polygon {#polygon-mainnet}


| Kontrak | Alamat yang disebarkan  |
| :----- | :- |
| [FxRoot (Mainnet Ethereum)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Mainnnet Polygon)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
