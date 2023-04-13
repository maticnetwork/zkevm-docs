---
id: index
title: PlasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'erc20 टोकन के साथ इंटरैक्ट करने का एक तरीका देता है.'
---

`plasmaClient` आपको erc20 टोकन के साथ इंटरैक्ट करने का `erc20` तरीका देता है.

## चाइल्ड टोकन {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## रुट टोकन {#root-token}

रुट टोकन को दूसरे पैरामीटर की वैल्यू के रूप में `true` देकर चालू किया जा सकता है.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
