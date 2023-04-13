---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' Verificare se si è usciti da un prelievo.'
---

Il metodo `isWithdrawExited` verifica se si è usciti da un prelievo. Restituisce un valore booleano.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
