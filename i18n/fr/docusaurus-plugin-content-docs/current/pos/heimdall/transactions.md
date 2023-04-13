---
id: transactions
title: Transactions
description: Quelles sont les transactions et quand elles sont utilisées
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transactions {#transactions}

Les transactions sont composées de métadonnées conservées dans [des contextes](https://docs.cosmos.network/main/core/context.html) et des [messages](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) qui déclenchent des changements d'état dans un module, via le gestionnaire du module.

Lorsque les utilisateurs veulent interagir avec une application et faire des changements d'état (par exemple envoyer des pièces), ils créent des transactions. Chacune des transactions `message` doit être signée en utilisant la clé privée associée au compte approprié compte avant que la transaction soit diffusée sur le réseau. Une transaction doit alors être incluse dans un bloc, validée, et ensuite être approuvée par le réseau à travers le processus de consensus. Pour lire plus sur le cycle de vie d'une transaction, cliquez [ ici](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Définition de Type {#type-definition}

Les objets de transaction sont des types SDK qui implémentent `Tx`l'interface.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Plus de détails sur les Transactions: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
