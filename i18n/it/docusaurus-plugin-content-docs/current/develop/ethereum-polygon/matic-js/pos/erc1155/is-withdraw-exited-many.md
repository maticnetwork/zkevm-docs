---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Verifica l''uscita dal prelievo per token multipli.'
---

Il metodo `isWithdrawExitedMany` verifica se si è usciti dal prelievo per più token. Restituisce un valore booleano.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
