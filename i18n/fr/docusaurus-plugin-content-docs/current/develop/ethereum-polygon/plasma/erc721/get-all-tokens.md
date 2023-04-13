---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# getAllTokens {#getalltokens}

`getAllTokens` méthode retourne tous les jetons appartenant à l'utilisateur spécifié.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

vous pouvez également limiter les jetons en spécifiant la valeur limite dans le second paramètre.
