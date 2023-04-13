---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Verifica se è stato effettuato un prelievo.'
---

Il metodo `isWithdrawExited` verifica se si è usciti da un prelievo. Restituisce un valore booleano.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
