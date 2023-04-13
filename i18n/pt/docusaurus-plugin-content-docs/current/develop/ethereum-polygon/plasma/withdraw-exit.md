---
id: withdraw-exit
title: sair da retirada
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawExit {#withdrawexit}

No Plasma, o processo de retirada pode ser feito por qualquer pessoa usando o método `withdrawExit`. O processo de saída só será executado após o período de desafio ter sido concluído.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Você também pode dar saída para múltiplos tokens fornecendo a lista de tokens em matriz.
