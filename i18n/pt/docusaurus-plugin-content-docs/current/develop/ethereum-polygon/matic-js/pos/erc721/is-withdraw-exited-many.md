---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Verificar se ocorreu a saída da retirada para múltiplos tokens.'
---

O método `isWithdrawExitedMany` verifica se foi feita a saída da retirada para múltiplos tokens. Este retorna um valor booleano.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
