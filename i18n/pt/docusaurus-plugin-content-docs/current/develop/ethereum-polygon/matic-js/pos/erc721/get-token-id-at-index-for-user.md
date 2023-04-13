---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Recuperar a identificação do token no índice fornecido para o utilizador.'
---

O método `getTokenIdAtIndexForUser` devolve o token de identificação do índice fornecido para o utilizador.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
