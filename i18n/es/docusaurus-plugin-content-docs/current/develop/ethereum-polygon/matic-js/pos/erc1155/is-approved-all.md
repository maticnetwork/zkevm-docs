---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Comprueba si todos los tokens están aprobados.'
---

El método `isApprovedAll` comprueba si todos los tokens están aprobados para un usuario. Devuelve un  valor booleano.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
