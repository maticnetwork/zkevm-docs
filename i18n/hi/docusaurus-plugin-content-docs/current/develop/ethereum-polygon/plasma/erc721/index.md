---
id: index
title: प्लाज़्मा क्लाइंट
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# erc721 {#erc721}

`plasmaClient` वह तरीका देता है `erc721` जो आपको erc721 टोकन के साथ इंटरैक्ट करने में मदद करता है.

यह तरीका एक ऑब्जेक्ट लौटाता है जिसके पास विभिन्न तरीके हैं.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## चाइल्ड टोकन {#child-token}

इस सिंटैक्स का इस्तेमाल कर पॉलीगॉन पर टोकन शुरू किया जा सकता है -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## पेरेंट टोकन {#parent-token}

दूसरे पैरामीटर की वैल्यू के रूप में `true` देकर एथेरेयम टोकन शुरू किया जा सकता है.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
