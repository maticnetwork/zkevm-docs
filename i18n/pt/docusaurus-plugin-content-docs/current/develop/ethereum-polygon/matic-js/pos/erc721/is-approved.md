---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Verifica se o token é aprovado para um tokenId específico.'
---

O método `isApproved` verifica se o token é aprovado para o tokenId especificado. Este retorna um valor booleano.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
