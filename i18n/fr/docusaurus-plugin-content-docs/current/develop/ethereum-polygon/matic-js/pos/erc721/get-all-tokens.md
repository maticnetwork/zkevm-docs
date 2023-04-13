---
id: get-all-tokens
title: obtenirTouslesJetons
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Récupérer tous les jetons possédés par l''utilisateur spécifié.'
---

`getAllTokens` la méthode  retourne tous les jetons appartenant à l'utilisateur spécifié.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

vous pouvez également limiter les jetons en spécifiant la valeur limite dans le second paramètre.
