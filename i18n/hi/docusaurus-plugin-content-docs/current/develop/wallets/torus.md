---
id: torus
title: टोरस
description: टोरस dApps के लिए एक non-custodial की मैनेजमेंट सिस्टम है
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

टोरस विकेंद्रीकृत एप्प के लिए एक उपयोगकर्ता के दोस्ताना , सुरक्षित और non-custodial की मैनेजमेंट सिस्टम है. हम मुख्यधारा के यूज़र्स को विकेंद्रित इकोसिस्टम के लिए एक रास्ता देने पर ध्यान केंद्रित कर रहे हैं.

**प्रकार**: Non-custodial / एचडी<br/> **निजी की/की स्टोरी**: यूज़र का स्थानीय ब्राउज़र स्टोरेज / एनक्रिप्ट और टोरस सर्वर पर स्टोर किया जाता है.<br/> **एथेरेयम लेजर को कम्युनिकेशन**: Infura <br/>
**निजी की/कुंजी एनकोडिंग**: Mnemonic / Social-Auth-login लॉगइन<br/>

अपने एप्लिकेशन की जरूरतों के आधार पर, टोरस वॉलेट के माध्यम से या कस्टमर के माध्यम से टोरस नेटवर्क से सीधे बातचीत करके टोरस को एकीकृत किया जा सकता है. अधिक जानकारी के लिए, [टोरस](https://docs.tor.us/) दस्तावेज का दौरा करें.

## टोरस वॉलेट इंटीग्रेशन {#torus-wallet-integration}

अगर आपका एप्लिकेशन पहले से ही मेटामास्क या अन्य वेब3 प्रदाताओं के साथ संगत है, तो टोरस वॉलेट को एकीकृत करना आपको एक प्रदाता प्रदान करता जो कि उसी Web3 इंटरफेस को लपेटने के लिए देता है. आप npm पैकेज के माध्यम से इंस्टॉल कर सकते हैं. अधिक तरीके और गहराई से जानकारी के लिए, [वॉलेट इंटीग्रेशन](https://docs.tor.us/wallet/get-started) पर आधिकारिक टोरस दस्तावेज देखें.

### इंस्टॉल करना {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### उदाहरण {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## CustomAuth {#customauth-integration}

अगर आप अपने UX को नियंत्रित करने के लिए देख रहे हैं, तो आप कस्टम्स के ऑथ का इस्तेमाल कर सकते हैं. आप उनके SDK में से एक के माध्यम से एकीकृत हो सकते हैं, जो प्लेटफॉर्म (s) पर निर्भर करता है. अधिक जानकारी के लिए, [टोरस CustomAuth को इंटीग्रेशन](https://docs.tor.us/customauth/get-started) देखें.
