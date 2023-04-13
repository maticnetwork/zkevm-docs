---
id: get-balance
title: बैलेंस पाएँँ
keywords:
    - pos client
    - erc20
    - getBalance
    - polygon
    - sdk
description: "यूज़र का बैलेंस पाएँ."
---

यूज़र का बैलेंस पाने के लिए `getBalance` तरीके का इस्तेमाल किया जा सकता है. यह चाइल्ड और पैरेंट दोनों टोकन पर उपलब्ध है.

```
const erc20Token = posClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
