---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Verifica se tutti i token sono approvati.'
---

Il metodo `isApprovedAll` verifica se tutti i token sono approvati. Restituisce un valore booleano.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
