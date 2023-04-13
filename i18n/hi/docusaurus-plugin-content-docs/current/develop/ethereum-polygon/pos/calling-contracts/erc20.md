---
id: erc20
title: erc20 डिपाज़िट करने और निकालने की गाइड
sidebar_label: ERC20
description: "erc20 अनुबंध के लिए उपलब्ध फ़ंक्शन."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## उच्च स्तरीय फ़्लो {#high-level-flow}

ERC20 डिपाज़िट करना -

1. जो टोकन डिपाज़िट करने हैं उन्हें खर्च करने के लिए आप **_erc20भविष्यवाणी_** अनुबंध को **_मंज़ूर_** करें.
2. **_रूट चेन मैनेजर_** पर **_इनके लिए डिपाज़िट करें_** का सहारा लें.

ERC20 निकालना -

1. पॉलीगॉन चेन पर टोकन **_बर्न करें_**.
2. बर्न ट्रांज़ैक्शन का सबूत सबमिट करने के लिए **_रूट चेन मैनेजर_** पर **_बाहर निकलें_** फ़ंक्शन का सहारा लें. यह कॉल तब ही किया जा सकता है जब बर्न ट्रांज़ैक्शन वाले ब्लॉक के लिए **_चेकपॉइंट_** सबमिट कर दिया गया हो.

## सेटअप का विवरण {#setup-details}

### अनुबंध की किसी घटना का उदाहरण दें {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### मंज़ूर करें {#approve}
टोकन अनुबंध के **_मंज़ूर करें_** फ़ंक्शन का सहारा लेकर टोकन को खर्च करने के लिए **_erc20भविष्यवाणी_** को मंज़ूर करें. यह फ़ंक्शन दो चीज़ों को ध्यान में रखता है, **_खर्च करने वाला_** और रकम. खर्च करने वाला वह पता है जो यूज़र के टोकन को खर्च करने के लिए मंज़ूर किया जा रहा है. **_रकम_** वह मात्रा है जिसके टोकन खर्च किए जा सकते हैं. रकम को एक बार की मंज़ूरी के लिए डिपाज़िट रकम के बराबर रखें या कई बार मंजूरी देने से बचने के लिए बड़ी संख्या में पास करें.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### डिपाज़िट करें {#deposit}
नोट करें कि इसका सहारा लेने पर आने से पहले टोकन को मैप किया हुआ होना चाहिए और रकम को डिपाज़िट करने के मंज़ूरी होनी चाहिए.  
कॉन्ट्रैक्ट के `depositFor()`फंक्शन को कॉल `RootChainManager`करें. यह फंक्शन 3 आर्गुमेंट लेता `userAddress``rootToken`है, और `depositData`. . उस यूजर का पता `userAddress`है जो पॉलीगॉन चेन पर जमा `rootToken`पाएगा. मुख्य चेन पर टोकन का पता `depositData`है.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### बर्न करें {#burn}
चाइल्ड टोकन अनुबंध पर **_निकालने_** के फ़ंक्शन का सहारा लेकर पॉलीगॉन चेन पर टोकन बर्न किए जा सकते हैं. यह फ़ंक्शन एक अकेली चीज़ का ध्यान रखता है, **_रकम_** जो कितने टोकन बर्न किए जाने हैं उनकी मात्रा को इंगित करती है. इस बर्न के सबूत को बाहर निकलें स्टेप में सबमिट करने की ज़रूरत है. तो ट्रांज़ैक्शन हैश को स्टोर करें.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### बाहर निकलें {#exit}
`RootChainManager`कॉन्ट्रैक्ट पर निकलने का फंक्शन को लॉक करने के लिए बुलाया जाना है और टोकन्स को वापस प्राप्त करना पड़ता है .`ERC20Predicate` यह फ़ंक्शन सिंगल बाइट का एक आर्गुमेंट लेता है जो बर्न ट्रांज़ैक्शन को साबित करता है. इस फंक्शन को बुलाने से पहले बर्न transaction the को जमा करने वाले चेकपॉइंट का इंतजार करें. Pro RLP द्वारा निम्नलिखित क्षेत्रों को एनकोडिंग में उत्पन्न किया जाता है -

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
