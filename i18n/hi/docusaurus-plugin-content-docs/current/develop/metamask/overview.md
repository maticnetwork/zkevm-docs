---
id: overview
title: मेटामास्क का ओवरव्यू
sidebar_label: Overview
description: आप पॉलीगॉन पर मेटामास्क के साथ कैसे शुरूआत कर सकते हैं
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[मेटामास्क](https://metamask.io/) एक क्रिप्टो वॉलेट है जिसका इस्तेमाल एथेरेयम ब्लॉकचेन के साथ इंटरैक्ट करने के लिए वेब ब्राउज़र और मोबाइल डिवाइस पर किया जा सकता है. यह आपको बिना पूरे एथेरेयम नोड को रन किए एथेरेयम Dapps (विकेंद्रित ऐप्स) सीधे आपके ब्राउज़र में रन करने देता है.

**किस्म**: Non-custodial/HD <br/>
**निजी की स्टोरेज**: यूज़र के स्थानीय ब्राउज़र का स्टोरेज <br/>
**एथेरेयम लेजर से कम्युनिकेशन**: Infura <br/>
**निजी की एनकोडिंग**: नेमोनिक <br/>

:::warning
कृपया अपने **सीक्रेट रिकवरी Phrase.** को बैकअप लें. अगर आपका डिवाइस टूटता है, तो चोरी हो जाती है, या डेटा का भ्रष्टाचार है, तो उसे ठीक करने के लिए कोई दूसरा रास्ता नहीं है. **[<ins>MetaMask के लिए अधिक बेसिक सेफ्टी और सिक्योरिटी टिप्स</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)** की जांच करें.
:::

## पॉलीगॉन के लिए मेटामास्क सेट करने के लिए गाइड {#guide-to-set-up-metamask-for-polygon}

* [मेटामास्क डाउनलोड तथा इंस्टॉल करें](/develop/metamask/tutorial-metamask.md)
* [मेटामास्क पर पॉलीगॉन कॉन्फ़िगर करें](/develop/metamask/config-polygon-on-metamask.md)
* [कस्टम टोकन कॉन्फ़िगर करें](/develop/metamask/custom-tokens.md)
* [अकाउंट बनाएँ और इम्पोर्ट करें](/develop/metamask/multiple-accounts.md)

### 1. वेब 3 सेट अप करें {#1-set-up-web3}

#### स्टेप 1 {#step-1}

नीचे दी गई ऐप को अपने DApp में इंस्टॉल करें:

  ```javascript
  npm install --save web3
  ```

एक नई फ़ाइल बनाएँ, इसका नाम `web3.js` रखें और इसमें निम्न कोड डालें:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

ऊपर वाली फ़ाइल, `getWeb3()` नामक फ़ंक्शन को एक्सपोर्ट करती है - जिसका उद्देश्य ग्लोबल ऑब्जेक्ट (`ethereum` या `web3`) का पता लगाकर या मेटामास्क द्वारा इंजेक्ट किए गए ऑब्जेक्ट के ज़रिए मेटामास्क अकाउंट को एक्सेस करने का अनुरोध करना है.

[मेटामास्क API डॉक्यूमेंटेशन](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes) के अनुसार:

> MetaMask विंडो window.ethereum. में अपने उपयोगकर्ताओं द्वारा की गई वेबसाइटों में एक वैश्विक API को इंजेक्ट करता है. यह API वेबसाइटों को यूजर्स के Ethereum अकाउंट का अनुरोध करने की अनुमति देता है, जिससे यूजर को कनेक्ट किया जा रहा है, और सुझाव देता है कि यूजर मैसेज और the the को साइन करें प्रदाता वस्तु की उपस्थिति एक Ethereum the को इंगित करती है.

सरल शब्दों में, इसका मूल अर्थ यह है कि आपके ब्राउज़र में मेटामास्क का एक्सटेंशन/एड-ऑन होने के बाद, आपके पास एक वैश्विक वेरिएबल परिभाषित होता है, जिसे `ethereum`पुराने संस्करणों के `web3`लिए) कहा जाता है और इस चर का इस्तेमाल करके हम अपनी वेब3 ऑब्जेक्ट को इंस्टैंट करते हैं.

#### स्टेप 2 {#step-2}

अब, अपने क्लाइंट कोड में, उपरोक्त फ़ाइल को आयात करें:

```js
  import getWeb3 from '/path/to/web3';
```

और फ़ंक्शन का सहारा लें:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. अकाउंट सेट अप करें {#2-set-up-account}

अब transactions भेजने के लिए (विशेष रूप से जो लोग ब्लॉकचेन की स्थिति को बदल देते हैं) हमें उन the पर हस्ताक्षर करने के लिए अकाउंट की जरूरत होगी. हम ऊपर बनाए गए वेब3 ऑब्जेक्ट से अपने कॉन्ट्रैक्ट इंस्टैंस को इंस्टैंट करते हैं:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

`getAccounts()` फ़ंक्शन यूज़र के मेटामास्क पर सभी अकाउंट की एक सारणी पेश करता है और `accounts[0]` वर्तमान में यूज़र द्वारा चुना गया है.

### 3. अपने अनुबंध के लिए उदाहरण दें {#3-instantiate-your-contracts}

एक बार जब हमें अपनी `web3`वस्तु है, तो हम अपने कॉन्ट्रैक्ट को अगले कर देंगे, यह मानकर कि आपके पास अपना कॉन्ट्रैक्ट एबीआई है और पहले से ही जगह पता है:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. सहारा लेने के लिए इस्तेमाल किए जाने वाले फ़ंक्शन {#4-call-functions}

अब किसी भी फंक्शन के लिए आप अपने कॉन्ट्रैक्ट से कॉल करना चाहते हैं, हम सीधे अपने instantiated कॉन्ट्रैक्ट ऑब्जेक्ट के साथ बातचीत करते हैं (जिसे स्टेप 2 में घोषित `myContractInstance`किया गया है).

:::tip एक त्वरित समीक्षा

कॉन्ट्रैक्ट की स्टेट को बदलने वाले फंक्शन को फंक्शन्स कहा जाता `send()`है. जो फंक्शन कॉन्ट्रैक्ट की स्टेट को नहीं बदल देते उन्हें फंक्शन कहा जाता `call()`है.

:::

#### `call()` फ़ंक्शन्स को कॉल करना {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### `send()` फ़ंक्शन्स को कॉल करना {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
