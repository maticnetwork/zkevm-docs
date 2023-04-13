---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# isApprovedAll {#isapprovedall}

`isApprovedAll` controlla se tutti i token siano stati approvati. Restituisce un valore booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
