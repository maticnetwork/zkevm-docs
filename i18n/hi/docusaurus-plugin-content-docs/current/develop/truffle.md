---
id: truffle
title: ट्रफल का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट को तैनात करें
sidebar_label: Using Truffle
description:  पॉलीगॉन पर एक स्मार्ट कॉन्ट्रैक्ट को तैनात करने के लिए Truffle का इस्तेमाल करें
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ओवरव्यू {#overview}

[ट्रफल](https://trufflesuite.com/) एक ब्लॉकचेन विकास का वातावरण है, जिसका इस्तेमाल आप Ethereum वर्चुअल मशीन का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट बनाने और टेस्ट करने में कर सकते हैं. इस गाइड का उद्देश्य यह सिखाना है कि ट्रफल का इस्तेमाल करके एक स्मार्ट कॉन्ट्रैक्ट बनाना और EVM-संगत पॉलीगॉन नेटवर्क पर इसे डिप्लॉय करना है.

:::note

यह ट्यूटोरियल [<ins>ट्रफल जल्दी शुरू गाइड</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) लेख का एक अनुकूलित संस्करण है.

:::

## आप क्या करेंगे {#what-you-will-do}

- इंस्टॉल करें और ट्रफ़ल को सेट अप करें
- पॉलीगॉन नेटवर्क पर कॉन्ट्रैक्ट तैनात
- पॉलीगॉन पर तैनाती की स्थिति की जांच करें

## आवश्यक शर्तें {#prerequisites}

शुरू करने  से पहले कुछ तकनीकी आवश्यकताएँ हैं. कृपया निम्नलिखित इंस्टॉल करें :

- [Node.js v8+ LTS और npm](https://nodejs.org/en/) (नोड के साथ पैक किया गया)
- [गिट](https://git-scm.com/)

जब हमारे पास वह इंस्टॉल हो जाते हैं, तो हमें ट्रफ़ल इंस्टॉल करने कि लिए केवल एक कमांड की ज़रूरत होती है:

```
npm install -g truffle
```

यह सत्यापित करने के लिए, ट्रफल को ठीक से स्थापित किया जाता है, टर्मिनल `truffle version`पर टाइप करें. अगर आप एक त्रुटि देखें, तो सुनिश्चित करें कि npm मॉड्यूल आपके पथ में जुड़ जाएं.

## कोई प्रोजेक्ट बनाना {#creating-a-project}

### MetaCoin प्रोजेक्ट {#metacoin-project}

हम ट्रफ़ल के बॉयलरप्लेट में से एक का इस्तेमाल करेंगे, जिसे आप उनके [ट्रफ़ल बॉक्स](https://trufflesuite.com/boxes/) पेज पर पा सकते हैं. [MetaCoin बॉक्स](https://trufflesuite.com/boxes/metacoin/) एक टोकन बनाता है जिसे अकाउंट के बीच ट्रांसफ़र किया जा सकता है.

1. इस Truffle प्रोजेक्ट के लिए एक नई डायरेक्टरी बनाकर शुरू करें:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. MetaCoin बॉक्स डाउनलोड करें:

  ```bash
  truffle unbox metacoin
  ```

पिछले स्टेप के साथ, आपने Truffle डिप्लॉयमेंट, परीक्षण और कॉन्फ़िगरेशन फ़ाइलों के साथ फ़ोल्डर को कोटिंग करने वाली एक Truffle प्रोजेक्ट बनाई है.

यह `metacoin.sol` फ़ाइल से स्मार्ट कॉन्ट्रैक्ट डेटा है:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

ध्यान दें कि बिलकुल `pragma` स्टेटमेंट के बाद ConvertLib को इम्पोर्ट किया जा रहा है. इस प्रोजेक्ट में, वास्तव में दो स्मार्ट कॉन्ट्रैक्ट हैं जो अंत में डिप्लॉय किए जाएँगे: एक  Metacoin है, जो सभी भेजें गए और बैलेंस लॉजिक को कंवर्ट कर रहा है; दूसरा ConvertLib है जो वैल्यू को बदलने के लिए इस्तेमाल की जाने वाली एक लाइब्रेरी है.

:::

### अनुबंध को टेस्ट करना {#testing-the-contract}

आप सॉलिडिटी और Javascript टेस्ट रन सकते हैं.

1. एक टर्मिनल में, Solidity टेस्ट रन करें:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

आपको निम्नलिखित आउटपुट देखना चाहिए:

![img](/img/truffle/test1.png)

2. JavaScript टेस्ट रन करें:

  ```bash
  truffle test ./test/metacoin.js
  ```

आपको निम्नलिखित आउटपुट देखना चाहिए:

![img](/img/truffle/test2.png)

### अनुबंध को कम्पाइल करना {#compiling-the-contract}

निम्नलिखित कमांड का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट को कम्प्लीट करें:

```bash
truffle compile
```

आप निम्नलिखित आउटपुट देखेंगे:

![img](/img/truffle/compile.png)

### स्मार्ट कॉन्ट्रैक्ट को कॉन्फ़िगर करना {#configuring-the-smart-contract}

अनुबंध को असल में डिप्लॉय करने से पहले, आपको `truffle-config.js` फ़ाइल को सेट करना, नेटवर्क डालना और कम्पाइलर  डेटा को शामिल करना होगा.

पॉलीगॉन मुंबई नेटवर्क विवरण के साथ फ़ाइल को अपडेट `truffle-config.js`करें

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

ध्यान दें कि इसके लिए में पास करने के लिए mnemonic की जरूरत होती है `maticProvider`. यह जो अकाउंट आप से तैनात करना चाहेंगे, उसके लिए बीज वाक्यांश (या निजी की) है. रुट डायरेक्टरी में एक नई `.secret` फ़ाइल बनाएँ और शुरू करने के लिए अपने 12-वर्ड नेमोनिक सीड फ़्रेज़ को भरें. MetaMask वॉलेट से बीज शब्द पाने के लिए, आप MetaMask सेटिंग में जा सकते हैं, फिर मेन्यू से, **सिक्योरिटी और प्रिवेसी** को चुनें जिसमें आप एक बटन देखेंगे जो **बीज शब्द का पता चलता** है.

### पॉलीगॉन नेटवर्क पर तैनाती {#deploying-on-polygon-network}

[पॉलीगॉन Faucet](https://faucet.polygon.technology/). का इस्तेमाल करके अपने बटुआ में MATIC जोड़ें. अगले में, प्रोजेक्ट डायरेक्टरी के रूट फ़ोल्डर में इस कमांड को रन करें:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

अपने `address`, `transaction_hash`और प्रदान किए गए अन्य विवरण को याद रखें. ऊपर वाला ढाँचे की केवल एक झलक देने के लिए है.

:::

**बधाई हो!  आपने ट्रफल का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट को सफलतापूर्वक तैनात किया है.** अब आप कॉन्ट्रैक्ट के साथ बातचीत कर सकते हैं और [पॉलीगॉनस्कैन](https://mumbai.polygonscan.com/) पर इसकी तैनाती की स्थिति की जांच भी कर सकते हैं.
