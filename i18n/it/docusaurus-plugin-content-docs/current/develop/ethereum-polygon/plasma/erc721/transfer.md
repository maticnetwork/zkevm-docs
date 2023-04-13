---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# Transfer {#transfer}

`transfer` trasferisce i token da un utente all'altro.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
