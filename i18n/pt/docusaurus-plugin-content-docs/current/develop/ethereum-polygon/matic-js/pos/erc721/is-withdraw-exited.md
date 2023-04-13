---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' Verificar se houve saída da retirada.'
---

O método `isWithdrawExited` verifica se ocorreu a saída de uma retirada. Este retorna um valor booleano.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
