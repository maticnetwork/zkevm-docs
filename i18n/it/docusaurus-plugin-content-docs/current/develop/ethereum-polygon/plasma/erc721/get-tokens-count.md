---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# Il metodo getTokensCount {#gettokenscount}

`getTokensCount` restituisce il conteggio dei token per l'utente specificato.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
