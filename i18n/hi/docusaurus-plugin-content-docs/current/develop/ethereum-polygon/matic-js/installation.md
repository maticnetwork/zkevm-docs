---
id: installation
title: इंस्टॉल करना
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Matic.js और एथेरेयम लाइब्रेरी इंस्टॉल करें.
---

maticjs के दो भाग हैं -

1. मुख्य लाइब्रेरी
2. एथेरेयम लाइब्रेरी

### मुख्य लाइब्रेरी {#main-library}

मुख्य लाइब्रेरी में मूल लॉजिक है और यह विभिन्न API देती है. यूज़र ज़्यादातर इस लाइब्रेरी से इंटरैक्ट करता है.

```
npm i @maticnetwork/maticjs
```

### एथेरेयम लाइब्रेरी {#ethereum-library}

एथेरेयम लाइब्रेरी हमें किसी भी पसंदीदा ईथर लाइब्रेरी का इस्तेमाल करने देती है. यह प्लगइन्स का इस्तेमाल कर maticjs में डाली जाती है.

matic.js दो लोकप्रिय लाइब्रेरी का समर्थन करता है -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [एथेर्स](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### एथेर्स {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
