---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Verifica se ocorreu a saída de uma retirada.'
---

O método `isWithdrawExited` verifica se ocorreu a saída de uma retirada. Este retorna um valor booleano.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
