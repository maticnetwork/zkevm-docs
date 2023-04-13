---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# isApproved {#isapproved}

`isApproved` verifica se il token sia stato approvato rispetto al tokenId specifico. Restituisce un valore booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
