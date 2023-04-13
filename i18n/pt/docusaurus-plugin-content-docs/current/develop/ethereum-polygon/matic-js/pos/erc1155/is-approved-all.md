---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Verificar se todos os tokens estão aprovados.'
---

O método `isApprovedAll` verifica se todos os tokens estão aprovados para um utilizador. Este retorna um valor booleano.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
