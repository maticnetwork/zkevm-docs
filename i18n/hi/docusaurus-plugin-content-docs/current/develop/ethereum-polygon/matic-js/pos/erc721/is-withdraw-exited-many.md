---
id: is-withdraw-exited-many
title: निकाले गए कई से बाहर निकला गया
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'जांचें कि क्या कई टोकन के लिए बाहर निकाल दिया गया है.'
---

`isWithdrawExitedMany` तरीका जांचता है कि क्या कई टोकन के लिए निकालना छोड़ दिया गया है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
