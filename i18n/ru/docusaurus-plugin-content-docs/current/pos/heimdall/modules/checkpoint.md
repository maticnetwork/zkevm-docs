---
id: checkpoint
title: Checkpoint
description: Модуль управления функциями, связанными с checkpoint,
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Checkpoint {#checkpoint}

Модуль `checkpoint` управляет функциями Heimdall, связанными с checkpoint. Ему необходима цепочка Bor для проверки хэша корня, когда в Heimdall предлагается новый checkpoint.

Все данные, касающиеся checkpoint, подробно описаны [здесь](/docs/pos/heimdall/checkpoint).

## Жизненный цикл checkpoint {#checkpoint-life-cycle}

Heimdall использует тот же алгоритм выбора лидера, что и Tendermint, чтобы выбрать следующего proposer. Попытка отправки checkpoint в цепочке Ethereum может быть неудачной по ряду причин, в том числе из-за лимита на газ, трафика на Ethereum или высокой комиссии за газ. Поэтому необходим многоэтапный процесс создания checkpoint.

Каждый checkpoint имеет валидатора в качестве proposer. Если checkpoint в цепочке Ethereum не удается или преуспеть, `ack`а `no-ack`транзакция изменит the в Heimdall для следующего checkpoint. Следующая схема представляет жизненный цикл checkpoint:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Сообщения {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` осуществляет проверку checkpoint в Heimdall. Только в этом сообщении используется кодирование RLP, поскольку его необходимо проверить в цепочке Ethereum.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

После обработки этой транзакции в Heimdall `proposer` принимает `votes` и `sigs` из Tendermint для этой транзакции, а затем отправляет checkpoint в цепочку Ethereum.

Поскольку блок содержит несколько транзакций, а эта конкретная транзакция проверяется в цепочке Ethereum, требуется доказательство Меркла. Чтобы избежать дополнительной проверки доказательства Меркла в Ethereum, в Heimdall разрешено включать в блок только одну транзакцию, если тип транзакции `MsgCheckpoint`.

Чтобы разрешить применение этого механизма, Heimdall определяет транзакцию `MsgCheckpoint` как транзакцию с высоким потреблением газа. См. [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

В этой транзакции предложенный checkpoint будет храниться в состоянии `checkpointBuffer` вместо фактического состояния списка checkpoint.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` обеспечивает успешную отправку checkpoint. `HeaderBlock`Вот счетчик checkpoint;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Для получения действительных `TxHash` и `LogIndex` для отправленного checkpoint эта транзакция проверяет следующее событие и подтверждает checkpoint в состоянии `checkpointBuffer`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

В случае успешной проверки события он обновляет фактический счет checkpoint, также известный как `ackCount`и очищает .`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` управляет неудачными checkpoint или авторами предложений вне сети. Эта транзакция становится действительной только после того, как `CheckpointBufferTime` прошло после следующих событий:

- Последняя успешная транзакция `ack`
- Последняя успешная транзакция `no-ack`

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Эта транзакция предоставляет время ожидания, чтобы текущий автор предложения мог отправить checkpoint/транзакцию ack, прежде чем Heimdall выберет нового `proposer` для следующего checkpoint.

## Параметры {#parameters}

Модуль checkpoint содержит следующие параметры:

| Ключ | Тип | Значение по умолчанию |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## Команды CLI {#cli-commands}

### Параметры {#params}

Чтобы вывести все параметры:

```go
heimdallcli query checkpoint params --trust-node
```

Ожидаемый результат:

```yaml
checkpoint_buffer_time: 16m40s
```

### Отправка checkpoint {#send-checkpoint}

Следующая команда отправляет транзакцию создания checkpoint в Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Отправить`ack`

Следующая команда отправляет транзакцию ack в Heimdall, если checkpoint успешно создан в Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Отправить`no-ack`

Следующая команда отправляет транзакцию no-ack в Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| Название | Метод | Endpoint |
|----------------------|------|------------------|
| Получить текущее состояние буфера checkpoint | GET | /checkpoint/buffer |
| Получить подсчет для checkpoint | GET | /checkpoint/count |
| Получить информацию о checkpoint по индексу блока | GET | /checkpoint/headers/<header-block-index\> |
| Получить информацию о последнем checkpoint | GET | /checkpoint/latest-checkpoint |
| Получить данные о последней транзакции no-ack | GET | /checkpoint/last-no-ack |
| Информация о checkpoint для заданного начального и конечного блока | GET | /checkpoint/<start\>/<end\> |
| Checkpoint по номеру | GET | /checkpoint/<checkpoint-number\> |
| Все checkpoint | GET | /checkpoint/list |
| Получить информацию о подсчете транзакций ack, буфере, наборе валидаторов, числе валидаторов и последней транзакции ast-no-ack | GET | /overview |


Все API запроса будут содержать результат в следующем формате:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
