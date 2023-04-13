---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# isExited {#isexited}

`isExited`méthode vérifie si un retrait a été effectué. Cela renvoie une valeur booléenne.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
