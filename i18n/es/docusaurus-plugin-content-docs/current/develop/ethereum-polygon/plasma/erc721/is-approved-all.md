---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Empieza con Matic.js'
---

# isApprovedAll {#isapprovedall}

El método `isApprovedAll` comprueba si están todos los tokens están aprobados. Arroja un valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
