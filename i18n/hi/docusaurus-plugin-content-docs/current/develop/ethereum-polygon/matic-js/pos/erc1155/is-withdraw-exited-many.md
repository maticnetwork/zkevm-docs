---
id: is-withdraw-exited-many
title: निकाले गए कई से बाहर निकला गया
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'जाँचता है कि कई टोकन के लिए निकालने को छोड़ दिया गया है.'
---

`isWithdrawExitedMany` तरीका जाँचता है कि क्या कई टोकन के लिए निकालना छोड़ दिया गया है. यह बूलियन वैल्यू लौटाता है.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
