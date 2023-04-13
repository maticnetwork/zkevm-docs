---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Obtén el conteo de tokens para el usuario especificado.'
---

El método `getTokensCount` arroja el conteo de tokens para el usuario especificado.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
