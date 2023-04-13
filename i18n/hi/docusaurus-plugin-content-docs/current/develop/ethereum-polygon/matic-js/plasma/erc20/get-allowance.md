---
id: get-allowance
title: अलाउंस पाएँ
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'यूज़र के लिए मंज़ूर की गई रकम पाएँ.'
---

`getAllowance` तरीके का इस्तेमाल यूज़र के लिए मंज़ूर की गई राशि प्राप्त करने के लिए किया जा सकता है.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
