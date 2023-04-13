---
id: walletconnect
title: वैलेट कनेक्ट
description: एक ऐसा खुला प्रोटोकॉल जो DApp-वॉलेट संचार पैदा करता है.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**वैलेट कनेक्ट** एक ओपन प्रोटोकॉल है - DApps और वॉलेट के बीच एक कम्युनिकेशन लिंक बनाने के लिए नहीं बनाई गई वॉलेट - का निर्माण करता है. वॉलेट और इस प्रोटोकॉल का समर्थन करने वाला एप्लिकेशन किसी भी दो peers. के बीच एक साझा की/कुंजी के माध्यम से एक सुरक्षित लिंक को सक्षम करेगा. DApp द्वारा एक मानक वॉलेटकनेक्ट URI के साथ एक QR कोड प्रदर्शित करके एक कनेक्शन की शुरूआत की जाती है और जब वॉलेट ऐप्लिकेशन कनेक्शन के अनुरोध को मंजूरी दे देता है तो कनेक्शन स्थापित हो जाता है. फ़ंड ट्रांसफर के संबंध में अनुरोधों की पुष्टि वॉलेट ऐप्लिकेशन पर ही की जाती है.

## सेटअप Web3 {#set-up-web3}

एक यूजर के पॉलीगॉन वैलेट से जुड़ने के लिए अपने dApp को सेट करने के लिए, आप पॉलीगॉन से सीधे कनेक्ट करने के लिए वॉलेटकनेक्ट के प्रदाता का इस्तेमाल कर सकते हैं. नीचे दी गई चीज़ को अपने dapp में इंस्टॉल करें:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

पॉलीगॉन एकीकरण के `matic.js`लिए संस्थापित करें:

```bash
$ npm install @maticnetwork/maticjs
```

और अपने dApp में निम्नलिखित कोड जोड़ लें.

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

इसके बाद, वॉलेटकनेक्ट की वस्तु के माध्यम से पॉलीगॉन और रोपस्टन प्रदाता को सेट करें:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

हमने अपने वेब3 ऑब्जेक्ट को इंस्टैंशिएट करने के लिए ऊपर दिए गए प्रोवाइडर के दो ऑब्जेक्ट को तैयार किया है:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## कॉन्ट्रैक्ट को इंस्टॉल कर रहा है {#instantiating-contracts}

एक बार जब हमारे **वेब3 ऑब्जेक्ट** हैं, तो कॉन्ट्रैक्ट की instantiating में मेटामास्क के लिए समान कदम शामिल होते हैं. सुनिश्चित करें कि आपके पास अपना **कॉन्ट्रैक्ट एबीआई** है और **पता** पहले से ही जगह पर है.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Calling {#calling-functions}

:::info

निजी की, यूजर के वॉलेट में बनी रहेगी और **ऐप किसी भी तरह से इसे एक्सेस नहीं करता है**.

:::

ब्लॉकचेन के साथ बातचीत के आधार पर, हम Ethereum, में दो प्रकार के कार्य होते हैं. हम `call()` जब हम डेटा पढ़ते हैं और `send()` जब हम डेटा को लिखते हैं.

### `call()` फ़ंक्शन्स को कॉल करना {#functions}

डेटा को पढ़ने में सिग्नेचर की जरूरत नहीं होती है, इसलिए कोड को इस तरह होना चाहिए:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### `send()` फ़ंक्शन्स को कॉल करना {#functions-1}

चूंकि ब्लॉकचेन में लिखने के लिए एक सिग्नेचर की जरूरत होती है, इसलिए हम the पर हस्ताक्षर करने के लिए यूजर को उनके वॉलेट (जो वॉलेटकनेक्ट का समर्थन करता है) पर तुरंत जल्दी ही जल्दी करते हैं.

इसमें तीन स्टेप्स शामिल हैं:
1. ट्रांज़ैक्शन तैयार करना
2. ट्रांज़ैक्शन पर सिग्नेचर लेना
3. साइन किए गए ट्रांज़ैक्शन को भेजना

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

ऊपर दिया गया कोड एक ट्रांज़ैक्शन ऑब्जेक्ट तैयार करता है जिसे बाद में सिग्नेचर के लिए यूज़र के वॉलेट में भेजा जाता है:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`फंक्शन यूजर को अपने हस्ताक्षर के लिए प्रोग्राम करता है और हस्ताक्षरित transaction the को `sendSignedTransaction()`भेजता है (सफलता पर transaction the रसीद लौटाता है).
