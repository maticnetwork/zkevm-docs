---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Sair do processo de retirada ao usar txHash de withdrawStart.'
---

O método `withdrawExit` pode ser usado para sair do processo de retirada ao usar o txHash do método `withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
