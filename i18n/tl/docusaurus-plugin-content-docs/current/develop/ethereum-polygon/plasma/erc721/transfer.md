---
id: transfer
title: i-transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# Pag-transfer {#transfer}

Naglilipat ang paraang `transfer` ng mga token mula sa isang user papunta sa isa pang user.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
