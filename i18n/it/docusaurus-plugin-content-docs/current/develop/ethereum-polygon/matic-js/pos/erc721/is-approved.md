---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Verifica se il token è approvato per un tokenId specificato.'
---

Il metodo `isApproved` verifica se il token è approvato per il tokenId specificato. Restituisce un valore booleano.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
