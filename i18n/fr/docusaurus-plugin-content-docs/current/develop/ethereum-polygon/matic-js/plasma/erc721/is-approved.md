---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Vérifie si un jeton est approuvé pour un tokenId spécifié.'
---

`isApproved`la méthode  vérifie si le jeton est approuvé pour le tokenId spécifié. Cela renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
