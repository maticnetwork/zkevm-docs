---
id: is-aproved
title: isApproved (Está aprobado)
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Comprueba si un token es aprobado para la ID de un token especificado.'
---

El método `isApproved` comprueba si el token es aprobado para la ID del token especificado. Devuelve el valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
