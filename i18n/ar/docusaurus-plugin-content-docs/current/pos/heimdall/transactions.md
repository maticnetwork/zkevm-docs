---
id: transactions
title: Transactions
description: When users want to interact with an application and make state changes (e.g. sending coins), they create transactions. Each of a transaction's `message` must be signed using the private key associated with the appropriate account before the transaction is broadcasted to the network.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Transactions are comprised of metadata held in [contexts](https://docs.cosmos.network/master/core/context.html) and [messages](https://docs.cosmos.network/master/building-modules/messages-and-queries.html) that trigger state changes within a module, through the module's [Handler](https://docs.cosmos.network/master/building-modules/handler.html).

When users want to interact with an application and make state changes (e.g. sending coins), they create transactions. Each of a transaction's `message` must be signed using the private key associated with the appropriate account before the transaction is broadcasted to the network. A transaction must then be included in a block, validated, and then approved by the network through the consensus process. To read more about the lifecycle of a transaction, click [here](https://docs.cosmos.network/master/basics/tx-lifecycle.html).

## **Type Definition**

Transaction objects are SDK types that implement the `Tx` interface

```go
type Tx interface {
    // Gets all the transaction's messages.
    GetMsgs() []Msg

    // ValidateBasic does a simple and lightweight validation check that doesn't
    // require access to any other information.
    ValidateBasic() Error
}
```

More details on Transactions: [https://docs.cosmos.network/master/core/transactions.html](https://docs.cosmos.network/master/core/transactions.html)