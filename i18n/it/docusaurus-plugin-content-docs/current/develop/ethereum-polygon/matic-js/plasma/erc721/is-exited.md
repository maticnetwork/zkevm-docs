---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Verifica se si è usciti da un prelievo.'
---

Il metodo `isExited` verifica se si è usciti da un prelievo. Restituisce un valore booleano.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
