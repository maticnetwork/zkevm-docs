---
id: ethereum-to-matic
title: Ilipat ang data mula sa Ethereum patungo sa Polygon
description: Ilipat ang kalagayan o data mula sa Ethereum patungo sa Polygon sa pamamagitan ng Mga Kontrata
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Ang 'State Sync' ay ang mekanismo upang native na mabasa ang Ethereum data mula sa Polygon EVM chain'. Sa madaling salita, nagbibigay-daan ang mekanismong ito na mailipat ang arbitraryong data mula sa Ethereum chain patungo sa Polygon chain. Nagiging posible ito sa pamamagitan ng pamamaraan na: Nakikinig ang mga validator sa Heimdall layer sa  partikular na kaganapan — `StateSynced` mula sa kontrata ng Nagpadala, sa lalong madaling panahon na mapili ang kaganapan, nakasulat ang `data` na naipasa sa kaganapan sa kontrata ng Tatanggap. Magbasa pa [rito](/docs/maintain/validator/core-components/state-sync-mechanism).

Kailangang maimapa ang kontrata ng Nagpadala at Tatanggap sa Ethereum — kailangang malaman ng [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) ang bawat nagpadala at tatanggap. Kung gusto mong gawin ang pagmamapa, mangyaring gumawa ng kahilingan sa pagmamapa [rito](https://mapper.polygon.technology/).

---

Sa sumusunod na walkthrough, magde-deploy kami ng kontrata ng Nagpadala sa Goerli (Ethereum testnet) at kontrata ng Tatanggap sa Mumbai (testnet ng Polygon) at saka kami magpapadala ng data mula sa Nagpadala at magbabasa ng data sa Tatanggap sa pamamagitan ng mga tawag sa web3 sa node script.

### 1. I-deploy ang kontrata ng Nagpadala {#1-deploy-sender-contract}

Nag-i layunin ng kontrata ng Nagpadala ang ma-call ang function ng [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) sa kontrata ng StateSender — na siyang kontrata ng syncer ng kalagayan ng Matic - ang na-StateSync na kaganapan na pinakikinggan ng Heimdall.

I-deploy sa:

`0xEAa852323826C71cd7920C3b4c007184234c3945` sa Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` sa Ethereum Mainnet

Upang ma-call ang function na ito, isama muna natin ang interface nito sa ating kontrata:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Susunod, isulat natin ang aming custom na function na kumukuha ng data na gusto naming ipasa sa Polygon at mga call sa syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Sa function sa itaas, `stateSenderContract` ay ang address ng StateSender sa network na ide-deploy mo `Sender` sa. (hal., gagamit tayo ng `0xEAa852323826C71cd7920C3b4c007184234c3945` para sa Goerli), at ang `receiver` ay ang kontrata na makakatanggap ng data na iapapadala natin mula rito.

Inirerekomenda na gumamit ng mga constructor upang ipasa ang mga variable, ngunit para sa layunin ng demo na ito, i-hardcode lang ang dalawang address na ito:

Ang sumusunod ay ang hitsura ng aming Sender.sol:

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

Gumagamit kami ng simpleng `states` counter upang subaybayan ang bilang ng mga kalagayan na ipinadala sa pamamagitan ng kontrata ng Nagpadala.

Gamitin ang Remix para i-deploy ang kontrata at panatilihin ang  tala ng address at ABI.

### 2. I-deploy ang kontrata ng Tatanggap {#2-deploy-receiver-contract}

Hinihingi ng Validator ang kontrata ng tatanggap kapag nailabas ang `StateSynced` kaganapan. Hiningi ng Validator ang function `onStateReceive` sa kontrata ng Tatanggap para isumite ang data. Para ipatupad ito, ini-import muna namin ang interface ng [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) at isulat ang aming custom na lohika — para bigyang-kahulugan ang inilipat na data sa loob ng onStateReceive.

Kasunod ang hitsura ng aming Receiver.sol:

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

Itinalaga lang ng function ang huling natanggap na Id ng Kalagayan at data sa mga variable. Ang [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) ay simple at natatanging sanggunian sa inilipat na kalagayan ( simpleng counter).

I-deploy ang iyong Receiver.sol sa testnet ng Polygon at itala ang address at ABI

### 3. Pagsasamapa ng Nagpadala at Tatanggap {#3-getting-your-sender-and-receiver-mapped}

Maaari mong gamitin ang mga naka-deploy na address (nabanggit sa itaas) para sa nagpadala at tatanggap, o i-deploy ang iyong mga custom na kontrata at gumawa ng kahilingan sa pagmamapa rito: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Pagpapadala at Pagtanggap ng data {#4-sending-and-receiving-data}

Ngayon na mayroon na kaming mga kontrata at tapos na ang pagmamapa, magsusulat kami ng simpleng node script upang ipadala ang mga arbitrary na hex bytes, matanggap ang mga ito sa Polygon at mabigyang-kahulugan ang data!

**4.1 I-setup ang iyong script**

Sisimulan muna namin ang aming web3 objects, wallet para gawin ang mga transaksyon at kontrata

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

Gumagamit kami ng @maticnetwork/meta package para sa mga RPC. Hindi kinakailangan ang package para patakbuhin ang script.

Tumutukoy ang `matic` at ang mga `main` bagay sa web3 object na sinimulan sa Polygon's at Ropsten's RPC ayon sa pagkakabanggit.

Tumutukoy ang `sender` at `receiver` ang mga object sa mga object ng kontrata ng Sender.sol at Receiver.sol na na-deploy namin sa Hakbang 1 at 2.

**4.2 Ipadala ang data**

Susunod, i-setup natin ang ating mga function upang gumawa ng bytestring ng data at ipadala ito sa pamamagitan ng kontrata ng Nagpadala:

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

Magko-convert ang `getData` ascii string (hal., `Hello World !`) sa string ng bytes (hal., `0x48656c6c6f20576f726c642021`); habang tumatanggap ang function na `sendData` ng `data` (isang ascii string), mga call `getData` at ipinapasa ang bytestring sa kontrata ng nagpadala

**4.3 Tanggapin ang data**

Susunod, titingnan namin ang natanggap na data sa Receiver.sol.

Dapat tumagal ng ~7-8 minuto para maisagawa ang pag-sync ng kalagayan.

Idagdag ang mga sumusunod na function upang tingnan ang (a) bilang ng mga ipinadalang kalagayan mula sa Nagpadala at (b) Huling natanggap na kalagayan sa Tatanggap.

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

Kino-call lang ng function na `checkReceiver` ang mga variable na tinukoy namin sa kontrata — na itatakda sa sandaling nagko-call ang Validator `onStateReceive` sa kontrata. Sinusuri lamang ng `getString` na function ang bytestring (ibinabalik ito sa ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Sa wakas, magsusulat kami ng paraan upang maisagawa ang aming mga function:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Pagsama-samahin ang lahat!**

Ganito ang hitsura ng aming script ng pagsubok:

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

**4.5 Patakbuhin natin ang script**

Naghahatid ang matagumpay na pagsasagawa ng script sa itaas ng output bilang:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
