---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# Il metodo getAllTokens {#getalltokens}

`getAllTokens` restituisce tutti i token in possesso dell'utente specificato.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

puoi anche limitare i token specificando il valore limite nel secondo parametro.
