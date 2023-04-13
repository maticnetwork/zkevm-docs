---
id: quicknode
title: क्विकनोड का इस्तेमाल करके स्मार्ट कॉन्ट्रैक्ट को तैनात करें
sidebar_label: Using QuickNode
description:  ब्राउनी और क्विकनोड का इस्तेमाल करके पॉलीगॉन पर स्मार्ट कॉन्ट्रैक्ट को तैनात करें.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ओवरव्यू {#overview}

पाइथन सबसे बहुमुखी प्रोग्रामिंग भाषाओं में से एक है; शोधकर्ताओं ने अपने टेस्ट मॉडल को लेकर डेवलपर्स तक को भारी उत्पादन के वातावरण में इस्तेमाल करके डेवलपर्स तक रन कर लिया है, इसमें हर संभव तकनीकी क्षेत्र में मामलों का इस्तेमाल होता है.

इस ट्यूटोरियल में, आप सीखना होगा कि पॉलीगॉन के लिए [क्विकनोड](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) टेस्टनेट नोड्स का इस्तेमाल करके एक स्मार्ट कॉन्ट्रैक्ट को लिखने और तैनात करने के लिए [ब्राउनी](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) फ्रेमवर्क का इस्तेमाल कैसे करें.

:::tip

Quicknode की टीम से संपर्क करने के लिए, उन्हें मैसेज भेजें या उन्हें Twitter पर [@QuickNode](https://twitter.com/QuickNode) पर टैग करें.

:::

## आवश्यक शर्तें {#prerequisites}

- पाइथन
- पॉलीगॉन नोड
- कोड संपादक
- कमांड लाइन इंटरफेस

## आप क्या करेंगे {#what-you-will-do}

1. Brownie का सेट-अप करें
2. Quicknode टेस्ट नोड्स को एक्सेस करें
3. स्मार्ट कॉन्ट्रैक्ट को कम्पाइल करें और डिप्लॉय करें
4. तैनात कॉन्ट्रैक्ट डेटा की जांच करें

## Brownie क्या है? {#what-is-brownie}

स्मार्ट कॉन्ट्रैक्ट डेवलपमेंट में सबसे ज़्यादा जावास्क्रिप्ट-आधारित लाइब्रेरी जैसे [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/), और [Hardhat](https://hardhat.org/) ही लोकप्रिय हैं. पाइथन एक वर्सटाइल है और जिसका इस्तेमाल स्मार्ट कॉन्ट्रैक्ट / Web3 के विकास के लिए भी किया जा सकता है; [वेब3.py](https://web3py.readthedocs.io/en/stable/) एक compelling पायथन लाइब्रेरी है जो Web3 की जरूरतों को पूरा करती है. `web3.py`की शीर्ष पर ब्राउनी फ्रेमवर्क का निर्माण किया गया है

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) स्मार्ट कॉन्ट्रैक्ट्स को डेवलप करने और उनका टेस्ट करने के लिए एक पाइथन-आधारित फ्रेमवर्क है. Brownie सॉलिडिटी और वायपर दोनों कॉन्ट्रैक्ट्स को सपोर्ट करता है और यह [पाइटेस्ट](https://github.com/pytest-dev/pytest) के माध्यम से कॉन्ट्रैक्ट टेस्ट भी प्रदान करता है.

Brownie के साथ एक स्मार्ट कॉन्ट्रैक्ट लिखने और डिप्लॉय करने की प्रक्रिया को प्रदर्शित करने के लिए, हम [Brownie-मिक्स](https://github.com/brownie-mix) का इस्तेमाल करेंगे, जो कि टेम्प्लेट प्रोजेक्ट हैं. विशेष रूप से, हम एक [टोकन मिक्स](https://github.com/brownie-mix/token-mix), का इस्तेमाल करेंगे, जो कि ERC-20 लागू करने का एक टेम्प्लेट है.

## डिपेंडेंसीज़ इंस्टॉल करें {#install-dependencies}

ब्राउनी को पाइथॉन 3 के शीर्ष पर बनाया गया है, इसलिए हमें ब्राउनी के साथ काम करने के लिए इसे स्थापित करना चाहिए. आइए check च करें कि हमारे सिस्टम पर पाइथन 3 इंस्टॉल हो ऐसा करने के लिए, अपने कमांड लाइन उपकरण में निम्नलिखित को टाइप करें:

```bash
python3 -V
```

इसे इंस्टॉल किए गए पाइथन3 के वर्जन का रिटर्न होना चाहिए. अगर यह इंस्टॉल नहीं है तो इसे [पाइथन की ऑफ़िशियल वेबसाइट](https://www.python.org/downloads/) से डाउनलोड और इंस्टॉल करें.

Brownie को इंस्टॉल करने से पहले हम एक प्रोजेक्ट डायरेक्टरी बनाते हैं और उस ही प्रोजेक्ट डायरेक्टरी को हमारी मौजूदा कार्य संबंधी डायरेक्टरी बनाते हैं:

```bash
mkdir brownieDemo
cd brownieDemo
```

अब जब आपने अपने सिस्टम पर पाइथन3 इंस्टॉल कर लिया है, तो आइए हम पाइथन के लिए पैकेज इंस्टॉलर (pip), पाइथन के पैकेज मैनेजर के इस्तेमाल से Brownie इंस्टॉल करें. पाइथन के लिए पैकेज इंस्टॉलर (pip) उसी तरह है जैसे जावास्क्रिप्ट के लिए npm है. अपने कमांड लाइन में निम्नलिखित को टाइप करें:

```bash
pip3 install eth-brownie
```

:::tip

अगर इंस्टॉल विफल हो जाता है, तो इसके बजाय आप निम्न कमांड का इस्तेमाल कर सकते हैं:`sudo pip3 install eth-brownie`

:::

यह जांचने के लिए कि अगर ब्राउनी को सही तरीके से स्थापित किया गया है, तो अपनी कमांड लाइन `brownie`में टाइप करें और इसे निम्नलिखित आउटपुट देना चाहिए:

![img](/img/quicknode/brownie-commands.png)

टोकन को मिक्स पाने के लिए, बस अपने कमांड लाइन में निम्न को टाइप करें:

```
brownie bake token
```

यह हमारी डायरेक्टरी `token/`में एक नई डायरेक्टरी पैदा `brownieDemo`करेगा.

### फ़ाइल स्ट्रक्चर {#file-structure}

सबसे पहले, डायरेक्टरी में नेविगेट `token`करें:

```bash
cd token
```

अब, अपने टेक्स्ट एडिटर में `token`डिरेक्ट्री खोलो. `contracts/`फ़ोल्डर के तहत आपको पता चलेगा `Token.sol`जो हमारा मुख्य कॉन्ट्रैक्ट है. आप अपने कॉन्ट्रैक्ट लिख सकते हैं या फ़ाइल को संशोधित कर सकते `Token.sol`हैं.

फ़ोल्डर के `scripts/`तहत, आपको `token.py`पाइथन स्क्रिप्ट मिलेगी. इस स्क्रिप्ट का इस्तेमाल कॉन्ट्रैक्ट को तैनात करने के लिए किया जाएगा और कॉन्ट्रैक्ट के आधार पर संशोधनों की जरूरत होती है.

![img](/img/quicknode/token-sol.png)

कॉन्ट्रैक्ट एक ERC-20 कॉन्ट्रैक्ट है. [आप ERC-20 टोकन पर](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) इस गाइड में ERC-20 मानकों और कॉन्ट्रैक्ट के बारे में अधिक सीख सकते हैं.

## अपने पॉलीगॉन नोड को बुक करें {#booting-your-polygon-node}

क्विकनोड में पॉलीगॉन मैननेट और मुंबई टेस्टनेट नोड्स का एक वैश्विक नेटवर्क है. वे [एक फ्री पब्लिक पॉलीगॉन RPC](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) भी चलाते हैं, लेकिन अगर आपको रेट सीमित, तो आप [क्विकनोड से एक फ्री ट्रायल नोड](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) के लिए साइन अप कर सकते हैं.

![img](/img/quicknode/http_URL.png)

**HTTP URL** की नकल करें जो बाद में ट्यूटोरियल में उपयोगी होगा.

## नेटवर्क और अकाउंट सेटअप {#network-and-account-setup}

हमें Brownie के साथ अपने QuickNode एंडपॉइंट को सेट करना होगा. ऐसा करने के लिए, अपने कमांड लाइन में निम्नलिखित को टाइप करें:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

**मुंबई टेस्टनेट HTTP URL** `YOUR_QUICKNODE_URL`से बदलें, जो हमें सिर्फ अपने पॉलीगॉन नोड को बूट करते समय प्राप्त हुआ.

ऊपर दिए गए कमांड में, `Ethereum` एक स्वाभाविक नाम है और `matic_mumbai` नेटवर्क का कस्टम नाम है; अपने कस्टम नेटवर्क को आप कोई भी नाम दे सकते हैं.

अगली बात जिसे हमें यहां करना है वह ब्राउनी का इस्तेमाल करके एक नया वॉलेट बनाना है, ताकि आपकी कमांड लाइन में इस प्रकार के लिए निम्नलिखित को टाइप किया जा सके:

```
brownie accounts generate testac
```

आपको अपने अकाउंट के लिए पासवर्ड सेट करने के लिए कहा जाएगा. स्टेप्स पूरा करने के बाद, यह एक mnemonic वाक्यांश के साथ अकाउंट उत्पन्न करेगा और इसे ऑफ़लाइन को बचाएगा. नाम हमारे अकाउंट का नाम `testac`है (आप जिस नाम को पसंद करते हैं उसे चुन सकते हैं).

![img](/img/quicknode/new-account.png)

:::note

Mnemonic वॉलेट को अकाउंट को recover र करने या दूसरे [<ins>non-custodial वॉलेट</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) में आयात करने के लिए Mnemonic वाक्यांश का इस्तेमाल किया जा सकता है. आप ऊपर की इमेज में जो अकाउंट देख रहे हैं, उसे इस गाइड के लिए ही बनाया गया है.

:::

अकाउंट पता की नकल करें ताकि हमें कुछ टेस्ट MATIC, प्राप्त हो सकें जो हमारे कॉन्ट्रैक्ट को डिप्लॉय करने के लिए जरूरी होगा.

## टेस्टनेट मैटिक {#getting-testnet-matic}

हमें अपने स्मार्ट कॉन्ट्रैक्ट को तैनात करने के लिए गैस की फीस के लिए कुछ टेस्ट MATIC टोकन की जरूरत होगी.

अपने अकाउंट की नक़ल करें जो कि इस ट्यूटोरियल में हमने उत्पन्न किया है, उसे [पॉलीगॉन के पता](https://faucet.polygon.technology/) क्षेत्र में पेस्ट करें और **सबमिट** पर क्लिक करें. फ़ॉसेट आपको 0.2 टेस्ट मैटिक भेजेगा.

![img](/img/quicknode/faucet.png)

## अपने स्मार्ट कॉन्ट्रैक्ट को डिप्लॉय {#deploying-your-smart-contract}

कॉन्ट्रैक्ट को डिप्लॉयमेंट करने से पहले, आपको इसे using: करने की the होती है:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

अब अपने टेक्स्ट एडिटर `scripts/token.py`में को खोलो और निम्न परिवर्तन को बनाएँ:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info स्पष्टीकरण

उपरोक्त कोड का इस्तेमाल करके, हमने `testac`अकाउंट को इम्पोर्ट किया है जिसे हमने पहले बनाया था और इसे वेरिएबल में संग्रहित किया `acct`है. इसके अलावा, अगली लाइन में, हमने वेरिएबल से डेटा प्राप्त करने के लिए `'from':`भाग को संपादित किया `acct`है.

:::

अंत में, हम अपने स्मार्ट कॉन्ट्रैक्ट को डिप्लॉय करेंगे:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`कस्टम नेटवर्क का नाम है जिसे हमने पहले बनाया था. प्रॉम्प्ट आपको अकाउंट बनाते समय पहले हमने जो **पासवर्ड** सेट किया है, उससे पूछेगा.

उपरोक्त कमांड को चलाने के बाद, आपको अवश्य ही ट्रांज़ैक्शन हैश लेना चाहिए और Brownie ट्रांज़ैक्शन के कन्फ़र्म होने का इंतज़ार करेगी. एक बार ट्रांज़ैक्शन की पुष्टि होने के बाद, यह उसी पते पर वापस भेज दिया जाएगा जिस पर पॉलीगॉन मुंबई टेस्टनेट पर कॉन्ट्रैक्ट को डिप्लॉय किया गया था.

![img](/img/quicknode/brownie-run.png)

आप डिप्लॉय किए गए कॉन्ट्रैक्ट को जाँचने के लिए उसके पते को [Polygonscan मुंबई](https://mumbai.polygonscan.com/) पर कॉपी-पेस्ट कर सकते हैं.

![img](/img/quicknode/polygonscan.png)

## अनुबंध को टेस्ट करना {#testing-the-contract}

Brownie स्मार्ट कॉन्ट्रैक्ट की कार्यक्षमता को टेस्ट करने का विकल्प भी प्रदान करता है. यह `pytest` फ़्रेमवर्क का इस्तेमाल करके आसानी से यूनिट टेस्ट को जेनरेट करता है. आप Bronwnie [पर टेस्ट लिखने के बारे में और जानकारी उनके डॉक्यूमेंटेशन](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#) में ढूँढ सकते हैं.

**इस तरह पॉलीगॉन पर Brownie और QuickNode का इस्तेमाल करके कॉन्ट्रैक्ट को डिप्लॉय किया जाता है.**

क्विकनोड, पॉलीगॉन की तरह, हमेशा डेवलपर [गाइड](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [डॉक](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [ट्यूटोरियल वीडियो](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) और [Web3 डेवलपर्स का](https://discord.gg/DkdgEqE) एक समुदाय प्रदान करता रहता है, जो एक दूसरे की मदद करने के लिए उत्सुक हैं.
