---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Verifica se il prelievo è stato effettuato per token multipli.'
---

Il metodo `isWithdrawExitedMany` verifica se il prelievo è stato effettuato per token multipli. Restituisce un valore booleano.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
