---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Recupera tutti i token di proprietà dell''utente specificato.'
---

Il metodo `getAllTokens` restituisce tutti i token di proprietà dell'utente specificato.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Puoi anche limitare i token specificando il valore limite nel secondo parametro.
