---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Verificar se a saída da retirada ocorreu ou não.'
---

O método `isWithdrawExited` pode ser usado para saber se a retirada foi ou não encerrada.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
