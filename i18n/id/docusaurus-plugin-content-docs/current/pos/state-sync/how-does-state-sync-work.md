---
id: how-state-sync-works
title: Bagaimana cara kerja Sinkronisasi Kondisi?
description: "Mengirimkan kondisi dari rantai Ethereum ke rantai Bor."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Bagaimana cara kerja Sinkronisasi Kondisi? {#how-does-state-sync-work}

Manajemen kondisi mengirimkan kondisi dari rantai Ethereum ke rantai Bor. Ini disebut **state-sync**.

transfer keadaan dari Ethereum ke Bor terjadi melalui panggilan sistem. Suppose, deposit USDC ke manajer deposit di Ethereum. Validator mendengarkan peristiwa tersebut, memvalidasi, dan menyimpannya di keadaan Heimdall. Bor mendapatkan rekaman sinkronisasi kondisi terbaru dan memperbarui kondisi Bor (mencetak jumlah yang sama dari USDC di Bor) menggunakan panggilan sistem.

## Pengirim kondisi {#state-sender}

Sumber: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Untuk menyinkronkan kondisi, kontrak memanggil metode berikut **kontrak pengirim kondisi** di rantai Ethereum.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

Kontrak `receiver` harus ada di rantai anak, yang menerima `data` kondisi setelah proses selesai. `syncState` menghasilkan peristiwa `StateSynced` di Ethereum, yang seperti berikut:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

Setelah peristiwa `StateSynced` dihasilkan di kontrak `stateSender` pada rantai Ethereum, Heimdall mendengarkan peristiwa tersebut dan menambahkan ke kondisi Heimdall setelah 2/3+ validator menyetujui.

Setelah setiap sprint (saat ini 64 blok di Bor), Bor mengambil rekaman sinkronisasi kondisi baru dan memperbarui kondisinya menggunakan panggilan `system`. Berikut adalah kode untuk sinkronisasi kondisinya: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Selama `commitState`, Bor mengeksekusi `onStateReceive`, dengan `stateId`, dan `data` sebagai argumen, pada kontrak target.

## Antarmuka penerima kondisi di Bor {#state-receiver-interface-on-bor}

Kontrak `receiver` di rantai Bor harus mengimplementasikan antarmuka berikut.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Hanya `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, harus diperbolehkan untuk memanggil fungsi `onStateReceive` di kontrak target.

## Panggilan sistem {#system-call}

Hanya alamat sistem, `2^160-2`, dimungkinkan membuat panggilan sistem. Bor memanggilnya secara internal dengan alamat sistem sebagai `msg.sender`. Ini mengubah kondisi kontrak dan memperbarui root kondisinya untuk blok tertentu. Terinspirasi dari [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) dan [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Panggilan sistem berguna untuk mengubah kondisi pada kontrak tanpa membuat transaksi apa pun.

## Log Sinkronisasi Kondisi dan Tanda Terima Blok Bor {#state-sync-logs-and-bor-block-receipt}

Peristiwa yang dihasilkan panggilan sistem ditangani dengan cara yang berbeda dari log normal. Berikut adalah kode: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Bor menghasilkan tx / tanda terima hanya untuk klien yang mencakup semua log untuk sync. Tx hash diturunkan dari nomor blok dan hash blok (blok terakhir pada sprint itu):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Ini tidak mengubah logika konsensus apapun, hanya perubahan `eth_getBlockByNumber`klien. `eth_getTransactionReceipt`, dan `eth_getLogs`termasuk log state-sync dengan terputus. Ingatlah filter bloom di blok tidak termasuk pencantuman log sinkronisasi kondisi. Juga tidak termasuk tx yang diturunkan dalam `transactionRoot`atau .`receiptRoot`