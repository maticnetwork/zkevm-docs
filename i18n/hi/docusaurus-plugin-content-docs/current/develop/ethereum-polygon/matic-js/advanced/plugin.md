---
id: plugin
title: प्लगइन
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Matic.js में कोड इंजेक्ट करने के लिए प्लगइन का प्रयोग करें.'
---

प्लगइन का उपयोग करके आप अपने कोड को `matic.js`में इंजेक्ट कर सकते हैं. इसका उपयोग सामान्य कोड के सामान्य सेट को लिखने के लिए किया जा सकता है जो किसी पैकेज का उपयोग करने वाले को प्रदान किया जा सकता है.

:::info
प्लगइन `matic.js`को हल्का वजन बनाता है क्योंकि यह केवल महत्वपूर्ण तार्किक हिस्से को लागू करता है.
:::

वास्तव में, वेब3 लाइब्रेरी को प्लगइन का उपयोग करके समर्थित किया जाता है जो हमें अपने पसंदीदा लाइब्रेरी का उपयोग करने की अनुमति देता है.

### प्लगइन डेवलपमेंट {#plugin-development}

प्लगइन एक क्लास है जो `IPlugin`को लागू करता है.

```
import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
```

जैसा कि आप देख सकते हैं - आपको बस एक `setup`विधि लागू करने की आवश्यकता है जिसे `matic.js`के डिफ़ॉल्ट निर्यात के साथ लाया जाएगा.

### प्लगइन का इस्तेमाल करें {#use-plugin}

`matic.js`एक प्लगइन का उपयोग करने के लिए `use`विधि का खुलासा करें.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

आप कई प्लगइन्स का उपयोग कर सकते हैं और उन्हें उसी क्रम में बुलाया जाएगा जिस क्रम में उन्हें घोषित किया गया हो.

**कुछ प्लगइन रिपोज़ हैं -**

- [मैटिक web3.js](https://github.com/maticnetwork/maticjs-web3)
- [मैटिक ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
