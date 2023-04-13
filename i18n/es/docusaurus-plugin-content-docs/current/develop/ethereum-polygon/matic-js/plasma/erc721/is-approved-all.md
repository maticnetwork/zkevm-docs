---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Comprueba si todos los tokens son aprobados.'
---

El método `isApprovedAll` comprueba si todos los tokens son aprobados. Devuelve el valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
