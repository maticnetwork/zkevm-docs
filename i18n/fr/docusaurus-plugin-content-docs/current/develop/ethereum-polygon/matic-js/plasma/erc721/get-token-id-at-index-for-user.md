---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Retourne l''identifiant du jeton sur indice fourni pour l''utilisateur.'
---

`getTokenIdAtIndexForUser` la méthode retourne l'identifiant du jeton sur l'indice fourni pour l'utilisateur.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
