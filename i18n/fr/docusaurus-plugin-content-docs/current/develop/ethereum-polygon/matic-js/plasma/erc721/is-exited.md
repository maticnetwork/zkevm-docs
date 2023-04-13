---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Vérifie si un retrait a été supprimé.'
---

`isExited` la méthode vérifie si un retrait a été supprimé. Cela renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
