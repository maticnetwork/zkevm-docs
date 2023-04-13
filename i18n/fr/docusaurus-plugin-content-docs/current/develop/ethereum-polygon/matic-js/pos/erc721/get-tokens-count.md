---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Obtenir le nombre de jetons pour l''utilisateur spécifié.'
---

`getTokensCount` la méthode  retourne le nombre de jetons pour l'utilisateur spécifié.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
