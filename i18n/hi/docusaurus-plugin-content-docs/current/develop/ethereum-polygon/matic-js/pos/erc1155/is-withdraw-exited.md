---
id: is-withdraw-exited
title: क्या निकालने से बाहर निकला जा चुका है
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'जांचता है कि किसी निकालने की प्रक्रिया से बाहर निकला जा चुका है.'
---

`isWithdrawExited`तरीका यह जांचता है कि क्या निकालने की प्रक्रिया से बाहर निकला जा चुका है. यह बूलियन वैल्यू लौटाता है.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
