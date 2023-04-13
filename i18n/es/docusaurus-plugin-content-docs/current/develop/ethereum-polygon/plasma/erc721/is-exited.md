---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Empieza con Matic.js'
---

# isExited {#isexited}

El método `isExited` comprueba si se ha salido de una operación de retiro. Devuelve el valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
