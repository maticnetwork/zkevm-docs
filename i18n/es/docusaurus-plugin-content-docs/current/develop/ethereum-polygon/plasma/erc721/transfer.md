---
id: transfer
title: transferir
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Empieza con Matic.js'
---

# Transferir {#transfer}

El método `transfer` transfiere tokens de un usuario a otro.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
