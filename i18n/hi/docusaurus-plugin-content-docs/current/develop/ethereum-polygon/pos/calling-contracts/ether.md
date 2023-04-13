---
id: ether
title: एथेर डिपाज़िट करने और निकालने की गाइड
sidebar_label: Ether
description:  "एथेर अनुबंध के लिए उपलब्ध फ़ंक्शन."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## उच्च स्तरीय फ़्लो {#high-level-flow}

एथेर डिपाज़िट करना -

- **रूट चेन मैनेजर** पर इनके लिए एथेर डिपाज़िट करें का सहारा लें और एथेर असेट भेजें.

एथेर निकालना -

1. पॉलीगॉन चेन पर टोकन **_बर्न करें_**.
2. बर्न ट्रांज़ैक्शन का सबूत सबमिट करने के लिए **_रूट चेन मैनेजर_** पर **_बाहर निकलें_** फ़ंक्शन का सहारा लें. यह कॉल तब ही किया जा सकता है जब बर्न ट्रांज़ैक्शन वाले ब्लॉक के लिए **_चेकपॉइंट_** सबमिट कर दिया गया हो.

## स्टेप के विवरण {#step-details}

### अनुबंध की किसी घटना का उदाहरण दें {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### डिपाज़िट करें {#deposit}
कॉन्ट्रैक्ट के `depositEtherFor`फंक्शन को कॉल `RootChainManager`करें. यह फंक्शन 1 argument लेता है `userAddress`- जो कि उस यूजर का पता है जो पॉलीगॉन चेन पर जमा करेगा. जमा किए जाने वाले ईथर की मात्रा को the के वैल्यू के रूप में भेजा जाना चाहिए.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### बर्न करें {#burn}
चूंकि ईथर पॉलीगॉन चेन पर ERC20 टोकन है, इसलिए इसकी निकासी की प्रक्रिया ERC20 के साथ ही होती है. टोकन को चाइल्ड टोकन कॉन्ट्रैक्ट पर `withdraw`फंक्शन को कॉल करके जला दिया जा सकता है. यह फंक्शन एक सिंगल आर्गुमेंट लेता है, जिससे टोकन्स की संख्या को जलाने का `amount`संकेत मिलता है. इस बर्न के सबूत को बाहर निकलें स्टेप में सबमिट करना होगा. तो ट्रांज़ैक्शन हैश को स्टोर करें.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### बाहर निकलें {#exit}
`RootChainManager`कॉन्ट्रैक्ट पर निकलने का फंक्शन को लॉक करने के लिए बुलाया जाना है और टोकन्स को वापस प्राप्त करना पड़ता है .`EtherPredicate` यह फ़ंक्शन सिंगल बाइट का एक आर्गुमेंट लेता है जो बर्न ट्रांज़ैक्शन को साबित करता है. इस फंक्शन को बुलाने से पहले बर्न transaction the को जमा करने वाले चेकपॉइंट का इंतजार करें. The को RLP-encoding द्वारा उत्पन्न किया जाता है:

1. headerNumber - चेकपॉइंट हेडर ब्लॉक नंबर जिनमें बर्न tx होता है
2. ब्लॉक प्रूफ़ - इसका सबूत है कि ब्लॉक हेडर (चाइल्ड चेन में) सबमिट किए गए मर्कल रुट में एक हिस्सा है
3. ब्लॉक नंबर - चाइल्ड चेन पर बर्न ट्रांज़ैक्शन युक्त ब्लॉक नंबर
4. ब्लॉक समय - बर्न ट्रांज़ैक्शन का ब्लॉक समय
5. ट्रांज़ैक्शन रुट - ब्लॉक का ट्रांज़ैक्शन रुट
6. रसीद रुट - ब्लॉक की रसीद रुट
7. रसीद - बर्न ट्रांज़ैक्शन की रसीद
8. रसीद का सबूत - बर्न रसीद का मर्कल सबूत
9. ब्रंच मास्क - मर्कल पैटरिशिया ट्री में रसीद का पाथ दिखाते हुए 32 बिट्स
10. रसीद लॉग इंडेक्स - रसीद से पढ़ने के लिए लॉग इंडेक्स

मैन्युअल रूप से सबूत बनाना टेढ़ी खीर हो सकता है, इसलिए पॉलीगॉन एज का इस्तेमाल करने की सलाह दी जाती है. अगर आप ट्रांज़ैक्शन को मैन्युअल रूप से भेजना चाहते हैं, तो आप रॉ कॉलडेटा पाने के लिए ऑपशंज़ ऑब्जेक्ट में **_encodeAbi_** को **_सही_** के रूप में पास कर सकते हैं.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

इस कॉलडेटा को **_रूट चेन मैनेजर_** को भेजें.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
