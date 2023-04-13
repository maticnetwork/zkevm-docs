---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Empieza con Matic.js'
---

# getTokensCount {#gettokenscount}

El método `getTokensCount` muestra el conteo de tokens para el usuario especificado.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
