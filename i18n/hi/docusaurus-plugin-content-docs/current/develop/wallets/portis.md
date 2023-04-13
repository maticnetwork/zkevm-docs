---
id: portis
title: Portis
description: इस वेब-आधारित वॉलेट को आसान यूज़र-ऑनबोर्डिंग को ध्यान में रख कर बनाया गया है.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis एक वेब-आधारित वॉलेट है जिसे आसान यूज़र-ऑनबोर्डिंग को ध्यान में रख कर बनाया गया है. यह JavaScript SDK के साथ आता है जो DApp में इंटीग्रेट होता है और यूज़र को एक लोकल वालेट-रहित अनुभव प्रदान करता है. इसके अलावा, यह वॉलेट, the और गैस की फीस को सेट करने को संभालता है.

मेटामास्क की तरह, यह नॉन-कस्टोडियल है - यूज़र्स अपनी कीज़ को कंट्रोल करते हैं, Portis सिर्फ उन्हें सुरक्षित रूप से स्टोर कर लेता है. लेकिन मेटामास्क के उलट, इसे ऐप्लिकेशन में इंटीग्रेट किया जाता है ब्राउज़र में नहीं. यूज़र्स के पास उनकी यूज़र ID और पासवर्ड से जुड़ी कीज़ होती हैं.

**प्रकार**: नॉन-कस्टोडियल/HD <br/>
**निजी की/कुंजी स्टोरी**: Portis सर्वर पर गोपित और स्टोर<br/> **Ethereum लेजर को संचार**: डेवलपर द्वारा Defined<br/> **निजी की एनकोडिंग**: नेमोनिक <br/>

## Web3 सेट करें {#set-up-web3}

अपने DApp में Portis को संस्थापित करें:

```js
npm install --save @portis/web3
```

अब, [Portis डैशबोर्ड](https://dashboard.portis.io/) का इस्तेमाल करके Dapp आईडी प्राप्त करने के लिए अपने DApp को Portis के साथ रजिस्टर करें.

इम्पोर्ट `portis`और `web3`ऑब्जेक्ट:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portis कंस्ट्रक्टर पहले तर्क को लेते हैं क्योंकि Dapp ID और दूसरे तर्क के रूप में जो नेटवर्क आप कनेक्ट करना चाहते हैं. यह या तो स्ट्रिंग या कोई ऑब्जेक्ट हो सकता है.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## खाता सेट करें {#set-up-account}

अगर वेब3 का इंस्टॉलेशन और इन्स्टैन्शीऐशन सफल रहा है, तो नीचे दी गई चीज़ों को कनेक्ट किए गए अकाउंट पर रिटर्न होना चाहिए:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## कॉन्ट्रैक्ट को इंस्टॉल कर रहा है {#instantiating-contracts}

इस प्रकार हमें कॉन्ट्रैक्ट को इंस्टैंट करना चाहिए:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Calling {#calling-functions}

### कॉल `call()`फंक्शन {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### कॉल `send()`फंक्शन {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
