---
id: transactions
title: Transazioni
description: Cosa sono le transazioni e quando vengono utilizzati
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transazioni {#transactions}

Le transazioni sono composte da metadati detenuti in [contesti](https://docs.cosmos.network/main/core/context.html) e [messaggi](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) che innescano le modifiche di stato all'interno di un modulo, attraverso il Handler del modulo.

Quando gli utenti vogliono interagire con un'applicazione e apportano cambiamenti di stato (ad esempio inviando monete), creano delle transazioni. Prima che la transazione sia trasmessa alla rete, ciascun `message` di una transazione deve essere firmato utilizzando la chiave privata associata all'account di pertinenza. Una transazione deve quindi essere inclusa in un blocco, convalidata e poi approvata dalla rete attraverso il processo di consensus. Per saperne di più sul ciclo di vita di una transazione, fare clic [qui](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Definizione del tipo {#type-definition}

Gli oggetti di transazione sono tipi di SDK che implementano `Tx`l'interfaccia.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Maggiori dettagli sulle transazioni: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
