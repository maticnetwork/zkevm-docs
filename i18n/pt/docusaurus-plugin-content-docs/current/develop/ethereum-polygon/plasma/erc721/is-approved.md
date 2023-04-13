---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Introdução ao maticjs'
---

# isApproved {#isapproved}

O método `isApproved` verifica se o token é aprovado para o tokenId especificado. Este retorna um valor booleano.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
