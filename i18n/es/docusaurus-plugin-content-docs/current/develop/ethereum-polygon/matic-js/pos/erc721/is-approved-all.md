---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Comprueba si todos los tokens están aprobados.'
---

El método `isApprovedAll` comprueba si todos los tokens están aprobados. Arroja un valor booleano.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
