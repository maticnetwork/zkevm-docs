---
id: is-approved
title: estApprouvé
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Vérifiez si le jeton est approuvé pour un tokenId spécifié.'
---

`isApproved`La méthode vérifie si le jeton est approuvé pour le tokenId spécifié. Cela renvoie une valeur booléenne.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
