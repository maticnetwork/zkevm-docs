---
id: is-withdraw-exited
title: क्या निकालने से बाहर निकला जा चुका है
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'जाँचें कि निकालने से बाहर निकला जा चुका है या नहीं.'
---

`isWithdrawExited` तरीका यह जानने के लिए इस्तेमाल किया जा सकता है कि निकालने से बाहर निकला जा चुका है या नहीं.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
