---
id: derivatives
title: Derivados
description: Delegação através de compartilhamentos de validadores
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

A Polygon apoia a [delegação](/docs/maintain/glossary#delegator) por meio de ações de validador. Ao utilizar este design, é mais fácil distribuir recompensas e cortar com escala nos contratos de mainnet Ethereum sem muita computação.

Os delegadores delegam comprando ações de um pool finito de validadores. Cada validador tem o seu próprio token de ações de validador.

Vamos chamar os tokens de ações de validador fungíveis de VATIC para o Validador A. Quando um utilizador delega para o Validador A, o utilizador recebe VATIC com base na taxa de câmbio do par MATIC-VATIC. Como utilizadores acumulam valor, a taxa de câmbio indica que o utilizador pode retirar mais MATIC por cada VATIC. Quando os validadores sofrem corte, os utilizadores retiram menos MATIC pelo seu VATIC.

Observe que MATIC é o token de staking. Um delegador precisa de ter tokens MATIC para participar da delegação.

Inicialmente, o Delegador D compra tokens do pool específico do Validador A quando a taxa de câmbio for 1 MATIC por 1 VATIC.

Quando um validador for recompensado com mais tokens MATIC, os novos tokens são adicionados ao pool.

Digamos que com o pool atual de 100 tokens MATIC, as recompensas de 10 MATIC são adicionadas ao pool. Como o fornecimento total de tokens VATIC não se alterou devido às recompensas, a taxa de câmbio se torna 1 MATIC por 0,9 VATIC. Agora, o Delegador D recebe mais MATIC para o mesmo montante se compartilhar.

## O fluxo no contrato {#the-flow-in-the-contract}

`buyVoucher`: Esta função é atribuída ao executar um processo de delegação em relação a um validador. A delegação `_amount` é transferida primeiro para `stakeManager`, que na confirmação produz ações de delegação via `Mint` usando o atual `exchangeRate`.

A taxa de câmbio é calculada de acordo com a fórmula:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Esta é a função que é chamada quando um delegador está a desvincular-se de um validador. Esta função basicamente inicia o processo de venda de vouchers comprados durante a delegação. Há um período de retirada que é levado em consideração antes que os delegadores possam `claim` os seus tokens.

`withdrawRewards`: Como delegador, pode reivindicar recompensas invocando a função `withdrawRewards`.

`reStake`: Refazer staking pode funcionar de duas formas: a) o delegador pode comprar mais ações usando recompensas `buyVoucher` ou `reStake`. Pode refazer staking de mais tokens para um validador ou pode refazer staking de recompensas acumuladas como delegador. O objetivo de `reStaking` é que como o validador do delegador tem agora mais stakes ativos, vai ganhar mais recompensas por isso e também o delegador.

`unStakeClaimTokens`: Quando o período de retirada terminar, os delegadores que venderam as suas ações podem reivindicar os seus tokens MATIC.

`updateCommissionRate`: Atualiza a % de comissão do validador. Ver também [Operações de Comissão do Validador](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Quando um validador obtém recompensas por enviar um [checkpoint](/docs/maintain/glossary#checkpoint-transaction), esta função é chamada para desembolsos de recompensas entre o validador e os delegadores.
