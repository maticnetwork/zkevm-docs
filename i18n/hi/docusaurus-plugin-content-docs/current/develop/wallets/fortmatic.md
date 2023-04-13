---
id: fortmatic
title: Fortmatic
description: पॉलीगॉन के साथ अपने dApp को एकीकृत करने के लिए Formatic एसडीके का इस्तेमाल करें
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic से शुरू हो रहे एक dApp को पहले से ही Web3 के साथ एकीकृत किया जा रहा है, Fortmatic आप और आपके विकेंद्रीकृत एप्लिकेशन यूजर्स दोनों के लिए एक सुगम और सुखद अनुभव प्रदान करता है.

## इंस्टॉल करना {#installation}

Fortmatic's के वॉलेट नवीनतम संस्करण को इंस्टॉल करने के लिए निम्नलिखित कमांड का इस्तेमाल करें:

```bash
$ npm i --save fortmatic@latest
```

## उदाहरण {#example}
यहां Fortmatic: का इस्तेमाल करके एप्लिकेशन का एक उदाहरण है:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
