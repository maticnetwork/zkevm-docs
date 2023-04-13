---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Polygon এ আপনার পরবর্তী blockchain অ্যাপ্লিকেশন তৈরি করুন
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ethereum ব্লকচেইনে থেকে রিয়েলটাইম আপডেট পেতে Dagger হল সবচেয়ে ভাল উপায়। এটি আপনার DApps এবং ব্যাকএন্ড সিস্টেমের জন্য ওয়েবসকেট বা সকেটের মাধ্যমে Ethereum ব্লকচেইন ইভেন্টগুলি যেমন, লেনদেন, টোকেন ট্রান্সফার, রসিদ ও লগ পাওয়ার একটি উপায় প্রদান করে।

আমরা নির্ভরযোগ্য এবং স্কেলযোগ্য রিয়েলটাইম ইভেন্টগুলির জন্য পরিকাঠামো বজায় রাখি। `@maticnetwork/dagger` হচ্ছে NodeJS দিয়ে লেখা Dagger প্রজেক্টের একটি কনজিউমার লাইব্রেরি। Ethereum নেটওয়ার্ক থেকে রিয়েলটাইম আপডেট পেতে এটি Dagger সার্ভার ব্যবহার করে।

## ইনস্টলেশন {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## নেটওয়ার্ক {#network}

### Ethereum নেটওয়ার্ক {#ethereum-network}

#### মেইননেট {#mainnet}

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

### Matic নেটওয়ার্ক {#matic-network}

#### মেইননেট {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### মুম্বাই টেস্টনেট {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## উদাহরণ {#example}

- প্রথমে একটি _npm_ প্রজেক্ট তৈরি করুন।

```bash
npm init -y
touch index.js
```

- এখন আমরা নিম্নলিখিত কোড স্নিপেট `index.js`-এ রাখতে পারব।

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

- `index.js` চালান এবং নতুন ব্লক তৈরি হওয়ার সাথে সাথে আপনি ব্লক নম্বর পেতে শুরু করবেন।

```bash
node index.js
```

## API {#api}

### নতুন Dagger (url) {#new-dagger-url}

Dagger অবজেক্ট তৈরি করুন

- `url` হচ্ছে dagger সার্ভারের ঠিকানা। সকল উপলভ্য url দেখতে [নেটওয়ার্ক বিভাগ](#network) যাচাই করুন।

উদাহরণ:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

একটি টপিকে সাবস্ক্রাইব করুন

- `event` হল `String` সাবস্ক্রাইব করার একটি টপিক। `event` ওয়াইল্ডকার্ড অক্ষর সমর্থিত (`+` - একক লেভেলের জন্য `#` - একাধিক লেভেলের জন্য)
- `fn` - `function (data, removed)`
ইভেন্ট অনুষ্ঠিত হলে fn এক্সিকিউট করা হবে:
  - ইভেন্ট থেকে `data` ডেটা
  - `removed` ফ্ল্যাগটি পুনর্গঠনের কারণে ব্লকচেইন থেকে ডেটা অপসারণের বিষয়ে জানাচ্ছে।

উদাহরণ:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

[চালু](#daggeronevent-fn) করার মতোই তবে শুধুমাত্র একবার শুরু করা যাবে।

উদাহরণ:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

একটি টপিকে আনসাবস্ক্রাইব করুন

- `event` হল আনসাবস্ক্রাইব করার একটি `String` টপিক
- `fn` - `function (data, removed)`

উদাহরণ:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Dagger-এ রুম তৈরি করুন। `room` দুটি মানের মধ্যে একটি হতে হবে
  - `latest`
  - `confirmed`

`room` অবজেক্টের নিম্নলিখিত পদ্ধতি আছে:
  - `on` dagger-এর মতোই `on`
  - `once` dagger-এর মতোই `once`
  - `off` dagger-এর মতোই `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

নিম্নলিখিত বিকল্পগুলি গ্রহণ করে Dagger বন্ধ করুন:

- `force`: এটিকে সত্য হিসেবে পাস করা হলে Dagger সাথে সাথেই বন্ধ হয়ে যাবে। এই প্যারামিটার হল
ঐচ্ছিক।

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Dagger সমর্থন করতে web3 চুক্তি র‍্যাপার তৈরি করে।

- প্রথমে একটি web3 চুক্তির অবজেক্ট তৈরি করুন।

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- এখন আমরা এটিতে একটি Dagger চুক্তির র‍্যাপার তৈরি করব।

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- চুক্তির ইভেন্ট ফিল্টার করে দিন

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- চুক্তির ইভেন্ট দেখা হচ্ছে

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- ইভেন্ট দেখা বন্ধ করা

```js
// stop watching
filter.stopWatching();
```

## ইভেন্ট {#events}

প্রতিটি ইভেন্টের একটি রুম ∈ {`latest`, `confirmed`} আছে।
  - `latest` :  চেইনে ব্লক অন্তর্ভুক্ত করার সাথে সাথেই ইভেন্ট শুরু হয়ে যাবে।
  - `confirmed` : 12টি নিশ্চিতকরণের পরে ইভেন্ট শুরু করা হয়।

আপনি আপনার DApp-এর UI-তে আপডেট দেখাতে চাইলে `latest` ইভেন্ট ব্যবহার করুন। এটি UI/UX-কে আরো ভালো ও ব্যবহারকারী-বান্ধব করতে তুলতে সহায়তা করবে।

অপরিবর্তনীয় কাজের জন্য সার্ভার বা UI থেকে `confirmed` ইভেন্ট ব্যবহার করুন। যেমন, ইমেইল, নোটিফিকেশন পাঠানো বা একটি লেনদেন নিশ্চিত হবার পরে আরেকটি করার জন্য ব্যবহারকারীকে অনুমতি দেওয়া।

### নেটওয়ার্ক ইভেন্ট {#network-events}

| Ethereum ইভেন্ট | কখন? | `removed` ফ্ল্যাগ |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| ব্লক | প্রতিটি নতুন ব্লক তৈরির জন্য | হ্যাঁ |
| block.number | প্রতিটি নতুন ব্লক নম্বর তৈরির জন্য |                |
| block.hash | প্রতিটি নতুন ব্লক হ্যাশ তৈরির জন্য | হ্যাঁ |
| block/`number` | ভবিষ্যতে যখন চেইনে নির্দিষ্ট ব্লক অন্তর্ভুক্ত হবে | হ্যাঁ |
| addr/`address`/tx | `address` প্রতিটি নতুন লেনদেনের জন্য | হ্যাঁ |
| addr/`address`/tx/out | `address`-এর প্রতিটি নতুন আউটগোয়িং লেনদেনের জন্য | হ্যাঁ |
| addr/`address`/tx/in | `address`-এর প্রতিটি নতুন ইনকামিং লেনদেনের জন্য | হ্যাঁ |
| tx/`txId` | যখন প্রদত্ত `txId` ব্লকে অন্তর্ভুক্ত করা হবে | হ্যাঁ |
| tx/`txId`/success | `txId` এর tx স্ট্যাটাস সফল (ব্লকে অন্তর্ভুক্ত) হলে | হ্যাঁ |
| tx/`txId`/fail | `txId`-এর tx ব্যর্থ (ব্লকে অন্তর্ভুক্ত) হলে | হ্যাঁ |
| tx/`txId`/receipt | `txId`-এর জন্য রশিদ তৈরি (ব্লকে অন্তর্ভুক্ত) হলে | হ্যাঁ |
| addr/`contractAddress`/deployed | যখন নতুন `contractAddress` ব্লকে অন্তর্ভুক্ত হয় | হ্যাঁ |
| log/`contractAddress` | যখন `contractAddress`-এর জন্য নতুন লগ তৈরি হয় | হ্যাঁ |
| log/`contractAddress`/filter/`topic1`/`topic2` | যখন `topic1` এবং `topic2` দিয়ে `contractAddress`-এর জন্য নতুন লগ তৈরি হয় | হ্যাঁ |

### Dagger ইভেন্ট {#dagger-events}

| Dagger ইভেন্ট | কখন? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | যখন সংযোগ স্ট্যাটাস পরিবর্তন করা হয় | মান: বুলিয়ান |


প্রতিটি ইভেন্ট রুম দিয়ে শুরু করতে হবে:

#### ব্লক {#block}

প্রতিটি নতুন ব্লকের জন্য

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

প্রতিটি নতুন ব্লক নম্বরের জন্য

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

প্রতিটি নতুন ব্লক হ্যাশের জন্য

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

যখন ভবিষ্যতে বিশেষ **X** ব্লক চেইন অন্তর্ভুক্ত করা হবে

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

`address`-এর প্রতিটি নতুন লেনদেনের জন্য

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

`dir` হচ্ছে লেনদেনের দিক ∈ {`in`, `out`}। কোনো ঠিকানার জন্য বিজ্ঞপ্তি পেতে `address` বাদ দেওয়া যেতে পারে।

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

`address`-এর প্রতিটি নতুন ইনকামিং লেনদেনের জন্য

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

`address`-এর প্রতিটি নতুন আউটগোয়িং লেনদেনের জন্য

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

সমস্ত ইনকামিং এবং আউটগোয়িং লেনদেনের বিজ্ঞপ্তি পেতে `address`-এর জায়গায় ওয়াইল্ডকার্ড নোটেশন ব্যবহার করা।

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

`status` হচ্ছে `txId`-এর স্ট্যাটাস ∈ {`success`, `fail`, `receipt`}। এটিকেও খালি রাখা যেতে পারে যেমন `tx/{txId}`, ট্রিগার হয় যখন `txId` ব্লকে অন্তর্ভুক্ত হয়।

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

যখন প্রদত্ত `txId` ব্লকে অন্তর্ভুক্ত করা হবে

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

`txId` এর tx স্ট্যাটাস সফল (ব্লকে অন্তর্ভুক্ত) হলে

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

`txId`-এর tx ব্যর্থ (ব্লকে অন্তর্ভুক্ত) হলে

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

`txId`-এর জন্য রশিদ তৈরি (ব্লকে অন্তর্ভুক্ত) হলে

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

যখন `contractAddress`-এর জন্য লগ তৈরি হয়

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

যখন `topic0`, `topic1` এবং `topic2` দিয়ে `contractAddress`-এর জন্য নতুন লগ তৈরি হয়

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> ইভেন্টের নাম অক্ষর-সংবেদনশীল। `address`, `txId` এবং `topics` ছোট হাতের অক্ষরের হতে হবে।

> দ্রষ্টব্য: আপনি ইভেন্টের জন্যেও ওয়াইল্ডকার্ড ব্যবহার করতে পারবেন। ওয়াইল্ড কার্ড দুই-ধরনের হয়ে থাকে: `+` (একক ক্ষেত্রে) এবং `#` (একাধিক ক্ষেত্রে)। এটি ব্যবহারের সময় সাবধানতা অবলম্বন করবেন, কারণ এটি প্রয়োজনের চেয়ে বেশি ডেটা নিয়ে আসতে পারে এবং আপনার DApp-কে অপ্রয়োজনীয় ডেটা দিয়ে ভরিয়ে ফেলতে পারে।



## টেস্ট Dagger সার্ভার {#test-dagger-server}

এই লাইব্রেরিতে রয়েছে `woodendagger` এক্সিকিউটেবল যা আপনার স্থানীয় মেশিনে টেস্ট ড্যাগার সার্ভার হিসেবে কাজ করে। তাই আপনি TestRPC দিয়ে পরীক্ষা করতে পারবেন।

অনুগ্রহ করে প্রোডাকশনে `woodendagger` ব্যবহার করবেন না। এটি শুধু ডেভেলপমেন্টের জন্য। এটি `removed` ফ্ল্যাগ সমর্থন করে না।

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## সহায়তা {#support}

আপনার যদি কোনও প্রশ্ন, প্রতিক্রিয়া বা ফিচারের অনুরোধ থাকে, তাহলে [Telegram](https://t.me/maticnetwork) ব্যবহার করে আমাদের সাথে যোগাযোগ করুন।

## লাইসেন্স {#license}

MIT
