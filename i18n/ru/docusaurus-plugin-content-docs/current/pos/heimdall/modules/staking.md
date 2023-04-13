---
id: staking
title: Стейкинг
description: Модуль управления транзакциями и состоянием, связанными с валидатором.
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Стейкинг {#staking}

Модуль стейкинга обеспечивает управление транзакциями и состояниями, связанными с валидатором, в Heimdall. Обратите внимание, что валидатор добавляет свои токены в стейкинг в цепочке Ethereum и становится валидатором. Соответствующие валидаторы отправляют транзакции в Heimdall с использованием необходимых параметров для подтверждения изменения в стейкинге в Ethereum. Как только большинство валидаторов соглашаются с изменением в стейкинге, этот модуль сохраняет информацию о валидаторе в состоянии Heimdall.

## Управление ключами {#key-management}

Для получения информации об управлении ключами см. [Управление ключами валидатора](/docs/pos/heimdall/validator-key-management)

## Делегирование {#delegation}

Этот модуль обеспечивает только управление стейкингом валидатора в Heimdall. Делегирование доступно только по смарт-контрактам в цепочке Ethereum. Чтобы оптимизировать расчет наград за делегирование по смарт-контрактам, мы используем доли валидатора (ERC20 на одного валидатора).

Более подробную информацию можно найти здесь: [Делегирование (доли валидатора)](/docs/pos/contracts/delegation)

## Награды {#rewards}

Все награды распределяются в цепочке Ethereum. Валидаторы и делегаты получают награды или добавляют их в стейкинг, просто отправив транзакцию в `StakeManager.sol`.

Более подробную информацию можно найти здесь: [Награды](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Сообщения {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` обеспечивает управление стейкингом при присоединении нового валидатора к системе, после того как валидатор вызывает команду `stake` или `stakeFor` в `StakingManager.sol` в Ethereum, и создается новое `Staked` событие.

Источник: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch` показывает номер checkpoint, с которого валидатор станет активным в Heimdall.

Вызов стейкинга по смарт-контракту не выполняется, если нет доступных слотов. Слоты валидаторов — это единственный способ ограничить число валидаторов в системе.  Слоты управляются смарт-контрактами Ethereum.

Здесь приводится сообщение `ValidatorJoin` для транзакции в Heimdall:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate` обеспечивает обновление стейка при пополнении стейкинга валидатором или при появлении нового делегата. В любом случае создается новое событие `StakeUpdate`.

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

Здесь приводится сообщение `MsgStakeUpdate` для транзакции в Heimdall:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

`MsgValidatorExit` обеспечивает процесс выхода валидатора после того, как валидатор инициирует процесс выхода в Ethereum. Это создает событие `SignerUpdate`.

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

Здесь приводится сообщение `MsgValidatorExit` для транзакции в Heimdall:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` обеспечивает обновление информации подписанта, когда валидатор обновляет ключ подписанта в Ethereum. Это создает событие `SignerUpdate`.

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

Здесь приводится сообщение `MsgSignerUpdate` для транзакции в Heimdall:

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## Команды CLI {#cli-commands}

### Данные о валидаторе {#validator-details}

**По адресу подписанта**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Эта команда должна отобразить следующее:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**По адресу валидатора**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Эта команда должна отобразить следующее:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### Присоединение валидатора {#validator-join}

Эта команда отправляет команду добавления валидатора через CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

Значение `tx-hash` должно совпадать с хэшем транзакции в Ethereum, который создал `Staked` событие, а `log-index` должен совпадать с индексом, по которому создается событие.

## REST API {#rest-apis}

| Название | Метод | Конечная точка |
|----------------------|------|------------------|
| Получить информацию о наборе валидаторов в Heimdall | GET | /staking/validator-set |
| Получить информацию о валидаторе | GET | /staking/validator/validator-id |


Все API-интерфейсы запросов будут иметь следующий формат:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
