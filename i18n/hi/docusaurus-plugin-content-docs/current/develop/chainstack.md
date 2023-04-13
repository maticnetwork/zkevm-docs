---
id: chainstack
title: Chainstack और फाउंड्री का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट को तैनात करें
sidebar_label: Using Chainstack
description:  पॉलीगॉन पर एक स्मार्ट कॉन्ट्रैक्ट विकसित करने के लिए Chainstack और फाउंड्री का इस्तेमाल करें
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ओवरव्यू {#overview}

यह सेक्शन पॉलीगॉन मुंबई टेस्ट पर [Chainstack](https://chainstack.com/build-better-with-polygon/) और [फाउंड्री](https://github.com/gakonst/foundry/) का इस्तेमाल करके एक हेलो वर्ल्ड कॉन्ट्रैक्ट को डिप्लॉय के जरिए आपको गाइड करता है.

Chainstack Ethereum-based आधारित एप्लिकेशन और अन्य ब्लॉकचेन के लिए बुनियादी ढांचा प्रदान करता है. वे नोड्स को बनाए रखते हैं और नेटवर्क में अपने कनेक्शन की गारंटी देते हैं और मेननेट और testnets. के साथ बातचीत करने के लिए एक इंटरफेस की पेशकश भी करते हैं.

Foundry रस्ट में लिखे एथेरेयम ऐप्लिकेशन डेवलपमेंट के लिए एक तेज़ टूलकिट है. यह परीक्षण, ईवीएम स्मार्ट कॉन्ट्रैक्ट के साथ बातचीत करने, smart भेजने और ब्लॉकचेन डेटा पुनर्प्राप्ति प्रदान करता है.

:::tip

अगर आपके पास कोई सवाल है, तो [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX) सर्वर में बाहर हो जाएँ.

:::

## आप क्या जानेंगे {#what-you-will-learn}

पॉलीगॉन नोड डिप्लॉय करने के लिए Chainstack का इस्तेमाल करके और कॉन्ट्रैक्ट डिप्लॉय करने के लिए Foundry का इस्तेमाल करके एक हैलो वर्ल्ड कॉन्ट्रैक्ट बनाएँ.

## आप क्या करेंगे {#what-you-will-do}

1. Chainstack का इस्तेमाल करके पॉलीगॉन नोड डिप्लॉय करें
2. Foundry सेट-अप करें
3. स्मार्ट कॉन्ट्रैक्ट बनाएँ
4. स्मार्ट कॉन्ट्रैक्ट डिप्लॉय करें.

## एक पॉलीगॉन मुंबई नोड डिप्लॉय करें {#deploy-a-polygon-mumbai-node}

आपको ब्लॉकचेन नेटवर्क में एक स्मार्ट कॉन्ट्रैक्ट को तैनात करने के लिए नोड की जरूरत है. अपने नोड को ऊपर और रन बनाने के लिए नीचे के स्टेप्स का पालन करें:

**स्टेप 1 →** [Chainstack](https://console.chainstack.com/user/account/create) के साथ साइन अप करें

![img](/img/chainstack/sign-up.png)

**स्टेप 2 →** [मुंबई नोड को कैसे तैनात](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network) करें इस पर निर्देशों का पालन करें

![img](/img/chainstack/join-network.png)

**स्टेप 3**  [को तैनात नोडी के HTTPS एंडपॉइंट](https://docs.chainstack.com/platform/view-node-access-and-credentials) को प्राप्त करें

## Foundry इंस्टॉल करें {#install-foundry}

Foundry स्मार्ट कॉन्ट्रैक्ट के साथ काम करने वाली एक डेवलपमेंट टूलकिट है. इस पर काम शुरू करने के लिए, आपको सबसे पहले रस्ट कोडिंग भाषा इंस्टॉल करनी होगी.

1. [रस्ट इंस्टॉल करें](https://www.rust-lang.org/tools/install).
1. [Foundry इंस्टॉल करें](https://github.com/gakonst/foundry/).

## Foundry से शुरू करें {#initialize-with-foundry}

बॉयलरप्लेट प्रोजेक्ट बनाने के लिए, अपनी कार्य संबंधी डायरेक्टरी पर नेविगेट करें और रन करें:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## अपने अकाउंट में फ़ंड डालें {#fund-your-account}

स्मार्ट कॉन्ट्रैक्ट को डिप्लॉय करने के लिए आपके पास एक वॉलेट अकाउंट होना चाहिए. आप इसके लिए [मेटामास्क](https://metamask.io/) का इस्तेमाल कर सकते हैं. कॉन्ट्रैक्ट डिप्लॉय करने के लिए आपको नेटवर्क पर गैस फ़ीस का भी भुगतान करना होगा. बस अपने वॉलेट पता की कॉपी करें और [फ़ाउल के माध्यम से](https://faucet.polygon.technology/) मुंबई मैटिक टोकन को प्राप्त करें.

## हैलो वर्ड कॉन्ट्रैक्ट बनाएँ {#create-the-hello-world-contract}

`src/` में शुरुआती Foundry प्रोजेक्ट में, `HelloWorld.sol` बनाएँ:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## कॉन्ट्रैक्ट डिप्लॉय करें {#deploy-the-contract}

अब आप अपना कॉन्ट्रैक्ट डिप्लॉय करने के लिए तैयार हैं:

* पॉलीगॉन मुंबई नेटवर्क पर आपका अपना नोड है, जिसके ज़रिए आप कॉन्ट्रैक्ट डिप्लॉय करेंगे.
* आपके पास Foundry है, जिसे आप कॉन्ट्रैक्ट डिप्लॉय करते समय इस्तेमाल करेंगे.
* आपके पास फ़ंड किया हुआ एक अकाउंट है, जो कॉन्ट्रैक्ट डिप्लॉय करेगा.

कॉन्ट्रैक्ट डिप्लॉय करने के लिए, रन कराएँ:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

यहाँ,

* CONTRACT_PATH — आपकी `HelloWorld.sol` फ़ाइल का पाथ.
* PRIVATE_KEY — आपके अकाउंट की निजी की.
* HTTPS_ENDPOINT — [आपके नोड का एंडपॉइंट](https://docs.chainstack.com/platform/view-node-access-and-credentials).

उदाहरण:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

आप अंतिम चरण से बने नए हैश का इस्तेमाल करके कभी भी [<ins>मुंबई पॉलीगॉनस्कैन</ins>](https://mumbai.polygonscan.com/) पर कॉन्ट्रैक्ट डिप्लॉयमेंट की जाँच कर सकते हैं.

:::

## कॉन्ट्रैक्ट टेस्ट करें {#test-the-contract}

अगर आप यह जाँचना चाहते हैं कि कॉन्ट्रैक्ट ठीक से काम कर रहा है या नहीं, तो इसके लिए आप एक `forge test` कमांड का इस्तेमाल कर सकते हैं. कई विशेष प्रकार के टेस्ट के लिए Foundry कई सारे [विकल्प](https://book.getfoundry.sh/reference/forge/forge-test) (फ़्लैग) प्रदान करता है. टेस्ट लिखने, एडवांस टेस्ट करने और अन्य फ़ीचर्स के बारे में ज़्यादा जानने के लिए [Foundry के डॉक्यूमेंटेशन](https://book.getfoundry.sh/forge/tests) पर जाएँ.

**बधाई हो! आपने पॉलीगॉन पर अपने हेलो वर्ल्ड स्मार्ट कॉन्ट्रैक्ट को तैनात किया है.**

पॉलीगॉन से जुड़े और भी [<ins>ट्यूटोरियल</ins>](https://docs.chainstack.com/tutorials/polygon/) और [<ins>टूल्स</ins>](https://docs.chainstack.com/operations/polygon/tools) के लिए Chainstack डॉक्यूमेंट भी देखें.
