---
id: ethereum-to-matic
title: एथेरेयम से पॉलीगॉन पर डेटा ट्रांसफ़र करें
description: एथेरेयम से डेटा अनुबंध के ज़रिए पॉलीगॉन पर स्टेट या डेटा ट्रांसफ़र करें
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

पॉलीगॉन EVM चेन से एथेरेयम डेटा को मूल तरीके से पढ़ने की मैकेनिज़्म  'स्टेट सिंक' की होती है. दूसरे शब्दों में, यह मैकेनिज़्म  एथेरेयम चेन से पॉलीगॉन चेन पर डेटा मनमाने ढंग से ट्रांसफ़र करने को सक्षम करता है. जो विधि इसे संभव करती है वह है: हेम्डल लेयर पर वैलिडेटर्स जो किसी खास इवेंट की खबर रख रहे होते हैं — `StateSynced` एक भेजने वाले के अनुबंध से, जैसे ही इवेंट की भनक लगती है, वह `data` जो इवेंट में पास किया गया था उसे पाने वाले के अनुबंध पर लिखा जाता है. [यहाँ](/docs/maintain/validator/core-components/state-sync-mechanism) और अधिक पढ़ें.

भेजने वाले और पाने वाले अनुबंध को एथेरेयम पर मैप किया हुआ होना चाहिए — [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) को हर भेजने वाले और पाने वाले के बारे में जागरूक होना चाहिए. अगर आप मैपिंग करना चाहते हैं, तो कृपया [यहाँ](https://mapper.polygon.technology/) मैपिंग अनुरोध करें.

---

निम्न कदम-दर-कदम निर्देश में हम Goerli (एथेरेयम टेस्टनेट) पर भेजने वाला अनुबंध तथा Mumbai (पॉलीगॉन टेस्टनेट) पर पाने वाला अनुबंध डिप्लॉय करेंगे और फिर हम नोड स्क्रिप्ट में वेब3 कॉल के ज़रिए भेजने वाले से डेटा भेजेंगे तथा पाने वाले पर डेटा को पढ़ेंगे.

### 1. भेजने वाला अनुबंध डिप्लॉय करें {#1-deploy-sender-contract}

भेजने वाले अनुबंध का एकमात्र उद्देश्य स्टेट भेजने वाले अनुबंध पर [सिंक स्टेट](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) फ़ंक्शन का सहारा लेना है — जो मैटिक्स का स्टेट सिंक करने वाला अनुबंध है - जिस स्टेट सिंकड इवेंट की खबर हेम्डल रख रहा है.

पर डिप्लॉय किया गया है:

`0xEAa852323826C71cd7920C3b4c007184234c3945` Goerli पर

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` एथेरेयम मेंनेट पर

इस फ़ंक्शन का सहारा लेने में सक्षम होने के लिए, आइए पहले अपने अनुबंध में इसका इंटरफ़ेस शामिल करें:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

आगे, आइए अपना कस्टम फ़ंक्शन लिखें जो वह डेटा ग्रहण करता है जो हम पॉलीगॉन को भेजना चाहेंगे और सिंक स्टेट का सहारा लेना चाहते हैं

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

ऊपर वाले फ़ंक्शन में, जो नेटवर्क आप `Sender` पर डिप्लॉय करेंगे, (जैसे कि, हम Goerli के लिए `0xEAa852323826C71cd7920C3b4c007184234c3945` का इस्तेमाल करेंगे) उसका `stateSenderContract` स्टेट भेजने वाले का पता है, और `receiver` वह अनुबंध है जो वह डेटा लेेगा जो हम यहाँ से भेजेंगे.

इसकी सिफारिश की जाती है कि वेरीअबल्ज़ के पास करने में कंस्ट्रक्टर का इस्तेमाल करें, लेकिन इस डेमो के उद्देश्य से, हम इन दो पतों को बस हार्डकोड करेंगे:

हमारा Sender.sol कुछ इस तरह दिखता है:

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

हम भेजने वाले अनुबंध के ज़रिए भेजे गए स्टेट की संख्या का ट्रैक रखने के लिए एक सरल `states` काउंटर का इस्तेमाल कर रहे हैं.

अनुबंध डिप्लॉय करने के लिए रीमिक्स का इस्तेमाल करें और पता तथा ABI को कहीं नोट कर रख लें.

### 2. पाने वाला अनुबंध डिप्लॉय करें {#2-deploy-receiver-contract}

पाने वाला अनुबंध वह है जिसका `StateSynced` इवेंट के बाहर आने पर कोई वैलिडेटर आह्वान करता है. वैलिडेटर डेटा सबमिट करने के लिए अनुबंध पर `onStateReceive` फ़ंक्शन का सहारा लेता है. इसे लागू करने के लिए, पहले हम [स्टेट पाने वाला](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) इंटरफ़ेस इम्पोर्ट करते हैं और अपना कस्टम लॉजिक लिखते हैं — स्टेट पाने वाले के अंदर ट्रांसफ़र किए हुए डेटा की व्याख्या करने के लिए.

हमारा Receiver.sol कुछ इस तरह दिखता है:

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

फ़ंक्शन केवल अंतिम मिली स्टेट आईडी डेटा और वेरिएबल को असाइन करता है. [स्टेट आईडी,](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) ट्रांसफ़र किए गए स्टेट (एक सरल काउंटर) का एक सरल यूनीक संदर्भ है.

अपना  Receiver.sol पॉलीगॉन टेस्टनेट पर डिप्लॉय करें और पाते तथा ABI को कहीं नोट कर लें

### 3. अपना भेजने वाला और पाने वाला मैप करवाना {#3-getting-your-sender-and-receiver-mapped}

आप भेजने वाले और पाने वाले  के लिए पहले से ही डिप्लॉय किए गए पते (ऊपर उल्लिखित है) का इस्तेमाल कर सकते हैं, या अपने कस्टम अनुबंध डिप्लॉय कर सकते हैं और मैपिंग अनुरोध यहाँ कर सकते हैं: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. डेटा भेजना और पाना {#4-sending-and-receiving-data}

अब जब कि हमारे पास अपना अनुबंध है और मैपिंग हो चुकी है, हम मनमाने हेक्स बाइट भेजने, उन्हें पॉलीगॉन पर लेने और डेटा की व्याख्या करने के लिए एक सरल नोड स्क्रिप्ट लिखेंगे!

**4.1 अपनी स्क्रिप्ट सेटअप करना**

ट्रांज़ैक्शन और अनुबंध करने के लिए पहले हम वेब3 ऑब्जेक्ट्स, वॉलेट को शुरू करेंगे

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

हम RPCs के लिए @maticnetwork/meta पैकेज का इस्तेमाल कर रहे हैं, स्क्रिप्ट रन करने के लिए पैकेज ज़रूरी नहीं है.

`matic`और `main` ऑब्जेक्ट क्रमशः पॉलीगॉन और रॉपस्टेन के RPC के साथ शुरू किए गए वेब3 ऑब्जेक्ट को संदर्भित करते हैं.

`sender`और `receiver` ऑब्जेक्ट हमारे द्वारा स्टेप 1 और 2 में डिप्लॉय किए गए Sender.sol और Receiver.sol के अनुबंध ऑब्जेक्ट को संदर्भित करते हैं.

**4.2 डेटा भेजना**

आगे, डेटा का bytestring बनाने और उसे अनुबंध के ज़रिए भेजने के लिए चलिए अपने फ़ंक्शन को सेटअप करें :

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

`getData` का सहारा लेने से एक ascii स्ट्रिंग (उदाहरण, `Hello World !`) को बाइट के एक स्ट्रिंग में बदल देगा (उदाहरण, `0x48656c6c6f20576f726c642021`); जब `sendData` फ़ंक्शन `data`(एक ascii स्ट्रिंग) ले रहा होता है, `getData` का सहारा लेता है और भेजने वाले अनुबंध को Bytestring भेजता है.

**4.3 डेटा पाना**

आगे, हम Receiver.sol पर प्राप्त डेटा के लिए जाँचेंगे.

इसे पूरा करने के लिए स्टेट सिंक को ~7-8 मिनट लगने चाहिए

यह सब जाँचने के लिए निम्न फ़ंक्शन जोड़ें (क) भेज़े गए स्टेट की संख्या और (ख) प्राप्तकर्ता पर प्राप्त की गई अंतिम स्टेट

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

`checkReceiver`फ़ंक्शन केवल हमारे द्वारा अनुबंध में परिभाषित किए गए वेरिएबल का सहारा लेता है — जो `onStateReceive`अनुबंध का वैलिडेटर द्वारा सहारा लेते ही सेट किया जाएगा. `getString` फ़ंक्शन केवल bytestring की व्याख्या करता है (इस वापस ascii में बदलता है)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

अंत में, हम अपने फ़ंक्शन को पूरा करने के लिए एक तरीका लिखेंगे:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 यह सब एक साथ पेश करना!**

हमारी टेस्ट स्क्रिप्ट कुछ इस तरह दिखती है:

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

**4.5 चलिए स्क्रिप्ट रन करते हैं**

ऊपर वाली स्क्रिप्ट का सफ़ल एग्जीक्यूशन यह आउटपुट देता है:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
