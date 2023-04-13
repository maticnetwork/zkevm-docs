---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Comprueba si se ha salido de un retiro.'
---

El método `isExited` comprueba si se ha salido de un retiro. Devuelve el valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
