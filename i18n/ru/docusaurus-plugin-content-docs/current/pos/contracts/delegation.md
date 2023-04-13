---
id: delegation
title: Делегирование через Акции Validator
sidebar_label: Delegation
description: Делегирование через Акции Validator
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon поддерживает делегирование с помощью долей валидатора. Такая схема позволяет проще распределять награды и масштабировать (тысячи делегаторов) контракты Ethereum без особых вычислений.

Делегаторы осуществляют делегирование путем покупки долей ограниченного пула у валидаторов. У каждого валидатора будет свой собственный токен доли валидатора. Назовем эти взаимозаменяемые токены `VATIC` для валидатора `A`. Как только пользователь делегирует валидатору `A`, ему будут выданы `VATIC` по обменному курсу пары `MATIC/VATIC`. По мере того, как пользователи накапливают стоимость, обменный курс показывает, что теперь они могут снимать больше `MATIC` за каждые `VATIC`, а когда пользователей сокращают, они снимают меньше `MATIC` за свои `VATIC`.

Обратите внимание, что `MATIC` — это токен стейкинга. Делегатору необходимо иметь токены `MATIC` для участия в делегировании.

Изначально делегатор `D` покупает токены у валидатора `A` определенного пула по курсу `1 MATIC per 1 VATIC`.

Когда валидатор получает больше токенов `MATIC`, новые токены добавляются в пул. Допустим, с текущим пулом `100 MATIC`токенов, в бассейн добавляются `10 MATIC`награды. Но поскольку общее количество токенов `VATIC` не изменилось из-за награды, обменный курс становится равным `1 MATIC per 0.9 VATIC`. Теперь delegator `D`получает больше `MATIC`для тех же акций.

`VATIC`: Токены (ERC20) долей валидатора, выпущенные конкретным валидатором

## Техническая спецификация {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Обменный курс рассчитывается следующим образом:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Методы и переменные {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Передайте `_amount` в stakeManager и обновите структуру данных временной шкалы для активного стейка.
- `updateValidatorState` используется для обновления временной шкалы DS.
- `Mint` доли делегирования, используя текущий `exchangeRate` для `_amount`.
- `amountStaked` используется для отслеживания активного стейка каждого делегатора для расчета наград за ликвидность.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Используя текущий `exchangeRate`и количество акций для расчета общей суммы (активный стейк + награды).
- `unBond`активный стейк от валидатора и награды делегата, если таковые имеются.
- Необходимо удалить активный стейк с временной шкалы, используя `updateValidatorState` в stakeManager.
- Сопоставление `delegators` используется для отслеживания стейка в период вывода средств.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Для делегата вычислить награды и перевод, а также в зависимости от количества долей в `exchangeRate`записях.
- Пример: если delegator владеет 100 акциями, а обменный курс составляет 200, поэтому награды составляют 100 токенов, передают 100 токенов delegator. Остающийся пакет составляет 100, поэтому с использованием обменного курса 200, теперь он стоит 50 акций. Так что сжигать 50 акций. Делегат теперь имеет 50 акций на 100 токенов (которые он изначально staked

### Добавление средств в стейкинг {#restake}

Restake может работать двумя способами: делегат может покупать больше акций с помощью награды `buyVoucher`или reStake.

```js
function reStake() public;
```

Вышеуказанная функция используется для reStake rewards. Количество долей остается неизменным, потому что `exchangeRate` не изменяется. Только награды перемещаются в активный стейк как для контракта на доли валидатора, так и для временной шкалы stakeManager.

`getLiquidRewards`используется для расчета накопленных вознаграждений, т.е. delegator владеет 100 долей и обменным курсом 200, поэтому награды составляют 100 токенов. Переместить 100 токенов в активный стейк, поскольку обменный курс все еще остается одинаковым для акционера. Разница только в том, что теперь 200 токенов считаются активным пакетом и не могут быть немедленно сняты (не входит в состав жидких наград).

Цель reStaking состоит в том, что, поскольку валидатор делегата теперь имеет более активный пакет и он получит больше наград за это, так будет делегат.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

После окончания периода вывода делегаты, которые продали свои акции, могут претендовать на свои токены MATIC. Необходимо передать токены пользователю.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Обновляет процент комиссии для валидатора.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Когда валидатор получает награды за отправку checkpoint, эта функция вызывается для выплаты вознаграждений между валидатором и делегатами.
