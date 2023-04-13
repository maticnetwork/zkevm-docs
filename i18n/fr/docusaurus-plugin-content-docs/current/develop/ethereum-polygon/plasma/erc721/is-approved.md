---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# isApproved {#isapproved}

`isApproved` méthode vérifie si le jeton est approuvé pour le jeton d'Identifiant spécifié. Cela renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
