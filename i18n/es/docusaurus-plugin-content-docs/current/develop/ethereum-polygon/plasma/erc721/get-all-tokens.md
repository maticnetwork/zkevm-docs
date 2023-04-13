---
id: get-all-tokens
title: getAllTokens (Obtener todos los tokens)
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Empieza con Matic.js'
---

# getAllTokens (Obtener todos los tokens) {#getalltokens}

El método `getAllTokens` devuelve todos los tokens de propiedad del usuario especificado.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

También puedes limitar los tokens especificando un valor de límite en el segundo parámetro.
