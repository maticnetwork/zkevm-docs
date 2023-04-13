---
id: index
title: पॉस क्लाइंट
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "erc20 टोकन के साथ इंटरैक्ट करने का एक तरीका देता है."
---

# ERC20 {#erc20}

`POSClient` आपको `erc20` तरीका देता है जो **erc20** टोकन के साथ इंटरैक्ट करने में आपकी मदद करता है.

यह तरीका ऑब्जेक्ट लौटाता है जिसके पास कई अन्य तरीके होते हैं.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

`isRoot` के लिए दूसरे आर्गुमेंट पास करना ऑप्शनल है.

## चाइल्ड टोकन {#child-token}

इस सिंटैक्स का इस्तेमाल कर पॉलीगॉन पर टोकन शुरू किया जा सकता है -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## पेरेंट टोकन {#parent-token}

एथेरेयम पर टोकन को दूसरे पैरामीटर की वैल्यू `true` देकर शुरू किया जा सकता है.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
