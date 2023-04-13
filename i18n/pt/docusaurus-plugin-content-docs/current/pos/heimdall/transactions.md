---
id: transactions
title: Transações
description: O que são transações e quando elas são usadas
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transações {#transactions}

As transações são compostas de metadados mantidos em [contextos](https://docs.cosmos.network/main/core/context.html) e [mensagens](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) que desencadeiam alterações de estado dentro de um módulo, através do Gerenciador do módulo.

Quando os utilizadores quiserem interagir com uma aplicação e fazer alterações de estado (por exemplo, enviar moedas), estes criam transações. Cada `message`de uma transação deve ser assinada utilizando a chave privada associada à conta apropriada antes da transação ser transmitida à rede. A transação deve ser incluída num bloco, validada e, em seguida, aprovada pela rede através do processo de consenso. Para ler mais sobre o ciclo de vida de uma transação, clique [aqui](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Definição de Tipo {#type-definition}

Objetos de transação são tipos de SDK que implementam a `Tx`interface.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Mais detalhes sobre transações: [Transactions:](https://docs.cosmos.network/main/core/transactions.html)
