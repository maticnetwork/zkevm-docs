---
id: account_based_plasma
title: Plasma berbasis akun
description: implementasi berbasis akun dari plasma
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Plasma berbasis akun {#account-based-plasma}

Polygon Plasma mengikuti model yang mirip dengan [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), tetapi merupakan **implementasi berbasis akun** dibandingkan dengan implementasi berbasis UTXO lainnya. Rantai sisinya kompatibel dengan EVM. Dengan menggunakan konstruksi MoreVP, kami juga menghilangkan kebutuhan untuk tanda tangan konfirmasi.

## Lapisan PoS dan Titik Periksa {#pos-layer-and-checkpoints}

Jaringan Polygon menggunakan strategi ganda Proof of Stake di lapisan titik periksa dan Produsen Blok di lapisan produsen blok untuk mempercepat waktu blok dan mencapai finalitas pada rantai utama menggunakan titik periksa dan bukti penipuan.

Di lapisan titik periksa Jaringan Polygon, untuk setiap beberapa blok di lapisan blok Jaringan Poligon tersebut, validator (yang cukup terikat) akan membuat titik periksa di rantai utama setelah memvalidasi semua blok di lapisan blok itu dan membuat pohon Merkle dari hash blok mulai dari titik periksa terakhir.

Selain memberikan finalitas pada rantai utama, titik periksa berperan dalam penarikan karena berisi proof of burn (penarikan) token jika terjadi penarikan oleh pengguna. Dengan begitu pengguna dapat membuktikan sisa token mereka pada kontrak root menggunakan bukti Patricia Merkle dan bukti blok header. Ingatlah untuk membuktikan sisa token, blok header harus dimasukkan ke Root Chain melalui PoS (Stakeholder). Proses penarikan akan dikenakan biaya gas Ethereum seperti biasa. Kami mendayagunakan titik periksa semaksimal mungkin untuk permaianan keluar.

## Log dengan peristiwa seperti UTXO {#utxo-like-event-logs}

Untuk transfer ERC20/ERC721, ini dicapai dengan menggunakan struktur data log dengan peristiwa seperti UTXO. Berikut adalah peristiwa `LogTransfer` sebagai referensi.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Jadi, pada dasarnya setiap transfer ERC20/ERC721 menghasilkan peristiwa ini dan saldo sebelumnya dari pengirim dan penerima (`input1` dan `input2`) menjadi masukan (seperti UTXO) ke tx-nya dan saldo barunya menjadi keluaran (`output1` dan `output2`). Transfer ini dilacak dengan cara membandingkan semua peristiwa `LogTransfer` yang terkait.

## Permaianan Keluar {#exit-games}

Karena blok yang diproduksi oleh produsen blok tunggal (atau sangat sedikit), situasi ini membuka peluang terjadinya penipuan. Kami akan membahas secara singkat skenario serangan dan membicarakan tentang bagaimana jaminan plasma melindungi pengguna.

## Vektor Serangan {#attack-vectors}

### Operator Malicious {#malicious-operator}
Bagian berikut ini membahas skenario ketika operator bisa menjadi jahat dan mencoba menipu.

1. Token yang entah dari mana / pengeluaran ganda / tanda terima cacat yang dengan curang menambah (untuk akun yang dikendalikan operator) / mengurangi (untuk pengguna) saldo token.
2. Ketidaktersediaan data. Setelah pengguna mengirimkan tx, misalnya operator memasukkan tx dalam blok plasma tetapi membuat data rantai tidak tersedia bagi pengguna. Dalam hal ini, jika pengguna memulai langkah keluar dari tx yang lebih lama, maka mereka dapat ditantang di jaringan dengan memperlihatkan tx terbaru mereka. Ini gampang membuat pengguna jengkel.
3. Titik periksa yang buruk. Dalam kasus terburuk, operator dapat melakukan A.1 dan(atau) A.2 dan berkolusi dengan validator untuk menjalankan transisi kondisi yang tidak valid itu ke rantai root.
4. Menghentikan rantai sisi. Operator berhenti memproduksi blok dan rantainya terhenti. Jika titik periksa belum dikirimkan selama jangka waktu tertentu, maka rantai sisi dapat ditandai tertahan di rantai root. Setelah itu, tidak ada lagi titik periksa yang dapat dikirimkan.

Untuk alasan yang tercantum di atas atau alasan lain, jika rantai plasma telah memperdayakan, pengguna harus memulai tindakan keluar secara massal dan kami beraspirasi menyediakan konstruksi keluar di rantai root yang dapat dimanfaatkan pengguna, apabila saatnya tiba.

### Pengguna Malicious {#malicious-user}

1. Pengguna memulai langkah keluar dari tx yang dijalankan tetapi terus menghabiskan token di rantai sisi. Mirip dengan pengeluaran ganda tetapi di 2 rantai.

Kami mengandalkan ide  [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160). Singkatnya, MoreVP memperkenalkan cara baru untuk menghitung prioritas keluar, yang disebut prioritas “masukan termuda”. Sebaliknya dari memesan keluar berdasarkan usia keluaran, moreVP memesan keluar berdasarkan usia masukan termuda. Ini berefek bahwa keluarnya keluaran, meskipun termasuk dalam blok tertahan setelah transaksi "keluar entah dari mana", akan diproses dengan tepat asalkan keluarnya keluaran tersebut hanya berasal dari masukan yang valid. Kami menetapkan `getAge` yang memberikan usia pada tx yang dimasukkan. Ini seperti yang ditetapkan di [plasma praktis minimum 1](https://ethresear.ch/t/minimal-viable-plasma/426).

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Skenario Keluar {#exit-scenarios}

Mari kita perkenalkan beberapa terminologi sebelum kita melanjutkan diskusi skenario keluar:

- **Penarik**: Pengguna yang ingin keluar dari rantai plasma.
- **tx yang dijalankan**: tx yang telah dimasukkan dalam blok rantai Polygon dan telah diperiksa di rantai root.
- **tx pengeluaran**: Tx yang mengubah saldo token pengguna sebagai tanggapan atas tindakan yang ditandatangani oleh pengguna (tidak termasuk transfer token yang masuk). Ini mungkin transfer yang dimulai pengguna, tx bakar, dll.
- **tx rujukan**: Tx persis sebelum tx keluar untuk pengguna dan token tertentu. Seperti ditetapkan dalam pola UTXO berbasis saldo akun kami, keluaran ke tx rujukan akan menjadi masukan ke tx yang dilakukan pengeluaran.
- **Prioritas keluar MoreVP**: Usia masukan termuda (di antara tx rujukan) ke tx tertentu. Ini paling sering digunakan untuk menghitung prioritas keluar.

### Burn token {#burn-tokens}

Untuk keluar dari rantai sisi, pengguna akan meluncurkan tx  *withdraw aka burn token* pada rantai plasma. Tx ini akan menghasilkan peristiwa `Withdraw` .

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Di sini `input1` menunjukkan saldo pengguna sebelumnya untuk token yang dimaksud dan `output1` menunjukkan jumlah token yang tersisa di rantai sisi. Konstruksi ini sesuai dengan pola *UTXO* berbasis akun kami. Pengguna akan memperlihatkan tanda terima tx penarikan ini untuk menarik token di rantai utama. Saat merujuk tanda terima ini, pengguna juga harus memberikan bukti berikut:

1. Bukti pencantuman tanda terima Merkle di blok rantai sisi (`receiptsRoot`)
2. Bukti pencantuman transaksi Merkle di blok rantai sisi (`transactionsRoot`)
3. Bukti pencantuman header blok rantai sisi di titik periksa pada rantai root

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Kapan pun pengguna ingin keluar dari rantai plasma, mereka (atau dipisahkan oleh aplikasi klien mereka, yaitu dompet) harus membakar token di rantai sisi, menunggunya untuk diperiksa, lalu memulai langkah keluar dari tx penarikan titik periksa.

### Keluar dari transfer ERC20/721 (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Pertimbangkan skenarionya, pengguna melakukan transfer ERC20 di rantai sisi. Operator menambahkan tx keluar entah dari mana persis sebelum transfer pengguna dan berkolusi dengan validator untuk memeriksa blok ini. Dalam skenario ini dan secara lebih umum, pada vektor serangan A1 hingga A3 yang dibahas di atas, pengguna mungkin belum sempat membakar token mereka ketika tx jahat dimasukkan dan oleh sebab itu perlu memulai langkah keluar dari tx titik periksa terakhir di rantai root - untuk alasan ini, selain pintu keluar pembakaran, kami perlu mendukung pintu keluar dari berbagai tx seperti transfer ERC20/721 dan yang lainnya. Atas dasar vektor serangan ini dan perincian 2 skenario tersebut:

**Transfer keluar:** Saya mentransfer beberapa token ke pengguna, tetapi saya perhatikan operatornya memasukkan tx jahat di blok/titik periksa sebelum memasukkan tx transfer saya. Saya harus memulai langkah keluar dari rantai. Saya akan memulai langkah keluar dari tx transfer. Seperti ditetapkan di MoreVP, saya harus memberikan tx rujukan (*UTXO masukan*) yang akan menetapkan prioritas keluar dari keluar ini. Jadi, saya akan merujuk tx yang memperbarui saldo token saya dan persis mendahului tx transfer keluar.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Transfer masuk:** Saya perhatikan operatornya memasukkan tx jahat di blok/titik periksa sebelum memasukkan tx transfer masuk saya. Saya akan memulai langkah keluar dari tx transfer masuk ini sambil merujuk saldo rekanan - karena di sini *UTXO masukan* -nya adalah saldo token rekanan tersebut.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Keluar dari transaksi dalam penerbangan (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Skenario ini adalah untuk melawan skenario ketidaktersediaan data. Misal saya membuat tx tetapi saya tidak tahu apakah tx itu telah dimasukkan karena tidak tersedianya data. Saya dapat memulai langkah keluar dari tx mengambang ini dengan merujuk tx titik periksa terakhir. Pengguna harus berhati-hati agar jangan membuat tx kapan pun mereka memulai keluar model MoreVP, jika tidak mereka akan ditantang.

**Catatan:** Catatan: Saat keluar dari konstruksi model MoreVP, pengguna dapat memulai langkah keluar dengan memberikan rx rujukan, tx keluar, dan menaruh `exit bond` sedikit. Untuk jenis keluar apa pun, jika keluar tersebut berhasil ditantang, maka keluar ini akan dibatalkan dan bond keluar akan disita.

## Keterbatasan {#limitations}

1. Ukuran bukti yang besar: bukti pencantuman transaksi Merkle dan bukti pencantuman blok Merkle (yang berisi transaksi itu) di titik periksa.
2. Keluar massal: Jika operator berubah menjadi jahat, pengguna harus memulai pengeluaran massal.

Spesifikasi sedang dalam tahap awal dan kami menghargai umpan balik yang membantu kami meningkatkannya atau mendesain ulang semuanya jika konstruksi ini rusak parah. Implementasi adalah sebuah karya dalam repositori [kontrak](https://github.com/maticnetwork/contracts) kami.