---
id: web3
title: 'Web3js सेट अप'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'web3.js इंस्टॉल करें और उसका सेट अप करें.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) लाइब्रेरियों का ऐसा संग्रह है जो आपको HTTP, IPC या वेबसॉकेट का इस्तेमाल करके, स्थानीय और दूर स्थित एथेरियम नोड से इंटरैक्ट करने की सुविधा देता है.

## web3.js सेटअप करें {#setup-web3-js}

web3.js सहायता, अलग पैकेज के ज़रिये, एक प्लग इन के रूप में matic.js के लिए उपलब्ध है.

### इंस्टॉल करना {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### सेटअप {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

आइए, web3 का इस्तेमाल करके, `POSClient` बनाने का एक उदाहरण देखें -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## उदाहरण {#examples}

विभिन्न मामलों के लिए उदाहरण [web3 प्लगइन रेपो](https://github.com/maticnetwork/maticjs-web3) में उपलब्ध हैं
