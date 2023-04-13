---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Verifica se tutti i token sono approvati.'
---

Il metodo `isApprovedAll` verifica se tutti i token di un utente sono approvati. Restituisce un valore booleano.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
