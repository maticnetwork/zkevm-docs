---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Introdução ao maticjs'
---

# isApprovedAll {#isapprovedall}

O método `isApprovedAll` verifica se todos os tokens são aprovados. Este retorna um valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
