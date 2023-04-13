---
id: transfer
title: ट्रांसफ़र
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# ट्रांसफ़र {#transfer}

`transfer` तरीका एक यूज़र से दूसरे यूज़र को टोकन ट्रांसफ़र करता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
