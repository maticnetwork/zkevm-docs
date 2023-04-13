---
id: transactions
title: Транзакции
description: Что такое транзакции, а когда они используются
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Транзакции {#transactions}

Транзакции состоят из метаданных, содержащихся в [контекстах](https://docs.cosmos.network/main/core/context.html) и [сообщений,](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) которые вызывают изменения состояния в модуле, через Handler.

Когда пользователи хотят взаимодействовать с приложением и изменять состояния (например, путем отправки монет), они совершают транзакции. Каждое `message` транзакции должно быть подписано с использованием приватного ключа, привязанного к соответствующему аккаунту, прежде чем транзакция будет передана в сеть. После этого транзакция должна быть включена в блок, проверена и одобрена сетью в процессе консенсуса. Чтобы узнать подробнее о жизненном цикле транзакции, нажмите [здесь](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Определение типа {#type-definition}

Объекты транзакции — это типы SDK, которые реализуют `Tx`интерфейс.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Более подробную информацию о транзакциях: [Transactions:](https://docs.cosmos.network/main/core/transactions.html)
