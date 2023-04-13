---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Controlla se tutti i token sono approvati'
---

Il metodo `isApprovedAll` controlla se tutti i token sono approvati. Restituisce un valore booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
