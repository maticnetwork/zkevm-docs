---
id: get-started
title: शुरू करें
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Matic.js के साथ शुरू करें
---

`@matic.js` एक जावास्क्रिप्ट लाइब्रेरी है जो मैटिक नेटवर्क के विभिन्न कंपोनेंट्स के साथ इंटरैक्ट करने में मदद करती है.

इस शुरू होने वाले ट्यूटोरियल में - हम जानेगें कि POS ब्रिज के साथ सेटअप करके इंटरैक्ट कैसे कर सकते हैं.

## इंस्टॉल करना {#installation}

**npm: के माध्यम से maticjs पैकेज को इंस्टॉल करें:**

```bash
npm install @maticnetwork/maticjs
```

**web3js प्लगइन इंस्टॉल करें**

```bash
npm install @maticnetwork/maticjs-web3
```

## सेटअप {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

ऊपर दिए कोड के साथ हम maticjs के साथ `web3js` की शुरुआत कर रहे हैं लेकिन, आप इसी तरह [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers) के साथ भी शुरुआत कर सकते हैं.

## POS क्लाइंट {#pos-client}

`POSClient` POS ब्रिज से इंटरैक्ट करने में हमारी मदद करता है.

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

`POSClient` की शुरुआत करने के बाद, हमें आवश्यक टोकन के प्रकारों जैसे - `erc20`, `erc721` इत्यादि को शुरू करना होता है.

आइए, `erc20` को शुरू करें

### erc20 {#erc20}

**erc20 चाइल्ड टोकन बनाएँ**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**erc20 पैरेंट टोकन बनाएँ**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

एक बार erc20 को शुरू करने के बाद, आप बहुत से उपलब्ध तरीकों जैसे - `getBalance`, `approve`, `deposit`, `withdraw` इत्यादि को कॉल कर सकते हैं.

आइए, कुछ API के उदाहरण देखते हैं -

#### बैलेंस प्राप्त करें {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### मंज़ूरी दें {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


जैसा कि आप देख सकते हैं, maticjs अपने सरल API के साथ, maticjs ब्रिज से इंटरैक्ट करना बहुत आसान बना देता है. **आइए, कुछ शानदार करने की शुरुआत करें**

### कुछ महत्वपूर्ण लिंक {#some-important-links}

- [उदाहरण](https://github.com/maticnetwork/matic.js/tree/master/examples)
