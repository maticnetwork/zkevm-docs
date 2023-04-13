---
id: transfer
title: ट्रांसफ़र
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'erc20 प्लाज्मा टोकन ट्रांसफ़र करें'
---

# ट्रांसफ़र {#transfer}

`transfer`तरीके का उपयोग एक पते से दूसरे पते पर रकम ट्रांसफ़र करने के लिए किया जा सकता है.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## मैटिक टोकन ट्रांसफ़र करें {#transfer-matic-token}

मैटिक पॉलीगॉन पर टोकन नेटिव टोकन है. इसलिए हम बिना किसी टोकन एड्रेस के मैटिक टोकन के ट्रांसफर का समर्थन करते हैं.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
