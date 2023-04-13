---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# isExitedMany {#isexitedmany}

`isExitedMany`मेथड यह जाँचता है कि क्या निकासी की प्रक्रिया से बाहर निकला जा चुका है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
