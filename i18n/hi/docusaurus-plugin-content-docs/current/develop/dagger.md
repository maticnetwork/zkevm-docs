---
id: dagger
title: डैगर
sidebar_label: Dagger - Single App
description: पॉलीगॉन पर अगले ब्लॉकचेन ऐप को बिल्ड करें
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

डैगर एथेरेयम ब्लॉकचेन से रियल टाइम अपडेट पाने का सबसे अच्छा तरीका है. यह आपके DApps और बैकएंड सिस्टम को एथेरेयम ब्लॉकचैन इवेंट्स यानी ट्रांजैक्शन, टोकन ट्रांसफ़र, रसीदें और लॉग को वेबसोकेट या सॉकेट पर रीयलटाइम में प्राप्त करने का एक तरीका प्रदान करता है.

हम विश्वसनीय और स्केलेबल रियलटाइम इवेंट के लिए इंफ़्रास्ट्रक्चर को बरकरार रखते हैं. `@maticnetwork/dagger` डैगर प्रोजेक्ट के लिए NodeJS में लिखी गई उपभोक्ता लाइब्रेरी है. यह एथेरेयम नेटवर्क से रियलटाइम अपडेट पाने के लिए डैगर सर्वर का इस्तेमाल करता है.

## इंस्टॉल करना {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## नेटवर्क {#network}

### एथेरेयम नेटवर्क {#ethereum-network}

#### मेननेट {#mainnet}

```sh
Websocket: wss://mainnet.dagger.matic.network
Socket: mqtts://mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### कोवन {#kovan}

```sh
Websocket: wss://kovan.dagger.matic.network
Socket: mqtts://kovan.dagger.matic.network (You can also use `ssl://` protocol)
```

#### रोपस्टन {#ropsten}

```sh
Websocket: wss://ropsten.dagger.matic.network
Socket: mqtts://ropsten.dagger.matic.network (You can also use `ssl://` protocol)
```

#### गोएर्ली {#goerli}

```sh
Websocket: wss://goerli.dagger.matic.network
Socket: mqtts://goerli.dagger.matic.network (You can also use `ssl://` protocol)
```

### मैटिक नेटवर्क {#matic-network}

#### मेननेट {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### मुंबई टेस्टनेट {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## उदाहरण {#example}

- चलिए पहले एक _npm_ प्रोजेक्ट बनाते हैं.

```bash
npm init -y
touch index.js
```

- अब हम `index.js`में निम्न कोड स्निपेट डाल सकते हैं.

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

- `index.js` को रन करें और जैसे ही नया ब्लॉक बनेगा, आपको ब्लॉक नंबर मिलने शुरू हो जाएँगे.

```bash
node index.js
```

## API {#api}

### नया डैगर(url) {#new-dagger-url}

डैगर ऑब्जेक्ट बनाएँ

- `url` डैगर सर्वर पता है. सभी मौजूद [नेटवर्क सेक्शन](#network) के लिए url वैल्यू जाँचें.

उदाहरण:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(इवेंट, fn) {#dagger-on-event-fn}

किसी टॉपिक से सदस्यता लें

- `event` सदस्यता लेने के लिए `String`टॉपिक है. `event` वाइल्डकार्ड कैरेक्टर सपोर्ट करते हैं (`+` - सिंगल लेवल के लिए और`#` - मल्टी लेवल के लिए)
- `fn` - `function (data, removed)`fn इवेंट होने पर एक्ज़ीक्यूट किया जाएगा:
  - इवेंट से `data`डेटा
  - `removed` फ़्लैग कह रहा है कि क्या डेटा को फिर से ऑर्गेनाइज़ करने के कारण ब्लॉकचेन से हटा दिया गया है.

उदाहरण:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(इंवेंट, fn) {#dagger-once-event-fn}

 [पर](#daggeronevent-fn) के समान लेकिन केवल एक बार ही फ़ायर किया जाएगा.

उदाहरण:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(इवेंट, fn) {#dagger-off-event-fn}

किसी टॉपिक से सदस्यता समाप्त करें

- `event` एक `String`टॉपिक है जिससे सदस्यता समाप्त की जानी है
- `fn` - `function (data, removed)`

उदाहरण:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(रूम) {#dagger-of-room}

डैगर से रूम बनाएँ. `room` दो वैल्यू में से एक होना चाहिए
  - `latest`
  - `confirmed`

`room` ऑब्जेक्ट में निम्न तरीके हैं:
  - `on` डैगर के समान `on`
  - `once` डैगर के समान `once`
  - `off` डैगर के समान `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([फ़ोर्स]) {#}

डैगर को बंद करें, यह निम्न विकल्पों को स्वीकार करता है:

- `force`: इसे सही पर भेजने से डैगर तुरंत बंद हो जाएगा. यह पैरामीटर वैकल्पिक है.

```js
dagger.end({force: true}) // immediate closing
```

### डैगर कॉन्ट्रैक्ट (वेब3कॉन्ट्रैक्ट) {#dagger-contract-web3contract}

डैगर सपोर्ट के लिए वेब3 कॉन्ट्रैक्ट रैपर बनाता है.

- पहले वेब3 कॉन्ट्रैक्ट ऑब्जेक्ट बनाएँ.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- अब हम इस पर डैगर कॉन्ट्रैक्ट रैपर बनाएँगे.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- कॉन्ट्रैक्ट के इवेंट्स को फ़िल्टर करने का समय

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- कॉन्ट्रैक्ट के इवेंट्स को देखना

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- कॉन्ट्रैक्ट के इवेंट को देखना बंद करना

```js
// stop watching
filter.stopWatching();
```

## इवेंट्स {#events}

हर इवेंट में एक रूम होता है ∈ {`latest`, `confirmed`}.
  - `latest` : चेन में शामिल ब्लॉक के तुरंत बाद इवेंट्स को बाहर कर दिया जाता है.
  - `confirmed` : : 12 पुष्टिकरण के बाद इवेंट्स को बाहर किया जाता है.

अगर आप अपने DApp में UI पर अपडेट दिखाना चाहते हैं, तो`latest` इवेंट्स का इस्तेमाल करें. यह UI/UX को बेहतर और यूज़र फ़्रेडली बनाने में सहायता करेगा.

सर्वर से या UI पर बदले नहीं जा सकने वाले टास्क के लिए `confirmed`इवेंट्स का इस्तेमाल करें. जैसे एक ट्रांज़ैक्शन की पुष्टि होने के बाद ईमेल, नोटिफ़िकेशन भेजना या यूज़र को UI पर बाद के टास्क करने की अनुमति देना.

### नेटवर्क इवेंट्स {#network-events}

| एथेरेयम इवेंट | कब है? | `removed` फ़्लैग |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| ब्लॉक | बनाए गए हर नए ब्लॉक के लिए | हाँ |
| ब्लॉक नंबर | बनाए गए हर नए ब्लॉक नंबर के लिए |                |
| ब्लॉक हैश | बनाए गए हर नए ब्लॉक हैश के लिए | हाँ |
| ब्लॉक/`number` | जब भविष्य में विशेष ब्लॉक चेन में शामिल हो | हाँ |
| addr/`address`/tx | `address` के लिए हर नए ट्रांज़ैक्शन पर | हाँ |
| addr/`address`/tx/out | `address` के लिए हर नए आउटगोइंग ट्रांज़ैक्शन पर | हाँ |
| addr/`address`/tx/in | `address` के लिए हर नए इनकमिंग ट्रांज़ैक्शन पर | हाँ |
| tx/`txId` | जब दिया गया `txId`ब्लॉक में शामिल है | हाँ |
| tx/`txId`/सक्सेस | जब tx स्टेटस `txId`के लिए सक्सेस (ब्लॉक में शामिल) हो | हाँ |
| tx/`txId`/फ़ेल | जब tx स्टेटस `txId`के लिए फ़ेल (ब्लॉक में शामिल) हो | हाँ |
| tx/`txId`/रसीद | जब `txId`के लिए रसीद जनरेट (ब्लॉक में शामिल) की जाती है | हाँ |
| addr/`contractAddress`/डिप्लॉय किया गया | जब नया `contractAddress`ब्लॉक में शामिल हो गया | हाँ |
| लॉग/`contractAddress` | जब `contractAddress`के लिए नया लॉग जनरेट किया जाता है | हाँ |
| लॉग/`contractAddress`/फ़िल्टर/`topic1`/`topic2` | जब `topic1`और क`topic2`े साथ नया लॉग होता है और के`contractAddress` लिए जनरेट किया जाता है | हाँ |

### डैगर इवेंट्स {#dagger-events}

| डैगर इवेंट | कब है? | args |
| ----------------- | ------------------------------ | -------------- |
| कनेक्शन स्टेटस | जब कनेक्शन स्टेटस बदलेगा | वैल्यू : बूलियन |


हर इवेंट की शुरुआत रूम से होनी चाहिए:

#### ब्लॉक {#block}

हर नए ब्लॉक के लिए

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


#### ब्लॉक नंबर {#block-number}

हर एक नए ब्लॉक नंबर के लिए

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

#### ब्लॉक हैश {#block-hash}

हर नए ब्लॉक हैश के लिए

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

#### ब्लॉक/{number} {#block-number-1}

जब कोई विशेष ब्लॉक **X**, भविष्य में चेन में शामिल हो

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

`address` के लिए हर नए ट्रांज़ैक्शन पर

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

`dir` ट्रांज़ैक्शन डायरेक्शन ∈ {`in`,}`out` है. किसी भी पते के लिए नोटिफ़िकेशन प्राप्त करने के लिए छ`address`ोड़ा जा सकता है.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

`address` के लिए हर नए इनकमिंग ट्रांज़ैक्शन पर

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

`address` के लिए हर नए आउटगोइंग ट्रांज़ैक्शन पर

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

सभी इनकमिंग और आउटगोइंग इनकमिंग के लिए नोटफ़िकेशन होने के लिए `address`के स्थान पर वाइल्डकार्ड नोटेशन का इस्तेमाल करना.

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

`status` `txId`का स्टेटस ∈ {,`success` ,`fail` }`receipt` है. इसे ऐसे ही छोड़ा जा सकता है यानी `tx/{txId}`तब ट्रिगर हो जाता है, जब वह ब`txId`्लॉक में शामिल होता है.

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

जब दिया गया `txId`ब्लॉक में शामिल है

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

जब tx स्टेटस `txId`के लिए सक्सेस (ब्लॉक में शामिल) हो

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

जब tx स्टेटस `txId`के लिए फ़ेल (ब्लॉक में शामिल) हो

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

जब `txId`के लिए रसीद जनरेट (ब्लॉक में शामिल) की जाती है

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

#### लॉग/{contractAddress} {#log-contractaddress}

जब लॉग `contractAddress`के लिए जनरेट किया जाता है

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

#### लॉग/{contractAddress}/filter/{topic0}/{topic1}/{topic2} {#log-contractaddress-filter-topic0-topic1-topic2}

जब `contractAddress`के लिए ,`topic0` औ`topic1`र के`topic2` साथ नया लॉग जनरेट होता है

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> इवेंट के नाम केस-सेंसटिव हैं. `address`, `txId`और ल`topics`ोवरकेस में होने चाहिए.

> नोट: आप इवेंट के लिए वाइल्डकार्ड का इस्तेमाल कर सकते हैं. वाइल्डकार्ड दो प्रकार के होते हैं: `+`(सिंगल के लिए) और (`#`मल्टीपल के लिए). चूंकि यह ज़रूरत से ज़्यादा डेटा प्राप्त कर के DApp पर बहुत ज़्यादा मात्रा में डेटा भेज सकता है, अतः इसका इस्तेमाल सावधानी से करें.



## टेस्ट डैगर सर्वर {#test-dagger-server}

इस लाइब्रेरी में `woodendagger`निकाले जाने योग्य हैं जो आपकी लोकल मशीन पर टेस्ट डैगर सर्वर हैं. तो आप TestRPC की मदद से टेस्ट कर सकते हैं.

कृपया प्रोडक्शन में `woodendagger`का इस्तेमाल न करें. यह केवल विकास के लिए है. यह फ़`removed`्लैग को सपोर्ट नहीं करता है.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## सपोर्ट {#support}

अगर आपके पास कोई क्वेरी, फ़ीडबैक या फ़ीचर संबंधी कोई अनुरोध है तो, हमें [Telegram](https://t.me/maticnetwork) से संपर्क करने में संकोच न करें

## लाइसेंस {#license}

MIT (मेसाचुसेट्स प्रौद्योगिक संस्थान)
