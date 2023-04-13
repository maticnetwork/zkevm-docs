---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Vérifie si tous les jetons sont approuvés.'
---

`isApprovedAll`la méthode  vérifie si tous les jetons sont approuvés. Il renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
