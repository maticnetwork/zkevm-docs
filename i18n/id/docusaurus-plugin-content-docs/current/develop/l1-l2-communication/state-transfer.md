---
id: state-transfer
title: Transfer Kondisi
description: Keadaan transfer atau data dengan mudah dari Ethereum ke Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon secara terus menerus memantau kontrak pada rantai Ethereum yang disebut `StateSender`. Setiap kali ada kontrak yang terdaftar di rantai Ethereum memanggil kontrak ini, maka akan suatu peristiwa dibuat. Dengan menggunakan peristiwa ini, validator Polygon menyampaikan data ke kontrak lain di rantai Polygon. Mekanisme **Sync Negara** ini digunakan untuk mengirim data dari Ethereum ke Polygon.

Selain itu, validator Polygon mengirim hash Ethereum dari setiap transaksi pada rantai Polygon secara teratur. Anda dapat menggunakan **titik pemeriksaan** ini untuk memvalidasi transaksi yang terjadi di Polygon. Setelah transaksi telah diverifikasi telah terjadi pada rantai Polygon, Ethereum kemudian dapat digunakan untuk melakukan tindakan yang tepat.

2 mekanisme ini dapat digunakan bersama untuk memungkinkan transfer data (keadaan) antara Ethereum dan Polygon. Untuk menjelaskan semua interaksi ini, Anda dapat secara langsung mewarisi kontrak kami `FxBaseRootTunnel`(di Ethereum) dan `FxBaseChildTunnel`(pada Polygon).

## Kontrak Terowongan Root {#root-tunnel-contract}

Gunakan kontrak `FxBaseRootTunnel` dari [sini](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Kontrak ini memberikan akses ke fungsi berikut:

- `function _processMessageFromChild(bytes memory data)`: Ini adalah fungsi virtual yang perlu diimplementasikan dalam kontrak yang mewarisi untuk menangani data yang dikirim dari `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: Fungsi ini dapat dipanggil secara internal dengan data byte apa pun sebagai pesan. Data ini akan dikirim apa adanya ke terowongan anak.
- `receiveMessage(bytes memory inputData)`: Fungsi ini perlu dipanggil untuk menerima pesan yang dipancarkan oleh `ChildTunnel`. Bukti transaksi perlu disediakan sebagai data panggilan. Sebuah skrip contoh untuk menghasilkan bukti menggunakan **matic.js** termasuk di bawah.

## Kontrak Terowongan Anak {#child-tunnel-contract}

Gunakan kontrak `FxBaseChildTunnel` dari [sini](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Kontrak ini memberikan akses ke fungsi-fungsi berikut:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Ini adalah fungsi virtual yang perlu untuk melaksanakan logika untuk menangani pesan yang dikirim dari `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: Fungsi ini dapat dipanggil secara internal untuk mengirim pesan byte apa pun ke terowongan root.

## Prasyarat {#prerequisites}

- Anda perlu mewarisi `FxBaseRootTunnel`kontrak dalam kontrak root Anda di Ethereum. Sebagai contoh, Anda dapat mengikuti [kontrak](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) ini. Demikian pula, mewarisi `FxBaseChildTunnel`kontrak di anak Anda pada Polygon. Ikuti [kontrak](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) ini sebagai contoh.
- Ketika menyebarkan kontrak root Anda
  - **Goerli Testnet**, lulus **alamat** `_checkpointManager``_fxRoot`0**x2890bA17EfE9788080800**

  - **Ethereum Mainnet**********`_checkpointManager`, 0x86e4dc95c7fbdf52e33d563bdb00823894c287 `_fxRoot`dan 0xfe5e5D361b2ad62c541b87C45a0B018389a2.
- Untuk menyebarkan kontrak anak di **testnet Mumbai**, melewati **0xCf73231F28B731BBe3124B907840A9485f11** seperti `_fxChild`dalam konstruktor. Untuk **Polygon mainnet,** `_fxChild`akan menjadi 0**x8397259c983751DAf4040063935a1a28a.**
- Call `setFxChildTunnel`on dikerahkan root terowongan dengan alamat terowongan. Contoh: [0x79cd30ace561a226258258918b56ce098ce00c707a80bba91197f127a48b5cc](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Call `setFxRootTunnel`on dikerahkan ke terowongan anak dengan alamat terowongan root. Contoh: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e0ccc2ffc4b864d2b45a8b7e98bb8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Contoh kontrak jembatan transfer kondisi {#example-contracts-of-state-transfer-bridge}

- **Kontrak**[: Fx-Portal Github Repositori](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Transfer keadaan dari Ethereum → Polygon {#polygon}

- Anda perlu menelepon secara `_sendMessageToChild()`internal dalam kontrak root Anda dan lulus data sebagai argumen yang akan dikirim ke Polygon. Contoh: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644cccc](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Dalam kontrak anak, implementasikan fungsi virtual `_processMessageFromRoot()` di `FxBaseChildTunnel` untuk mengambil data dari Ethereum. Data akan diterima secara otomatis dari penerima kondisi ketika kondisi sudah disinkronkan.

## Transfer keadaan dari Polygon → Ethereum {#ethereum}

1. Panggil `_sendMessageToRoot()` secara internal dalam kontrak anak dengan data sebagai parameter yang akan dikirim ke Ethereum. Contoh: [0x3cc9f7e675bb4f6af6af87e99947bf24c38cbffa0b93d8c9164a2b50e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Perhatikan hash transaksi karena akan digunakan untuk menghasilkan bukti setelah telah dimasukkan sebagai titik pemeriksaan.

2. **Proof Generation untuk menyelesaikan keluaran pada rantai root**: Buat bukti menggunakan **hash tx** dan **MESSAGE_SENT_EVENT_SIG**. Untuk menghasilkan bukti, Anda dapat menggunakan API generasi bukti yang diselenggarakan oleh Polygon atau Anda juga dapat memutar API pembuktian Anda sendiri dengan mengikuti instruksi [di sini](https://github.com/maticnetwork/proof-generation-api).

Titik akhir pembuka yang dibawakan oleh Polygon tersedia [di sini.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Pembuka penggunaan API untuk Mainnet dan Testnet adalah sebagai berikut:

→ [Pembuka Proof Mumbai Testnet Proof Generation](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygon Mainnet Proof Generasi](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Implementasikan `_processMessageFromChild()` dalam kontrak root.

4. Gunakan bukti yang sudah dihasilkan sebagai masukan untuk `receiveMessage()` guna mengambil data yang dikirim dari terowongan anak ke kontrak. Contoh: [0x436dcd5000659bea715a09d9257295dc21290769daie7f0b6616ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515)
