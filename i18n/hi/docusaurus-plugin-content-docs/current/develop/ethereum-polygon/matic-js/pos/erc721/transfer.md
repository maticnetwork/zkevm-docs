---
id: transfer
title: ट्रांसफ़र
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'एक यूज़र से दूसरे यूज़र को टोकन ट्रांसफ़र करें.'
---

`transfer`तरीका एक यूज़र से दूसरे यूज़र को टोकन ट्रांसफ़र करने के लिए इस्तेमाल किया जा सकता है.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
