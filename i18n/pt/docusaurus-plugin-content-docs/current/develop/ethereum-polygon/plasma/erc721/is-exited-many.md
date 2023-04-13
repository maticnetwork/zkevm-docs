---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Introdução ao maticjs'
---

# isExitedMany {#isexitedmany}

O método `isExitedMany` verifica se foi realizada uma retirada. Este retorna um valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
