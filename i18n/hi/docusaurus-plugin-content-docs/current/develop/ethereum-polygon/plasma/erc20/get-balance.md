---
id: get-balance
title: बैलेंस पाएँँ
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'maticjs से शुरुआत करें'
---

# बैलेंस पाएँँ {#getbalance}

यूज़र का संतुलन प्राप्त करने के लिए `getBalance` तरीके का उपयोग किया जा सकता है. यह चाइल्ड और पैरेंट दोनों टोकन पर उपलब्ध है.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
