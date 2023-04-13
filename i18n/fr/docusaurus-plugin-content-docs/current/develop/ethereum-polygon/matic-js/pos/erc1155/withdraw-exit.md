---
id: withdraw-exit
title: retirerSortir
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Supprimez le processus de retrait en utilisant le txHash de withdrawStart.'
---

`withdrawExit`la méthode peut être utilisée pour supprimer le processus de retrait en utilisant le txHash de la méthode`withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
