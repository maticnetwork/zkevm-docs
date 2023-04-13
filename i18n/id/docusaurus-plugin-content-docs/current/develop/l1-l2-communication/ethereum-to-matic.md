---
id: ethereum-to-matic
title: Data transfer dari Ethereum ke Polygon
description: Kondisi atau data transfer dari Ethereum ke Polygon melalui Kontrak
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Mekanisme untuk membaca data Ethereum secara asli dari rantai EVM Polygon adalah mekanisme 'Sinkronisasi Kondisi'. Dengan kata lain, mekanisme ini memungkinkan transfer data sebarang dari rantai Ethereum ke rantai Polygon. Prosedur yang memungkinkannya adalah: Validator di lapisan Heimdall memperhatikan peristiwa tertentu — `StateSynced` dari kontrak Pengirim, segera setelah peristiwa dipilih, `data` yang diberikan dalam peristiwa ini ditulis pada kontrak Penerima. Baca selengkapnya [di sini](/docs/maintain/validator/core-components/state-sync-mechanism).

Kontrak Pengirim dan Penerima harus dipetakan di Ethereum — [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) harus mengetahui setiap pengirim dan penerima. Jika Anda ingin melakukan pemetaan, kirim permintaan pemetaan [di sini](https://mapper.polygon.technology/).

---

Dalam panduan berikut, kita akan menyebarkan kontrak Pengirim di Goerli (testnet Ethereum) dan kontrak Penerima di Mumbai (testnet Polygon), kemudian kita akan mengirim data dari Pengirim dan membaca data di Penerima melalui panggilan web3 dalam skrip node.

### 1. Menyebarkan kontrak Pengirim {#1-deploy-sender-contract}

Tujuan kontrak Pengirim hanya agar dapat memanggil fungsi [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) di kontrak StateSender — yang merupakan kontrak penyinkron kondisi Matic - peristiwa StateSynced yang diperhatikan oleh Heimdall.

Disebarkan di:

`0xEAa852323826C71cd7920C3b4c007184234c3945`di Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` di Ethereum Mainnet

Untuk bisa memanggil fungsi ini, mari kita memasukkan antarmukanya dalam kontrak kami terlebih dahulu:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Selanjutnya, mari kita tulis fungsi kustom yang ada dalam data yang ingin kita berikan ke Polygon dan memanggil syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Dalam fungsi di atas, `stateSenderContract` adalah alamat StateSender di jaringan yang akan Anda gunakan untuk menyebarkan `Sender` (misalnya, kita akan menggunakan `0xEAa852323826C71cd7920C3b4c007184234c3945` untuk Goerli) dan `receiver` adalah kontrak yang akan menerima data yang kita kirim dari sini.

Sebaiknya gunakan konstruktor untuk memberikan variabel, tetapi untuk demo ini, kita hanya akan melakukan hardcode terhadap dua alamat ini:

Berikut ini adalah tampilan Sender.sol:

```jsx
// sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

contract sender {
  address public stateSenderContract = 0xEAa852323826C71cd7920C3b4c007184234c3945;
  address public receiver = 0x83bB46B64b311c89bEF813A534291e155459579e;

  uint public states = 0;

  function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
  }

}
```

Kami menggunakan penghitung `states` sederhana untuk melacak jumlah kondisi yang dikirim melalui kontrak Pengirim.

Gunakan Remix untuk menyebarkan kontrak dan menyimpan catatan dari alamat dan ABI.

### 2. Menyebarkan kontrak Penerima {#2-deploy-receiver-contract}

Kontrak penerima adalah salah satu yang diaktifkan oleh Validator ketika peristiwa `StateSynced` dikeluarkan. Validator mengaktifkan fungsi `onStateReceive` di kontrak penerima untuk mengirimkan data. Untuk mengimplementasikannya, terlebih dahulu kita impor antarmuka [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) dan menuliskan logika kustom — untuk menafsirkan data yang ditransfer di dalam onStateReceive.

Berikut ini adalah tampilan dari Receiver.sol:

```jsx
// receiver.sol

pragma solidity ^0.5.11;

// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract receiver {

  uint public lastStateId;
  bytes public lastChildData;

  function onStateReceive(uint256 stateId, bytes calldata data) external {
    lastStateId = stateId;
    lastChildData = data;
	}

}
```

Fungsinya hanya memberikan Id Kondisi dan data yang terakhir diterima ke variabel. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) adalah referensi unik sederhana untuk kondisi yang ditransfer (penghitungan sederhana).

Sebarkan Receiver.sol di testnet Polygon dan catat alamat dan ABI

### 3. Membuat Pengirim dan Penerima dipetakan {#3-getting-your-sender-and-receiver-mapped}

Anda dapat menggunakan alamat yang sudah disebarkan (disebutkan di atas) untuk pengirim dan penerima, atau menyebarkan kontrak kustom dan meminta pemetaan dilakukan di sini: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Mengirim dan Menerima data {#4-sending-and-receiving-data}

Karena kita sudah memiliki kontrak dan pemetaan sudah dilakukan, kita akan menulis skrip node sederhana untuk mengirim byte heksa sebarang, menerimanya di Polygon dan menafsirkan datanya!

**4.1 Menyiapkan skrip**

Kita akan menginisialisasi objek web3 terlebih dahulu, dompet untuk membuat transaksi dan kontrak

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...` // add or import your private key

matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = `` // insert or import ABI
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = `` // insert of import the ABI

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

```

Kami menggunakan paket @maticnetwork/meta untuk RPC, paket ini bukan persyaratan untuk menjalankan skrip.

Objek `matic` dan objek `main` mengacu ke objek web3 yang diinisialisasi dengan masing-masing RPC dari Polygon dan Ropsten.

Objek `sender` dan objek `receiver` mengacu ke objek kontrak Sender.sol dan Receiver.sol yang kita sebarkan di Langkah 1 dan 2.

**4.2 Mengirim data**

Selanjutnya, mari kita siapkan fungsi untuk membuat bytestring data dan mengirimkannya melalui kontrak Pengirim:

```jsx
// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

// send data via sender
async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}
```

Memanggil `getData` akan mengubah string ascii (misalnya, `Hello World !`) ke string byte (misalnya, `0x48656c6c6f20576f726c642021`); sementara fungsi `sendData` menyertakan `data` (string ascii), memanggil `getData` dan memberikan bytestring ke kontrak pengirim

**4.3 Menerima data**

Selanjutnya, kita akan memeriksa data yang diterima di Receiver.sol.

Membutuhkan waktu ~7-8 menit untuk menjalankan sinkronisasi kondisi.

Tambahkan fungsi berikut untuk memeriksa (a) jumlah keadaan yang dikirim dari Pengirim dan (b) kondisi yang diterima terakhir di Penerima.

```jsx
// check `states` variable on sender
async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

// check last received data on receiver
async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}
```

Fungsi `checkReceiver` hanya memanggil variabel yang kita tentukan dalam kontrak — yang akan diatur segera saat Validator memanggil `onStateReceive` di kontrak. Fungsi `getString` hanya menafsirkan bytestring (mengubahnya kembali ke ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Terakhir, kita akan menulis metode untuk menjalankan fungsi:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Memadukan semuanya!**

Berikut ini adalah tampilan skrip tes kita:

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...`
matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = ``
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = ``

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}

// console.log(getData('Sending a state sync! :) '))

async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}

async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}

async function test() {
	await sendData ('Hello World !')
	await checkSender ()
	// add a timeout here to allow time gap for the state to sync
	await checkReceiver ()
}

test()
```

**4.5 Mari kita jalankan skrip**

Eksekusi yang sukses pada skrip di atas akan memberikan keluaran seperti berikut:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
