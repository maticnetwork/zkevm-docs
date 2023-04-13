---
id: hardhat
title: Hardhat का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट तैनात करें
sidebar_label: Using Hardhat
description: पॉलीगॉन पर स्मार्ट कॉन्ट्रैक्ट तैनात करने के लिए हार्डहैट का इस्तेमाल करें
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ओवरव्यू {#overview}

हरहट एक Ethereum डेवलपमेंट वातावरण है जो स्मार्ट कॉन्ट्रैक्ट्स को तैनात करने, टेस्ट रन करने और स्थानीय रूप से डिबग सॉलिडिटी कोड को Hardhat करने का एक आसान तरीका प्रदान करता है.

इस ट्यूटोरियल में, आप जानेंगे कि हार्डहैट का सेट अप कैसे करें और सरल स्मार्ट कॉन्ट्रैक्ट बनाने, टेस्ट करने और डिप्लॉय करने के लिए इसका इस्तेमाल कैसे करें.

### आप क्या करेंगे {#what-you-will-do}

- हार्डहैट का सेट अप करें
- एक सरल स्मार्ट कॉन्ट्रैक्ट बनाएँ
- अनुबंध को कंपाइल करें
- अनुबंध का टेस्ट करें
- अनुबंध डिप्लॉय करें

## विकास वातावरण का सेट अप करना {#setting-up-the-development-environment}

शुरू करने से पहले कुछ तकनीकी आवश्यकताएँ हैं. कृपया निम्नलिखित इंस्टॉल करें :

- [Node.js v10+ LTS and npm](https://nodejs.org/en/) (नोड के साथ आता है)
- [Git](https://git-scm.com/)

इन्हें इंस्टॉल करने के बाद, आपको हार्डहैट इंस्टॉल करने के लिए, एक खाली फ़ोल्डर पर जाकर `npm init`रन करके और इसके निर्देशों का पालन करके, एक npm प्रोजेक्ट बनाना होगा. प्रोजेक्ट तैयार होने के बाद, आपको इसे रन करना चाहिए:

```bash
npm install --save-dev hardhat
```

अपने हार्डहैट प्रोजेक्ट को बनाने के लिए अपने प्रोजेक्ट फ़ोल्डर में `npx hardhat` रन करें.
आइये एक सैंपल प्रोजेक्ट बनाएँ और एक सैंपल टास्क पर काम करके देखने, कंपाइल करने, टैस्ट करने और सैंपल अनुबंध को डिप्लॉय करने के लिए इन स्टेप पर चलकर देखें.

:::note

यहाँ इस्तेमाल किया गया सैंपल प्रोजेक्ट [<ins> हार्डहैट क्विकस्टार्ट गाइड</ins>](https://hardhat.org/getting-started/#quick-start) और साथ ही इसके निर्देश से आता है.

:::

## कोई प्रोजेक्ट बनाना {#creating-a-project}

एक सैंपल प्रोजेक्ट बनाने के लिए, अपने प्रोजेक्ट में `npx hardhat`रन करें. आपको निम्नलिखित प्रॉम्प्ट दिखना चाहिए:

![img](/img/hardhat/quickstart.png)

JavaScript प्रोजेक्ट चुनें और सैंपल प्रोजेक्ट को कंपाइल, टेस्ट और डिप्लॉय करने के लिए इन स्टेप पर चलें.

### अनुबंध की जाँच करना {#checking-the-contract}

`contracts`फ़ोल्डर में `Lock.sol` होता है, जो सरल डिजिटल लॉक युक्त एक सैंपल अनुबंध है, जहां यूज़र एक दी गई अवधि के बाद ही फंड निकाल सकते हैं.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### अनुबंध का सेट अप करना {#setting-up-the-contract}

- `hardhat.config.js`पर जाएँ
- matic-network-credentials के साथ `hardhat-config`को अपडेट करें.
- अपनी निजी की को संग्रहीत करने के लिए रूट में `.env` फ़ाइल स्टोर करें.
- पॉलीगॉन स्कैन पर अनुबंध को वेरिफ़ाई करने के लिए पॉलीगॉन स्कैन API की को `.env`फ़ाइल में जोड़ें. आप [एक अकाउंट बनाकर](https://polygonscan.com/register) एक API की जनरेट कर सकते हैं.

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

ध्यान दें कि ऊपर दी गई फ़ाइल को वातावरण के वेरिएबल और ईथर तथा ईथरस्कैन के प्रबंधन के लिए भी DOTENV की ज़रूरत होती है. उन सभी पैकेज को इंस्टॉल करना सुनिश्चित करें.

अधिक निर्देश और DOTENV का इस्तेमाल कैसे करें, इस पर पर अधिक जानकारी [<ins>इस पेज</ins>](https://www.npmjs.com/package/dotenv) पर प्राप्त करें.

MATIC द्वारा polygon_mumbai को बदलने पर आप MATIC (पॉलीगॉन मेननेट) पर तैनात कर सकते हैं.

:::

### अनुबंध को कम्पाइल करना {#compiling-the-contract}

अनुबंध को कंपाइल करने के लिए, आपको पहले हार्डहैट टूलबॉक्स को इंस्टॉल करना होगा:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

फिर कंपाइल करने के लिए रन करें:

```bash
npx hardhat compile
```

### अनुबंध को टेस्ट करना {#testing-the-contract}

हार्डहैट के साथ टेस्ट रन करने के लिए, आपको सिर्फ निम्नलिखित को टाइप करना होगा:

```bash
npx hardhat test
```

और यह एक अपेक्षित आउटपुट है:

![img](/img/hardhat/test.png)

### पॉलीगॉन नेटवर्क पर तैनाती {#deploying-on-polygon-network}

प्रोजेक्ट डायरेक्टरी के रुट में यह कमांड रन करें:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

अनुबंध मैटिक के मुंबई टेस्टनेट पर डिप्लॉय किया जाएगा और आप डिप्लॉय की स्थिति यहाँ जाँच सकते हैं: https://mumbai.polygonscan.com/

**बधाई हो! आपने ग्रीटर स्मार्ट कॉन्ट्रैक्ट को सफलतापूर्वक डिप्लॉय कर लिया है. अब आप स्मार्ट कॉन्ट्रैक्ट से इंटरैक्ट कर सकते हैं.**

:::tip पॉलीगॉन स्कैन पर अनुबंधों को शीघ्र वेरिफ़ाई करें

पॉलीगॉन स्कैन पर अपने अनुबंध को शीघ्र वेरिफ़ाई करने के लिए निम्नलिखित कमांड रन करें. इससे आपके डिप्लॉय किए हुए अनुबंध कोड को किसी के लिए भी देखना आसान हो जाता है. एक जटिल आर्ग्यूमेंट लिस्ट युक्त कंस्ट्रक्टर वाले अनुबंध के लिए [यहाँ](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) देखें.

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
