---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Restituisce il numero di token per l''utente specificato.'
---

Il metodo `getTokensCount` restituisce il numero di token per l'utente specificato.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
