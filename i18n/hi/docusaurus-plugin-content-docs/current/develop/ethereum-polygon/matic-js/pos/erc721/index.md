---
id: index
title: पॉस क्लाइंट
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: '`ERC721` जो आपको ERC721 टोकन के साथ इंटरैक्ट करने में मदद करता है.'
---

# ERC721 {#erc721}

`POSClient` वह तरीका देता है `erc721` जो आपको erc721 टोकन के साथ इंटरैक्ट करने में मदद करता है.

यह तरीका एक ऑब्जेक्ट लौटाता है जिसके पास विभिन्न तरीके हैं.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

`isRoot` के लिए दूसरे आर्गुमेंट पास करना ऑप्शनल है.

## चाइल्ड टोकन {#child-token}

इस सिंटैक्स का इस्तेमाल कर पॉलीगॉन पर टोकन शुरू किया जा सकता है -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## पेरेंट टोकन {#parent-token}

दूसरे पैरामीटर की वैल्यू के रूप में `true` देकर एथेरेयम टोकन शुरू किया जा सकता है.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
