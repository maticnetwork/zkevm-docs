---
id: transactions
title: Transactions
description: Was sind Transaktionen und wann sie verwendet werden.
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transactions {#transactions}

Transaktionen bestehen aus Metadaten, die in [Kontexten](https://docs.cosmos.network/main/core/context.html) und [Nachrichten](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) gehalten werden, die Statusänderungen innerhalb eines Moduls auslösen, über den Handler des Moduls.

Wenn Benutzer mit einer Anwendung interagieren und Zustandsänderungen vornehmen wollen (z. B. das Senden von Coins), erstellen sie Transaktionen. Jede `message` einer Transaktion muss mit dem Privatschlüssel des entsprechenden Kontos signiert werden, bevor die Transaktion an das Netzwerk übermittelt wird. Eine Transaktion muss dann in einen Block aufgenommen, validiert und anschließend vom Netzwerk durch den Konsensprozess genehmigt werden. Um mehr über den Lebenszyklus einer Transaktion zu erfahren, klicken Sie [hier](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Typdefinition {#type-definition}

Transaktionsobjekte sind SDK Typen, die die Schnittstelle `Tx`implementieren.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Weitere Details zu Transaktionen: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
