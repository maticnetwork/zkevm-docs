---
id: get-all-tokens
title: getAllTokens (Obtener todos los tokens)
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Recupera todos los tokens que tiene el usuario especificado.'
---

El método `getAllTokens` devuelve todos los tokens que posee el usuario especificado.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

También puedes limitar los tokens especificando el valor del límite en el segundo parámetro.
