---
id: get-balance
title: बैलेंस पाएँँ
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'matic.js का इस्तेमाल करके ERC1155 टोकन बैलेंस पाएँ.'
---

एक टोकन के लिए यूज़र का बैलेंस पाने के लिए `getBalance`तरीके का इस्तेमाल किया जा सकता है. यह चाइल्ड और पैरेंट दोनों टोकन पर उपलब्ध है.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
