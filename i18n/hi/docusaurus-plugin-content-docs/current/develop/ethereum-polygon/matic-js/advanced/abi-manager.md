---
id: abi-manager
title: ABI मैनेजर
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Matic.js का इंटरनल ABI मैनेजर."
---

`matic.js` आंतरिक रूप से आपके लिए ABI मैनेजमेंट, कॉन्फ़िगरेशन को संभालने के लिए `ABIManager` का इस्तेमाल करती है. सारे के सारे ABI और कॉन्फ़िगरेशन [static repo](https://github.com/maticnetwork/static) से लिए गए हैं.

## ABI बदलें {#change-abi}

कभी-कभी आपको ABI को बदलना पड़ता है, खासकर जब आप एक कॉन्ट्रैक्ट तैयार कर रहे हों. आप `ABIManager` का इस्तेमाल करके ऐसा कर सकते हैं.

**सिंटैक्स**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

नेटवर्क का नाम, कॉन्ट्रैक्ट का नाम, ब्रिज का नाम आदि हमारे [आधिकारिक स्टेटिक रेपो](https://github.com/maticnetwork/static/tree/master/network) से लिया जा सकता है.

**उदाहरण**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




