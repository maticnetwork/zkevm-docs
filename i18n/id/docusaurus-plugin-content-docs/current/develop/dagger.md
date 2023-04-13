---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Membuka aplikasi blockchain berikutnya di Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger adalah cara terbaik mendapatkan pembaruan waktu nyata dari Blockchain Ethereum.
Ini menyediakan cara bagi DApps dan sistem Backend untuk mendapatkan peristiwa blockchain Ethereum seperti transaksi, transfer token, tanda terima, dan log dalam waktu nyata melalui websocket atau soket.

Kami memelihara infrastruktur untuk peristiwa waktu nyata yang andal dan dapat diskalakan. `@maticnetwork/dagger` adalah pustaka konsumen untuk proyek Dagger yang ditulis dalam NodeJS. Ini menggunakan server Dagger untuk mendapatkan pembaruan waktu nyata dari Jaringan Ethereum.

## Instalasi {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Jaringan {#network}

### Jaringan Ethereum {#ethereum-network}

#### Mainnet {#mainnet}

```sh
Websocket: wss://mainnet.dagger.matic.network
Socket: mqtts://mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Kovan {#kovan}

```sh
Websocket: wss://kovan.dagger.matic.network
Socket: mqtts://kovan.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Ropsten {#ropsten}

```sh
Websocket: wss://ropsten.dagger.matic.network
Socket: mqtts://ropsten.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Goerli {#goerli}

```sh
Websocket: wss://goerli.dagger.matic.network
Socket: mqtts://goerli.dagger.matic.network (You can also use `ssl://` protocol)
```

### Jaringan Matic {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai Testnet {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Contoh {#example}

- Mari kita buat proyek _npm_.

```bash
npm init -y
touch index.js
```

- Sekarang kita dapat menaruh cuplikan kode berikut dalam `index.js`.

```javascript
const Dagger = require('@maticnetwork/dagger')

// connect to correct dagger server, for receiving network specific events
//
// you can also use socket based connection
const dagger = new Dagger("wss://mainnet.dagger.matic.network")

// get new block as soon as it gets created
dagger.on('latest:block.number', result => {
  console.log(`New block created: ${result}`)
})
```

- Jalankan `index.js` & Anda akan mulai menerima nomor blok setelah blok baru dibuat.

```bash
node index.js
```

## API {#api}

### new Dagger(url) {#new-dagger-url}

Membuat objek dagger

- `url` adalah alamat server dagger. Periksa [bagian jaringan](#network) untuk semua nilai url yang tersedia.

Contoh:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Berlangganan topik

- `event` adalah suatu topik `String` untuk berlangganan. Karakter wildcard `event` didukung (`+` - untuk tingkat tunggal dan `#` - untuk multitingkat)
- `fn` - `function (data, removed)`
fn akan dieksekusi ketika peristiwa terjadi:
  - Data `data` dari peristiwa
  - Bendera `removed` mengatakan jika data dihilangkan dari blockchain karena reorganisasi.

Contoh:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Sama seperti [on](#daggeronevent-fn) tetapi akan ditembakkan hanya sekali.

Contoh:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Berhenti berlangganan sebuah topik

- `event` adalah topik `String` yang akan dihentikan langganannya
- `fn` - `function (data, removed)`

Contoh:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Membuat room dari dagger. `room` harus salah satu dari dua nilai
  - `latest`
  - `confirmed`

`room` objek memiliki metode berikut:
  - `on` sama seperti dagger `on`
  - `once` sama seperti dagger `once`
  - `off` sama seperti dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Menutup dagger, terima opsi berikut:

- `force`: menggantinya ke true akan segera menutup dagger. Parameter ini bersifat
opsional.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Membuat pembungkus kontrak web3 untuk mendukung Dagger.

- Pertama, buat objek kontrak web3.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Sekarang, kita akan membuat pembungkus kontrak dagger.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Waktunya menyaring peristiwa kontrak

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Melihat peristiwa kontrak

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Menghentikan melihat peristiwa

```js
// stop watching
filter.stopWatching();
```

## Peristiwa {#events}

Setiap peristiwa memiliki ruangan ∈ {`latest`, `confirmed`}.
  - `latest` : Peristiwa ditembakkan setelah blok disertakan dalam rantai.
  - `confirmed` : Peristiwa ditembakkan setelah 12 konfirmasi.

Jika Anda ingin menampilkan pemutakhiran di UI dalam DApp, gunakan peristiwa `latest`. Ini akan membantu membuat UI/UX lebih baik dan lebih ramah pengguna.

Guankan peristiwa `confirmed` untuk tugas yang tidak dapat dikembalikan dari server atau di UI. Seperti mengirim email, notifikasi, atau memungkinkan pengguna melakukan tugas berikutnya di UI setelah transaksi dikonfirmasi.

### Peristiwa Jaringan {#network-events}

| Peristiwa Ethereum | Kapan? | Bendera `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| blok | Untuk setiap blok baru yang dibuat | Ya |
| block.number | Untuk setiap nomor blok baru yang diciptakan |                |
| block.hash | Untuk setiap hash blok baru yang diciptakan | Ya |
| block/`number` | Ketika blok tertentu di masa depan termasuk dalam rantai | Ya |
| addr/`address`/tx | Pada setiap transaksi baru untuk `address` | Ya |
| addr/`address`/tx/out | Pada setiap transaksi keluar yang baru untuk `address` | Ya |
| addr/`address`/tx/in | Pada setiap transaksi masuk yang baru untuk `address` | Ya |
| tx/`txId` | Ketika `txId` yang ditentukan termasuk dalam blok | Ya |
| tx/`txId`/success | Ketika status tx berhasil (termasuk dalam blok) untuk `txId` | Ya |
| tx/`txId`/fail | Ketika tx gagal (termasuk dalam blok) untuk `txId` | Ya |
| tx/`txId`/receipt | Ketika tanda terima dihasilkan (termasuk dalam blok) untuk `txId` | Ya |
| addr/`contractAddress`/deployed | Ketika `contractAddress` baru termasuk dalam blok | Ya |
| log/`contractAddress` | Ketika log baru dihasilkan untuk `contractAddress` | Ya |
| log/`contractAddress`/filter/`topic1`/`topic2` | Ketika log baru dengan `topic1` dan `topic2` dihasilkan untuk `contractAddress` | Ya |

### Peristiwa Dagger {#dagger-events}

| Peristiwa Dagger | Kapan? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Ketika status koneksi berubah | nilai: Boolean |


Setiap peristiwa harus dimulai dengan ruang:

#### blok {#block}

Untuk setiap blok baru

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block", result => {
  console.log("Current block : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block", result => {
  console.log("Confirmed block : ", result)
})
```

</TabItem>
</Tabs>


#### block.number {#block-number}

Untuk setiap nomor blok baru

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.number", result => {
  console.log("Current block number : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.number", result => {
  console.log("Confirmed block number : ", result)
})
```

</TabItem>
</Tabs>

#### block.hash {#block-hash}

Untuk setiap hash blok baru

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.hash", result => {
  console.log("Current block hash : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.hash", result => {
  console.log("Confirmed block hash : ", result)
})
```

</TabItem>
</Tabs>

#### block/{number} {#block-number-1}

Ketika ada **X** blok tertentu, nantinya termasuk dalam rantai

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{address}/tx {#addr-address-tx}

Pada setiap transaksi baru untuk `address`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{address}/tx/{dir} {#addr-address-tx-dir}

`dir` adalah arah transaksi ∈ {`in`, `out`}. `address` dapat diabaikan untuk menerima notifikasi alamat apa pun.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

Pada setiap transaksi masuk yang baru untuk `address`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="out">

Pada setiap transaksi keluar yang baru untuk `address`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="all">

Menggunakan notasi wildcard sebagai ganti `address`, untuk mendapatkan notifikasi tentang semua transaksi masuk & keluar.

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### tx/{txId}/{status} {#tx-txid-status}

`status` adalah status `txId` ∈ {`success`, `fail`, `receipt`}. Ini dapat dikosongkan juga semisal menghasilkan `tx/{txId}`, yang terpicu ketika `txId` disertakan dalam blok.

<Tabs
defaultValue="any"
values={[
{ label: 'any', value: 'any', },
{ label: 'success', value: 'success', },
{ label: 'fail', value: 'fail', },
{ label: 'receipt', value: 'receipt', },
]
}>
<TabItem value="any">

Ketika `txId` yang ditentukan termasuk dalam blok

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="success">

Ketika status tx berhasil (termasuk dalam blok) untuk `txId`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="fail">

Ketika tx gagal (termasuk dalam blok) untuk `txId`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="receipt">

Ketika tanda terima dihasilkan (termasuk dalam blok) untuk `txId`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### log/{contractAddress} {#log-contractaddress}

Ketika log dihasilkan untuk `contractAddress`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
</Tabs>

#### log/{contractAddress}/filter/{topic0}/{topic1}/{topic2} {#log-contractaddress-filter-topic0-topic1-topic2}

Ketika log baru dengan `topic0`, `topic1`, & `topic2` dihasilkan untuk `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Nama peristiwa peka huruf besar atau kecil. `address`, `txId`, dan `topics` harus menggunakan huruf kecil.

> Catatan: Anda juga dapat menggunakan wildcard untuk peristiwa. Ada dua jenis wildcard: `+` (untuk tunggal) dan `#` (untuk beberapa). Gunakan dengan hati-hati karena ini akan mengambil data lebih banyak daripada yang Anda perlukan dan dapat membombardir dengan data ke DApp.



## Server Dagger Tes {#test-dagger-server}

Pustaka ini terdiri dari `woodendagger` yang dapat dieksekusi dan merupakan server dagger tes pada mesin lokal Anda. Jadi Anda bisa menguji dengan TestRPC.

Jangan gunakan `woodendagger` dalam pembuatan. Ini hanya untuk pengembangan. Ini tidak mendukung bendera `removed`.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Dukungan {#support}

Jika Anda memiliki pertanyaan, umpan balik, atau permintaan fitur apa pun, silakan hubungi kami di [Telegram](https://t.me/maticnetwork)

## Lisensi {#license}

MIT
