---
id: stakingmanager
title: Стейкинг-менеджер
description: Менеджер стейкинга — это основной контракт на обработку деятельности, связанной с валидатором, в сети Polygon.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Для консенсуса на основе Proof of of Security, основанного Polygon, все проверки доказательства на уровне 2+1 и обработка стейкинга, награды выполняются на смарт-контракте Ethereum. Весь дизайн следует этой философии минимализма выполняемых действий на контракте Mainnet. Он выполняет проверку информации и выводит все операции с вычислением, тяжелым вычислением, в L2 (читайте о [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

**Stakers** разделяются на **валидаторов**, **делегатов** и **сторожевых** (для отчетности о мошенничестве).

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) — это основной контракт на обработку связанных с валидатором действий, таких как проверка `checkPoint`подписи, распределение вознаграждения и управление пакетами. Поскольку контракт использует **идентификатор NFT** в качестве источника собственности, изменение права собственности и подписанта не повлияет на что-либо в системе.

:::tip

Из одного адреса Ethereum **стейкер может быть только валидатором или validator** (это просто выбор дизайна, никаких серьезных причин).

:::

## Валидатор Входит/замена {#validator-admissions-replacement}

### Прием {#admissions}
В настоящее время в Polygon PoS нет открытых слотов валидатора. Существует также список ожидания, который должен стать валидатором. В будущем, если слоты станут доступными, валидаторы могут подать заявку на рассмотрение и удалить из списка ожидания.


### Замена {#replacement}
PIP4 представила концепцию представления валидатора для видимости сообщества. Если валидатор находится в нездоровом состоянии на продленный срок, как указано в PIP4, он выводится из сети. Затем слот валидатора доступен тем, кто выйдет из списка ожидания.

:::info

В настоящее время осуществляется [<ins>этап 2 ЧАСТИ C в</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) PIP4. Именно в этом сообщество принимает решение по критериям оценки перспектив валидатора. Это мероприятие будет производить процесс подачи заявок и поступлений.

:::

## Методы и переменные {#methods-and-variables}

:::caution Реализация Slashing

`jail``unJail`, , и `slash`функции в настоящее время не используются в качестве части реализации Slashing.

:::

### validatorThreshold {#validatorthreshold}

Он сохраняет максимальное количество валидаторов, принятых системой, также называемых слотами.

### AccountStateRoot {#accountstateroot}

- Для различных учетных данных, выполненных в Heimdall для валидаторов и делегата, при отправке этого параметра представляется корень `checkpoint`аккаунта.
- accRoot используется в when `claimRewards`и .`unStakeClaim`

### stake {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Позволяет любому с количеством (в токенах MATIC) больше, чем `minDeposit`, если `currentValidatorSetSize`меньше .`validatorThreshold`
- Должен перенести `amount+heimdallFee`, выводит валидатора в период аукциона для аукционного auctionInterval (подробнее в разделе auctionInterval
- `updateTimeLine`обновляет специальную структуру данных временной шкалы, которая отслеживает активных валидаторов и активный пакет для заданного количества эпохи/checkpoint.
- Один уникальный `NFT`запоминается на каждом новом `stake`или вызове, который может быть передан любому `stakeFor`лицу, но может быть принадлежит адресу Ethereum 1:1.
- `acceptDelegation`Установить true, если валидаторы хотят принять делегацию, `ValidatorShare`контракт будет направлен для валидатора.

### Вывод средств из стейкинга {#unstake}

- Удалить валидатор из набора валидатора в следующей эпохе (действителен только для текущего checkpoint, как только `unstake`назван)
- Удалить стейк валидатора из структуры данных временной шкалы, обновить счетчик для эпохи выхода валидатора.
- Если валидатор имел делегирование, собираем все награды и заблокируем контракт на делегирование для новых делегаций.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- После того, как валидаторы вводятся в период `unstaking`вывода, чтобы они могли быть заблокированы, если любое мошенничество найдено `unstaking`после , для прошлых мошенничества.
- После того как `WITHDRAWAL_DELAY`период будет обслуживан, валидаторы могут вызвать эту функцию и сделать расчет, с помощью `stakeManager`(получить вознаграждения, если таковые имеются, получить staked обратно, записать NFT, и т.д.).

### Добавление средств в стейкинг {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Позволяет валидаторам увеличивать свой стейк, добавляя новую сумму или награды, или и то, и другое.
- Должен обновить временной график (сумму) для активного стейка.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Этот метод позволяет валидаторам вывести накопленные награды, необходимо рассмотреть вопрос о получении вознаграждения из контракта делегирования, если валидатор принимает делегацию.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Этот метод позволяет валидаторам обновить адрес подписанта (который используется для проверки блоков на блокчейне Polygon, и подписей `stakeManager`checkpoint).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Валидаторы могут пополнить баланс для вознаграждения Heimdall, вызывая этот метод.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Этот метод используется для вывода комиссий из Heimdall. `accountStateRoot`обновляется на каждом checkpoint, чтобы валидаторы могли предоставить доказательства включения в этот корень для аккаунта в Heimdall и вывести комиссию.

Обратите внимание, `accountStateRoot`что переписывается для предотвращения выходов на нескольких checkpoint (для старого root и сохранения `stakeManager`учета). `accumSlashedAmount`на данный момент unused и будет использоваться для показа в Heimdall.

### StakingNFT {#stakingnft}

Стандартный контракт ERC721 с несколькими ограничениями, такими как один токен на пользователя и отображаемый в последовательном порядке.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Чтобы начать ставку или поставить выше на уже запущенном аукционе, эта функция используется. Период аукциона выполняется в циклах, таким `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`образом, он **должен проверить правильный** период аукциона.

`perceivedStakeFactor`используется для расчета точного коэффициента factor*old (примечание в настоящее время по умолчанию это 1 WIP для выбора функции). **Должен проверить аукцион с последнего периода аукциона, если любой еще происходит** (можно выбрать не `confirmAuction`вызов, чтобы вывести свой капитал на следующем аукционе). Обычно непрерывный аукцион на английском языке происходит в `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Должен проверить, что это не аукционный период.**
- Если последний участник торгов является владельцем `validatorId`, поведение должно быть похоже на restake.
- Во втором случае unStake `validatorId` и добавьте нового пользователя в качестве валидатора из следующего checkpoint, так как поведение нового пользователя должно быть похоже на stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Записи предназначены только для контракта RootChain при отправке checkpoint.
- `voteHash`, на котором подписываются все валидаторы (соглашение BFT ⅔+1)
- Эта функция проверяет только уникальные подписи и проверяет, что ⅔+1 мощности подписались на корневом checkpoint (включение в проверку `voteHash` в контракте RootChain для всех данных) `currentValidatorSetTotalStake` обеспечивает текущий активный стейк.
- Награды распределяются пропорционально стейку валидатора. Подробнее о наградах в [распределении вознаграждения](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2).

### isValidator {#isvalidator}

Проверяет, является ли данный валидатор активным валидатором для текущей эпохи.

## Структура данных временной шкалы {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Контракт централизованного логирования как для событий валидатора, так и делегирования, включает в себя лишь несколько функций. Вы можете проверить исходный код контракта [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) на GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Контракт на фабрику для `ValidatorShare`развертывания для каждого валидатора, который принимает участие в делегировании. Вы можете проверить исходный код контракта [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) на GitHub.
