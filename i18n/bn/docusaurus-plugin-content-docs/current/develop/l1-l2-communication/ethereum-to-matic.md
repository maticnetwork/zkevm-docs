---
id: ethereum-to-matic
title: Ethereum থেকে Polygon-এ ডেটা ট্রান্সফার
description: চুক্তির মাধ্যমে Ethereum থেকে Polygon-এ স্টেট বা ডেটা ট্রান্সফার
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Polygon EVM চেইন থেকে Ethereum ডেটা স্থানীয়ভাবে পড়ার পদ্ধতি হলো 'স্টেট সিঙ্ক'। অন্য কথায়, এই প্রক্রিয়াটি Ethereum চেইন থেকে Polygon চেইন পর্যন্ত অবাধে ডেটা ট্রান্সফার করতে সক্ষম করে। যে প্রক্রিয়াটি এটি সম্ভব করে তা হলো: Heimdall লেয়ারের যাচাইকারীগুলো কোনো একটি নির্দিষ্ট ইভেন্ট শোনে — কোনো প্রেরক চুক্তি থেকে `StateSynced`, যখনই ইভেন্টটি নির্বাচন করা হয় তখনই, ইভেন্টে পাস করা `data` গ্রহীতার চুক্তিতে লিখিত থাকে। [এখানে](/docs/maintain/validator/core-components/state-sync-mechanism) আরও পড়ুন।

প্রেরক ও গ্রহীতার চুক্তি Ethereum-এ ম্যাপ করতে হবে — প্রতিটি প্রেরক ও গ্রহীতার ব্যাপারে [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol)-কে সচেতন হতে হবে। আপনি যদি ম্যাপিং সম্পন্ন করতে চান তবে অনুগ্রহ করে এখানে [ম্যাপিং](https://mapper.polygon.technology/)-এর একটি অনুরোধ করুন।

---

নিচের উদাহরণে, আমরা Goerli (Ethereum টেস্টনেট)-এ একটি প্রেরক চুক্তি এবং মুম্বাই-এ (Polygon-এর টেস্টনেট)-এ একটি গ্রাহক চুক্তি ডিপ্লয় করবো এবং তারপর একটি নোড স্ক্রিপ্টে web3-এর মাধ্যমে প্রেরক থেকে ডেটা পাঠাবো এবং গ্রহীতা-তে সেই ডেটা পড়বো।

### 1. প্রেরকের চুক্তি ডিপ্লয় করা {#1-deploy-sender-contract}

প্রেরক চুক্তির একমাত্র উদ্দেশ্য হলো StateSender চুক্তিতে [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) ফাংশন কল করতে সক্ষম হওয়া - যা MATIC-এর স্টেট সিঙ্ক চুক্তি - যেই StateSynced ইভেন্টে Heimdall শুনে থাকে।

ডিপ্লয় করার স্থান:

Goerli-এ `0xEAa852323826C71cd7920C3b4c007184234c3945`

Ethereum মেইননেটে `0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`

এই ফাংশনটি কল করতে সক্ষম হতে, চলুন প্রথমে আমাদের চুক্তিতে এর ইন্টারফেস অন্তর্ভুক্ত করা যাক:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

তারপর, আমাদের কাস্টম ফাংশন লেখা যাক, যেখানে আমরা Polygon-এ পাস করতে এমন ডেটা থাকে এবং syncState-কে কল করে

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

উপরের ফাংশনে, `stateSenderContract` হলো নেটওয়ার্কের StateSender-এর ঠিকানা যা আপনি `Sender`-এ ডিপ্লয় করবেন। (যেমন, Goerli-এর জন্য আপনি `0xEAa852323826C71cd7920C3b4c007184234c3945`ব্যবহার করবেন) এবং `receiver` হলো সেই চুক্তি যা আমাদের এখান থেকে প্রেরিত ডেটা গ্রহণ করবে।

ভ্যারিয়েবলে পাস করার জন্য কন্সট্রাক্তর ব্যবহার করার পরামর্শ দেওয়া হয়, কিন্তু এই ডেমোর উদ্দেশ্যে, আমরা এই দুটি ঠিকানাকে হার্ডকোড করব:

আমাদের Sender.sol এমন দেখা যায়:

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

প্রেরক চুক্তির মাধ্যমে প্রেরিত স্টেটগুলোর সংখ্যা ট্র্যাক রাখতে আমরা একটি সাধারণ `states` কাউন্টার ব্যবহার করছি।

চুক্তি ডিপ্লয় করতে এবং ঠিকানা ও ABI-এর নোট রাখতে রিমিক্স ব্যবহার করুন।

### 2. গ্রাহকের চুক্তি ডিপ্লয় করা {#2-deploy-receiver-contract}

গ্রাহক চুক্তি হলো `StateSynced` ইভেন্ট প্রেরণ করার সময় একটি যাচাইকারী দ্বারা যা আহ্বান করা হয়। ডেটা জমা করার জন্য যাচাইকারী গ্রহীতা চুক্তিতে ফাং`onStateReceive`শনকে আমন্ত্রণ করে, onStateReceive-এর ভেতরে ট্রান্সফার করা ডেটা ব্যাখ্যা করার জন্য আমরা প্রথমে [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) ইন্টারফেস ইমপোর্ট করে এবং আমাদের কাস্টম লজিক লিখে রাখি।

আমাদের Receiver.sol দেখতে এরকম:

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

ফাংশনটি শুধুমাত্র সর্বশেষ প্রাপ্ত স্টেট আইডি ও ডেটাগুলোকে ভ্যারিয়েবলে অ্যাসাইন করে। [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) হলো ট্রান্সফার স্টেট (একটি সাধারণ কাউন্টার)-এর একটি সাধারণ অনন্য রেফারেন্স।

Polygon-এর টেস্টনেটে আপনার Receiver.sol ডিপ্লয় করুন এবং ঠিকানা ও ABI-এর একটি নোট রাখুন

### 3. আপনার প্রেরক এবং গ্রহীতাকে ম্যাপ করা {#3-getting-your-sender-and-receiver-mapped}

আপনি প্রেরক ও গ্রহীতার জন্য ইতোমধ্যে ডিপ্লয় করা ঠিকানাগুলো (উপরে উল্লিখিত) ব্যবহার করতে পারেন অথবা আপনার কাস্টম চুক্তি ডিপ্লয় করতে পারেন এবং এখানে একটি ম্যাপিং সম্পন্ন করার অনুরোধ করতে পারেন: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. ডেটা প্রেরণ এবং গ্রহণ করা {#4-sending-and-receiving-data}

এখন আমাদের কাছে আমাদের চুক্তিগুলো রয়েছে এবং ম্যাপিং সম্পন্ন হয়েছে, অবাধে হেক্স বাইট প্রেরণ করতে, সেগুলোকে Polygon-এ গ্রহণ করতে এবং ডেটা ব্যাখ্যা করতে আমরা একটি সাধারণ নোড স্ক্রিপ্ট  লিখব!

**4.1 আপনার স্ক্রিপ্ট সেটআপ করা**

আমরা প্রথমে আমাদের web3 অবজেক্ট, ওয়ালেটটি শুরু করবো যেন লেনদেন এবং চুক্তি করা যায়

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

RPCs-এর জন্য আমরা @maticnetwork/meta প্যাকেজ ব্যবহার করছি, স্ক্রিপ্টটি চালানোর জন্য প্যাকেজটি আবশ্যক নয়।

`matic` এবং `main` অবজেক্টগুলো বলতে যথাক্রমে Polygon এবং Ropsten-এর RPC দিয়ে শুরু করা web3 অবজেক্টকে বোঝায়।

`sender`এবং `receiver` অবজেক্টগুলো বলতে Sender.sol এবং Receiver.sol-এর চুক্তির অবজেক্টগুলো বোঝায়, যেগুলো আমরা ধাপ 1 এবং 2-এ ডিপ্লয় করেছি।

**4.2 ডেটা প্রেরণ করা**

তারপর, ডেটার bytestring তৈরি করতে এবং প্রেরক চুক্তির মাধ্যমে এটি প্রেরণ করার জন্য আমাদের ফাংশনগুলো সেটআপ করা যাক:

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

`getData`-কে কল করলে তা একটি ascii স্ট্রিংকে (যেমন `Hello World !`) বাইটের স্ট্রিং-এ (যেমন `0x48656c6c6f20576f726c642021`) রূপান্তর করবে; যেখানে `sendData` ফাংশনটি `data`-কে অন্তর্ভুক্ত করে (একটি ascii স্ট্রিং), `getData`-কে কল করে এবং প্রেরকের চুক্তিতে bytestring-কে পাস করে।

**4.3 ডেটা গ্রহণ করা**

তারপর, আমরা প্রাপ্ত ডেটা Receiver.sol-এ পরীক্ষা করব।

নির্বাহ করার জন্য স্টেটের সিঙ্ক-এর জন্য এতে ~7-8 মিনিট সময় লাগবে।

(a) প্রেরক থেকে প্রেরিত স্টেটের সংখ্যা এবং (b) গ্রহীতায় সর্বশেষ গৃহীত স্টেট পরখ করতে নিম্নলিখিত ফাংশনগুলো যোগ করুন।

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

চুক্তিতে আমরা যে ভ্যারিয়েবলগুলো সংজ্ঞায়িত করেছি `checkReceiver` ফাংশনটি শুধু তাকে কল করে — যা যাচাইকারী চুক্তিতে `onStateReceive`-কে কল করার সাথে সাথে সেট হবে। `getString`ফাংশনটি কেবল bytestring-কে ব্যাখ্যা করে (একে পুনরায় ascii-তে রূপান্তরিত করে)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

সবশেষে, আমাদের ফাংশনগুলো সম্পাদন করার জন্য আমরা একটি পদ্ধতি লিখব:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 একে একসাথে রাখা!**

আমাদের টেস্ট স্ক্রিপ্ট দেখতে এমন হয়:

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

**4.5 স্ক্রিপ্ট চালানো যাক**

উপরের স্ক্রিপ্টের সফল নির্বাহ এই ধরণের একটি আউটপুট প্রদান করে:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
