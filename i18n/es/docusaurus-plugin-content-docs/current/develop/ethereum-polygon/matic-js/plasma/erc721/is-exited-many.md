---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Comprueba si se ha salido de un retiro.'
---

El método `isExitedMany` comprueba si se ha salido de un retiro. Devuelve el valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
