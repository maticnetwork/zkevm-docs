---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Verifica se todos os tokens são aprovados.'
---

O método `isApprovedAll` verifica se todos os tokens são aprovados. Este retorna um valor booleano.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
