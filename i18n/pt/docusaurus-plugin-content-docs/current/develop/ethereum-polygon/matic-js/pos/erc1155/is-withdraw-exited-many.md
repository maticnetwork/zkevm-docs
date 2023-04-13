---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Verifica se foi feita a saída da retirada para múltiplos tokens.'
---

O método `isWithdrawExitedMany` verifica se foi feita a saída da retirada para múltiplos tokens. Este retorna um valor booleano.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
