---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# इससे बाहर निकल गए {#isexited}

`isExited` तरीका यह जाँचता है कि क्या निकालने की प्रक्रिया से बाहर निकला जा चुका है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
