---
id: delegate
title: Делегирование
description: Узнайте, как стать делегатом в сети Polygon.
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

# Делегирование {#how-to-delegate}

Это пошаговое руководство, которое поможет вам стать [делегатом](/docs/maintain/glossary.md#delegator) в сети Polygon.

Единственным предварительным условием является наличие токенов MATIC и ETH на адресе Ethereum mainnet.

## Вход на дашборд {#access-the-dashboard}

1. В своем кошельке (например, MetaMask) выберите Ethereum mainnet.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Войдите в [Polygon Staking](https://staking.polygon.technology/).
3. После входа в систему вы увидите некоторые общие статистические данные наряду со списком валидаторов.

![img](/img/staking/home.png)

:::note

Если вы валидатор, используйте другой адрес validator, чтобы войти в состав в качестве делегата.

:::

## Делегирование средств валидатору {#delegate-to-a-validator}

1. Нажмите **Become a Delegator** (стать делегатом) или прокрутите вниз до конкретного валидатора и нажмите **Delegate** (делегировать).

![img](/img/staking/home.png)

2. Укажите количество токенов MATIC для делегирования.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Утвердите транзакцию делегирования и нажмите **Delegate** (делегировать).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

После завершения транзакции делегирования вы увидите сообщение **Delegation Completed** (делегирование завершено).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Просмотр операций делегирования {#view-your-delegations}

Нажмите [My account](https://staking.polygon.technology/account) (мой аккаунт), чтобы просмотреть свои транзакции делегирования.

![img](/img/staking/myAccount.png)

## Вывод наград {#withdraw-rewards}

1. Нажмите [My Account](https://staking.polygon.technology/account) (мой аккаунт).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Под валидатором, которому вы осуществили делегирование, нажмите **Withdraw Reward** (вывести награды).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Это позволит вам вывести награды в токенах MATIC на ваш адрес Ethereum.

## Добавление наград в стейкинг {#restake-rewards}

1. Нажмите [My Account](https://staking.polygon.technology/account) (мой аккаунт).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Под валидатором, которому вы осуществили делегирование, нажмите **Restake Reward** (добавить награды в стейкинг).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Это изменит вознаграждение токена MATIC валидатору и увеличит долю вашей делегации.

## Отвязка средств от валидатора {#unbond-from-a-validator}

1. Нажмите [My Account](https://staking.polygon.technology/account) (мой аккаунт).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Под валидатором, которому вы осуществили делегирование, нажмите **Unbond** (отвязать средства).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Это выводит ваши награды из валидатора и весь ваш пакет акций из валидатора.

Ваши награды будут отображаться сразу на вашем аккаунте Ethereum.

Отвязанные средства стейка будут заблокированы на 80 [чекпоинтов](/docs/maintain/glossary.md#checkpoint-transaction).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Блокировка средства на период отвязки осуществляется для предотвращения вредоносного поведения в сети.

:::

## Перенос стейка из одного нода в другой {#move-stake-from-one-node-to-another-node}

Перенос стейка из одного нода в другой выполняется за одну транзакцию. Во время этого события задержки и периоды отвязки не предусмотрены.

1. Войдите в [My Account](https://wallet.polygon.technology/staking/my-account) (мой аккаунт) на дашборде стейкинга.
1. Под валидатором, которому вы осуществили делегирование, нажмите **Move Stake** (перенести стейк).
1. Выберите внешнего валидатора и нажмите **Stake here** (разместить стейк здесь).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Укажите размер стейка и нажмите **Move Stake** (перенести стейк).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Это позволит переместить стейк. Дашборд обновится после 12 подтверждений блоков.

:::info

Перемещение пакета разрешен между любыми нодами. Единственное исключение — это перемещение доли из одного нода Foundation в другой нод Foundation, который не разрешен.

:::
