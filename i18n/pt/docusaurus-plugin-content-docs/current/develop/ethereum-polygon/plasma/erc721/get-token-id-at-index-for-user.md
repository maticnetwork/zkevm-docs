---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Introdução ao maticjs'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

O método `getTokenIdAtIndexForUser` apresenta o token de identificação do índice fornecido para o utilizador.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
