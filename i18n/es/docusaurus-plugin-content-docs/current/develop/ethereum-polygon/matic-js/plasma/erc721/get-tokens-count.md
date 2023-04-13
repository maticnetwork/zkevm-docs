---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Arroja el conteo de tokens para el usuario especificado.'
---

El método `getTokensCount` arroja el conteo de tokens para el usuario especificado.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
