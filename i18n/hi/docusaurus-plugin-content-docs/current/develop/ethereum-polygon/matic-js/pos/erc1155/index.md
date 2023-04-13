---
id: index
title: पॉस क्लाइंट
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'matic.js का इस्तेमाल करके ERC1155 टोकन के साथ इंटरैक्ट करें.'
---

# ERC155 {#erc1155}

`POSClient` आपको erc1155 टोकन के साथ इंटरैक्ट करें का त`erc1155`रीका देता है.

यह विधि **ERC1155** क्लास का एक उदाहरण लौटाती है जिसमें विभिन्न विधियाँ होती हैं.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

`isRoot` के लिए दूसरे आर्गुमेंट पास करना ऑप्शनल है.

## चाइल्ड टोकन {#child-token}

इस सिंटैक्स का इस्तेमाल कर पॉलीगॉन पर टोकन शुरू किया जा सकता है -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## पेरेंट टोकन {#parent-token}

दूसरे पैरामीटर की वैल्यू के रूप में `true` देकर एथेरेयम टोकन शुरू किया जा सकता है.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
