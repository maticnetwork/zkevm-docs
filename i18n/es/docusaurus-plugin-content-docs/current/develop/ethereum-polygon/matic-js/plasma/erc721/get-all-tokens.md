---
id: get-all-tokens
title: getAllTokens (Obtener todos los tokens)
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Devuelve todos los tokens que posee el usuario especificado.'
---

El método `getAllTokens` devuelve todos los tokens que posee el usuario especificado.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

También puedes limitar los tokens especificando un valor de límite en el segundo parámetro.
