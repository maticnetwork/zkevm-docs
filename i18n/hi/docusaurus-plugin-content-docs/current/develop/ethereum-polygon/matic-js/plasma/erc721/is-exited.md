---
id: is-exited
title: इससे बाहर निकल गए
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'जांचता है कि किसी निकालने की प्रक्रिया से बाहर निकला जा चुका है.'
---

`isExited`तरीका यह जांचता है कि क्या निकालने की प्रक्रिया से बाहर निकला जा चुका है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
