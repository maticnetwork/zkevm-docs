---
id: transfer
title: transferir
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Introdução ao maticjs'
---

# Transferir {#transfer}

O método `transfer` transfere tokens de um utilizador para outro.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
