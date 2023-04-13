---
id: delegate
title: Como delegar
description: Saiba como ser um delegador na rede da Polygon.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Como delegar {#how-to-delegate}

Este é um guia passo-a-passo para o ajudar a ser um [delegador](/docs/maintain/glossary.md#delegator) na rede da Polygon.

O único pré-requisito é ter os seus tokens MATIC e ETH no endereço Mainnet Ethereum.

## Aceder ao painel {#access-the-dashboard}

1. Na sua carteira (por exemplo, MetaMask), escolha Mainnet Ethereum.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Faça login na [Polygon Staking](https://staking.polygon.technology/).
3. Depois de entrar, verá algumas estatísticas gerais junto com a lista de validadores.

![img](/img/staking/home.png)

:::note

Se for validador, use um endereço diferente de não validação para fazer login como delegador.

:::

## Delegar a um validador {#delegate-to-a-validator}

1. Clique **Torne-se um delegador** ou role para baixo até um determinado validador e clique em **Delegar**.

![img](/img/staking/home.png)

2. Forneça o valor de MATIC a delegar.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Aprove a transação de delegação e clique em **Delegar**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Após a transação de delegação ser concluída, verá a mensagem **Delegação concluída**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Ver as suas delegações {#view-your-delegations}

Para ver as suas delegações, clique em [Minha conta](https://staking.polygon.technology/account).

![img](/img/staking/myAccount.png)

## Retirar recompensas {#withdraw-rewards}

1. Clique em [Minha conta](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. No seu validador delegado, clique em **Retirar recompensa**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Isto vai retirar as recompensas em token MATIC para o seu endereço Ethereum.

## Restake recompensas {#restake-rewards}

1. Clique em [Minha conta](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. No seu validador delegado, clique em **Restake recompensa**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Isso irá restaurar as recompensas de token MATIC ao validador e aumentar a sua participação de delegação.

## Desvincular de um validador {#unbond-from-a-validator}

1. Clique em [Minha conta](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. No seu validador delegado, clique em **Desvincular**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Isso irá retirar as recompensas do validador e da totalidade da sua participação do validador.

As recompensas retiradas serão exibidas imediatamente na conta Ethereum.

Os fundos de stake retirados serão bloqueados por 80 [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

O bloqueio do fundo pelo período de desvinculação é aplicado para proteger contra comportamento malicioso na rede.

:::

## Mover o stake de um nó para outro {#move-stake-from-one-node-to-another-node}

Mover o stake de um nó para outro é considerado uma única transação. Não há períodos de espera ou desvinculação durante este evento.

1. Entre em [Minha conta](https://wallet.polygon.technology/staking/my-account) no painel de staking.
1. Clique em **Mover stake** sob o seu validador delegado.
1. Selecione um validador externo e clique em **Stake aqui**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Forneça o valor de stake e clique em **Mover stake**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Isto vai mover o stake. O painel será atualizado após confirmações de 12 blocos.

:::info

É permitida a participação em movimento entre qualquer nós. A única exceção é a transferência de stake de um nó da Fundação para outro nó da Fundação que não é permitido.

:::
