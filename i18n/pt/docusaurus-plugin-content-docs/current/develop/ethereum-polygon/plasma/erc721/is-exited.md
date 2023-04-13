---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Introdução ao maticjs'
---

# isExited {#isexited}

O método `isExited` verifica se foi realizada uma retirada. Este retorna um valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
