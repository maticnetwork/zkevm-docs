---
id: withdraw-confirm-faster
title: retirar o desafio mais depressa
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

O método `withdrawConfirmFaster` é a segunda etapa do processo de retirada de plasma. Nesta etapa, a prova da sua transação de burn (primeira transação) é submetida e é criado um token ERC-721 de valor equivalente.

Após o processo ser concluído com êxito, o período de desafio é iniciado e, após a sua conclusão, o utilizador pode obter de volta o valor retirado da sua conta na chain ROOT.

O período de desafio é de 7 dias, na mainnet.

<div class="highlight mb-20px mt-20px">É rápido porque produz prova no backend. Tem que configurar a [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

**Aviso**- a transação withdrawStart deve incluir um checkpoint para desafiar a retirada.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Uma vez que período de desafio for concluído, `withdrawExit` pode ser chamado para sair do processo de retirada e obter de volta o valor retirado.
