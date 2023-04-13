---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Sair do processo de retirada usando txHash de `withdrawStart`'
---

O método `withdrawExit` pode ser usado para sair do processo de retirada ao utilizar o txHash do método `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Este método faz múltiplas chamadas RPC para gerar a prova e a saída do processo. Portanto, recomenda-se usar o método withdrawExitFaster.
>
