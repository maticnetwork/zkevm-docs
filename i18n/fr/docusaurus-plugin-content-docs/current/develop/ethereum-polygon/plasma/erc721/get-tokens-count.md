---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Commencer à utiliser maticjs'
---

# getTokensCount {#gettokenscount}

La méthode `getTokensCount` retourne le nombre de jetons pour l'utilisateur spécifié.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
