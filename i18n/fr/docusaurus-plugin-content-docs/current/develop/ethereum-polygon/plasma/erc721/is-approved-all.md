---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# isApprovedAll {#isapprovedall}

`isApprovedAll` méthode vérifie si tous les jetons sont approuvés. Cela renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
