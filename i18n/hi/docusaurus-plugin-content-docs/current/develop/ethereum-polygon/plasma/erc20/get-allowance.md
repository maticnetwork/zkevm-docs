---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# getAllowance {#getallowance}

`getAllowance`विधि का उपयोग यूज़र के लिए मंज़ूर की गई राशि प्राप्त करने के लिए किया जा सकता है.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
