---
id: withdraw-exit
title: sair da retirada
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Sair do processo de retirada usando txHash de withdrawStart.'
---

O método `withdrawExit` pode ser usado para sair do processo de retirada usando o txHash do método `withdrawStart`.

**Nota**- a transação withdrawStart tem de incluir um checkpoint para poder sair da retirada.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Este método faz múltiplas chamadas RPC para gerar a prova e a saída do processo. Portanto, recomenda-se usar o método withdrawExitFaster.
>

