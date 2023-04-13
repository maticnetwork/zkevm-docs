---
id: delegate
title: Paano Mag-delegate
description: Alamin kung paano maging isang delegator sa Polygon Network.
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

# Paano Mag-delegate {#how-to-delegate}

Isa itong step-by-step na gabay para tulungan kang maging isang [delegator](/docs/maintain/glossary.md#delegator) sa Polygon Network.

Kailangan mo lang magkaroon ng mga MATIC token at ETH sa mainnet address ng Ethereum.

## I-access ang dashboard {#access-the-dashboard}

1. Sa wallet mo (hal. MetaMask), piliin ang Ethereum mainnet.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Mag-log in sa [Polygon Stake](https://staking.polygon.technology/).
3. Kapag nag-log in ka, makikita mo ang ilang pangkalahatang istatistika kasama ang listahan ng mga validator.

![img](/img/staking/home.png)

:::note

Kung isa kang validator, gumamit ka ng ibang non-validating address para mag-log in bilang delegator.

:::

## Mag-delegate sa isang validator {#delegate-to-a-validator}

1. I-click ang **Maging isang Delegator** o mag-scroll down sa isang partikular na validator at i-click ang **I-delegate**.

![img](/img/staking/home.png)

2. Ilagay ang halaga ng MATIC na ide-delegate.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Aprubahan ang transaksyon ng pag-delegate at i-click ang **I-delegate**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Pagkatapos makumpleto ang transaksyon ng pag-delegate, makikita mo ang mensahe na **Nakumpleto na ang Pag-delegate**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Tingnan ang mga pag-delegate mo {#view-your-delegations}

Para makita ang mga pag-delegate mo, i-click ang [Account Ko](https://staking.polygon.technology/account).

![img](/img/staking/myAccount.png)

## I-withdraw ang mga gantimpala {#withdraw-rewards}

1. I-click ang [Account Ko](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sa ilalim ng na-delegate mong validator, i-click ang **I-withdraw ang Gantimpala**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Iwi-withdraw nito ang mga MATIC token na gantimpala sa Ethereum address mo.

## I-restake ang mga gantimpala {#restake-rewards}

1. I-click ang [Account Ko](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sa ilalim ng na-delegate mong validator, i-click ang **I-restake ang Gantimpala**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Ibabalik nito ang mga gantimpala ng MATIC token sa validator at dadagdagan ang stake ng iyong delegasyon.

## I-unbond mula sa isang validator {#unbond-from-a-validator}

1. I-click ang [Account Ko](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sa ilalim ng na-delegate mong validator, i-click ang **I-unbond**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

will nito ang iyong mga gantimpala mula sa validator at ang iyong buong stake mula sa validator.

Ipapakita agad ang iyong mga withdraw na gantimpala sa iyong Ethereum account.

Mala-lock sa loob ng 80 [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) ang mga na-withdraw mong pondo ng stake.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Ipinatupad na ang pag-lock ng pondo sa loob ng panahon ng pag-unbond para matiyak na walang mapaminsalang gawi sa network.

:::

## Ilipat ang stake mula sa isang node papunta sa isa pang node {#move-stake-from-one-node-to-another-node}

Isang transaksyon ang paglilipat ng stake mula sa isang ode papunta sa isa pang node. Walang pagkaantala o panahon ng pag-unbond habang nangyayari ito.

1. Mag-log in sa [Account Ko](https://wallet.polygon.technology/staking/my-account) sa dashboard ng pag-stake.
1. I-click ang **Ilipat ang Stake** sa ilalim ng na-delegate mong validator.
1. Pumili ng isang external na validator at i-click ang **I-stake dito**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Ilagay ang halaga ng stake at i-click ang **Ilipat ang Stake**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Ililipat nito ang stake. Mag-a-update ang dashboard pagkatapos ng 12 kumpirmasyon ng block.

:::info

Pinapayagan ang paglipat ng stake sa pagitan ng anumang node. Ang tanging exception ay gumagalaw ng stake mula sa isang Foundation node sa isa pang Foundation node na hindi pinapayagan.

:::
