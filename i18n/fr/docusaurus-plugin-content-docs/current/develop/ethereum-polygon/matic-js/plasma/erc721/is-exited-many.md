---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Vérifie si un retrait a été supprimé.'
---

`isExitedMany` la méthode vérifie si un retrait a été supprimé. Cela renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
