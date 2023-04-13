---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Verifica se si è usciti da un prelievo.'
---

Il metodo `isExitedMany` verifica se si è usciti da un prelievo. Restituisce un valore booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
