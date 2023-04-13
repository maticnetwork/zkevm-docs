---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Vérifie si tous les jetons sont approuvés.'
---

`isApprovedAll` La méthode vérifie si tous les jetons sont approuvés. Cela renvoie une valeur booléenne.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
