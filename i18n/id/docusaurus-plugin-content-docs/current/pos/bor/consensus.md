---
id: consensus
title: Konsensus Bor
description: mekanisme bor untuk pengambilan produsen baru
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Konsensus Bor {#bor-consensus}

Konsensus Bor terinspirasi oleh konsensus Clique: [https://eips.eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Clique bekerja dengan beberapa produser yang telah terdefinisi sebelumnya. Semua produsen memilih produsen baru menggunakan API Clique. Mereka berubah membuat blok.

Bor mengambil produsen baru melalui mekanisme manajemen span dan sprint.

## Validator {#validators}

Polygon adalah sistem Proof-of-stake. Siapa pun bisa staking pada token Matic mereka di kontrak cerdas Ethereum, "kontrak staking", dan menjadi validator untuk sistem tersebut.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Setelah validator aktif di Heimdall, mereka terpilih sebagai produsen melalui modul `bor`.

Periksa overview Bor untuk memahami rentang manajemen lebih dalam rincian: [Tinjau](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) Bor

## Rentang {#span}

Sebuah set blok yang didefinisikan secara logis untuk satu set validator dipilih dari antara semua validator yang tersedia. Heimdall memberikan perincian span melalui API dengan span yang terperinci.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth (Dalam hal ini, Bor) menggunakan `snapshot` blok untuk menyimpan data kondisi setiap blok, termasuk data terkait konsensus.

Setiap validator di span memiliki kekuatan memberikan suara. Berdasarkan kekuatan yang dimiliki, mereka dipilih sebagai produsen blok. Semakin besar kekuatan, semakin besar kemungkinan menjadi produsen blok. Bor menggunakan algoritme Tendermint dengan cara yang sama. Sumber: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Sekumpulan blok di dalam span yang menjadi alasan dipilihnya hanya satu produsen blok untuk menghasilkan blok. Ukuran sprint adalah faktor ukuran span. Bor menggunakan `validatorSet` untuk mendapatkan pengusul/produsen saat ini untuk sprint saat ini.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

Selain pengusul saat ini, Bor memilih produsen cadangan.

## Mengesahkan blok {#authorizing-a-block}

Produsen di bor juga disebut penandatangan, karena akan mengesahkan blok untuk jaringan, produsen harus menandatangani hash block yang berisi **segalanya kecuali tanda tangan itu sendiri**. Ini berarti bahwa hash berisi setiap kolom header, dan juga `extraData` tapi tidak termasuk akhiran tanda tangan 65 byte.

Hash ini ditandatangani menggunakan kurva `secp256k1` standar, dan menghasilkan tanda tangan 65 byte yang disematkan ke dalam `extraData` sebagai akhiran 65 byte di belakang.

Setiap blok yang ditandatangani diberikan tingkat kesulitan yang menambah bobot Blok. Penandatanganan bergilir lebih berbobot (`DIFF_INTURN`) dibandingkan yang tidak berurutan (`DIFF_NOTURN`).

### Strategi pengesahan {#authorization-strategies}

Asalkan produsen memenuhi spesifikasi di atas, mereka dapat mengesahkan dan mendistribusikan blok dengan cara yang menurut mereka terbaik dilakukan. Namun, strategi yang disarankan berikut ini akan mengurangi lalu lintas jaringan dan fork kecil, sehingga ini adalah fitur yang disarankan:

- Jika produsen diperbolehkan untuk menandatangan blok (berada di daftar resmi)
    - Hitung waktu penandatanganan optimal dari blok berikutnya (induk + `Period`)
    - Jika produsen tersebut sedang dalam gilirannya, tunggu waktu yang tepat untuk tiba, tandatangani dan siarkan dengan segera
    - Jika produsen tersebut di luar gilirannya, tunda penandatanganan dengan `wiggle`

Strategi kecil ini akan memastikan bahwa produsen yang sedang dalam giliran (yang bloknya lebih berbobot) memiliki sedikit keuntungan untuk menandatangani dan menyebarkan dibandingkan penandatangan yang di luar giliran. Selain itu, rencana strategi ini memungkinkan sedikit rentang penambahan jumlah produsen.

### Penandatanganan di luar giliran {#out-of-turn-signing}

Bor memilih sejumlah produsen blok sebagai cadangan ketika produsen yang sedang dalam giliran tidak memproduksi blok. Ini bisa terjadi karena berbagai alasan seperti:

- Node produsen blok sedang tidak aktif
- Produsen blok sedang mencoba menahan blok
- Produsen blok tidak memproduksi blok dengan sengaja.

Ketika hal di atas terjadi, mekanisme cadangan Bor mulai berfungsi.

Pada saat ini atau kapan pun, kumpulan validator disimpan dalam susunan dengan urutan berdasarkan alamat penandatangan mereka. Katakan, kumpulan validator diurutkan sebagai A, B, C, D dan sedang giliran C untuk memproduksi blok. Jika C tidak memproduksi blok dalam jumlah waktu yang cukup, maka giliran D untuk memproduksi blok. Jika D tidak memproduksi, maka A dan kemudian B.

Namun, karena akan ada rentang waktu sebelum C memproduksi dan menyebarkan blok, maka validator cadangan akan menunggu selama jumlah waktu tertentu sebelum mulai memproduksi blok. Penundaan waktu ini disebut wiggle.

### Wiggle {#wiggle}

Wiggle adalah waktu yang harus ditunggu produsen sebelum mulai memproduksi blok.

- Misalnya saja blok terakhir (n-1) diproduksi pada waktu `t`.
- Kita memberlakukan keterlambatan waktu minimum antara blok saat ini dan berikutnya dengan parameter variabel `Period`.
- Dalam kondisi ideal, C akan menunggu selama `Period` lalu memproduksi serta menyebarkan blok. Karena waktu blok di Polygon dirancang untuk untuk cukup rendah (2-4 detik), maka keterlambatan penyebaran juga diasumsikan bernilai sama dengan `Period`.
- Jadi jika D tidak melihat blok baru dalam waktu `2 * Period`, D akan segera memproduksi blok. Secara khusus, waktu wiggle D ditetapkan sebagai `2 * Period * (pos(d) - pos(c))` di mana `pos(d) = 3` dan `pos(c) = 2` di kumpulan validator. Katakan, `Period = 1`, wiggle untuk D adalah 2 detik.
- Kini, jika D juga tidak memproduksi blok, maka A akan mulai memproduksi blok ketika waktu wiggle `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` telah habis.
- Serupa dengan itu, wiggle untuk C adalah `6s`

### Mengatasi fork {#resolving-forks}

Sementara mekanisme di atas memperkuat ketangguhan rantai hingga batas tertentu, mekanisme itu juga menghasilkan kemungkinan fork. Mungkin saja sebenarnya C memproduksi blok, tetapi ada keterlambatan tak terduga yang lebih lama dalam penyebaran, karena itu D juga memproduksi blok, sehingga menyebabkan setidaknya 2 percabangan versi atau fork.

Resolusinya sederhana - pilih rantai dengan tingkat kesulitan yang lebih tinggi. Namun kemudian pertanyaannya adalah bagaimana kita menetapkan kesulitan blok dalam pengaturan kita?

### Kesulitan {#difficulty}

- Kesulitan untuk blok yang diproduksi oleh penandatangan yang dalam giliran (misalnya C) ditetapkan sebagai tingkat tertinggi = `len(validatorSet)`.
- Karena D adalah produsen giliran selanjutnya, jika dan ketika situasi muncul di mana D memproduksi blok, maka kesulitan untuk blok ini akan ditetapkan sama seperti pada wiggle sebagai `len(validatorSet) - (pos(d) - pos(c))` yaitu `len(validatorSet) - 1`
- Kesulitan untuk blok yang diproduksi oleh A ketika bertindak sebagai cadangan menjadi `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))` yaitu `2`

Kini, setelah menetapkan kesulitan setiap blok, maka kesulitan fork adalah semata-mata penjumlahan semua kesulitan blok di fork tersebut. Dalam situasi ketika akan memilih fork, maka fork dengan tingkat kesulitan lebih tinggi akan dipilih, karena itu adalah cerminan dari fakta bahwa blok-blok diproduksi oleh produsen blok yang dalam giliran. Ini semata-mata untuk memberikan semacam rasa kemantapan bagi pengguna di Bor.

## Perubahan pandangan {#view-change}

Setelah setiap span, Bor mengubah pandangan. Ini berarti Bor mengambil produsen baru untuk span berikutnya.

### Menjalankan span {#commit-span}

Ketika span saat ini akan berakhir (khususnya di akhir sprint kedua terakhir di span itu), Bor menarik span baru dari Heimdall. Ini adalah panggilan HTTP sederhana ke node Heimdall. Setelah data ini diambil, panggilan `commitSpan` dilakukan ke kontrak genesis BorValidatorSet melalui panggilan Sistem.

Bor juga mengatur byte produsen ke dalam header blok tersebut. Ini diperlukan saat Bor melakukan sinkronisasi cepat. Saat sinkronisasi cepat, Bor menyinkronkan header dalam jumlah besar dan memvalidasi jika blok dibuat oleh produsen resmi.

Pada awal setiap Sprint, Bor mengambil byte header dari header sebelumnya untuk produsen berikutnya dan mulai membuat blok berdasarkan algoritme `ValidatorSet`.

Berikut ini seperti apa header terlihat untuk blok:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Sinkronisasi kondisi dari rantai Ethereum {#state-sync-from-ethereum-chain}

Bor menyediakan mekanisme di mana beberapa peristiwa spesifik di rantai ethereum utama diteruskan ke Bor. Begitu pula cara kerja kontrak deposit ke plasma diproses.

1. Kontrak apa pun di Ethereum dapat memanggil [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) di `StateSender.sol`. Panggilan ini menghasilkan peristiwa`StateSynced`: https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall mendengarkan kejadian ini dan panggilan `function proposeState(uint256 stateId)`dalam- `StateReceiver.sol`sehingga bertindak sebagai toko untuk id perubahan keadaan yang sedang menunggu. Ingatlah transaksi `proposeState` akan diproses bahkan dengan biaya gas 0 asalkan itu dibuat oleh salah satu validator di kumpulan validator saat ini: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. Di awal setiap sprint, Bor menarik perincian terkait perubahan kondisi tertunda menggunakan kondisi dari Heimdall dan menjalankannya ke kondisi Bor menggunakan panggilan sistem. Lihat `commitState` di sini: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
