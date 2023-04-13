---
id: topup
title: Topup
description: Сумма, которая будет использоваться для оплаты комиссий в цепочке Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Heimdall Topup — это сумма, которая будет использоваться для оплаты комиссий в цепочке Heimdall.

Существует два способа пополнения аккаунта:

1. Когда новый валидатор присоединится, он может указать `topup`сумму в качестве пополнения в дополнение к top-up которая будет перемещена в качестве баланса в цепочке Heimdall, чтобы платить комиссии в Heimdall.
2. Пользователь может напрямую вызвать функцию пополнения в смарт-контракте стейкинга на Ethereum, чтобы увеличить баланс пополнения на Heimdall.

## Сообщения {#messages}

### MsgTopup {#msgtopup}

Транзакция `MsgTopup` отвечает за вывод баланса на адрес в Heimdall на основе `TopUpEvent` смарт-контракта стейкинга в сети Ethereum.

Обработчик этой транзакции обрабатывает пополнение и увеличивает баланс только один раз для любых заданных `msg.TxHash` и `msg.LogIndex`. Он выдает ошибку `Older invalid tx found` при попытке обработать пополнение более одного раза.

Вот структура сообщения о транзакции пополнения:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

Транзакция `MsgWithdrawFee` отвечает за вывод баланса из Heimdall в цепочку Ethereum. Валидатор может вывести любую сумму из Heimdall.

Обработчик обрабатывает вывод путем уменьшения баланса данного валидатора и подготавливает состояние к отправке следующего checkpoint. Следующий возможный checkpoint будет содержать состояние, связанное с выводом средств для конкретного валидатора.

Обработчик получает информацию о валидаторе на основе его `ValidatorAddress` и обрабатывает вывод средств.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Команды CLI {#cli-commands}

### Комиссия за пополнение {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Комиссия за вывод {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Чтобы проверить пополнение аккаунта, выполните следующую команду

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| Название | Метод | URL | Параметры тела запроса |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Комиссия за пополнение | POST | /topup/fee | Идентификатор валидатора: `id`, хэш транзакции успешного события пополнения в цепочке Ethereum: `tx_hash`, индекс журнала события пополнения, отправленного в цепочке Ethereum: `log_index` |
| Комиссия за вывод | POST | /topup/withdraw | Сумма вывода: `amount` |
