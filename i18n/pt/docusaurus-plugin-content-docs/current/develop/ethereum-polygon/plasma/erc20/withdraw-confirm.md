---
id: withdraw-confirm
title: desafio de retirada
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawConfirm {#withdrawconfirm}

O método `withdrawConfirm` é a segunda etapa do processo de retirada de plasma. Nesta etapa - a prova da sua transação de burn (primeira transação) é submetida e um ERC-721 de valor equivalente é criado.

Após este processo ser concluído com êxito - o período de desafio é iniciado e, após a conclusão do período de desafio, o utilizador pode obter de volta o valor da retirada na sua conta na chain ROOT.

O período de desafio é de 7 dias na mainnet.

**Aviso**- a transação withdrawStart deve incluir um checkpoint para desafiar a retirada.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Uma vez que período de desafio for concluído, `withdrawExit` pode ser chamado para sair do processo de retirada e obter de volta o valor retirado.
