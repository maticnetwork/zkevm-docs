---
id: clerk
title: Clerk
description: Модуль управления общей синхронизацией состояния от Ethereum в Bor
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerk управляет общей синхронизацией состояний от цепочки Ethereum к цепочке Bor. Heimdall соглашается на синхронизацию состояния, которая инициируется в цепочке Ethereum с использованием модуля Clerk.

Более подробную информацию можно найти в [механизме синхронизации состояния](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Сообщения {#messages}

### MsgEventRecord {#msgeventrecord}

Транзакция `MsgEventRecord` отвечает за проверку событий из `StateSender.sol` и сохранение состояния в Heimdall для Bor.

Обработчик этой транзакции проверяет любые данные `msg.TxHash` и `msg.LogIndex`. Он выдает ошибку `Older invalid tx found` при попытке обработать транзакцию более одного раза.

Структура сообщения о транзакции пополнения:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## Команды CLI {#cli-commands}

### Отправить транзакцию записи состояния {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Чтобы запросить уже подтвержденную запись о событии состояния {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| Название | Метод | Конечная точка |
|----------------------|------|------------------|
| Данные записи события | GET | /clerk/event-record/<record-id\> |
| Все записи событий | GET | /clerk/event-record/list |
