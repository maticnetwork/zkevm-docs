---
id: getting-started
title: matic.js से शुरूआत करना
sidebar_label: Instantiating Matic.js
description: "पॉलीगॉन पॉस चेन के साथ इंटरैक्ट करें के लिए Matic.js का उपयोग करें."
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

शुरू करने के लिए, नवीनतम [Matic.js डॉक्यूमेंटेशन](/docs/develop/ethereum-polygon/matic-js/get-started) जाँचें.

## झटपट वाला सारांश {#quick-summary}

Matic.js SDK पॉलीगॉन की सभी कंप्यूटिंग शक्ति लेता है और इसे और इसे आपकी उंगलियों पर रखता है. कस्टम-मेड फ़ंक्शंस के साथ जो बहुत अधिक फुटवर्क किए बिना अनुमोदन, जमा और निकासी करने देता है. इसे इंजीनियरिंग करने का हमारा कारण यह सुनिश्चित करना था कि आपको हमारे प्लेटफॉर्म से तत्काल मूल्य मिले.

## इंस्टॉल करना {#installation}
हमारे SDK के माध्यम से पॉलीगॉन की अद्भुत शक्ति का उपयोग करने के लिए पहला कदम इसकी NPM स्थापना करना है. [यहाँ](https://www.npmjs.com/package/@maticnetwork/maticjs) खोजें.

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## उपयोग {#usage}
SDK तक पहुँचने के लिए, का उपयोग करके इसे अपने आवेदन में इम्पोर्ट करें
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

प्रोवाइडर जरूरत के आधार पर RPC URLs या Web3-आधारित प्रदाता जैसे MetaMask प्रोवाइडर हो सकते हैं.

अधिक जानकारी के लिए, [पॉस पर Matic.js डॉक्यूमेंटेशन](https://maticnetwork.github.io/matic.js/docs/pos/) पर कृपया एक नज़र रखें.

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});
```
