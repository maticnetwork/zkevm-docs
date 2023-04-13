---
id: bank
title: Bank
description: Передача баланса счета управления модулем для Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Модуль {#bank-module}

Модуль `bank` обрабатывает трансферы остатка на балансе аккаунта для Heimdall. Этот модуль соответствует модулю `bank` из cosmos-sdk.

## Сообщения {#messages}

### MsgSend {#msgsend}

`MsgSend` обрабатывает операции трансфера между аккаунтами в Heimdall. Вот структура сообщения транзакции:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` обрабатывает множественные трансферы между аккаунтами для Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Параметры {#parameters}

Модуль bank содержит следующие параметры:

| Ключ | Тип | Значение по умолчанию |
|----------------------|--------|------------------|
| `sendenabled` | bool | true |

## Команды CLI {#cli-commands}

### Отправить остаток {#send-balance}

Следующая команда отправит 1000 токенов matic на указанные `address`;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
