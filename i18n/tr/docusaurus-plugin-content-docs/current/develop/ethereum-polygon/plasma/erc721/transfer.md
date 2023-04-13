---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# Transfer {#transfer}

`transfer` metodu bir kullanıcıdan diğerine token aktarır.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
