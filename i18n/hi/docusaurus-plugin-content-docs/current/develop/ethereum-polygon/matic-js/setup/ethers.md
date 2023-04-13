---
id: ethers
title: 'एथेर का सेटअप'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'ethers.js को इंस्टॉल और सेट अप करें'
---

# Ether.js {#ether-js}

[ethers.js](https://docs.ethers.io/) लाइब्रेरी का लक्ष्य एथेर ब्लॉकचेन और उसके इकोसिस्टम से इंटरैक्ट करने के लिए एक पूर्ण और कॉम्पैक्ट लाइब्रेरी बनना है.

## ether.js सेटअप करें {#setup-ether-js}

ether.js सहायता एक अलग पैकेज के ज़रिए matic.js के लिए प्लगइन के रूप में उपलब्ध है.

### इंस्टॉल करना {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### सेटअप {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

आएँ, एथर का इस्तेमाल करते हुए `POSClient` बनाने का एक उदाहरण देखते हैं -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## उदाहरण {#examples}

विभिन्न स्थितियों के लिए उदाहरण [एथेर प्लगइन रिपाज़िटोरी](https://github.com/maticnetwork/maticjs-ethers) पर उपलब्ध हैं.
