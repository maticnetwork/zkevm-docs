---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' जाँचें कि क्या निकासी से बाहर निकला जा चुका है.'
---

`isWithdrawExited`मेथड यह जाँचता है कि क्या निकासी से बाहर निकला जा चुका है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
