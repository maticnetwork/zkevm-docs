---
id: transfer
title: ट्रांसफ़र
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'एक पते से दूसरे पते पर रकम ट्रांसफ़र करें.'
---

`transfer`तरीके का उपयोग एक पते से दूसरे पते पर रकम ट्रांसफ़र करने के लिए किया जा सकता है.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
